# json-knife [![Build Status](https://travis-ci.org/Andrew-Kang-G/json-knife.svg?branch=master)](https://travis-ci.org/Andrew-Kang-G/json-knife) [![NPM version](https://img.shields.io/npm/v/json-knife.svg)](https://www.npmjs.com/package/json-knife) [![](https://data.jsdelivr.com/v1/package/gh/Andrew-Kang-G/json-knife/badge)](https://www.jsdelivr.com/package/gh/Andrew-Kang-G/json-knife)
## Overview
Mass replace specific properties value with a new value recursively in huge, complex and deep JSON string 
with a robust regular expression based engine.

Zero dependency, 7KB

<a href="http://jsfiddle.net/AndrewKang/mq7v54h3/" target="_blank">LIVE DEMO</a>


## Installation

For ES5 users,

``` html
<html>
       <body>
       	<script src="../dist/json-knife.bundle.js"></script>
       	<script type="text/javascript">
         
       	</script>
       </body>
</html>
```

For ES6 npm users, run 'npm install --save json-knife' on console.

``` html
import Pattern from 'json-knife';
```

## Syntax & Usage
Very simple to use. Now we are going to set all 'Mike{[Gentleman]}' to null in the sample JSON string.

```javascript

    /**
     * @brief
     * Mass Update certain key-values recursively in huge, complex JSON string trees
     * @author Andrew Kang
     * @param original string required (must be JSON string)
     * @param key string required
     * @param value string or boolean or number or null required
     * @return string
     */
    
      // IMPORTANT : the variable 'original' should be valid JSON.
      // You can test your JSON string source like here. 
      // https://jsonformatter.curiousconcept.com/
    
    var result = Pattern.sculptJson(original, 'Mike{[Gentleman]}', null);
    
    // You can convert the result string to an object type.
    var resultObj = JSON.parse(result);
    
```
**[Original source]**

var original =
```json
{
        "prob\"lems": [{
            "classes": [{
                "medications": [{
                    "medicationsClasses": [{
                        "Mike {[Gentleman]}": [{
                            "associatedDrug": [{
                                "name": "asprin",
                                "dose": 35.3,
                                "strength": "500 mg",
                                "className" : false
                            }],
                            "Mike {[Gentleman]}": [{
                                "name": "somethingElse",
                                "dose": "",
                                "strength": "500 mg",
                                "friends": {
                                    "self": {
                                        "Mike {[Gentleman]}": "33",
                                        "names": ["aa"]
                                    }
                                }
                            }]
                        }],
                        "Judy": [{
                            "associatedDrug": [{
                                "name": "asprin",
                                "dose": "",
                                "strength": "500 mg",
                                "friends": ["Mike {[Gentleman]}"]
                            }],
                            "associatedDrug#2": [{
                                "name": "somethingElse",
                                "dose": "",
                                "strength": "500 mg"
                            }],
                            "friends": [{"Mike {[Gentleman]}": null}, {"Mike {[Gentleman]}": [["c[ 3\"5ool", 35], ["ca],[1\"3lm"], 53]}, "Jackson", "Mike {[Gentleman]}"]
                        }]
                    }]
                }],
                "classNameMissed": [{
                    "Mike {[Gentleman]}": "missing_value"
                }]
            }],
            "className": [{}]
        }]
    }
```
**[Result]** - string type

```json
{
        "prob\"lems": [{
            "classes": [{
                "medications": [{
                    "medicationsClasses": [{
                        "Mike {[Gentleman]}": null,
                        "Judy": [{
                            "associatedDrug": [{
                                "name": "asprin",
                                "dose": "",
                                "strength": "500 mg",
                                "friends": ["Mike {[Gentleman]}"]
                            }],
                            "associatedDrug#2": [{
                                "name": "somethingElse",
                                "dose": "",
                                "strength": "500 mg"
                            }],
                            "friends": [{"Mike {[Gentleman]}": null}, {"Mike {[Gentleman]}": null}, "Jackson", "Mike {[Gentleman]}"]
                        }]
                    }]
                }],
                "classNameMissed": [{
                    "Mike {[Gentleman]}": null
                }]
            }],
            "className": [{}]
        }]
    }
```

Please inform me of the source related things by leaving issues on Github or emailing me at studypurpose@naver.com.