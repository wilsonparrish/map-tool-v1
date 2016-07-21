var draggableElement = document.getElementById('grid-snap'),
    x = 0, y = 0;

interact(draggableElement)
    .draggable({
        snap: {
            targets: [
                interact.createSnapGrid({ x: 30, y: 30 })
            ],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
        },
        inertia: true,
        restrict: {
            restriction: draggableElement.parentNode,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
            endOnly: true
        }
    })
    .on('dragmove', function (event) {
        //this block keeps it in the lines when scrolled unevenly
        if (event.dx % 30 >= 15) {
            event.dx += event.dx % 30
        } else {
            event.dx -= event.dx % 30
        }
        if (event.dy % 30 >= 15) {
            event.dy += event.dy % 30
        } else {
            event.dy -= event.dy % 30
        }

        //handles the movement event
        x += event.dx;
        y += event.dy;
        console.log(x, y);
        event.target.style.webkitTransform =
            event.target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    });

var button = document.getElementById('roll-button');
button.onclick = function (e) {
    rollDice();
}

function rollDice() {
    var numberOfDice = document.getElementById('dice-number').value;
    var typeOfDice = document.getElementById('dice-type').value;
    var dieRolls = [];
    console.log('number', numberOfDice);
    console.log('type', typeOfDice);
    while (numberOfDice > 0) {
        var dieRoll = rollRandom(typeOfDice);
        console.log('roll ' + numberOfDice, dieRoll);
        dieRolls.push(dieRoll);
        numberOfDice--;
    }
    document.getElementById('roll').textContent = (dieRolls.reduce(function(x,y){return x+y;})).toString();
};

function rollRandom(dieNum) {
    return Math.floor(Math.random() * dieNum) + 1;
}
