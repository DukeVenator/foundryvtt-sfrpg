import FloatingNumberMenu from "../classes/floating-number-menu.js";
import { SFRPG } from "../config.js";
import { ItemSFRPG } from "../item/item.js";
import { rerenderApps } from "../utils/utilities.js";

export const registerSystemSettings = function() {
    game.settings.register("sfrpg", "chatNotificationDuration", {
        name: "SFRPG.Settings.ChatNotificationDuration.Name",
        hint: "SFRPG.Settings.ChatNotificationDuration.Hint",
        scope: "client",
        config: true,
        default: 5000,
        type: Number,
        range: {
            min: 1000,
            max: 60000,
            step: 1000
        },
        onChange: (value) => CONFIG.ui.chat.NOTIFY_DURATION = value
    });

    game.settings.register("sfrpg", "disableExperienceTracking", {
        name: "SFRPG.Settings.ExperienceTracking.Name",
        hint: "SFRPG.Settings.ExperienceTracking.Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("sfrpg", "useAdvantageDisadvantage", {
        name: "SFRPG.Settings.Advantage.Name",
        hint: "SFRPG.Settings.Advantage.Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("sfrpg", "decimalSpeed", {
        name: "SFRPG.Settings.DecimalSpeed.Name",
        hint: "SFRPG.Settings.DecimalSpeed.Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });
    game.settings.register("sfrpg", "autoCollapseItemCards", {
        name: "SFRPG.Settings.AutoCollapseCard.Name",
        hint: "SFRPG.Settings.AutoCollapseCard.Hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => {
            ui.chat.render();
        }
    });

    game.settings.register("sfrpg", "worldSchemaVersion", {
        name: "SFRPG.Settings.WorldSchemaVersion.Name",
        hint: "SFRPG.Settings.WorldSchemaVersion.Hint",
        scope: "world",
        config: false,
        default: 0,
        type: Number
    });

    game.settings.register("sfrpg", "useCustomChatCards", {
        name: "SFRPG.Settings.UseCustomChatCard.Name",
        hint: "SFRPG.Settings.UseCustomChatCard.Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("sfrpg", "autoAddUnarmedStrike", {
        name: "SFRPG.Settings.AutoAddUnarmedStrike.Name",
        hint: "SFRPG.Settings.AutoAddUnarmedStrike.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "useQuickRollAsDefault", {
        name: "SFRPG.Settings.UseQuickRollAsDefault.Name",
        hint: "SFRPG.Settings.UseQuickRollAsDefault.Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("sfrpg", "useInitiativeTiebreaker", {
        name: "SFRPG.Settings.CombatTiebreaker.Name",
        hint: "SFRPG.Settings.CombatTiebreaker.Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("sfrpg", "scalingCantrips", {
        name: "SFRPG.Settings.ScalingCantrips.Name",
        hint: "SFRPG.Settings.ScalingCantrips.Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: (value) => ItemSFRPG._onScalingCantripsSettingChanges(value)
    });

    game.settings.register("sfrpg", "autoRollCritEffect", {
        name: "SFRPG.Settings.AutoRollCritEffect.Name",
        hint: "SFRPG.Settings.AutoRollCritEffect.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "hideHostileStarshipCrit", {
        name: "SFRPG.Settings.HideHostileStarshipCrit.Name",
        hint: "SFRPG.Settings.HideHostileStarshipCrit.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "difficultyDisplay", {
        name: "SFRPG.Settings.DifficultyDisplay.Name",
        hint: "SFRPG.Settings.DifficultyDisplay.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
        onChange: () => ui.combat.render(false)
    });

    for (const combatType of SFRPG.combatTypes) {
        const capitalizedCombatType = combatType[0].toUpperCase() + combatType.slice(1);
        game.settings.register("sfrpg", `${combatType}ChatCards`, {
            name: `SFRPG.Settings.CombatCards.${capitalizedCombatType}Name`,
            hint: `SFRPG.Settings.CombatCards.${capitalizedCombatType}Hint`,
            scope: "world",
            config: true,
            default: "enabled",
            type: String,
            choices: {
                "enabled": "SFRPG.Settings.CombatCards.Values.Enabled",
                "roundsPhases": "SFRPG.Settings.CombatCards.Values.RoundsPhases",
                "roundsTurns": "SFRPG.Settings.CombatCards.Values.RoundsTurns",
                "roundsOnly": "SFRPG.Settings.CombatCards.Values.OnlyRounds",
                "disabled": "SFRPG.Settings.CombatCards.Values.Disabled"
            }
        });
    }

    game.settings.register("sfrpg", "starshipActionsSource", {
        name: "SFRPG.Settings.StarshipActionsSource.Name",
        hint: "SFRPG.Settings.StarshipActionsSource.Hint",
        scope: "world",
        config: true,
        default: "sfrpg.starship-actions",
        type: String
    });

    game.settings.register("sfrpg", "starshipActionsCrit", {
        name: "SFRPG.Settings.StarshipActionsCrit.Name",
        hint: "SFRPG.Settings.StarshipActionsCrit.Hint",
        scope: "world",
        config: true,
        default: "critOnly",
        type: String,
        choices: {
            "never": "SFRPG.Settings.StarshipActionsCrit.Values.Never",
            "critOnly": "SFRPG.Settings.StarshipActionsCrit.Values.CritOnly",
            "always": "SFRPG.Settings.StarshipActionsCrit.Values.Always"
        }
    });

    game.settings.register("sfrpg", "enableGalacticTrade", {
        name: "SFRPG.Settings.GalacticTrade.Name",
        hint: "SFRPG.Settings.GalacticTrade.Hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("sfrpg", "rollDamageWithAttack", {
        name: "SFRPG.Settings.DamageWithAttack.Name",
        hint: "SFRPG.Settings.DamageWithAttack.Hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("sfrpg", "damageRoundingAdvantage", {
        name: "SFRPG.Settings.DamageRoundingAdvantage.Name",
        hint: "SFRPG.Settings.DamageRoundingAdvantage.Hint",
        scope: "world",
        config: true,
        default: "defender",
        type: String,
        choices: {
            "attacker": "SFRPG.Settings.DamageRoundingAdvantage.ValueAttacker",
            "defender": "SFRPG.Settings.DamageRoundingAdvantage.ValueDefender"
        }
    });

    game.settings.register("sfrpg", "alwaysShowQuantity", {
        name: "SFRPG.Settings.AlwaysShowQuantity.Name",
        hint: "SFRPG.Settings.AlwaysShowQuantity.Hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => rerenderApps()
    });

    game.settings.register("sfrpg", "warnInvalidRollData", {
        name: "SFRPG.Settings.WarnInvalidRollData.Name",
        hint: "SFRPG.Settings.WarnInvalidRollData.Hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenConditionLabels", {
        name: "SFRPG.Settings.TokenConditionLabels.Name",
        hint: "SFRPG.Settings.TokenConditionLabels.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "sfrpgTheme", {
        name: "SFRPG.Settings.SFRPGTheme.Name",
        hint: "SFRPG.Settings.SFRPGTheme.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean,
        onChange: reloadPage
    });

    game.settings.register("sfrpg", "darkMode", {
        name: "SFRPG.Settings.DarkMode.Name",
        hint: "SFRPG.Settings.DarkMode.Hint",
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: () => {
            const darkMode = game.settings.get("sfrpg", "darkMode");
            document.body.classList.toggle("dark-mode", darkMode);
        }
    });

    game.settings.register("sfrpg", "diceRollChat", {
        name: "SFRPG.Settings.DiceRollChat.Name",
        hint: "SFRPG.Settings.DiceRollChat.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showRollResults", {
        name: "SFRPG.Settings.ShowRollResults.Name",
        hint: "SFRPG.Settings.ShowRollResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showDamageRolls", {
        name: "SFRPG.Settings.ShowDamageRolls.Name",
        hint: "SFRPG.Settings.ShowDamageRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showAbilityRolls", {
        name: "SFRPG.Settings.ShowAbilityRolls.Name",
        hint: "SFRPG.Settings.ShowAbilityRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showSkillRolls", {
        name: "SFRPG.Settings.ShowSkillRolls.Name",
        hint: "SFRPG.Settings.ShowSkillRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showSaveRolls", {
        name: "SFRPG.Settings.ShowSaveRolls.Name",
        hint: "SFRPG.Settings.ShowSaveRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showDeathSaveRolls", {
        name: "SFRPG.Settings.ShowDeathSaveRolls.Name",
        hint: "SFRPG.Settings.ShowDeathSaveRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showHealingRolls", {
        name: "SFRPG.Settings.ShowHealingRolls.Name",
        hint: "SFRPG.Settings.ShowHealingRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showResourceRolls", {
        name: "SFRPG.Settings.ShowResourceRolls.Name",
        hint: "SFRPG.Settings.ShowResourceRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showStarshipRolls", {
        name: "SFRPG.Settings.ShowStarshipRolls.Name",
        hint: "SFRPG.Settings.ShowStarshipRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showWeaponRolls", {
        name: "SFRPG.Settings.ShowWeaponRolls.Name",
        hint: "SFRPG.Settings.ShowWeaponRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showMiscRolls", {
        name: "SFRPG.Settings.ShowMiscRolls.Name",
        hint: "SFRPG.Settings.ShowMiscRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showChatCardRolls", {
        name: "SFRPG.Settings.ShowChatCardRolls.Name",
        hint: "SFRPG.Settings.ShowChatCardRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showTokenActionRolls", {
        name: "SFRPG.Settings.ShowTokenActionRolls.Name",
        hint: "SFRPG.Settings.ShowTokenActionRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showStarshipActionRolls", {
        name: "SFRPG.Settings.ShowStarshipActionRolls.Name",
        hint: "SFRPG.Settings.ShowStarshipActionRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showDamageTypeRolls", {
        name: "SFRPG.Settings.ShowDamageTypeRolls.Name",
        hint: "SFRPG.Settings.ShowDamageTypeRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showCriticalRolls", {
        name: "SFRPG.Settings.ShowCriticalRolls.Name",
        hint: "SFRPG.Settings.ShowCriticalRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showFumbleRolls", {
        name: "SFRPG.Settings.ShowFumbleRolls.Name",
        hint: "SFRPG.Settings.ShowFumbleRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showRecoveryRolls", {
        name: "SFRPG.Settings.ShowRecoveryRolls.Name",
        hint: "SFRPG.Settings.ShowRecoveryRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showAbilityCheckRolls", {
        name: "SFRPG.Settings.ShowAbilityCheckRolls.Name",
        hint: "SFRPG.Settings.ShowAbilityCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showSkillCheckRolls", {
        name: "SFRPG.Settings.ShowSkillCheckRolls.Name",
        hint: "SFRPG.Settings.ShowSkillCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showSaveCheckRolls", {
        name: "SFRPG.Settings.ShowSaveCheckRolls.Name",
        hint: "SFRPG.Settings.ShowSaveCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showDeathSaveCheckRolls", {
        name: "SFRPG.Settings.ShowDeathSaveCheckRolls.Name",
        hint: "SFRPG.Settings.ShowDeathSaveCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showHealingCheckRolls", {
        name: "SFRPG.Settings.ShowHealingCheckRolls.Name",
        hint: "SFRPG.Settings.ShowHealingCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showResourceCheckRolls", {
        name: "SFRPG.Settings.ShowResourceCheckRolls.Name",
        hint: "SFRPG.Settings.ShowResourceCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showStarshipCheckRolls", {
        name: "SFRPG.Settings.ShowStarshipCheckRolls.Name",
        hint: "SFRPG.Settings.ShowStarshipCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showWeaponCheckRolls", {
        name: "SFRPG.Settings.ShowWeaponCheckRolls.Name",
        hint: "SFRPG.Settings.ShowWeaponCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showMiscCheckRolls", {
        name: "SFRPG.Settings.ShowMiscCheckRolls.Name",
        hint: "SFRPG.Settings.ShowMiscCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showChatCardCheckRolls", {
        name: "SFRPG.Settings.ShowChatCardCheckRolls.Name",
        hint: "SFRPG.Settings.ShowChatCardCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showTokenActionCheckRolls", {
        name: "SFRPG.Settings.ShowTokenActionCheckRolls.Name",
        hint: "SFRPG.Settings.ShowTokenActionCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showStarshipActionCheckRolls", {
        name: "SFRPG.Settings.ShowStarshipActionCheckRolls.Name",
        hint: "SFRPG.Settings.ShowStarshipActionCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showDamageTypeCheckRolls", {
        name: "SFRPG.Settings.ShowDamageTypeCheckRolls.Name",
        hint: "SFRPG.Settings.ShowDamageTypeCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showCriticalCheckRolls", {
        name: "SFRPG.Settings.ShowCriticalCheckRolls.Name",
        hint: "SFRPG.Settings.ShowCriticalCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showFumbleCheckRolls", {
        name: "SFRPG.Settings.ShowFumbleCheckRolls.Name",
        hint: "SFRPG.Settings.ShowFumbleCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showRecoveryCheckRolls", {
        name: "SFRPG.Settings.ShowRecoveryCheckRolls.Name",
        hint: "SFRPG.Settings.ShowRecoveryCheckRolls.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showAbilityCheckResults", {
        name: "SFRPG.Settings.ShowAbilityCheckResults.Name",
        hint: "SFRPG.Settings.ShowAbilityCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showSkillCheckResults", {
        name: "SFRPG.Settings.ShowSkillCheckResults.Name",
        hint: "SFRPG.Settings.ShowSkillCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showSaveCheckResults", {
        name: "SFRPG.Settings.ShowSaveCheckResults.Name",
        hint: "SFRPG.Settings.ShowSaveCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showDeathSaveCheckResults", {
        name: "SFRPG.Settings.ShowDeathSaveCheckResults.Name",
        hint: "SFRPG.Settings.ShowDeathSaveCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showHealingCheckResults", {
        name: "SFRPG.Settings.ShowHealingCheckResults.Name",
        hint: "SFRPG.Settings.ShowHealingCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showResourceCheckResults", {
        name: "SFRPG.Settings.ShowResourceCheckResults.Name",
        hint: "SFRPG.Settings.ShowResourceCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showStarshipCheckResults", {
        name: "SFRPG.Settings.ShowStarshipCheckResults.Name",
        hint: "SFRPG.Settings.ShowStarshipCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showWeaponCheckResults", {
        name: "SFRPG.Settings.ShowWeaponCheckResults.Name",
        hint: "SFRPG.Settings.ShowWeaponCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showMiscCheckResults", {
        name: "SFRPG.Settings.ShowMiscCheckResults.Name",
        hint: "SFRPG.Settings.ShowMiscCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showChatCardCheckResults", {
        name: "SFRPG.Settings.ShowChatCardCheckResults.Name",
        hint: "SFRPG.Settings.ShowChatCardCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showTokenActionCheckResults", {
        name: "SFRPG.Settings.ShowTokenActionCheckResults.Name",
        hint: "SFRPG.Settings.ShowTokenActionCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showStarshipActionCheckResults", {
        name: "SFRPG.Settings.ShowStarshipActionCheckResults.Name",
        hint: "SFRPG.Settings.ShowStarshipActionCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showDamageTypeCheckResults", {
        name: "SFRPG.Settings.ShowDamageTypeCheckResults.Name",
        hint: "SFRPG.Settings.ShowDamageTypeCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showCriticalCheckResults", {
        name: "SFRPG.Settings.ShowCriticalCheckResults.Name",
        hint: "SFRPG.Settings.ShowCriticalCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showFumbleCheckResults", {
        name: "SFRPG.Settings.ShowFumbleCheckResults.Name",
        hint: "SFRPG.Settings.ShowFumbleCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "showRecoveryCheckResults", {
        name: "SFRPG.Settings.ShowRecoveryCheckResults.Name",
        hint: "SFRPG.Settings.ShowRecoveryCheckResults.Hint",
        scope: "client",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenVision", {
        name: "SFRPG.Settings.TokenVision.Name",
        hint: "SFRPG.Settings.TokenVision.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffects", {
        name: "SFRPG.Settings.TokenMagicEffects.Name",
        hint: "SFRPG.Settings.TokenMagicEffects.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsPassive", {
        name: "SFRPG.Settings.TokenMagicEffectsPassive.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsPassive.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsActive", {
        name: "SFRPG.Settings.TokenMagicEffectsActive.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsActive.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSelf", {
        name: "SFRPG.Settings.TokenMagicEffectsSelf.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSelf.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOthers", {
        name: "SFRPG.Settings.TokenMagicEffectsOthers.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOthers.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCombat", {
        name: "SFRPG.Settings.TokenMagicEffectsCombat.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCombat.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsNonCombat", {
        name: "SFRPG.Settings.TokenMagicEffectsNonCombat.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsNonCombat.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsAll", {
        name: "SFRPG.Settings.TokenMagicEffectsAll.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsAll.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsNone", {
        name: "SFRPG.Settings.TokenMagicEffectsNone.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsNone.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsLimited", {
        name: "SFRPG.Settings.TokenMagicEffectsLimited.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsLimited.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCustom", {
        name: "SFRPG.Settings.TokenMagicEffectsCustom.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCustom.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsAuto", {
        name: "SFRPG.Settings.TokenMagicEffectsAuto.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsAuto.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsManual", {
        name: "SFRPG.Settings.TokenMagicEffectsManual.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsManual.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsToggle", {
        name: "SFRPG.Settings.TokenMagicEffectsToggle.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsToggle.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsReset", {
        name: "SFRPG.Settings.TokenMagicEffectsReset.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsReset.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSave", {
        name: "SFRPG.Settings.TokenMagicEffectsSave.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSave.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsLoad", {
        name: "SFRPG.Settings.TokenMagicEffectsLoad.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsLoad.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnload", {
        name: "SFRPG.Settings.TokenMagicEffectsUnload.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnload.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDelete", {
        name: "SFRPG.Settings.TokenMagicEffectsDelete.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDelete.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCreate", {
        name: "SFRPG.Settings.TokenMagicEffectsCreate.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCreate.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUpdate", {
        name: "SFRPG.Settings.TokenMagicEffectsUpdate.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUpdate.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsPatch", {
        name: "SFRPG.Settings.TokenMagicEffectsPatch.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsPatch.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsMerge", {
        name: "SFRPG.Settings.TokenMagicEffectsMerge.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsMerge.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSplit", {
        name: "SFRPG.Settings.TokenMagicEffectsSplit.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSplit.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCombine", {
        name: "SFRPG.Settings.TokenMagicEffectsCombine.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCombine.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSeparate", {
        name: "SFRPG.Settings.TokenMagicEffectsSeparate.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSeparate.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsFlatten", {
        name: "SFRPG.Settings.TokenMagicEffectsFlatten.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsFlatten.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnpack", {
        name: "SFRPG.Settings.TokenMagicEffectsUnpack.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnpack.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsPack", {
        name: "SFRPG.Settings.TokenMagicEffectsPack.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsPack.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsWrap", {
        name: "SFRPG.Settings.TokenMagicEffectsWrap.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsWrap.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnwrap", {
        name: "SFRPG.Settings.TokenMagicEffectsUnwrap.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnwrap.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsReverse", {
        name: "SFRPG.Settings.TokenMagicEffectsReverse.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsReverse.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsForward", {
        name: "SFRPG.Settings.TokenMagicEffectsForward.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsForward.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBackward", {
        name: "SFRPG.Settings.TokenMagicEffectsBackward.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBackward.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUp", {
        name: "SFRPG.Settings.TokenMagicEffectsUp.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUp.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDown", {
        name: "SFRPG.Settings.TokenMagicEffectsDown.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDown.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsLeft", {
        name: "SFRPG.Settings.TokenMagicEffectsLeft.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsLeft.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsRight", {
        name: "SFRPG.Settings.TokenMagicEffectsRight.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsRight.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCenter", {
        name: "SFRPG.Settings.TokenMagicEffectsCenter.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCenter.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsMiddle", {
        name: "SFRPG.Settings.TokenMagicEffectsMiddle.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsMiddle.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsTop", {
        name: "SFRPG.Settings.TokenMagicEffectsTop.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsTop.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBottom", {
        name: "SFRPG.Settings.TokenMagicEffectsBottom.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBottom.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsFront", {
        name: "SFRPG.Settings.TokenMagicEffectsFront.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsFront.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBack", {
        name: "SFRPG.Settings.TokenMagicEffectsBack.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBack.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsIn", {
        name: "SFRPG.Settings.TokenMagicEffectsIn.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsIn.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOut", {
        name: "SFRPG.Settings.TokenMagicEffectsOut.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOut.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOn", {
        name: "SFRPG.Settings.TokenMagicEffectsOn.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOn.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOff", {
        name: "SFRPG.Settings.TokenMagicEffectsOff.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOff.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsEnable", {
        name: "SFRPG.Settings.TokenMagicEffectsEnable.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsEnable.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDisable", {
        name: "SFRPG.Settings.TokenMagicEffectsDisable.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDisable.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsShow", {
        name: "SFRPG.Settings.TokenMagicEffectsShow.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsShow.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsHide", {
        name: "SFRPG.Settings.TokenMagicEffectsHide.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsHide.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsShowHide", {
        name: "SFRPG.Settings.TokenMagicEffectsShowHide.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsShowHide.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsToggleVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsToggleVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsToggleVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsResetVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsResetVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsResetVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSaveVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSaveVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSaveVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsLoadVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsLoadVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsLoadVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnloadVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUnloadVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnloadVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDeleteVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsDeleteVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDeleteVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCreateVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsCreateVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCreateVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUpdateVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUpdateVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUpdateVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsPatchVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsPatchVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsPatchVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsMergeVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsMergeVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsMergeVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSplitVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSplitVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSplitVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCombineVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsCombineVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCombineVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSeparateVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSeparateVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSeparateVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsFlattenVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsFlattenVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsFlattenVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnpackVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUnpackVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnpackVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsPackVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsPackVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsPackVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsWrapVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsWrapVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsWrapVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnwrapVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUnwrapVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnwrapVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsReverseVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsReverseVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsReverseVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsForwardVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsForwardVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsForwardVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBackwardVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsBackwardVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBackwardVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUpVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUpVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUpVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDownVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsDownVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDownVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsLeftVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsLeftVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsLeftVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsRightVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsRightVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsRightVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCenterVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsCenterVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCenterVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsMiddleVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsMiddleVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsMiddleVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsTopVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsTopVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsTopVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBottomVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsBottomVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBottomVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsFrontVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsFrontVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsFrontVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBackVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsBackVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBackVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsInVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsInVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsInVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOutVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsOutVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOutVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOnVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsOnVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOnVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOffVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsOffVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOffVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsEnableVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsEnableVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsEnableVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDisableVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsDisableVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDisableVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsShowVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsShowVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsShowVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsHideVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsHideVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsHideVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsShowHideVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsShowHideVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsShowHideVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsToggleVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsToggleVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsToggleVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsResetVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsResetVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsResetVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSaveVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSaveVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSaveVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsLoadVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsLoadVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsLoadVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnloadVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUnloadVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnloadVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDeleteVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsDeleteVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDeleteVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCreateVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsCreateVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCreateVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUpdateVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUpdateVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUpdateVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsPatchVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsPatchVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsPatchVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsMergeVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsMergeVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsMergeVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSplitVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSplitVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSplitVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCombineVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsCombineVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCombineVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSeparateVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSeparateVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSeparateVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsFlattenVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsFlattenVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsFlattenVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnpackVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUnpackVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnpackVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsPackVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsPackVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsPackVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsWrapVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsWrapVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsWrapVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnwrapVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUnwrapVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnwrapVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsReverseVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsReverseVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsReverseVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsForwardVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsForwardVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsForwardVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBackwardVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsBackwardVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBackwardVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUpVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUpVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUpVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDownVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsDownVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDownVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsLeftVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsLeftVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsLeftVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsRightVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsRightVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsRightVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCenterVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsCenterVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCenterVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsMiddleVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsMiddleVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsMiddleVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsTopVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsTopVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsTopVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBottomVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsBottomVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBottomVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsFrontVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsFrontVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsFrontVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsBackVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsBackVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsBackVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsInVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsInVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsInVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOutVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsOutVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOutVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOnVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsOnVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOnVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsOffVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsOffVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsOffVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsEnableVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsEnableVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsEnableVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDisableVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsDisableVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDisableVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsShowVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsShowVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsShowVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsHideVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsHideVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsHideVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsShowHideVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsShowHideVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsShowHideVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsToggleVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsToggleVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsToggleVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsResetVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsResetVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsResetVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSaveVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSaveVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSaveVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsLoadVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsLoadVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsLoadVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnloadVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUnloadVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnloadVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsDeleteVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsDeleteVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsDeleteVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCreateVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsCreateVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCreateVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUpdateVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUpdateVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUpdateVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsPatchVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsPatchVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsPatchVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsMergeVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsMergeVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsMergeVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSplitVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSplitVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSplitVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsCombineVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsCombineVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsCombineVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsSeparateVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsSeparateVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsSeparateVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsFlattenVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsFlattenVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsFlattenVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });

    game.settings.register("sfrpg", "tokenMagicEffectsUnpackVisibilityVisibilityVisibility", {
        name: "SFRPG.Settings.TokenMagicEffectsUnpackVisibilityVisibilityVisibility.Name",
        hint: "SFRPG.Settings.TokenMagicEffectsUnpackVisibilityVisibilityVisibility.Hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });
};