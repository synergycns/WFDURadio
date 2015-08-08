angular.module('starter.controllers', [])
    .controller('IndexCtrl', function() { })
    .controller('StreamCtrl', function($scope, $stateParams, $rootScope, $http, $interval) {

        $scope.sContentCSSClass = 'content-stream' + $stateParams.streamId;
        $scope.streamId = $stateParams.streamId;

        var fnNowPlaying;
        var ivlNowPlaying;

        var objFeedURLs = {
            1: 'http://wfdu.radioactivity.fm/feeds/last10.xml',
            2: 'http://wfduhd2.radioactivity.fm/feeds/last10.xml',
            3: 'http://wfduhd3.radioactivity.fm/feeds/last10.xml'
        };

        var objStreamURLs = {
            1: 'http://peridot.streamguys.com:5350/iheart',
            2: 'http://peridot.streamguys.com:5350/iheartjazz',
            3: 'http://peridot.streamguys.com:5350/iheartclassical'
        };

        // Wait for the view to finish rendering
        $scope.$on('$ionicView.afterEnter', function(){

            // Start playback (if needed)
            if($rootScope.audAudioPlayer.src !== objStreamURLs[$stateParams.streamId]) {
                $rootScope.audAudioPlayer.src = objStreamURLs[$stateParams.streamId];
                $rootScope.audAudioPlayer.load();
            }

            // Setup the NowPlaying function
            fnNowPlaying = function() {
                $http.get(objFeedURLs[$stateParams.streamId])
                    .success(function (data) {

                        //console.log('NowPlayingInfo Received!');

                        if (!$scope.oX2JS) {
                            $scope.oX2JS = new X2JS();
                        }

                        var sJSONData = $scope.oX2JS.xml_str2json(data);
                        $scope.sCurrentArtist = sJSONData.rss.channel.item[0].artist.toString();
                        $scope.sCurrentTrack = sJSONData.rss.channel.item[0].track.toString();

                        if(!ivlNowPlaying) {
                            ivlNowPlaying = $interval(fnNowPlaying, 30000);
                        }

                    })
                    .error(function (error) {
                        console.error('NowPlayingInfo Error: ' + error);
                    })
            };

            // Get NowPlaying info
            fnNowPlaying();

        });

        // Pause function
        $scope.fnPause = function() {
            if(!$rootScope.audAudioPlayer.paused) {
                $rootScope.audAudioPlayer.pause();
                $rootScope.audAudioPlayer.src = '';
                $rootScope.audAudioPlayer.load();
            }
        };

        // Play function
        $scope.fnPlay = function() {
            if($rootScope.audAudioPlayer.paused) {
                if($rootScope.audAudioPlayer.src !== objStreamURLs[$stateParams.streamId]) {
                    $rootScope.audAudioPlayer.src = objStreamURLs[$stateParams.streamId];
                }
                $rootScope.audAudioPlayer.load();
            }
        }

    });