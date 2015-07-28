angular.module('starter.controllers', [])
    .controller('IndexCtrl', function($scope, $ImageCacheFactory, $cordovaSplashscreen) {

        console.log('IndexCtrl');

        $ImageCacheFactory.Cache([
            'img/bg_main_lg.png',
            'img/btn_stream1_lg.png',
            'img/btn_stream2_lg.png',
            'img/btn_stream3_lg.png'
        ]).then(function() {
            console.log('ALL IMAGES LOADED!');
            $cordovaSplashscreen.hide();
        });

        // Handler for Stream 1 Play Button
        $scope.streamHD1onClick = function () {
            console.log('Play stream 1');
            try {

                var audStreamHD1 = new Audio('http://peridot.streamguys.com:5350/iheartclassical');
                audStreamHD1.addEventListener("playing", function() {
                    console.log('Playback started!');
                });

                audStreamHD1.play();

            }
            catch(e) {
                console.error('Client does not support the Audio class!');
            }

        }

    })
    .controller('StreamCtrl', function($scope, $stateParams, $rootScope) {

        console.log('StreamCtrl: ' + $stateParams.streamId);

        var objStreamURLs = {
            1: 'http://peridot.streamguys.com:5350/iheart',
            2: 'http://peridot.streamguys.com:5350/iheartjazz',
            3: 'http://peridot.streamguys.com:5350/iheartclassical'
        };

        if($rootScope.audAudioPlayer) {

            console.log($rootScope.audAudioPlayer.src);

            if($rootScope.audAudioPlayer.src !== objStreamURLs[$stateParams.streamId]) {

                console.log('Setting new source');
                $rootScope.audAudioPlayer.src = objStreamURLs[$stateParams.streamId];
                $rootScope.audAudioPlayer.play();

            }

        } else {

            $rootScope.audAudioPlayer = new Audio(objStreamURLs[$stateParams.streamId]);

            $rootScope.audAudioPlayer.addEventListener('playing', function() {

                console.log('Playback started!');
                $rootScope.isPlaying = true;

            });

            $rootScope.audAudioPlayer.play();

        }

        $scope.streamId = $stateParams.streamId;
        $scope.sContentClass = 'content-stream' + $stateParams.streamId;

    });