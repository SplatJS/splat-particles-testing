"use strict";

module.exports = function(ecs, game) {
  ecs.addEach(function advanceTimers(entity, elapsed) {
    var decay = game.entities.get(entity, "decay");
    if (!decay.running) {
      return;
    }
    decay.time += elapsed;
    if (decay.time > decay.max) {
      decay.running = false;
      decay.time = 0;
      game.entities.destroy(entity);
      return;
    }

  }, "decay");
};
