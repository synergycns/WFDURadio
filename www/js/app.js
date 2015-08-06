// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSocialSharing, $cordovaDialogs) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    // Setup Audio object
    $rootScope.audAudioPlayer = new Audio();
    $rootScope.audAudioPlayer.addEventListener('playing', function() {
      $ionicLoading.hide();
    });
    $rootScope.audAudioPlayer.addEventListener('loadstart', function() {
        if($rootScope.audAudioPlayer.src.indexOf('streamguys') > -1) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner><br />Loading...'
            });
        }
    });
      $rootScope.audAudioPlayer.addEventListener('canplay', function() {
          if($rootScope.audAudioPlayer.src.indexOf('streamguys') > -1) {
             $rootScope.audAudioPlayer.play();
          }
      });
    $rootScope.audAudioPlayer.addEventListener('error', function() {
        if($rootScope.audAudioPlayer.src.indexOf('streamguys') > -1) {
            $cordovaDialogs.alert('Playback error. Please try again.')
                .then(function() {
                    $ionicLoading.hide();
                })
        }
    });

    // Setup sharing
    var strShareMessage = 'Check out WFDU Radio for 24/7 HD audio streaming from WFDU 89.1 FM!';
    var strShareURL = 'http://www.wfdu.fm';
    var strAppName;

    // Setup Facebook sharing
    $rootScope.fnShareViaFacebook = function() {

        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner><br />Checking for Facebook...'
        });

        // Determine OS
        if(ionic.Platform.isIOS()) {
            strAppName = 'com.apple.social.facebook';
        } else {
            strAppName = 'facebook';
        }

        // Check if Facebook is available
        $cordovaSocialSharing.canShareVia(strAppName, strShareMessage, null, strShareURL, null)
            .then(function() {
                console.log('Sharing via Facebook...');
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><br />Sharing via Facebook...'
                });
                _shareViaFacebook();
            },
            function() {
                console.error('Facebook not found!!');
                $cordovaDialogs.alert('Please install Facebook, or an app that will allow you to share content on Facebook, and try again!')
                    .then(function() {
                        $ionicLoading.hide();
                    })
            });

    };

    // Setup Twitter sharing
    $rootScope.fnShareViaTwitter = function() {

        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner><br />Checking for Twitter...'
        });

        // Determine OS
        if(ionic.Platform.isIOS()) {
            strAppName = 'com.apple.social.twitter';
        } else {
            strAppName = 'twitter';
        }

        // Check if Twitter is available
        $cordovaSocialSharing.canShareVia('twitter', strShareMessage, null, strShareURL, null)
            .then(function() {
                console.log('Sharing via Twitter...');
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner><br />Sharing via Twitter...'
                });
                _fnShareViaTwitter();
            },
            function() {
                console.error('Twitter not found!');
                $cordovaDialogs.alert('Please install Twitter, or an app that will allow you to share content on Twitter, and try again!')
                    .then(function() {
                        $ionicLoading.hide();
                    })
            });

    };

    function _shareViaFacebook() {
        // Share
        $cordovaSocialSharing.shareViaFacebook(strShareMessage, null, strShareURL)
            .then(function() {
                console.log('Share (Fb) success!');
                $ionicLoading.hide();
            }, function(error) {
                console.error('Error (Fb) sharing! ' + error);
                $ionicLoading.hide();
            }
        )
    }

    function _fnShareViaTwitter() {
        // Share
        $cordovaSocialSharing.shareViaTwitter(strShareMessage, null, strShareURL)
            .then(function() {
                console.log('Share (Tw) success!');
                $ionicLoading.hide();
            }, function(error) {
                console.error('Error (Tw) sharing! ' + error);
                $ionicLoading.hide();
            }
        );
    }

  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('index', {
    url: '/',
    templateUrl: 'templates/views/index.html',
    controller: 'IndexCtrl'
  })
  .state('stream', {
      url: '/stream/:streamId',
      templateUrl: 'templates/views/stream.html',
      controller: 'StreamCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
