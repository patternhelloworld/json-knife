import Pattern from './pattern';
import ValidationError from './error-handler';
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
        //console.log(stepGapLength);
        stepGapLength = match[0].length;
    }

    return previousLastIndex - stepGapLength;
}

function calculateSteps(original, key) {

    let stepAreas = [];
    let keySteps = [];

    let rx = new RegExp('(?:' + Pattern.steps.withKey + ')|' +
        '(' + Pattern.commons.spaceOrEndBracketOrNot + '$)|' +
        '(?:' + Pattern.steps.withNoKey + ')', 'g');

    let idx = 0;
    let stepMilestone = null;
    let match = {};

    while ((match = rx.exec(original)) !== null) {

        /* Final Area to count steps */
        if(match[4]){

            //console.log('4 : ');
            //console.log(match);

            let step = idx > 0 ? stepAreas[idx - 1]['step'] : 0;

            step += (match[5].match(new RegExp(Pattern.steps.asc, "g")) || []).length;
            step -= (match[5].match(new RegExp(Pattern.steps.desc, "g")) || []).length;

            let previousLastIndex = null;

            if(match[6]) {
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
                key: null,
                noKey : match[0],
                etc : match,
                step:step,
                previousLastIndex: previousLastIndex
            });

            idx += 1;

            continue;
        }

        /* Array area */
        if (match[3]) {

            //console.log('3 : ');
            //console.log(match);

            if (key === stepAreas[stepAreas.length - 1].key) {

                keySteps.push(adjustPreviousLastIndex(match.index + match[3].length, match[3], stepAreas[stepAreas.length - 1].step));
                stepMilestone = null;
                break;
            }

            if (stepMilestone !== null) {

                keySteps.push(adjustPreviousLastIndex(match.index + match[3].length, match[3], stepMilestone));
                stepMilestone = null;
                break;
            }

            break;

        }

        /* Key area */

        //console.log('normal : ');
        //console.log(match);
        let step = idx > 0 ? stepAreas[idx - 1]['step'] : 0;

        let downArea = match[1].match(new RegExp('^' + Pattern.commons.spaceOrEndBracketOrNot, "g"))[0];
        let downAreaDescCnt = (match[1].match(new RegExp(Pattern.steps.desc, "g")) || []).length;

        step += (match[1].match(new RegExp(Pattern.steps.asc, "g")) || []).length;
        step -= downAreaDescCnt;


        let previousLastIndex = match.index + downArea.length;
        let stepGapLength = 0;

        if (stepMilestone >= step) {

            if (stepMilestone === step) {

                keySteps.push(previousLastIndex);
                stepMilestone = null;

            } else {

                keySteps.push(adjustPreviousLastIndex(previousLastIndex, downArea, stepMilestone - step));
                stepMilestone = null;
            }
        }

        if (key === match[2] && stepMilestone == null) {
            stepMilestone = step;
        }

        stepAreas.push({
            key: match[2],
            noKey : null,
            etc : match,
            step: step,
            previousLastIndex: previousLastIndex
        });

        idx += 1;
    }

    //console.log(stepAreas)

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
            aaa : match[matchedGroupNumber],
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

export default {

    getMaterials, sculpt
}