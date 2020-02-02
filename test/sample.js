const str_1 = '{\n' +
    '        "prob\\"lems": [{\n' +
    '            "classes": [{\n' +
    '                "medications": [{\n' +
    '                    "medicationsClasses": [{\n' +
    '                        "Mike {[Gentleman]}": [{\n' +
    '                            "associatedDrug": [{\n' +
    '                                "name": "asprin",\n' +
    '                                "dose": "a",\n' +
    '                                "strength": "500 mg"\n' +
    '                            }],\n' +
    '                            "Mike {[Gentleman]}": [{\n' +
    '                                "name": "somethingElse",\n' +
    '                                "dose": "",\n' +
    '                                "strength": "500 mg",\n' +
    '                                "friends": {\n' +
    '                                    "self": {\n' +
    '                                        "Mike {[Gentleman]}": "33",\n' +
    '                                        "names": ["aa"]\n' +
    '                                    }\n' +
    '                                }\n' +
    '                            }]\n' +
    '                        }],\n' +
    '                        "Judy": [{\n' +
    '                            "associatedDrug": [{\n' +
    '                                "name": "asprin",\n' +
    '                                "dose": "",\n' +
    '                                "strength": "500 mg",\n' +
    '                                "friends": ["Mike {[Gentleman]}"]\n' +
    '                            }],\n' +
    '                            "associatedDrug#2": [{\n' +
    '                                "name": "somethingElse",\n' +
    '                                "dose": "",\n' +
    '                                "strength": "500 mg"\n' +
    '                            }],\n' +
    '                            "friends": [{"Mike {[Gentleman]}": null}, {"Mike {[Gentleman]}": [["c[ 3\\"5ool", 35], ["ca],[1\\"3lm"], 53]}, "Jackson", "Mike {[Gentleman]}"]\n' +
    '                        }]\n' +
    '                    }]\n' +
    '                }],\n' +
    '                "classNameMissed": [{\n' +
    '                    "Mike {[Gentleman]}": "missing_value"\n' +
    '                }]\n' +
    '            }],\n' +
    '            "className": [{}]\n' +
    '        }]\n' +
    '    }';

