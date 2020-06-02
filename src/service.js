import Pattern from './pattern';
import Util from './util';


function getMatchedGroupNumber(match) {
    for (let a = 2; a < 8; a++) {
        if (match[a] !== undefined) {
            return a;
        }
    }
}

function adjustPreviousLastIndex(previousLastIndex, downArea, stepGapCnt) {

    let stepGapLength = 0;

    let rx = new RegExp(Pattern.steps.toNumberOfGap(stepGapCnt), '');
    let match = {};
    if ((match = rx.exec(downArea)) !== null) {
        stepGapLength = match[0].length;
        /*     console.log('previousLastIndex : ' + previousLastIndex);
             console.log('downArea : ' + downArea);
             console.log('stepGapCnt : ' + stepGapCnt);
             console.log('stepgapLEN : ' + stepGapLength);*/
    }


    return previousLastIndex - stepGapLength;
}





/*
*  match information
*
* 0 : as you are aware, match[0] is just the whole match
*
* 1~2 : withKey
*  1 : front of key
*  2 : only key
*
*  3 : final area (the very end of json, the final of the loop below, whole match)
*
* 4~7 : withNoKey
*  4 : whole match
*  5 : front of 'one value of array' - [[
*  6 : only down front of 'one value of array' - }]
*  7 : one value - "aaa", 5, true...
*  8 : {}, [] (empty object or array)

* */


function calculateSteps(original, key) {

    let stepAreas = [];
    let keySteps = [];

    let idx = 0;

    try {

        let rx = new RegExp('(?:' + Pattern.steps.withKey + ')|' +
            '(' + Pattern.commons.spaceOrEndBracketOrNot + '$)|' +
            '(?:' + Pattern.steps.withNoKey(true) + ')', 'g');

        let stepMilestone = null;
        let match = {};

        while ((match = rx.exec(original)) !== null) {

            let step = idx > 0 ? stepAreas[idx - 1]['step'] : 0;

            /* one value of array */
            if (match[4]) {

                //console.log('4 : ');
                //console.log(match);
                if (match[5]) {
                    step += (match[5].match(new RegExp(Pattern.steps.asc, "g")) || []).length;
                    step -= (match[5].match(new RegExp(Pattern.steps.desc, "g")) || []).length;
                }

                let previousLastIndex = null;

                if (match[6]) {
                    const downArea = match[6];
                    const downAreaLength = downArea.length;

                    previousLastIndex = match.index + downAreaLength;

                    if (stepMilestone >= step) {

                        if (stepMilestone === step) {

                            keySteps.push(previousLastIndex);
                            stepMilestone = null;

                        } else {

                            keySteps.push(adjustPreviousLastIndex(previousLastIndex, downArea, stepMilestone - step));
                            stepMilestone = null;
                        }
                    }
                }

                stepAreas.push({
                    step: step,
                    previousLastIndex: previousLastIndex,
                    key: null,
                    noKey: match[0],
                    debugInfo: match
                });

                idx += 1;

                continue;
            }

            /*  final area : all JSONs end at this point with the command 'break' */
            if (match[3]) {

                //console.log('3 : ');
                //console.log(match);
                let previousLastIndex = null;

                if (key === stepAreas[stepAreas.length - 1].key) {

                    previousLastIndex = match.index + match[3].length;

                    keySteps.push(adjustPreviousLastIndex(previousLastIndex, match[3], stepAreas[stepAreas.length - 1].step));
                    stepMilestone = null;
                }

                if (stepMilestone !== null) {

                    previousLastIndex = match.index + match[3].length;

                    keySteps.push(adjustPreviousLastIndex(previousLastIndex, match[3], stepMilestone));
                    stepMilestone = null;
                }

                const finalStep = step - (match[0].match(new RegExp(Pattern.steps.desc, "g")) || []).length;

                stepAreas.push({
                    step: finalStep,
                    previousLastIndex: previousLastIndex,
                    key: null,
                    noKey: null,
                    //debugInfo: match,
                });

                // Fail to calculate steps
                if (finalStep !== 0) {
                    throw new Error('The final step should be 0.')
                }

                break;

            }

            /* Key area */

            //console.log('normal : ');
            //console.log(match);

            let downArea = match[1].match(new RegExp('^' + Pattern.commons.spaceOrEndBracketOrNot, "g"))[0];
            let descCnt = (match[1].match(new RegExp(Pattern.steps.desc, "g")) || []).length;
            let ascCnt = (match[1].match(new RegExp(Pattern.steps.asc, "g")) || []).length;


            step += ascCnt;
            step -= descCnt;


            let previousLastIndex = match.index + downArea.length;
            let stepGapLength = 0;

            if (stepMilestone >= step) {

                if (stepMilestone === step) {

                    keySteps.push(previousLastIndex);
                    stepMilestone = null;

                } else {

                    keySteps.push(adjustPreviousLastIndex(previousLastIndex, downArea, stepMilestone - step + ascCnt));
                    stepMilestone = null;
                }
            }

            if (key === match[2] && stepMilestone == null) {
                stepMilestone = step;
            }

            stepAreas.push({
                step: step,
                previousLastIndex: previousLastIndex,
                key: match[2],
                noKey: null,
                //debugInfo: match
            });

            idx += 1;
        }

    }catch (e) {
        console.log('The error has occurred at idx : ' + idx)
        console.log(stepAreas)
        console.log(keySteps)
        throw e;
    }finally {
/*        console.log(stepAreas)
        console.log(keySteps)*/
    }


    return keySteps;
}


