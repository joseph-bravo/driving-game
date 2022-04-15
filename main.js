// ! Car Object

var $car = document.querySelector('#car');

function Car(carElement) {
  this.dom = carElement;
  this.direction = 0;
  this.rotation = 0;
  this.gear = 0;
  this.speed = 2;
  this.position = {
    x: 0,
    y: 0
  };
}

var CarProto = {
  turn: function (desiredDirection) {
    this.direction = desiredDirection;
    this.update();
  },
  update: function () {
    this.rotation = this.direction;
    this.dom.style.transform =
      'rotate(' + this.rotation + 'deg) ' +
      'translate(' + this.position.x + 'px, ' + this.position.y + 'px) '
    ;
  },
  move: function () {
    this.position.x += this.speed;
    this.update();
  },
  toggleGear: function () {
    setInterval(this.move.bind(this), 16);
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
  toggleGear: { key: ' ', action: function () { player.toggleGear(); } }
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
