import { ActorItemHelper, getChildItems, getFirstAcceptableStorageIndex, getItemContainer, setItemContainer } from "../../actor/actor-inventory-utils.js";

export const ItemCapacityMixin = (superclass) => class extends superclass {
    /**
     * Checks if this item has capacity.
     */
    hasCapacity() {
        if (this.type === "starshipWeapon") {
            return (
                this.system.weaponType === "tracking"
                || this.system.special["mine"]
                || this.system.special["transposition"]
                || this.system.special["orbital"]
                || this.system.special["rail"]
                || this.system.special["forcefield"]
                || this.system.special["limited"]
            );
        }

        return (this.getMaxCapacity() > 0);
    }

    /**
     * Why the character sheet is not offering a button that spends this item's charges.
     * Blank Usage hides that button. An Activation button spends limited uses instead.
     * An attack spends charges only when Usage is Action or Shot.
     * @returns {""|"missing-usage"|"activation-ignores-charges"|"attack-ignores-charges"}
     */
    get chargeSpendHint() {
        if (["consumable", "ammunition", "starshipWeapon"].includes(this.type)) return "";
        if (!this.system.capacity) return "";

        const max = Number(this.getMaxCapacity());
        const current = Number(this.system.capacity.value);
        const usageValue = Number(this.system.usage?.value);
        const hasCharges = max > 0 || current > 0 || usageValue > 0;
        if (!hasCharges) return "";

        const per = this.system.usage?.per ?? "";
        if (!per) {
            const activationType = this.system.activation?.type ?? "";
            const activationButtonShown = !!activationType && !(this.type === "weapon" && activationType === "none");
            return activationButtonShown ? "activation-ignores-charges" : "missing-usage";
        }

        if (this.hasAttack && !["action", "shot"].includes(per)) return "attack-ignores-charges";
        return "";
    }

    /**
     * Returns whether or not this item requires capacity items (typically ammunition) or not
     */
    requiresCapacityItem() {
        const itemData = this.system;
        return (this.type !== "ammunition" && itemData.ammunitionType);
    }

    /**
     * Returns the current capacity item assigned to this item.
     * Can return null if there is no item assigned or necessary.
     */
    getCapacityItem() {
        if (!this.requiresCapacityItem()) {
            return null;
        }

        // Create actor item helper
        const tokenId = this.actor.isToken ? this.actor.token.id : null;
        const sceneId = this.actor.isToken ? this.actor.token.parent.id : null;
        // Pass the actor through on the options object so the constructor doesn't have to try (and fail) and fetch the actor from the compendium.
        const itemHelper = new ActorItemHelper(this.actor.id, tokenId, sceneId, { actor: this.actor });

        // Find child item
        const childItems = getChildItems(itemHelper, this);
        const loadedAmmunition = childItems.find(x => x.type === "ammunition");
        return loadedAmmunition ?? null;
    }

    /**
     * Returns the current capacity of the item.
     * Can return null if there is no capacity available.
     */
    getCurrentCapacity() {
        if (this.requiresCapacityItem()) {
            const capacityItem = this.getCapacityItem();
            return capacityItem?.getCurrentCapacity() || 0;
        }

        const itemData = this.system;
        if (this.type === "ammunition" && !this.system.useCapacity) {
            return itemData.quantity;
        } else if (this.type === "consumable") {
            return this.system.uses.value ? this.system.uses.value : (this.system.quantity > 0 ? 1 : 0);
        }
        else {
            return itemData.capacity?.value;
        }
    }

    /**
     * Consumes some amount of capacity.
     */
    consumeCapacity(consumedAmount) {
        if (this.requiresCapacityItem()) {
            const capacityItem = this.getCapacityItem();
            return capacityItem?.consumeCapacity(consumedAmount);
        }

        // Attempt to retrieve current capacity. If it is null, exit early.
        const currentCapacity = this.getCurrentCapacity();
        if (!currentCapacity) {
            return;
        }

        const updatedCapacity = Math.max(0, currentCapacity - consumedAmount);

        if (this.type === "ammunition" && !this.system.useCapacity) {
            return this.update({'system.quantity': updatedCapacity});
        } else if (this.type === "consumable") {
            // Consumables always reduce uses by one, but also can reduce item quantity
            const itemData = this.system;
            if (itemData.uses.autoUse) {
                let quantity = itemData.quantity;
                let remainingUses = Math.max(this.getRemainingUses() - 1, 0);

                if (remainingUses < 1) {
                    // Deduct an item quantity
                    quantity = Math.max(quantity - 1, 0);
                    if (quantity < 1 && itemData.uses.autoDestroy) {
                        // Destroy the item
                        this.actor.deleteEmbeddedDocuments("Item", [this.id]);
                    } else {
                        if (quantity > 0) {
                            // Reset the remaining charges
                            remainingUses = this.getMaxUses();
                        }
                        this.update({
                            'system.quantity': quantity,
                            'system.uses.value': remainingUses
                        });
                    }
                } else {
                    // Deduct the remaining charges
                    this.update({'system.uses.value': remainingUses});
                }
            }
        } else {
            return this.update({'system.capacity.value': updatedCapacity});
        }
    }

    /**
     * Increases capacity by some amount.
     */
    increaseCapacity(increaseAmount) {
        if (this.requiresCapacityItem()) {
            const capacityItem = this.getCapacityItem();
            return capacityItem?.increaseCapacity(increaseAmount);
        }

        // Attempt to retrieve current capacity. If it is null, exit early.
        const currentCapacity = this.getCurrentCapacity();
        if (currentCapacity === null || currentCapacity === undefined) {
            return;
        }

        // Quantity ammunition has no max. A null max used to call a missing parent and produce NaN.
        const ownMax = this.getMaxCapacity();
        const maxCapacity = (ownMax === null || ownMax === undefined)
            ? (this.parentItem?.getMaxCapacity?.() ?? null)
            : ownMax;
        const updatedCapacity = currentCapacity + increaseAmount;
        const cappedCapacity = (maxCapacity === null || maxCapacity === undefined)
            ? updatedCapacity
            : Math.min(updatedCapacity, maxCapacity);

        if (this.type === "ammunition" && !this.system.useCapacity) {
            return this.update({'system.quantity': cappedCapacity});
        } else if (this.type === "consumable") {
            if (updatedCapacity > maxCapacity) {
                const capacityOvershoot = (updatedCapacity - maxCapacity) % maxCapacity;
                const quantityOvershoot = Math.ceil(updatedCapacity / maxCapacity) - 1;
                this.update({
                    'system.quantity': this.system.quantity + quantityOvershoot,
                    'system.uses.value': capacityOvershoot
                });
            } else {
                // Add charges
                this.update({'system.uses.value': Math.min(updatedCapacity, maxCapacity ?? updatedCapacity)});
            }
        } else {
            return this.update({'system.capacity.value': cappedCapacity});
        }
    }

    /**
     * Returns the maximum capacity of the item.
     * Can return null if there is no maximum capacity.
     */
    getMaxCapacity() {
        if (this.type === "ammunition" && !this.system.useCapacity) {
            return null;
        } else if (this.type === "consumable") {
            try {
                const roll = Roll.create(this.system.uses.max, {...this.actor.system, item: this.system}).evaluateSync({strict: false});
                return roll.total ? roll.total : (this.system.quantity > 0 ? 1 : 0);
            } catch (e) {
                console.error(e);
                return 0;
            }
        }

        const itemData = this.system;
        const maxCapacity = itemData.capacity?.max;
        return maxCapacity;
    }

    /**
     * Attempts to reload the item's capacity.
     */
    async reload() {
        const itemData = this.system;
        const currentCapacity = Number(this.getCurrentCapacity()) || 0;
        const maxCapacity = this.getMaxCapacity();

        // A missing max is null. `0 >= null` is true in JS, which used to report a full magazine.
        if (maxCapacity !== null && maxCapacity !== undefined && currentCapacity >= maxCapacity) {
            ui.notifications.warn(game.i18n.format("SFRPG.ActorSheet.Inventory.Weapon.AlreadyFullyLoaded", {name: this.name}));
            return false;
        }

        let reloaded = false;
        if (this.requiresCapacityItem()) {
            const capacityItem = this.getCapacityItem();

            const matchingItems = this.actor.items
                .filter(x => {
                    if (x.type !== "ammunition" || x.system.ammunitionType !== itemData.ammunitionType) return false;
                    if (!x.system.useCapacity) return true;
                    const spareCharges = Number(x.getCurrentCapacity()) || 0;
                    const spareMax = x.getMaxCapacity();
                    const hasMoreCharges = spareCharges > currentCapacity;
                    const weaponHasMax = maxCapacity !== null && maxCapacity !== undefined;
                    const spareHasMax = spareMax !== null && spareMax !== undefined;
                    const fitsWeapon = !weaponHasMax || !spareHasMax || (Number(spareMax) <= Number(maxCapacity));
                    return hasMoreCharges && fitsWeapon;
                })
                .filter(x => {
                    const container = getItemContainer(this.actor.items, x);
                    return !container || container.type === "container";
                })
                .sort((firstEl, secondEl) => (Number(secondEl.getCurrentCapacity()) || 0) - (Number(firstEl.getCurrentCapacity()) || 0));

            if (matchingItems.length > 0) {
                const newAmmunition = matchingItems[0];

                const tokenId = this.actor.isToken ? this.actor.token.id : null;
                const sceneId = this.actor.isToken ? this.actor.token.parent.id : null;
                const itemHelper = new ActorItemHelper(this.actor.id, tokenId, sceneId, { actor: this.actor });

                const originalContainer = getItemContainer(this.actor.items, newAmmunition);

                if (newAmmunition.system.useCapacity || capacityItem === null) {
                    const slotIndex = getFirstAcceptableStorageIndex(this, newAmmunition, capacityItem?.id ?? null);
                    if (slotIndex === null) {
                        ui.notifications.warn(game.i18n.format("SFRPG.ActorSheet.Inventory.Weapon.NoAmmunitionAvailable", {name: this.name}));
                    } else {
                        // Eject the spent battery before inserting the replacement, so the ammunition slot is free.
                        if (capacityItem) {
                            await setItemContainer(itemHelper, capacityItem, null, 1);
                        }

                        let totalAmountLoaded = 1;
                        if (!newAmmunition.system.useCapacity) {
                            totalAmountLoaded = Math.min(maxCapacity, newAmmunition.getCurrentCapacity());
                        }

                        const loaded = await setItemContainer(itemHelper, newAmmunition, this, totalAmountLoaded);
                        reloaded = !!loaded && getItemContainer(this.actor.items, loaded) === this;
                    }
                } else {
                    const updated = await this._internalQuantityReload(currentCapacity, maxCapacity, capacityItem, newAmmunition);
                    reloaded = !!updated;
                }

                if (reloaded && originalContainer) {
                    ui.notifications.warn(game.i18n.format("SFRPG.ActorSheet.Inventory.Weapon.ReloadFromContainer", {name: this.name, ammoName: newAmmunition.name, containerName: originalContainer.name}), {permanent: true});
                }

            } else {
                ui.notifications.warn(game.i18n.format("SFRPG.ActorSheet.Inventory.Weapon.NoAmmunitionAvailable", {name: this.name}));
            }
        } else {
            if (this.type === "consumable") {
                await this.update({'system.uses.value': maxCapacity});
            } else {
                await this.update({'system.capacity.value': maxCapacity});
            }
            reloaded = true;
        }

        if (reloaded) {
            this._postReloadMessage();
            Hooks.callAll("itemReloaded", {actor: this.actor, item: this});
        }

        return reloaded;
    }

    _internalQuantityReload(currentCapacity, maxCapacity, capacityItem, newAmmunition) {
        const newQuantity = Math.min(currentCapacity + newAmmunition.getCurrentCapacity(), maxCapacity);
        const quantityToMove = newQuantity - currentCapacity;

        if (quantityToMove > 0) {
            const currentItemCapacity = newQuantity;
            const ammunitionItemCapacity = newAmmunition.getCurrentCapacity() - quantityToMove;

            const updates = [];
            if (capacityItem) {
                updates.push({_id: capacityItem.id, "system.quantity": currentItemCapacity});
            }

            if (newAmmunition && ammunitionItemCapacity > 0) {
                updates.push({_id: newAmmunition.id, "system.quantity": ammunitionItemCapacity});
            }

            const updatePromise = this.actor.updateEmbeddedDocuments("Item", updates);

            if (ammunitionItemCapacity <= 0) {
                updatePromise.then(() => {
                    this.actor.deleteEmbeddedDocuments("Item", [newAmmunition.id]);
                });
            }

            return updatePromise;
        }
    }

    _postReloadMessage() {

        // Render the chat card template
        const templateData = {
            actor: this.actor,
            item: this,
            tokenId: this.actor.token?.id,
            action: "SFRPG.ChatCard.ItemActivation.Reloads",
            cost: game.i18n.format("SFRPG.AbilityActivationTypesMove")
        };

        const template = `systems/sfrpg/templates/chat/item-action-card.hbs`;
        const renderPromise = foundry.applications.handlebars.renderTemplate(template, templateData);
        renderPromise.then((html) => {
            // Create the chat message
            const chatData = {
                style: CONST.CHAT_MESSAGE_STYLES.OTHER,
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                content: html
            };

            const rollMode = game.settings.get("core", "rollMode");
            ChatMessage.applyRollMode(chatData, rollMode);
            ChatMessage.create(chatData, { displaySheet: false });
        });

    }
};
