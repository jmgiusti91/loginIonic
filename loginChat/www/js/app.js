// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var email;
angular.module('starter', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('firebaseChat', {
    url: '/firebaseChat',
    templateUrl: 'templates/firebaseChat.html',
    controller: 'firebaseChatCtrl'
  })

  $urlRouterProvider.otherwise('/login');
})

.controller('LoginCtrl', function ($scope){
  $scope.GuardarDatos=function(){
    email = $scope.correo;
    console.log(email);
  }
})


.controller('firebaseChatCtrl', function ($scope, $timeout){

  $scope.misMensajes = [];
  $scope.usuario = "";
  $scope.usuario = email;
  console.log($scope.usuario);

  var VariableFireBase = new Firebase('https://chat1-1a28d.firebaseio.com/usuarios/');
  $scope.EnviarMensaje=function (){
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      var fecha = Firebase.ServerValue.TIMESTAMP;
      VariableFireBase.push({usuario:name, mensaje:text, fecha_ingreso:fecha});
  }
  
  
   VariableFireBase.on('child_added', function (snapshot) {
      $timeout(function(){
        var message = snapshot.val();
        $scope.misMensajes.push(message);
        console.log($scope.misMensajes);
        var fecha = new Date(message.fecha_ingreso);
        var hora = fecha.getHours();
        var minutos = fecha.getMinutes();
        $('<div/>').text(message.mensaje + '->' + hora + ':' + minutos).prepend($('<em/>').text(message.usuario+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      });
   });

})



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
