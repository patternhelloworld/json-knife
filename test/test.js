import Pattern from '../src/controller'
import Sample from './sample'
import Answer from './answer'

//const assert = require('assert');
var assert = require('chai').assert;

function expect(result) {
    return {
        toBe: function(expected) {
            if (result !== expected) {
                throw new Error(result + ' is not equal to ' + expected);
            }
        }
    }
}

function checkProperties(doc, key, value) {
    for (var propertyName in doc) {
        if (typeof doc[propertyName] == "object") {
            checkProperties(doc[propertyName]);
        } else {
            if (propertyName == key) {
                doc[propertyName] = value;
                //print(doc[propertyName]);
            }
        }
    }
}

function getObjects(obj, key, newVal) {
    var newValue = newVal;
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, newValue));
        } else if (i == key) {
            obj[key] = newValue;
        }
    }
    return obj;
}


describe('BDD style', function() {

    before(function(){

    });
    //...

    after(function(){

    });

    beforeEach(function() {

    });

    afterEach(function() {

    });

    describe('Sample file checker', function() {

        it('Check if a sample is a correct JSON', function() {
            expect(JSON.stringify(JSON.parse(JSON.stringify(Sample.obj_1))))
                .toBe(Answer.n1);
        });
    });

    describe('Bulk update', function() {

        it('self : null', function() {
            expect(Pattern.sculptJson(Answer.n1, 'self', null))
                .toBe(Answer.n2);
        });

        it('Mike {[Gentleman]} : null', function() {
            expect(Pattern.sculptJson(Answer.n1, 'Mike {[Gentleman]}', null))
                .toBe(Answer.n3);
        });

        it('className : true', function() {
            expect(Pattern.sculptJson(Answer.n1, 'className', true))
                .toBe(Answer.n4);
        });

   /*     it('Normal way - Mike {[Gentleman]} : null', function() {
            expect(getObjects(JSON.parse(Answer.n1), 'Mike {[Gentleman]}', null))
                .toBe(JSON.parse(Answer.n3));
        });*/
    });


});