const obj_1 ={
    "problems": [
    {
        "classes": [
            {
                "medications": [
                    {
                        "medicationsClasses": [
                            {
                                "Mike {[Gentleman]}": [
                                    {
                                        "associatedDrug": [
                                            {
                                                "name": "asprin",
                                                "dose": "a",
                                                "strength": "500 mg"
                                            }
                                        ],
                                        "Mike {[Gentleman]}": [
                                            {
                                                "name": "somethingElse",
                                                "dose": "",
                                                "strength": "500 mg",
                                                "friends": {
                                                    "self": {
                                                        "Mike {[Gentleman]}": "33",
                                                        "names": [
                                                            "aa"
                                                        ]
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "Judy": [
                                    {
                                        "associatedDrug": [
                                            {
                                                "name": "asprin",
                                                "dose": "",
                                                "strength": "500 mg",
                                                "friends": [
                                                    "Mike {[Gentleman]}"
                                                ]
                                            }
                                        ],
                                        "associatedDrug#2": [
                                            {
                                                "name": "somethingElse",
                                                "dose": "",
                                                "strength": "500 mg"
                                            }
                                        ],
                                        "friends": [
                                            {
                                                "Mike {[Gentleman]}": null
                                            },
                                            {
                                                "Mike {[Gentleman]}": [
                                                    [
                                                        "c[ 3\"5ool",
                                                        35
                                                    ],
                                                    [
                                                        "ca],[1\"3lm"
                                                    ],
                                                    53
                                                ]
                                            },
                                            "Jackson",
                                            "Mike {[Gentleman]}",
                                            {
                                                "problems": [
                                                    {
                                                        "aclasses": [
                                                            {
                                                                "medications": [
                                                                    {
                                                                        "medicationsClasses": [
                                                                            {
                                                                                "Mike {[Gentleman]}": [
                                                                                    {
                                                                                        "associatedDrug": [
                                                                                            {
                                                                                                "name": "asprin",
                                                                                                "dose": "a",
                                                                                                "strength": "500 mg"
                                                                                            }
                                                                                        ],
                                                                                        "Mike {[Gentleman]}": [
                                                                                            {
                                                                                                "name": "somethingElse",
                                                                                                "dose": "",
                                                                                                "strength": "500 mg",
                                                                                                "friends": {
                                                                                                    "self": {
                                                                                                        "Mike {[Gentleman]}": "33",
                                                                                                        "names": [
                                                                                                            "aa"
                                                                                                        ]
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "problems": [
                                                                                                    {
                                                                                                        "xxclasses": [
                                                                                                            {
                                                                                                                "yyclassNameMissed": [
                                                                                                                    {
                                                                                                                        "medicationsClasses": [
                                                                                                                            {
                                                                                                                                "Mike {[Gentleman]}": [
                                                                                                                                    {
                                                                                                                                        "associatedDrug": [
                                                                                                                                            {
                                                                                                                                                "name": "asprin",
                                                                                                                                                "dose": "a",
                                                                                                                                                "strength": "500 mg"
                                                                                                                                            }
                                                                                                                                        ],
                                                                                                                                        "Mike {[Gentleman]}": [
                                                                                                                                            {
                                                                                                                                                "name": "somethingElse",
                                                                                                                                                "dose": "",
                                                                                                                                                "strength": "500 mg",
                                                                                                                                                "friends": {
                                                                                                                                                    "self": {
                                                                                                                                                        "Mike {[Gentleman]}": "33",
                                                                                                                                                        "names": [
                                                                                                                                                            "aa"
                                                                                                                                                        ]
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        ]
                                                                                                                                    }
                                                                                                                                ],
                                                                                                                                "Judy": [
                                                                                                                                    {
                                                                                                                                        "associatedDrug": [
                                                                                                                                            {
                                                                                                                                                "name": "asprin",
                                                                                                                                                "dose": "",
                                                                                                                                                "strength": "500 mg",
                                                                                                                                                "friends": [
                                                                                                                                                    "Mike {[Gentleman]}"
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        ],
                                                                                                                                        "associatedDrug#2": [
                                                                                                                                            {
                                                                                                                                                "name": "somethingElse",
                                                                                                                                                "dose": "",
                                                                                                                                                "strength": "500 mg"
                                                                                                                                            }
                                                                                                                                        ],
                                                                                                                                        "friends": [
                                                                                                                                            {
                                                                                                                                                "Mike {[Gentleman]}": null
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "Mike {[Gentleman]}": [
                                                                                                                                                    [
                                                                                                                                                        "c[ 3\"5ool",
                                                                                                                                                        35
                                                                                                                                                    ],
                                                                                                                                                    [
                                                                                                                                                        "ca],[1\"3lm"
                                                                                                                                                    ],
                                                                                                                                                    53
                                                                                                                                                ]
                                                                                                                                            },
                                                                                                                                            "Jackson",
                                                                                                                                            "Mike {[Gentleman]}",
                                                                                                                                            {
                                                                                                                                                "problems": [
                                                                                                                                                    {
                                                                                                                                                        "classes": [
                                                                                                                                                            {
                                                                                                                                                                "medications": [
                                                                                                                                                                    {
                                                                                                                                                                        "medicationsClasses": [
                                                                                                                                                                            {
                                                                                                                                                                                "Mike {[Gentleman]}": [
                                                                                                                                                                                    {
                                                                                                                                                                                        "associatedDrug": [
                                                                                                                                                                                            {
                                                                                                                                                                                                "name": "asprin",
                                                                                                                                                                                                "dose": "a",
                                                                                                                                                                                                "strength": "500 mg"
                                                                                                                                                                                            }
                                                                                                                                                                                        ],
                                                                                                                                                                                        "Mike {[Gentleman]}": [
                                                                                                                                                                                            {
                                                                                                                                                                                                "name": "somethingElse",
                                                                                                                                                                                                "dose": "",
                                                                                                                                                                                                "strength": "500 mg",
                                                                                                                                                                                                "friends": {
                                                                                                                                                                                                    "self": {
                                                                                                                                                                                                        "Mike {[Gentleman]}": "33",
                                                                                                                                                                                                        "names": [
                                                                                                                                                                                                            "aa"
                                                                                                                                                                                                        ]
                                                                                                                                                                                                    }
                                                                                                                                                                                                }
                                                                                                                                                                                            }
                                                                                                                                                                                        ]
                                                                                                                                                                                    }
                                                                                                                                                                                ],
                                                                                                                                                                                "Judy": [
                                                                                                                                                                                    {
                                                                                                                                                                                        "associatedDrug": [
                                                                                                                                                                                            {
                                                                                                                                                                                                "name": "asprin",
                                                                                                                                                                                                "dose": "",
                                                                                                                                                                                                "strength": "500 mg",
                                                                                                                                                                                                "friends": [
                                                                                                                                                                                                    "Mike {[Gentleman]}"
                                                                                                                                                                                                ]
                                                                                                                                                                                            }
                                                                                                                                                                                        ],
                                                                                                                                                                                        "associatedDrug#2": [
                                                                                                                                                                                            {
                                                                                                                                                                                                "name": "somethingElse",
                                                                                                                                                                                                "dose": "",
                                                                                                                                                                                                "strength": "500 mg"
                                                                                                                                                                                            }
                                                                                                                                                                                        ],
                                                                                                                                                                                        "friends": [
                                                                                                                                                                                            {
                                                                                                                                                                                                "Mike {[Gentleman]}": null
                                                                                                                                                                                            },
                                                                                                                                                                                            {
                                                                                                                                                                                                "Mike {[Gentleman]}": [
                                                                                                                                                                                                    [
                                                                                                                                                                                                        "c[ 3\"5ool",
                                                                                                                                                                                                        35
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    [
                                                                                                                                                                                                        "ca],[1\"3lm"
                                                                                                                                                                                                    ],
                                                                                                                                                                                                    53
                                                                                                                                                                                                ]
                                                                                                                                                                                            },
                                                                                                                                                                                            "Jackson",
                                                                                                                                                                                            "Mike {[Gentleman]}"
                                                                                                                                                                                        ]
                                                                                                                                                                                    }
                                                                                                                                                                                ]
                                                                                                                                                                            }
                                                                                                                                                                        ]
                                                                                                                                                                    }
                                                                                                                                                                ],
                                                                                                                                                                "classNameMissed": [
                                                                                                                                                                    {
                                                                                                                                                                        "Mike {[Gentleman]}": "missing_value"
                                                                                                                                                                    }
                                                                                                                                                                ]
                                                                                                                                                            }
                                                                                                                                                        ],
                                                                                                                                                        "className": [
                                                                                                                                                            {}
                                                                                                                                                        ]
                                                                                                                                                    }
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        ]
                                                                                                                                    }
                                                                                                                                ]
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ],
                                                                                                                "yyclassNameMissed2": [
                                                                                                                    {
                                                                                                                        "Mike {[Gentleman]}": "missing_value"
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ],
                                                                                                        "xxclasses2": [
                                                                                                            {}
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ],
                                                                                "Judy": [
                                                                                    {
                                                                                        "associatedDrug": [
                                                                                            {
                                                                                                "name": "asprin",
                                                                                                "dose": "",
                                                                                                "strength": "500 mg",
                                                                                                "friends": [
                                                                                                    "Mike {[Gentleman]}"
                                                                                                ]
                                                                                            }
                                                                                        ],
                                                                                        "associatedDrug#2": [
                                                                                            {
                                                                                                "name": "somethingElse",
                                                                                                "dose": "",
                                                                                                "strength": "500 mg"
                                                                                            }
                                                                                        ],
                                                                                        "friends": [
                                                                                            {
                                                                                                "Mike {[Gentleman]}": null
                                                                                            },
                                                                                            {
                                                                                                "Mike {[Gentleman]}": [
                                                                                                    [
                                                                                                        "c[ 3\"5ool",
                                                                                                        35
                                                                                                    ],
                                                                                                    [
                                                                                                        "ca],[1\"3lm"
                                                                                                    ],
                                                                                                    53
                                                                                                ]
                                                                                            },
                                                                                            "Jackson",
                                                                                            "Mike {[Gentleman]}"
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ],
                                                                "classNameMissed": [
                                                                    {
                                                                        "Mike {[Gentleman]}": "missing_value"
                                                                    }
                                                                ]
                                                            }
                                                        ],
                                                        "className": [
                                                            {}
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "classNameMissed": [
                    {
                        "Mike {[Gentleman]}": "missing_value"
                    }
                ]
            }
        ],
        "className": [
            {}
        ]
    }
]
};

export default {
    str_1, obj_1
}