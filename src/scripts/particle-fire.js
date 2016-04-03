"use strict";

var particles = require("../particles");

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars

  var fire = new particles.Config();
  fire.origin = {
    "x": middleCenterX(game, entity),
    "y": middleCenterY(game, entity)
  };
  fire.prefab = "fire";
  fire.qtyMin = 0;
  fire.qtyMax = 12;
  //fire.angle =  Math.PI / 2;
  fire.arcWidth = Math.PI  / 8;
  fire.sizeMin = 0.5;
  fire.sizeMax = 2;
  fire.velocityMin = 0.9;
  fire.velocityMax = 0.5;
  //fire.lifeSpan = 500;
  particles.create(game, fire);


};



function middleCenterX(game, entity) {
  var position = game.entities.get(entity, "position");
  var size = game.entities.get(entity, "size");
  return position.x + (size.width / 2);
}

function middleCenterY(game, entity) {
  var position = game.entities.get(entity, "position");
  var size = game.entities.get(entity, "size");
  return position.y + (size.height / 2);
}
