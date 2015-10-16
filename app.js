import angular from 'angular';
import 'angular-animate';
import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-inview';

// Controllers
import HomeController from './sections/home.controller';
import JourneyController from './sections/journey.controller';

// Services
import RefugeeService from './services/refugee.service';

// Directives
import OdometerDirective from './components/odometer';
import ProgressButtonDirective from './components/progressButton.directive';

angular.module('walkWithMe', ['ui.router', 'ngAnimate', 'ngSanitize', 'angular-inview'])
.config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('home', {
        url: '/',
        templateUrl: 'sections/home.html',
        controller: HomeController,
        controllerAs: 'vm'
    })

    .state('journey', {
        url: '/journey/{refugeeName:[a-z]{1,50}}-{refugeeId:[0-9]{1,7}}',
        templateUrl: 'sections/journey.html',
        controller: JourneyController,
        controllerAs: 'vm'
    });

})
.service('RefugeeService', RefugeeService)
.directive('odometer', OdometerDirective)
.directive('progressButton', ProgressButtonDirective);