function getMaterials(original, key, value) {

    if (typeof value == "string") {
        value = '"' + value + '"';
    }

    let extractedAreas = [];

    let rx = new RegExp(Pattern.jsonOutput(Util.Text.escapeRegex(key)), 'g');

    let matches = [];
    let match = {};

    let calculateStepsDone = false;
    let keySteps = [];

    let idx = 0;
    while ((match = rx.exec(original)) !== null) {

        //console.log(match)

        const matchedKeyValue = match[0];

        const matchedGroupNumber = getMatchedGroupNumber(match);

        const newMatchedKeyValue = matchedKeyValue.replace(new RegExp(Util.Text.escapeRegex(match[matchedGroupNumber]) + '$'), value);

        const startIndex = match.index;
        let lastIndex = match.index + match[0].length;


        if (extractedAreas.find(x => x.startIndex < startIndex && x.lastIndex > startIndex)) {
            continue;
        }

        if (matchedGroupNumber === 5 || matchedGroupNumber === 6) {

            if (!calculateStepsDone) {

                keySteps = calculateSteps(original, key);
                calculateStepsDone = true;

            }
            lastIndex = keySteps[idx];

        }

        extractedAreas.push({
            value: value,
            //aaa : match[matchedGroupNumber],
            matchedKeyValue: matchedKeyValue,
            newMatchedKeyValue: newMatchedKeyValue,
            startIndex: startIndex,
            lastIndex: lastIndex,
        });

        idx += 1;
    }

    //console.log('※ getMaterials');
    //console.log(keySteps);
    //console.log(extractedAreas);

    return extractedAreas;
}

function sculpt(original, materials) {

    materials.reverse().forEach(function (val, idx) {
        original = Util.Text.replaceBetween(original, val.startIndex, val.lastIndex, val.newMatchedKeyValue);
    });

    return original;

}

/*
*  match information
*
* 0 : as you are aware, match[0] is just the whole match
*
* 1~3 : withKey
*  1 : front of key
*  2 : only key
*  3 : only value
*
*  4 : final area (the very end of json, the final of the loop below, whole match)
*
* 5~8 : withNoKey
*  5 : whole match
*  6 : front of 'one value of array' - [[
*  7 : only down front of 'one value of array' - }]
*  8 : one value - "aaa", 5, true...
*  9 : {}, [] (empty object or array)
*
* */

/**
 * Extract every single key and value and their meta data, which consists of 'step', 'order' and 'ancestors'.
 *
 * @param {string} original JSON string to parse.
 * @return {array} True if the DOM is a valid DOM node.
 * @internal
 */

