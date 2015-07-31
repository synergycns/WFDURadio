angular.module('starter.controllers', [])
    .controller('IndexCtrl', function() {

        console.log('IndexCtrl');

    })
    .controller('StreamCtrl', function($scope, $stateParams, $rootScope) {

        console.log('StreamCtrl: ' + $stateParams.streamId);
        $scope.sContentCSSClass = 'content-stream' + $stateParams.streamId;
        $scope.sContentContainerCSSClass = 'content-stream' + $stateParams.streamId + '-container';
        $scope.streamId = $stateParams.streamId;

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

    });