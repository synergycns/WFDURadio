angular.module('starter.controllers', [])
    .controller('IndexCtrl', function($scope) {

        console.log('IndexCtrl');
        $scope.isPlaying = false;

        // Handler for Stream 1 Play Button
        $scope.streamHD1onClick = function () {
            console.log('Play stream 1');
            try {

                var audStreamHD1 = new Audio('http://peridot.streamguys.com:5350/iheartclassical');
                audStreamHD1.addEventListener("playing", function() {
                    console.log('Playback started!');
                    $scope.isPlaying = true;
                });

                audStreamHD1.play();

            }
            catch(e) {
                console.error('Client does not support the Audio class!');
            }

        }

    });