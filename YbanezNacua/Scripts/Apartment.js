(function(window, angular)
{
var app = angular.module('Apartment', ['ui.router', 'angularUtils.directives.dirPagination']);
app.config(function ($stateProvider, $urlRouterProvider) {
    //default view in ui-view
    $urlRouterProvider.otherwise("/Home/Index");

    //Home Link
    $stateProvider
    .state('Home', {
        url: "/Home/Index",
        templateUrl: "Home/Home"
    })

    //About Link
    .state('About', {
        url: "/Home/Index",
        templateUrl: "Home/About"
    })

    //Contact Link
    .state('Contact', {
        url: "/Home/Index",
        templateUrl: "Home/Contact"
    })

    //Feedback Link
    .state('Feedback', {
        url: "/Home/Index",
        templateUrl: "Home/Feedback"
    })
});
})(window, window.angular);