"use strict";

var random = require("./random");
/**
* Create bewtween qtyMin and qtyMax prefabs each time function is called.
* game - pass the game in
* origin - point OR entity
*          point behaviour: object ex: {"x": 50, "y": 50} for the starting point of all particles
*          entity behaviour: particles will spawn randomly all over the bounding rectangle created by the entity's position and size.
* prefab - string name of a prefab in prefabs.json
* spreadtype - string "even" or "random" for particle distribution
* angle - radian angle to point the particles (between -Math.PI and Math.PI)
* arcWidth - radian angle to spread the particles (between -Math.PI and Math.PI)
* qtyMin - Minimum number of particles per call
* qtyMax - Maximum number of particles per call
* sizeMin -
* sizemax -
* velocityMin - Minimum distance from particle origin to spawn partice
* velocityMax - Maximum distance from particle origin to spawn partice
* accelerationX -
* accelerationY -
* decayRunning -
* lifeSpanMin -
* lifeSpan -
* lifeSpanFade -
*/
module.exports = {
  "create": function(game, config) {
    var particleCount = Math.floor(random.inRange(config.qtyMin, config.qtyMax));
    for (var i = 0; i < particleCount; i++) {
      var particle = game.instantiatePrefab(config.prefab);
      // check if origin is an entity
      var origin = config.origin;
      if (typeof config.origin === "number") {
        origin = choosePointInEntity(game, origin);
      }
      if (config.sizeMax !== 1) {
        var randomSize = random.inRange(config.sizeMin, config.sizeMax);
        scaleEntityRect(game, particle, randomSize);
      }
      centerEntityOnPoint(game, particle, origin);

      var velocity = random.inRange(config.velocityMin, config.velocityMax);

      var startAngle = config.angle - (config.arcWidth / 2);
      var angle = startAngle;
      if (config.spreadtype === "even") {
        angle = (i * (config.arcWidth / (particleCount - 1))) + startAngle;
      } else {
        var endAngle = startAngle + config.arcWidth;
        angle = random.inRange(startAngle, endAngle);
      }

      game.entities.set(particle, "velocity", pointOnCircle(angle, velocity));

      if (config.lifeSpanFade) {
        game.entities.set(particle, "decay-fade", true);
      }
      if (config.accelerationX || config.accelerationY) {
        game.entities.set(particle, "acceleration", {
          "x": config.accelerationX,
          "y": config.accelerationY
        });
      }
      game.entities.set(particle, "decay",{
        "running": config.decayRunning,
        "time": config.lifeSpanMin,
        "max": config.lifeSpan
      });
    }
  },
  "Config": function(origin, prefab, spreadtype, angle, arcWidth, qtyMin, qtyMax, sizeMin, sizeMax, velocityMin, velocityMax, accelerationX, accelerationY, decayRunning, lifeSpanMin, lifeSpan, lifeSpanFade) {
    this.origin = origin || { "x": 0, "y": 0 };
    this.prefab = prefab || undefined;
    this.spreadtype = spreadtype || "random";
    this.angle = angle || 0;
    this.arcWidth = arcWidth || Math.PI;
    this.qtyMin = qtyMin || 1;
    this.qtyMax = qtyMax || 1;
    this.sizeMin = sizeMin || 1;
    this.sizeMax = sizeMax || 1;
    this.velocityMin = velocityMin || 0;
    this.velocityMax = velocityMax || 0;
    this.accelerationX = accelerationX || 0;
    this.accelerationY = accelerationY || 0;
    this.decayRunning = decayRunning || true;
    this.lifeSpanMin = lifeSpanMin || 0;
    this.lifeSpan = lifeSpan || 500;
    this.lifeSpanFade = lifeSpanFade || false;
  }
};


function scaleEntityRect(game, entity, scaleFactor) {
  var size = game.entities.get(entity, "size");
  size.width = size.width * scaleFactor;
  size.height = size.height * scaleFactor;
}


/**
*
*/
function pointOnCircle(angle, radius) {
  return {
    "x": (radius * Math.cos(angle)),
    "y": (radius * Math.sin(angle))
  };
}

/**
* Centers an entity with a position and size on a given point.
* game - required for game.entities.get().
* entity - required id of entity to run function on.
* point - point object ex:{"x": 50, "y": 50} for the starting point of all particles.
*/
function centerEntityOnPoint(game, entity, point) {
  var size = game.entities.get(entity, "size");
  game.entities.set(entity, "position",{
    "x": point.x - (size.width / 2),
    "y": point.y - (size.height / 2)
  });
}

/**
* Chooses a random point inside the bounding rectangle of an entity with position and size.
* game - required for game.entities.get().
* entity - required id of entity to run function on.
* returns an object ex: {"x": 50, "y": 50}
*/
function choosePointInEntity(game, entity) {
  var position = game.entities.get(entity, "position");
  var size = game.entities.get(entity, "size");
  return {
    "x": random.inRange(position.x, (position.x + size.width)),
    "y": random.inRange(position.y, (position.y + size.height))
  };
}
