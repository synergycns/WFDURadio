angular.module('starter.controllers', [])
    .controller('IndexCtrl', function() {

        console.log('IndexCtrl');

    })
    .controller('StreamCtrl', function($scope, $stateParams, $rootScope, $ionicLoading) {

        $scope.sContentCSSClass = 'content-stream' + $stateParams.streamId;
        $scope.sContentContainerCSSClass = 'content-stream' + $stateParams.streamId + '-container';
        $scope.streamId = $stateParams.streamId;

        var objStreamURLs = {
            1: 'http://peridot.streamguys.com:5350/iheart',
            2: 'http://peridot.streamguys.com:5350/iheartjazz',
            3: 'http://peridot.streamguys.com:5350/iheartclassical'
        };

        // Wait for the view to finish rendering
        $scope.$on('$ionicView.afterEnter', function(){

            console.log('Stream View Entered');

            if(($rootScope.audAudioPlayer && $rootScope.audAudioPlayer.src !== objStreamURLs[$stateParams.streamId]) || !$rootScope.audAudioPlayer)
            {
                //$scope.isLoadingStream = true;
                $ionicLoading.show({
                    template: '<ion-spinner icon="ripple"></ion-spinner><br />Loading...'
                });

            }

            if($rootScope.audAudioPlayer) {

                console.log($rootScope.audAudioPlayer.src);

                if($rootScope.audAudioPlayer.src !== objStreamURLs[$stateParams.streamId]) {
                    $rootScope.audAudioPlayer.src = objStreamURLs[$stateParams.streamId];
                    $rootScope.audAudioPlayer.play();
                }

            } else {

                $rootScope.audAudioPlayer = new Audio(objStreamURLs[$stateParams.streamId]);
                $rootScope.audAudioPlayer.addEventListener('playing', function() {
                    console.log('Playback started! %o', $scope);
                    $ionicLoading.hide();
                });

                $rootScope.audAudioPlayer.play();

            }

        });

    });