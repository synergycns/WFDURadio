angular.module('starter.controllers', [])
    .controller('IndexCtrl', function($scope) {

        console.log('IndexCtrl');
        $scope.sContentBackgroundCSSClass = 'content-index-background';

        $scope.$on("$ionicView.enter", function() {
            $scope.sContentBackgroundCSSClass = 'content-index-background-entered';
        });

    })
    .controller('StreamCtrl', function($scope, $stateParams, $rootScope) {

        console.log('StreamCtrl: ' + $stateParams.streamId);
        $scope.sContentCSSClass = 'content-stream' + $stateParams.streamId;
        $scope.sContentBackgroundCSSClass = 'content-stream' + $stateParams.streamId + '-background';
        $scope.sContentContainerCSSClass = 'content-stream' + $stateParams.streamId + '-container';
        $scope.streamId = $stateParams.streamId;

        $scope.$on("$ionicView.beforeLeave", function() {
            console.log('VIEW LEAVING!');
            $scope.sContentBackgroundCSSClass = 'content-stream' + $stateParams.streamId + '-background';
        });

        $scope.$on("$ionicView.enter", function() {
            console.log('VIEW ENTERED!');
            $scope.sContentBackgroundCSSClass = 'content-stream' + $stateParams.streamId + '-background-entered';
        });

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