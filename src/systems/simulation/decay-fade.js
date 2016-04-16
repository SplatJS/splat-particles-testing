"use strict";

module.exports = function(ecs, game) {
  game.entities.registerSearch("decayFadeSearch", ["decay-fade", "decay", "image"]);
  ecs.addEach(function advanceTimers(entity) {
    var decay = game.entities.get(entity, "decay");
    var image = game.entities.get(entity, "image");
    var alpha = invertFloat(decay.time / decay.max);
    //console.log(alpha);
    image.alpha = alpha;
  }, "decayFadeSearch");
};


function invertFloat(float) {
  return (100 - (float * 100)) / 100;
}
