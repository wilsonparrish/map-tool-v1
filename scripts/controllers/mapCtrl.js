(function () {
    "use strict";

    angular.module('app')
        .controller('mapCtrl', function ($scope) {
            var draggableElement = document.getElementById('grid-snap'), //replaced this with a multi select (line 5)
                x = 0, y = 0;

            // interact(draggableElement)
            interact('#grid-snap')
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


        });

} ());