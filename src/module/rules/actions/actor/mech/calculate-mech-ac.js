import Engine from "../../../../engine/engine.js";
import { SFRPG } from "../../../../config.js";

/**
 * Calculate a mechs EAC and KAC.
 *
 * @param {Engine} engine The SFRPG rules engine.
 */
export default function(engine) {
    engine.closures.add('calculateMechAc', (fact, context) => {
        const data = fact.data;
        console.log("Mech AC Calculation: data", data);
        const frame = fact.mechFrame;
        console.log("Mech AC Calculation: frame", frame);
        const upperLimbs = fact.mechUpperLimbs;
        console.log("Mech AC Calculation: upperLimbs", upperLimbs);
        const lowerLimbs = fact.mechLowerLimbs;
        console.log("Mech AC Calculation: lowerLimbs", lowerLimbs);
        const tier = data?.details?.tier || 0;
        console.log("Mech AC Calculation: tier", tier);
        const baseAc = SFRPG.mechStatisticsByTier[tier].baseAc;
        console.log("Mech AC Calculation: baseAc", baseAc);

        data.attributes.eac.value = baseAc + (frame?.eac ?? 0) + (upperLimbs?.eac ?? 0) + (lowerLimbs?.eac ?? 0);
        data.attributes.kac.value = baseAc + (frame?.kac ?? 0) + (upperLimbs?.kac ?? 0) + (lowerLimbs?.kac ?? 0);

        return fact;
    });
}
