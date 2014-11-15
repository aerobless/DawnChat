//Brain:
var comIndex = [];

var initBot = function () {
    "use strict";
    comIndex.push({
        "regex": /^Hello/im,
        "action": "greeting"
    });

    comIndex.push({
        "regex": /^Hi/im,
        "action": "greeting"
    });
};

var evaluateRegex = function (msg) {
    "use strict";
    var i;
    for (i = 0; i < comIndex.length; i += 1) {
        if (comIndex[i].regex.test(msg)) {
            return comIndex[i].action;
        }
    }
    return null;
};

var isGreeting = function (msg) {
    "use strict";
    var action = evaluateRegex(msg);
    if (action === null) {
        return null;
    }
    if (action === "greeting") {
        return "Hello to you too";
    }
    return null;
}

module.exports = {
    parseMessage : function (msg) {
        "use strict";
        var greeting = isGreeting(msg);
        if(greeting !== null){
            return greeting;
        }

        return null;
    },
    initBot : function(){
        initBot();
    }
};