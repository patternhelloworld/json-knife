import Util from './util';

const commons = {

    spaceOrNot: '[\\n\\r\\t\\s]*',
    spaceOrNotOrComma: '[,\\n\\r\\t\\s]*',
    spaceOrBigStartBracketOrNot: '[\\[\\n\\r\\t\\s]*',
    spaceOrStartBracketOrNot: '[\\[{\\n\\r\\t\\s]*',
    spaceOrEndBracketOrNot: '[}\\]\\n\\r\\t\\s]*',
    everything: '(?:.|[\\n\\r\\t\\s])'

}

const jsonBase = {

    // key starts with two patterns (1) {"key":  (2) ,"key" :
    key(k = null) {
        if (k) {
            return '[,{]' +
                commons.spaceOrNot +
                '"(' + k + ')"' +
                commons.spaceOrNot +
                ':' +
                commons.spaceOrNot;
        } else {
            return '[,{]' +
                commons.spaceOrNot +
                jsonBase.keyType +
                commons.spaceOrNot +
                ':' +
                commons.spaceOrNot;
        }
    },


    //keyType : '"((?:[^"\\\\]|\\\\"|\\\\[^"])*)"',
    keyType: '"((?:[^"]*?[^\\u005C])|(?:(?=[^"]*[\\u005C]").*?[^\\u005C]))"',

    valueType: {
        // 2
        string: '(""|".*?[^\\u005C]")',
        // 3
        //number: '([-+]?(?:\\d+\\.?\\d*|\\d*\.?\\d+)(?:[Ee][-+]?[0-2]?\\d{1,2})?)',
        number : '(-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)',
        // 4
        boolean: '(true|false)',
        // 5
        object: '({)',
        // 6
        array: '(\\[)',
        // 7
        empty: '(null|undefined)',
        // 7
        emptyObject: '{' + commons.spaceOrNot + '}',

        /*      // 2

              astring: '(?:".*?[^\\u005C\\u0022]"|"")',
              // 3
              anumber: '(?:[-+]?(?:\\d+\\.?\\d*|\\d*\.?\\d+)(?:[Ee][-+]?[0-2]?\\d{1,2})?)',
              // 4
              aboolean: '(?:true|false)',
              // 5
              aobject: '(?:{)',
              // 6
              aarray: '(?:\\[)',
              // 7
              aempty: '(?:null)',*/
    },

    valueType2: {

        string: '(?:""|".*?[^\\u005C]")',

        number : '(?:-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)',

        boolean: '(?:true|false)',

        empty: '(?:null|undefined)',

        emptyObject: '{' + commons.spaceOrNot + '}',

        // 7
        emptyArray: '\\[' + commons.spaceOrNot + '\\]',
    }

}

// This is for service.js -> calculateSteps
const steps = {

    // withKey is areas where JSON sets up hierarchies(steps).
    withKey: '(' +
        // }],[[{
        commons.spaceOrEndBracketOrNot +
        ',' +
        '(?:' +
        '[\\[\\n\\r\\t\\s]*{[\\[\\n\\r\\t\\s]*)+' +
        '|' +
        // }],
        commons.spaceOrEndBracketOrNot +
        ',' +
        '|' +
        // [[{
        '(?:[\\[\\n\\r\\t\\s]*{[\\[\\n\\r\\t\\s]*)+' +
        ')' +

        commons.spaceOrNot +
        jsonBase.keyType +
        commons.spaceOrNot +
        ':' +
        commons.spaceOrNot,


    // withNoKey is areas where JSON sets up hierarchies(steps).
    withNoKey(includeNoStepAreas = true) {

        const token = includeNoStepAreas ? '|' : '';

        return '(' +

        '(' +

        /* 1. -> }]},{, }]},[ */

        // catch desc symbols
        '(' +
        '(?:' + commons.spaceOrNot + '[\\]}]' + commons.spaceOrNot + ')+' +
            token + ')' +

        ',' +

        commons.spaceOrStartBracketOrNot +

        '|' +

        /* 2. -> [ */
        // don't need to catch asc symbols
        '(?:' + commons.spaceOrNot + '\\[' + commons.spaceOrNot + ')+' +

        ')' +

        '(' +
        jsonBase.valueType2.string + '|'
        + jsonBase.valueType2.number + '|'
        + jsonBase.valueType2.boolean + '|'
        + jsonBase.valueType2.empty + '|'
        + jsonBase.valueType2.emptyObject + '|'
        + jsonBase.valueType2.emptyArray +
        ')' +

        '|(' + jsonBase.valueType2.emptyObject + '|' + jsonBase.valueType2.emptyArray +'))'

    },


    asc: '[\\[{]',
    desc: '[\\]}]',
    toNumberOfGap(number) {
        return '(?:' + commons.spaceOrNot + '[\\]},]' + commons.spaceOrNot + ')' + '{' + number + '}$';
    }

}

// This is for service.js -> getMaterials
function jsonOutput(k) {

    return jsonBase.key(k) + '(?:' + jsonBase.valueType.string + '|'
        + jsonBase.valueType.number + '|'
        + jsonBase.valueType.boolean + '|'
        + jsonBase.valueType.object + '|'
        + jsonBase.valueType.array + '|'
        + jsonBase.valueType.empty + ')'

}


function jsonOutput2() {

    return steps.withKey + '(' + jsonBase.valueType2.string + '|'
        + jsonBase.valueType2.number + '|'
        + jsonBase.valueType2.boolean + '|'
        + jsonBase.valueType2.empty + '|'
        + ')'

}

export default {
    commons, jsonBase, jsonOutput, jsonOutput2, steps
}