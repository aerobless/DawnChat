//Brain:
var inputIndex = [];
var outputIndex = {};
var botProfile;

var initBot = function (botProfile) {
    "use strict";

    //Import:
    this.botProfile = botProfile;

    inputIndex.push({"regex": /^Hello/im, "action": "greeting"});
    inputIndex.push({"regex": /^Hi/im, "action": "greeting"});
    inputIndex.push({"regex": /^Hoi/im, "action": "greeting"});
    inputIndex.push({"regex": /^Ola/im, "action": "greeting"});
    inputIndex.push({"regex": /^Good day/im, "action": "greeting"});
    inputIndex.push({"regex": /^Hey/im, "action": "greeting"});
    inputIndex.push({"regex": /^Hiya/im, "action": "greeting"});

    inputIndex.push({"regex": /^How are you\?$/im, "action": "status"});

    inputIndex.push({"regex": /^What's the time\?$/im, "action": "time"});
    inputIndex.push({"regex": /^What time is it\?$/im, "action": "time"});
    inputIndex.push({"regex": /^Tell me the time/im, "action": "time"});

    inputIndex.push({"regex": /^What's your name\?$/im, "action": "name"});
    inputIndex.push({"regex": /^What is your name\?$/im, "action": "name"});
    inputIndex.push({"regex": /^Identify/im, "action": "name"});

    var greeting = [];
    greeting.push("Hello there!");
    greeting.push("Hey!");
    greeting.push("Ola!");
    greeting.push("Hiya!");
    outputIndex["greeting"] = greeting;

    var status = [];
    status.push("I'm fine thanks!");
    status.push("Good thank you. How are you?");
    outputIndex["status"] = status;

    var name = [];
    name.push("My name is " + botProfile.name + " and I'm " + botProfile.age + " years old.");
    outputIndex["name"] = name;

    //Function-Response example
    var time = function () {
        var currentdate = new Date();
        return "It is currently " + currentdate.getHours() + ":" + currentdate.getMinutes() + ".";
    };
    outputIndex["time"] = time;
};

var evaluateRegex = function (msg) {
    "use strict";
    var i;
    for (i = 0; i < inputIndex.length; i += 1) {
        if (inputIndex[i].regex.test(msg)) {
            return inputIndex[i].action;
        }
    }
    return null;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
var getRandomInt = function (min, max) {
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var choseRandom = function (array) {
    "use strict";
    var random = getRandomInt(0, array.length - 1);
    return array[random];
};

module.exports = {
    parseMessage : function (msg) {
        "use strict";
        var action = evaluateRegex(msg),
            possibleResponses = outputIndex[action];

        if (action === null) {
            return null;
        }

        //Runs a function-response:
        if (typeof possibleResponses === 'function') {
            return possibleResponses();
        }

        //Choses a normal response:
        return choseRandom(possibleResponses);
    },
    initBot :  initBot
};