/*
*     Private : Utils
* */
import Pattern from './pattern';

const Text = {

    replaceBetween(from, start, end, what) {
        return from.substring(0, start) + what + from.substring(end);
    },
    escapeRegex(v) {
        return v.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    },


};

export default {
    Text
}