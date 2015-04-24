var restAPI = function ($http) {
    var service = this;

    service.read = function (url) {
        return $http.get(url);
    };
    service.edit = function (url, data) {
        return $http.put(url, data);
    };
    service.save = function (url, data) {
        return $http.post(url, data);
    };
    service.delete = function (url) {
        return $http.delete(url);
    };
};
angular.module('Apartment').service('restAPI', restAPI);