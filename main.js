// ! Car Object

var $car = document.querySelector('#car');

function Car(carElement) {
  this.dom = carElement;
  this.direction = 0;
  this.moving = false;
  this.speed = 2;
  this.position = {
    x: 0,
    y: 0
  };
}

var CarProto = {
  turn: function (desiredDirection) {
    this.direction = desiredDirection;
  },
  update: function () {
    if (this.moving) {
      this.move();
    }
    this.dom.style.transform =
      'rotate(' + this.direction + 'deg) ' +
      'translate(' + this.position.x + 'px, ' + this.position.y + 'px) '
    ;
  },
  move: function () {
    this.position.x += this.speed;
  },
  toggleMoving: function () {
    if (this.moving) {
      this.moving = false;
    } else {
      this.moving = true;
    }
  }
};

for (var proto in CarProto) {
  Car.prototype[proto] = CarProto[proto];
}

// ! input handling

/*
  * 0deg: right
  * 90deg: down
  * 180deg: left
  * 270deg: up
*/

var player = new Car($car);

var inputHandler = {
  turnCarLeft: { key: 'ArrowLeft', action: function () { player.turn(180); } },
  turnCarDown: { key: 'ArrowDown', action: function () { player.turn(90); } },
  turnCarUp: { key: 'ArrowUp', action: function () { player.turn(270); } },
  turnCarRight: { key: 'ArrowRight', action: function () { player.turn(0); } },
  toggleMoving: { key: ' ', action: function () { player.toggleMoving(); } }
};

function inputListener(event) {
  for (var ctrl in inputHandler) {
    if (event.key === inputHandler[ctrl].key) {
      inputHandler[ctrl].action();
      break;
    }
  }
}

document.addEventListener('keydown', inputListener);

// ! game loop
// eslint-disable-next-line no-unused-vars
var gameTimer = setInterval(gameLoop, 16);
function gameLoop() {
  player.update();
}
