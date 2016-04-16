"use strict";

var particles = require("splat-ecs/lib/particles");
var fire = new particles.Config("fire");

fire.qtyMin = 5;
fire.qtyMax = 5;
fire.spreadType = "even";
// fire.angle = Math.PI;
//fire.arcWidth = Math.PI * 2;
// fire.sizeMin = 0.5;
// fire.sizeMax = 5;
// fire.velocityMin = 0.9;
// fire.velocityMax = 0.5;
//fire.lifeSpan = 500;
module.exports = function(entity, game) { // eslint-disable-line no-unused-vars

  fire.origin = entity;
  particles.create(game, fire);
};

// function middleCenterX(game, entity) {
//   var position = game.entities.get(entity, "position");
//   var size = game.entities.get(entity, "size");
//   return position.x + (size.width / 2);
// }

// function middleCenterY(game, entity) {
//   var position = game.entities.get(entity, "position");
//   var size = game.entities.get(entity, "size");
//   return position.y + (size.height / 2);
// }
