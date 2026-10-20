import SFRPGItemBase from './base-item.mjs';

export default class SFRPGItemQuest extends SFRPGItemBase {

    static LOCALIZATION_PREFIXES = [
        'SFRPG.Item.Base',
        'SFRPG.Item.Quest'
    ];

    static defineSchema() {
        const schema = super.defineSchema();

        foundry.utils.mergeObject(schema, {
            ...SFRPGItemBase.physicalItemTemplate()
        });

        return schema;
    }
}
