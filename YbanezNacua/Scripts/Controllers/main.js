angular.module('Apartment').controller('ApartmentController', ApartmentController);
angular.module('Apartment').controller('FeedbackController', FeedbackController);
angular.module('Apartment').controller('ContactController', ContactController);
//inject the service needed of a controller
ApartmentController.$injector = ['$scope', '$interval', '$filter'];
FeedbackController.$injector = ['$scope', '$interval', '$filter'];
ContactController.$injector = ['$scope', '$interval'];
function FeedbackController($scope, $interval, $filter, restAPI) {
    var API = restAPI;
    var stop;
    $scope.showMore = false;
    $scope.timerstarted = false;
    $scope.pageLoaded = false;
    $scope.smallMessage = false;
    $scope.showMessage = false;
    $scope.userNameHolder = ""
    $scope.totalFeedbacks = 0;
    $scope.showLoading = true;

    $scope.showMessageModal = function () {
        stop = $interval(function () {
            $scope.showMessage = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showLoadingImage = function () {
        stop = $interval(function () {
            $scope.showLoading = true;
        }, 100);
        $interval.cancel(stop);
        stop = undefined;
    };
    $scope.closeMessage = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showMessage = false;
    };
    $scope.closeLoadingImage = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showLoading = false;
    };

    //Get feedbacks, this will trigger when page will be load
    var urlFeedback = "/api/Feedbacks?date=" + $scope.from + "&request=from";
    API.read(urlFeedback).then(function (response) {
        $scope.showLoading = false;
        var data = response.data;
        if (data.status == "SUCCESS") {
            $scope.processContent(response);
            $scope.pageLoaded = true;
        }
    });
    //-----------------------------------------------End of Page Load Event---------------------------------------

    //process the contents of feedback page
    $scope.processContent = function (response) {
        var data = response.data;
        //to check if user click showmore
        if (!$scope.showMore) {
            //initialize scope.from
            for (x in data.objParam1) {
                $scope.from = data.objParam1[x].feedback_date;
                break;
            }
        }

        //initialize scope.last before page loaded
        if (!$scope.pageLoaded || $scope.showMore) {
            for (x in data.objParam1) {
                $scope.last = data.objParam1[x].feedback_date;
            }
        }

        //initialize totalfeedbacks
        if (!$scope.pageLoaded) {
            $scope.totalFeedbacks = data.intParam1;
            var totalfeedbacksContent = "<div class='form-group col-lg-12' style='border-bottom:solid 1px; border-top: solid 1px; padding-top: 10px; padding-bottom: 10px;'>" +
                                    "<h3 style='text-transform:capitalize;'>" + $filter('number')($scope.totalFeedbacks, "0") + " Feedback(s)</h3>" +
                                 "</div>";
            angular.element(document.querySelector('#feedbackcount')).html(totalfeedbacksContent);
        }

        if (data.status == "SUCCESS") {
            for (x in data.objParam1) {
                //increment total feedbacks  after page loaded/everytime the application retrieve new feedbacks
                if ($scope.pageLoaded && !$scope.showMore) {
                    $scope.totalFeedbacks = $scope.totalFeedbacks + 1;
                }
                var content = "<div ng-repeat='feedback in feedbacks'>" +
                                    "<div class='form-group col-lg-12'>" +
                                        "<strong>" + data.objParam1[x].username + "&emsp;" + "</strong>" +
                                        "<i>" + $filter('date')(data.objParam1[x].feedback_date, "MM/dd/yyyy hh:mm:ss a ") + "</i>" +
                                    "</div>" +
                                    "<div class='form-group col-lg-12' style='border-bottom: gray solid 1px; padding-bottom: 10px;'>" +
                                        data.objParam1[x].feedback1 +
                                    "</div>" +
                              "</div>";
                //prepend during retrieving of new feedbacks
                if ($scope.timerstarted && !$scope.showMore) {
                    angular.element(document.querySelector('#feedbackrepeat')).prepend(content);
                }

                    //else if (!$scope.showMore) {
                    //    angular.element(document.querySelector('#feedbackrepeat')).append(content);
                    //}
                else
                    angular.element(document.querySelector('#feedbackshowmore')).append(content);
            }
            //update total feedbacks content
            if ($scope.pageLoaded) {
                var totalfeedbacksContent = "<div class='form-group col-lg-12' style='border-bottom:solid 1px; border-top: solid 1px; padding-top: 10px; padding-bottom: 10px;'>" +
                                        "<h3 style='text-transform:capitalize;'>" + $filter('number')($scope.totalFeedbacks, "0") + " Feedback(s)</h3>" +
                                     "</div>";
                angular.element(document.querySelector('#feedbackcount')).html(totalfeedbacksContent);
            }
        }
    };
    //Get feedbacks function, this will trigger every 5 seconds
    $scope.getFeedback = function () {
        var urlFeedback = "/api/Feedbacks?date=" + $scope.from + "&request=from";;
        API.read(urlFeedback).then(function (response) {
            var data = response.data;
            if (data.status == "SUCCESS") {
                $scope.showMore = false;
                $scope.processContent(response);
            }
        });
    };
    //show more feedback by adding 10
    $scope.showMoreFeedbacks = function () {
        var urlShowMoreFeedBacks = "/api/Feedbacks?date=" + $scope.last + "&request=last";
        API.read(urlShowMoreFeedBacks).then(function (response) {
            $scope.showMore = true;
            $scope.processContent(response);
            //reset show more to prevent conflict of appending ang prepending of feedbacks
            $scope.showMore = false;
        });
    };
    //call getfeedback function in 5 sec
    $interval(function () {
        $scope.getFeedback();
        $scope.timerstarted = true;
        //angular.element('#getFeedBackButton').trigger('click');
    }, 10000);
    //send feedback form
    $scope.sendFeedbackForm = function (information) {
        $scope.message = "";
        $scope.showLoadingImage();
        var urlCheckIfLogged = "/api/Users?parameter=" + $scope.userNameHolder + "&request=CheckIfLogged";
        API.read(urlCheckIfLogged).then(function (response) {
            var data = response.data;
            if (data.status == "FAILED") {
                $scope.closeLoadingImage();
                $scope.showUserName = false;
                $scope.smallMessage = "Please login before leaving feedback.";
                $scope.showMessageModal();
            }

            else {
                var urlSaveFeedback = "/api/Feedbacks";
                API.save(urlSaveFeedback, information).then(function (response) {
                    var data = response.data;
                    if (data.status == "SUCCESS") {
                        $scope.getFeedback();
                        $scope.closeLoadingImage();
                    }
                });
            }
        });
    };
};
function ApartmentController($scope, $interval, $filter, restAPI) {
    //-----------------------------------------------Page Load Event---------------------------------------
    var API = restAPI;
    var stop;
    $scope.userNameHolder = "";
    $scope.format = 'MM/dd/yyyy hh:mm:ss a';
    $scope.showLoading = false;
    $scope.showMessage = false;
    $scope.showLargeMessage = false;
    $scope.smallMessage = false;
    $scope.showLogin = false;
    $scope.showUserName = false;
    $scope.showSignup = false;
    $scope.showActivator = false;
    $scope.showChangePassword = false;
    $scope.showForgotPassword = false;
    $scope.showForgotActivatorCode = false;
    $scope.ip = "";

    $scope.showLoginForm = function () {
        $scope.message = ""
        stop = $interval(function () {
            $scope.showLogin = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showSignupForm = function () {
        $scope.showLogin = false;
        $scope.message = ""
        stop = $interval(function () {
            $scope.showSignup = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showActivatorForm = function () {
        $scope.showActivator = true;
        $interval.cancel(stop);
        $scope.message = ""
        $scope.showLogin = false;
        stop = $interval(function () {
            $scope.showActivator = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showChangePasswordForm = function () {
        $scope.message = ""
        stop = $interval(function () {
            $scope.showChangePassword = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showForgotActivatorCodeForm = function () {
        $scope.message = ""
        $scope.showChangePassword = false;
        stop = $interval(function () {
            $scope.showForgotActivatorCode = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showForgotPasswordForm = function () {
        $scope.message = "";
        $scope.showLogin = false;
        stop = $interval(function () {
            $scope.showForgotPassword = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showMessageModal = function () {
        stop = $interval(function () {
            $scope.showMessage = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showLoadingImage = function () {
        stop = $interval(function () {
            $scope.showLoading = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 100);
    };
    $scope.showLargeMessageModal = function () {
        stop = $interval(function () {
            $scope.showLargeMessage = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.closeSignupForm = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.closeLoginForm();
        $scope.showSignup = false;
    };
    $scope.closeLoginForm = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showLogin = false;
    };
    $scope.closeChangePasswordForm = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showChangePassword = false;
    };
    $scope.closeForgotActivatorCodeForm = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showForgotActivatorCode = false;
    };
    $scope.closeForgotPasswordForm = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showForgotPassword = false;
    };
    $scope.closeMessage = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showMessage = false;
    };
    $scope.closeLargeMessage = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showLargeMessage = false;
    };
    $scope.closeActivator = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showActivator = false;
    };
    $scope.closeLoadingImage = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showLoading = false;
    };

    //get visitor count
    $scope.showLoadingImage();
    var urlVisitors = "/api/Visiteds";
    API.read(urlVisitors).then(function (response) {
        var data = response.data;
        if (data.param1 == "SUCCESS") {
            //initialize visitor count
            var visitorCounts = "<div>" +
                                   "<strong>Visitor Count:&nbsp;" + data.intParam1 + "</strong>" +
                                "</div>";
            angular.element(document.querySelector('#visitorcount')).html(visitorCounts);

            var information = { ipaddress: 'dummy' };
            API.save(urlVisitors, information).then(function (response) {
                $scope.closeLoadingImage();
                var data = response.data;
                if (data.param1 == "SUCCESS") {
                    //update visitor count
                    var visitorCounts = "<div>" +
                                            "<strong>Visitor Count:&nbsp;" + data.intParam1 + "</strong>" +
                                        "</div>";
                    angular.element(document.querySelector('#visitorcount')).html(visitorCounts);
                }
            });
        }
    });
    //check if logged
    var urlCheckIfLogged = "/api/Users?parameter=" + $scope.userNameHolder + "&request=CheckIfLogged";
    API.read(urlCheckIfLogged).then(function (response) {
        var data = response.data;
        if (data.status == "FAILED")
            $scope.showUserName = false;

        else {
            $scope.userNameHolder = data.param1;
            $scope.showUserName = true;
        }
    });
    //send login request
    $scope.loginRequest = function (information) {
        $scope.message = "";
        $scope.showLoadingImage();
        var url = "/api/Users?parameter=" + information.username + "&request=login";
        API.read(url).then(function (response) {
            if (response.data == null) {
                $scope.closeLoadingImage();
                $scope.message = "Account doesn't exist, please enter again.";
            }
            else {
                var data = response.data;
                if (data.password != information.password) {
                    $scope.closeLoadingImage();
                    $scope.message = "Incorrect password, please enter again.";
                }
                else if (data.isActivate == 0) {
                    //display activator form if not yet activated
                    information.username = "";
                    information.password = "";
                    $scope.closeLoadingImage();
                    $scope.closeLoginForm();
                    $scope.showActivatorForm();
                }
                else {
                    $scope.closeLoadingImage();
                    $scope.userNameHolder = information.username;
                    $scope.closeLoginForm();
                    information.username = "";
                    information.password = "";
                    $scope.showUserName = true;
                }
            }
        });
    };
    //send sign up form
    $scope.SignUpRequest = function (information) {
        $scope.message = "";
        $scope.showLoadingImage();
        if (information.password != information.cpassword) {
            $scope.closeLoadingImage();
            $scope.message = "Password does not match, please enter again.";
        }
        else {
            var url = "/api/Users?parameter=" + information.username + "&request=login";
            API.read(url).then(function (response) {
                var data = response.data;
                if (data != null) {
                    $scope.closeLoadingImage();
                    $scope.message = "Username is already used, please choose a new one.";
                }
                else {
                    var url = "api/Users"; //?parameter=" + codeGenerator();
                    API.save(url, information).then(function (response) {
                        var data = response.data;
                        if (data.status == "FAILED" && data.param1 == "Gmailer") {
                            $scope.closeLoadingImage();
                            $scope.largeMessage = data.param2;
                            $scope.showLargeMessageModal();
                        }
                            //check if email is already used
                        else if (data.status == "FAILED" && data.param1 != "Gmailer") {
                            $scope.closeLoadingImage();
                            $scope.message = data.param1;
                        }
                        else {
                            $scope.closeLoadingImage();
                            information.username = "";
                            information.emailaddress = "";
                            information.contactno = "";
                            information.password = "";
                            information.cpassword = "";
                            $scope.closeSignupForm();
                            $scope.showActivatorForm();
                        }
                    });
                }
            });
        }
    };
    //send change password request
    $scope.changePasswordRequest = function (information) {
        $scope.showLoadingImage();
        $scope.message = "";
        var urlChangePassword = "/api/Users?updateUser=" + $scope.userNameHolder + "&code=none&request=changePassword";
        API.edit(urlChangePassword, information).then(function (response) {
            var data = response.data;
            if (information.password != information.cpassword) {
                $scope.closeLoadingImage();
                $scope.message = "Please reconfirm new password.";
            }
            else if (data.status == "FAILED") {
                $scope.closeLoadingImage();
                $scope.message = data.param1;
            }
            else {
                $scope.closeLoadingImage();
                $scope.smallMessage = data.param1;
                $scope.closeChangePasswordForm();
                $scope.logoutRequest();
            }
        });
    };
    //send forgot activator code request
    $scope.forgotActivatorCodeRequest = function (information) {
        $scope.showLoadingImage();
        $scope.message = "";
        var urlForgotActivatorCode = "/api/Users?parameter=" + information.emailaddress + "&request=forgotActivatorCode";
        API.read(urlForgotActivatorCode).then(function (response) {
            var data = response.data;
            if (data.status == "FAILED" && data.param1 == "Gmailer") {
                $scope.closeLoadingImage();
                $scope.largeMessage = data.param2;
                $scope.showLargeMessageModal();
            }
            else if (data.status == "FAILED" && data.param1 != "Gmailer") {
                $scope.closeLoadingImage();
                $scope.message = data.param1;
            }
            else {
                $scope.closeLoadingImage();
                $scope.smallMessage = data.param1;
                $scope.closeForgotActivatorCodeForm();
                $scope.showMessageModal();
            }
        });
    };
    //send forgot password request
    $scope.forgotPasswordRequest = function (information) {
        $scope.showLoadingImage();
        $scope.message = "";
        var urlForgotPassword = "/api/Users?parameter=" + information.emailaddress + "&request=forgotPassword";
        API.read(urlForgotPassword).then(function (response) {
            $scope.message = "";
            var data = response.data;
            if (data.status == "FAILED" && data.param1 == "Gmailer") {
                $scope.closeLoadingImage();
                $scope.largeMessage = data.param2;
                $scope.showLargeMessageModal();
            }
            else if (data.status == "FAILED" && data.param1 != "Gmailer") {
                $scope.closeLoadingImage();
                $scope.message = data.param1;
            }
            else {
                $scope.closeLoadingImage();
                $scope.smallMessage = data.param1;
                $scope.closeForgotPasswordForm();
                $scope.showMessageModal();
            }

        });
    };
    //send activator form
    $scope.SendActivator = function (information) {
        $scope.showLoadingImage();
        $scope.message = "";
        var url = "/api/Users?updateUser=" + information.username + "&code=" + information.activator + "&request=login";
        API.edit(url, information).then(function (response) {
            var data = response.data;
            if (data.username == "FAILED") {
                $scope.closeLoadingImage();
                $scope.message = "User not found, please enter again.";
            }
            else if (data.username == "INVALID") {
                $scope.closeLoadingImage();
                $scope.message = "Invalid code, please enter again.";
            }
            else {
                $scope.closeLoadingImage();
                $scope.closeLoginForm();
                $scope.closeActivator();
                $scope.smallMessage = "Account successfully activated,feel free to feedback or contact us. Thank you! ";
                $scope.userNameHolder = information.username;
                information.username = "";
                information.activator = "";
                $scope.showUserName = true;
                $scope.showMessageModal();
            }
        });
    };
    //send logout request
    $scope.logoutRequest = function () {
        $scope.message = "";
        $scope.showLoadingImage();
        var urlLogout = "/api/Users?parameter=none&request=logout";
        API.read(urlLogout).then(function (response) {
            var data = response.data;
            if (data.status == "SUCCESS") {
                $scope.closeLoadingImage();
                $scope.showUserName = false;
                $scope.userNameHolder = "";
            }
            else
                $scope.closeLoadingImage();
        })
    };
    //get visitor count every 1 sec
    $interval(function () {
        API.read(urlVisitors).then(function (response) {
            var data = response.data;
            if (data.param1 == "SUCCESS") {
                //initialize visitor count
                var visitorCounts = "<div>" +
                                       "<strong>Visitor Count:&nbsp;" + data.intParam1 + "</strong>" +
                                    "</div>";
                angular.element(document.querySelector('#visitorcount')).html(visitorCounts);
            }
        });
    }, 1000);
    //remove somee ads every 1 sec
    $interval(function () {
        $(document).ready(function () {
            $("div[style='opacity: 0.9; z-index: 2147483647; position: fixed; left: 0px; bottom: 0px; height: 65px; right: 0px; display: block; width: 100%; background-color: #202020; margin: 0px; padding: 0px;']").remove();
            $("div[style='margin: 0px; padding: 0px; left: 0px; width: 100%; height: 65px; right: 0px; bottom: 0px; display: block; position: fixed; z-index: 2147483647; opacity: 0.9; background-color: rgb(32, 32, 32);']").remove();
            $("div[style='height: 65px;']").remove();
            $("div[onmouseover='S_ssac();']").remove();
            $("center").remove();
        });
    }, 1000);
};
function ContactController($scope, $interval, restAPI) {
    var API = restAPI;
    var stop;
    $scope.showLoading = false;
    $scope.showMessage = false;
    $scope.showLargeMessage = false;
    $scope.smallMessage = false;

    $scope.showMessageModal = function () {
        stop = $interval(function () {
            $scope.showMessage = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.showLoadingImage = function () {
        stop = $interval(function () {
            $scope.showLoading = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 100);
    };
    $scope.showLargeMessageModal = function () {
        stop = $interval(function () {
            $scope.showLargeMessage = true;
            $interval.cancel(stop);
            stop = undefined;
        }, 500);
    };
    $scope.closeLoadingImage = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showLoading = false;
    };
    $scope.closeMessage = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showMessage = false;
    };
    $scope.closeLargeMessage = function () {
        $interval.cancel(stop);
        stop = undefined;
        $scope.showLargeMessage = false;
    };
    //send contact form
    $scope.sendContactForm = function (information) {
        if (information.emailaddress == null)
            information.emailaddress = "";
        $scope.showLoadingImage();
        $scope.message = "";
        var url = "/api/Contact_Form";
        API.save(url, information).then(function (response) {
            var data = response.data;
            if (data.status == "FAILED" && data.param1 == "Gmailer") {
                $scope.closeLoadingImage();
                $scope.largeMessage = data.param2;
                $scope.showLargeMessageModal();
            }
            else {
                $scope.closeLoadingImage();
                $scope.smallMessage = data.param1;
                $scope.showMessageModal();
                information.name = "";
                information.emailaddress = "";
                information.phoneno = "";
                information.messages = "";
            }
        });
    };
};