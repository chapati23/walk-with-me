import angular from 'angular';
import 'angular-animate';
import 'angular-elastic';
import 'angular-inview';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angularfire';
import 'firebase';
import 'ng-file-upload';

// Controllers
import HomeController from './sections/home.controller';
import JourneyController from './sections/journey.controller';
import AddProfileController from './sections/addProfile.controller';

// Services
import RefugeeService from './services/refugee.service';

// Directives
import OdometerDirective from './components/odometer';
import ProgressButtonDirective from './components/progressButton.directive';

angular.module('walkWithMe', ['ui.router', 'ngAnimate', 'ngSanitize', 'ngMessages', 'angular-inview', 'monospaced.elastic', 'ngFileUpload', 'firebase'])
.constant('CONFIG', {
    databaseUrl: 'http://walk-with-me-database.firebaseio.com/refugees',
    imgUploadUrl: 'http://api.cloudinary.com/v1_1/chapati/image/upload',
    imgUploadApiKey: '921313781115659',
    imgUploadApiSecret: '-pLXQD9GiXjESJkfsM4QC88zAsc'
})
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
        url: '/journey/{refugeeName:[a-z]{1,50}}:refugeeId',
        templateUrl: 'sections/journey.html',
        controller: JourneyController,
        controllerAs: 'vm',
        resolve: {
            refugee: (RefugeeService, $stateParams) => {
                return RefugeeService.getRefugee({ $id: $stateParams.refugeeId});
            }
        }
    })

    .state('addProfile', {
        url: '/add-profile',
        templateUrl: 'sections/addProfile.html',
        controller: AddProfileController,
        controllerAs: 'vm'
    })

    .state('profileAdded', {
        url: '/profile-added',
        templateUrl: 'sections/profileAdded.html',
        controller: () => {},
        controllerAs: 'vm'
    });

})
.service('RefugeeService', RefugeeService)
.directive('odometer', OdometerDirective)
.directive('progressButton', ProgressButtonDirective);