function getAbsoluteKeyValueMetaData(original) {

    let stepAreas = [];
    let idx = 0;

    try {

        let rx = new RegExp('(?:' + Pattern.jsonOutput2() + ')|' +
            '(' + Pattern.commons.spaceOrEndBracketOrNot + '$)|' +
            '(?:' + Pattern.steps.withNoKey(true) + ')', 'g');

        let match = {};

        let ancestors = [];

        let previousKey = null;
        let previousStep = 0;

        // To get an order in an array, we use steps of array.
        // arrayStepStore.push(ancestors[ancestors.length - 1]['step']) means that the param below 'order' has been +1 increased, and the step value itself is used to remove ancestors of the current key or value's own.
        let arrayStepStore = [];

        let ancestorCandidateKey = null;
        let ancestorCandidateStep = 0;
        let ancestorCandidateValue = null;

        ancestors.push({key: 'ORIGIN', step: ancestorCandidateStep});

        while ((match = rx.exec(original)) !== null) {

            let step = previousStep;

            /* withNoKey */
            if (match[5]) {

                let order = null;

                if (match[6]) {
                    step += (match[6].match(new RegExp(Pattern.steps.asc, "g")) || []).length;
                    step -= (match[6].match(new RegExp(Pattern.steps.desc, "g")) || []).length;


                    //if (ancestors.length > 1) {
                    if (/,/.test(match[6])) {
                        // console.log('idx : ' + idx + ' / step : ' + ancestors[ancestors.length - 1]['step'])
                        arrayStepStore.push(ancestors[ancestors.length - 1]['step']);

                        order = arrayStepStore.filter(x => x === ancestors[ancestors.length - 1]['step']).length;
                        if (order === 0) {
                            order = null;
                        }
                    }
                    if (/\[/.test(match[6])) {

                        if (ancestorCandidateStep < step) {
                            // the previous ancestor is not fake, which means they had array or object values. If they had one string or number thing, they are fake ancestors.
                            if (ancestorCandidateValue == '') {
                                ancestors.push({key: ancestorCandidateKey, step: ancestorCandidateStep});
                            }
                        } else if (ancestorCandidateStep >= step) {
                            ancestors = ancestors.filter((x) => x.step < step);
                        }

                        arrayStepStore = arrayStepStore.filter(x => x !== ancestors[ancestors.length - 1]['step']);
                        arrayStepStore.push(ancestors[ancestors.length - 1]['step']);

                        order = 1;
                    }
               }

                stepAreas.push({
                    //   type: 'withNoKey',
                    step: step,
                    order: order,
                    key: null,
                    // match[9] : empty object or array
                    value: match[9] ? match[9] : match[8],
                    ancestors: [...ancestors],
                    //debugInfo: match
                });

                previousStep = step;
                previousKey = null;


                /*  final area : all JSONs end at this point with the command 'break' */
            } else if (match[4]) {

                if (idx === 0) {
                    stepAreas.push({
                        step: null,
                        order: null,
                        key: null,
                        value: null,
                        ancestors: null,
                        etc: original,
                        //debugInfo: match
                    });

                    break;
                }

                const finalStep = step - (match[0].match(new RegExp(Pattern.steps.desc, "g")) || []).length;

                stepAreas.push({
                    //   type: 'final',
                    step: finalStep,
                    order: null,
                    key: null,
                    value: null,
                    ancestors: null,
                    etc: match[4]
                    //debugInfo: match
                });

                // Fail to calculate steps
                if (finalStep !== 0) {
                    throw new Error('The final step should be 0.')
                }

                break;

                /* withKey */
            } else {

                let order = null;

                step += (match[1].match(new RegExp(Pattern.steps.asc, "g")) || []).length;
                step -= (match[1].match(new RegExp(Pattern.steps.desc, "g")) || []).length;

                if (ancestorCandidateStep < step) {
                    // the previous ancestor is not fake, which means they had array or object values. If they had one string or number thing, they are fake ancestors.
                    if (ancestorCandidateValue == '') {
                        ancestors.push({
                            key: ancestorCandidateKey,
                            step: ancestorCandidateStep
                        });
                    }
                } else if (ancestorCandidateStep >= step) {
                    ancestors = ancestors.filter((x) => x.step < step);
                }

                //    if (ancestors.length > 0) {
                if (/,/.test(match[1])) {

                    if (/{/.test(match[1])) {
                        arrayStepStore.push(ancestors[ancestors.length - 1]['step']);
                    }
                    order = arrayStepStore.filter(x => x === ancestors[ancestors.length - 1]['step']).length;
                    if (order === 0) {
                        order = null;
                    }
                }
                if (/\[/.test(match[1])) {

                    arrayStepStore = arrayStepStore.filter(x => x !== ancestors[ancestors.length - 1]['step']);
                    arrayStepStore.push(ancestors[ancestors.length - 1]['step']);

                    if (/,/.test(match[1])) {
                        arrayStepStore.push(ancestors[ancestors.length - 1]['step']);
                        order = arrayStepStore.filter(x => x === ancestors[ancestors.length - 1]['step']).length;
                    } else {
                        order = 1;
                    }

                }
                //    }

                stepAreas.push({
                    // type: 'withKey',
                    step: step,
                    order: order,
                    key: match[2],
                    value: match[3],
                    ancestors: [...ancestors],
                    //debugInfo: match
                });

                previousStep = step;
                previousKey = match[2];

                ancestorCandidateStep = previousStep;
                ancestorCandidateKey = previousKey;
                ancestorCandidateValue = match[3];
            }

            idx += 1;
        }
    }catch (e) {
        console.log('The error has occurred at idx : ' + idx)
        console.log(stepAreas);
        throw e;
    }finally {
        //console.log(stepAreas);
    }

    return stepAreas;
}

function arraysEqual(a, b) {
    a = Array.isArray(a) ? a : [];
    b = Array.isArray(b) ? b : [];
    return a.length === b.length && a.every((el, ix) => el === b[ix]);
}

function s(x, y) {
    var pre = ['string', 'number', 'bool']
    if (typeof x !== typeof y) return pre.indexOf(typeof y) - pre.indexOf(typeof x);

    if (x === y) return 0;
    else return (x > y) ? 1 : -1;

}

function deepCompare(original, original2) {

    const keySteps = getAbsoluteKeyValueMetaData(original).map((x) => JSON.stringify(x)).sort(s);
    const keySteps2 = getAbsoluteKeyValueMetaData(original2).map((x) => JSON.stringify(x)).sort(s);

    return arraysEqual(keySteps, keySteps2)
}


export default {

    getMaterials, sculpt, deepCompare
}