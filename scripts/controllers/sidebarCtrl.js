(function () {
    "use strict";

    angular.module('app')
        .controller('sidebarCtrl', function ($scope, $firebaseAuth) {

            $scope.hideMenu = false;

            var auth = $firebaseAuth();
            $scope.signIn = function () {
                $scope.firebaseUser = null;
                $scope.error = null;

                auth.$signInWithPopup('google').then(function (firebaseUser) {
                    $scope.firebaseUser = firebaseUser;
                    console.log(firebaseUser);
                }).catch(function (error) {
                    $scope.error = error;
                });
            };

            $scope.hideCard = function (property) {
                $scope[property] = !$scope[property];
            }

            /*
            *functionality for dicebag
            */
            var recentRolls = [];
            var button = document.getElementById('roll-button');
            button.onclick = function (e) {
                rollDice();
            }

            function rollDice() {
                var numberOfDice = document.getElementById('dice-number').value;
                var typeOfDice = document.getElementById('dice-type').value;
                var modifier = document.getElementById('dice-modifier').value || 0;
                var dieRolls = [];
                console.log('number', numberOfDice);
                console.log('type', typeOfDice);
                while (numberOfDice > 0) {
                    var dieRoll = rollRandom(typeOfDice);
                    console.log('roll ' + numberOfDice, dieRoll);
                    dieRolls.push(dieRoll);
                    numberOfDice--;
                }
                dieRolls.push(parseInt(modifier)); //add the mod to the roll
                var totalRoll = (dieRolls.reduce(function (x, y) { return x + y; })).toString();
                trackRecentRolls(totalRoll);
                document.getElementById('roll').textContent = totalRoll;
            };

            function rollRandom(dieNum) {
                return Math.floor(Math.random() * dieNum) + 1;
            }

            function trackRecentRolls(roll) {
                if (recentRolls.length >= 12) {
                    recentRolls.shift();
                }
                recentRolls.push(roll);
                var rollString = '';
                recentRolls.forEach(function (e, i, a) {
                    if (i === 0) {
                        rollString += e;
                    } else {
                        rollString += (", " + e);
                    }
                    console.log("recent rolls", rollString);
                });
                document.getElementById('recent-rolls').textContent = rollString;
            }

            // Jquery to help the sidebar work right
            var height = $('.main-body').height();
            $('#sidebar').height(height);

        });

} ());