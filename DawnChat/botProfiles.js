function BotProfile(name, age) {
    "use strict";
    this.name = name;
    this.age = age;
}

var ariyaa = {};
ariyaa.prototype = new BotProfile();
ariyaa.name = "Ariyaa";
ariyaa.age = 10;

var tyrion = {};
tyrion.prototype = new BotProfile();
tyrion.name = "Tyrion";
tyrion.age = 30;

module.exports = {
    ariyaa :  ariyaa,
    tyrion :  tyrion
};