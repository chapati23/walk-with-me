import 'angular';
import 'angular-animate';
import 'angular-ui-router';
import 'angular-inview';
import OdometerDirective from './components/odometer';
import ProgressButtonDirective from './components/progressButton';

angular.module('walkWithMe',['ui.router', 'ngAnimate', 'angular-inview'])
.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'sections/home.html'
    })
    .state('journey', {
        url: '/journey',
        templateUrl: 'sections/journey.html'
    });
})
.directive('odometer', OdometerDirective)
.directive('progressButton', ProgressButtonDirective);
