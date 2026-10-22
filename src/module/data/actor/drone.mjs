import SFRPGActorBase from "./base-actor.mjs";

const { fields } = foundry.data;

/**
 * Older drone sheets stored the owner as free text, often with a UUID link pasted in.
 * Foundry's document UUID field only accepts an Actor UUID.
 * @param {string|null} owner
 * @returns {string|null}
 */
export function resolveLegacyDroneOwner(owner) {
    if (typeof owner !== "string") return owner ?? null;
    const trimmed = owner.trim();
    if (!trimmed) return null;

    const linked = trimmed.match(/@UUID\[(Actor\.[A-Za-z0-9]{16})\]/);
    if (linked) return linked[1];

    const parsed = foundry.utils.parseUuid(trimmed);
    const documentId = parsed?.documentId ?? "";
    if (parsed?.type === "Actor" && !parsed.embedded?.length && /^[A-Za-z0-9]{16}$/.test(documentId)) {
        return trimmed;
    }

    return null;
}

export default class SFRPGActorDrone extends SFRPGActorBase {
    /** @inheritDoc */
    static migrateData(data) {
        if (typeof data.details?.owner === "string") {
            const uuid = resolveLegacyDroneOwner(data.details.owner);
            if (uuid) data.details.owner = uuid;
        }
        return super.migrateData(data);
    }

    static defineSchema() {
        const schema = super.defineSchema();

        // merge schema with templates
        foundry.utils.mergeObject(schema, {
            ...SFRPGActorBase.commonTemplate({actorType: "drone"}),
            ...SFRPGActorBase.conditionsTemplate()
        });

        // Add additional fields needed to template fields
        foundry.utils.mergeObject(schema.attributes.fields, {
            rp: new fields.SchemaField({
                max: new fields.NumberField({ // doesn't need to be here for actors, but token resource bars not functional without storing this
                    initial: 0,
                    min: 0,
                    integer: true,
                    nullable: false,
                    required: true
                }),
                value: new fields.NumberField({
                    initial: 0,
                    min: 0,
                    integer: true,
                    nullable: false,
                    required: true
                })
            }, {label: "SFRPG.Resolve"})
        });

        foundry.utils.mergeObject(schema.attributes.fields.hp.fields, {
            tempmax: new fields.NumberField({
                initial: null,
                min: 0,
                integer: true,
                nullable: true,
                required: true
            })
        });

        foundry.utils.mergeObject(schema, {
            traits: new fields.SchemaField({
                spellResistance: new fields.SchemaField({ // TODO: collate this and 'sr' into one field
                    base: new fields.NumberField({
                        initial: 0,
                        integer: true,
                        nullable: true,
                        required: true
                    })
                }, {label: "SFRPG.SpellResistance"}),
                weaponProf: new fields.SchemaField(SFRPGActorBase._traitFieldData(), {label: "SFRPG.TraitWeaponProf"})
            })
        });

        foundry.utils.mergeObject(schema.details.fields, {
            owner: new fields.DocumentUUIDField({
                type: "Actor",
                initial: null,
                nullable: true
            })
        });

        // Edit initial values as needed
        schema.skills.initial.acr.enabled = true;
        schema.skills.initial.ath.enabled = true;
        schema.skills.initial.com.enabled = true;
        schema.skills.initial.eng.enabled = true;
        schema.skills.initial.per.enabled = true;
        schema.skills.initial.ste.enabled = true;

        return schema;
    }
}
