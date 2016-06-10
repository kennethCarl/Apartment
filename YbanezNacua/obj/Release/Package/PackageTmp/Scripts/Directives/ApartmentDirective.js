var infoModal = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //templateUrl: '/Template/Message',
        template: "<div class='modal fade modal-message-modal-sm' data-backdrop='static' data-keyboard='false' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog modal-sm'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' ng-click='closeMessage()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-2 glyphicon glyphicon-info-sign'></div>" +
                                        "<div class='col-md-10'><h6 class='modal-title'><strong>Nacua-Ybanez Aparment</strong></h6></div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "{{smallMessage}}" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<input class='btn btn-success' type='submit' value='Okay' ng-click='closeMessage()' />" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
var infoLargeModal = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //templateUrl: '/Template/LargeMessage',
        template: "<div class='modal fade' data-backdrop='static' data-keyboard='false' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' ng-click='closeLargeMessage()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-1 glyphicon glyphicon-info-sign'></div>" +
                                        "<div class='col-md-11'><h6 class='modal-title'><strong>Nacua-Ybañez Aparment</strong></h6></div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "{{largeMessage}}" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<input class='btn btn-success' type='submit' value='Okay' ng-click='closeLargeMessage()' />" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
var loginModal = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //templateUrl: '/Template/Login',
        template: "<div class='modal fade' data-backdrop='static' data-keyboard='false' role='dialog' aria-hidden='true' id='modalLogin'>" +
                        "<div class='modal-dialog'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' ng-click='closeLoginForm()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-10'><h4 class='modal-title'>Login Form</h4></div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "<div class='row'>" +
                                        "<div class='col-lg-12 error-message'>{{message}}</div>" +
                                    "</div>" +
                                    "<div class='clear-fix'></div>" +
                                    "<form id='LoginForm' ng-submit='loginRequest(information)'>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Username</label>" +
                                                "<input class='form-control' type='text' name='username' ng-model='information.username' placeholder='Please input username here...' pattern='.{4,50}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Password</label>" +
                                                "<input class='form-control' type='password' name='password' ng-model='information.password' placeholder='Please input password here...' pattern='.{0,50}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                    "</form>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<div class='row'>" +
                                        "<div class='col-lg-12'>" +
                                            "<input class='btn btn-success' type='submit' value='Login' form='LoginForm' />" +
                                            "<div class='btn btn-danger ' ng-click='closeLoginForm()'>Cancel</div>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='row'>" +
                                        "<div class='col-lg-12'>" +
                                            "Forgot Password?<i><a href='' ng-click='showForgotPasswordForm()'>Click Here.</a></i><br>" +
                                            "Don't have an account yet?<i><a href='' ng-click='showSignupForm()'>Click Here.</a></i>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
var signUpModal = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //templateUrl: '/Template/Signup',
        template: "<div class='modal fade' data-backdrop='static' data-keyboard='false' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' ng-click='closeSignupForm()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-10'><h4 class='modal-title'>Sign Up Form</h4></div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "<div class='row'>" +
                                        "<div class='col-lg-12 error-message'>{{message}}</div>" +
                                    "</div>" +
                                    "<div class='clear-fix'></div>" +
                                    "<form id='SignupForm' ng-submit='SignUpRequest(information)'>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Username</label>" +
                                                "<input class='form-control' type='text' name='username' ng-model='information.username' placeholder='Please input Username(at least 4-20 characters long)' pattern='.{4,20}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Email Address</label>" +
                                                "<input class='form-control' type='email' name='emailaddress' ng-model='information.emailaddress' pattern='.{0,50}' placeholder='Please input Email Address here...' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Contact Number</label>" +
                                                "<input class='form-control' type='tel' name='contactno' ng-model='information.contactno' placeholder='Please input Contact Number(at least 7 digits long)' pattern='.{7,11}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Password</label>" +
                                                "<input class='form-control' type='password' name='password' ng-model='information.password' placeholder='Please input Password at most 20 characters long...' pattern='.{0,20}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Confirm Password</label>" +
                                                "<input class='form-control' type='password' name='cpassword' ng-model='information.cpassword' placeholder='Please confirm your password...' pattern='.{0,20}' required>" +
                                            "</div>" +
                                        "</div>" +
                                    "</form>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<input class='btn btn-success' type='submit' value='Sign Up' form='SignupForm' />" +
                                    "<div class='btn btn-danger' ng-click='closeSignupForm()'>Cancel</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
var changePassword = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //templateUrl: '/Template/ChangePassword',
        template: "<div class='modal fade' data-backdrop='static' data-keyboard='false' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' ng-click='closeChangePasswordForm()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-10'><h4 class='modal-title'>Change Password Form</h4></div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "<form id='ChangePasswordForm' ng-submit='changePasswordRequest(information)'>" +
                                        "<div class='row'>" + 
                                            "<div class='col-lg-12 error-message'>{{message}}</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>New Password</label>" +
                                                "<input class='form-control' type='password' name='password' ng-model='information.password' placeholder='Please input new password here...' pattern='.{0,50}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Confirm Password</label>" +
                                                "<input class='form-control' type='password' name='cpassword' ng-model='information.cpassword' placeholder='Please confirm password here...' pattern='.{0,50}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Old Password</label>" +
                                                "<input class='form-control' type='password' name='username' ng-model='information.username' placeholder='Please input old password here...' pattern='.{0,50}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Activator Code</label>" +
                                                "<input class='form-control' type='text' name='generatedCode' ng-model='information.generatedCode' pattern='.{0,5}' placeholder='Please input activator code here...' required>" +
                                            "</div>" +
                                        "</div>" +
                                    "</form>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<div class='row'>" +
                                        "<div class='col-lg-12'>" +
                                            "<input class='btn btn-success' type='submit' value='Change Password' form='ChangePasswordForm' />" +
                                            "<div class='btn btn-danger ' ng-click='closeChangePasswordForm()'>Cancel</div>" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='row'>" +
                                        "<div class='col-lg-12'>" +
                                            "Forgot Activator Code?<i><a href='' ng-click='showForgotActivatorCodeForm()'>Click Here.</a></i>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
var forgotActivatorCode = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //templateUrl: '/Template/ForgotActivatorCode',
        template: "<div class='modal fade' data-backdrop='static' data-keyboard='false' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' ng-click='closeForgotActivatorCodeForm()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-10'><h4 class='modal-title'>Forgot Activator Code Form</h4></div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "<div class='row'>" +
                                        "<div class='col-lg-12 error-message'>{{message}}</div>" +
                                    "</div>" +
                                    "<div class='clear-fix'></div>" +
                                    "<form id='forgotActivatorCodeForm' ng-submit='forgotActivatorCodeRequest(information)'>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Email Address</label>" +
                                                "<input class='form-control' type='email' name='emailaddress' ng-model='information.emailaddress' placeholder='Please input email address here...' pattern='.{0,50}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                    "</form>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<input class='btn btn-success' type='submit' value='Submit' form='forgotActivatorCodeForm' />" +
                                    "<div class='btn btn-danger ' ng-click='closeForgotActivatorCodeForm()'>Cancel</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
var forgotPassword = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //templateUrl: '/Template/ForgotPassword',
        template: "<div class='modal fade' data-backdrop='static' data-keyboard='false' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' ng-click='closeForgotPasswordForm()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-10'><h4 class='modal-title'>Forgot Password Form</h4></div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "<div class='row'>" +
                                        "<div class='col-lg-12 error-message'>{{message}}</div>" +
                                    "</div>" +
                                    "<div class='clear-fix'></div>" +
                                    "<form id='forgotPasswordForm' ng-submit='forgotPasswordRequest(information)'>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Email Address</label>" +
                                                "<input class='form-control' type='email' name='emailaddress' ng-model='information.emailaddress' placeholder='Please input email address here...' pattern='.{0,50}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                    "</form>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<input class='btn btn-success' type='submit' value='Submit' form='forgotPasswordForm' />" +
                                    "<div class='btn btn-danger ' ng-click='closeForgotPasswordForm()'>Cancel</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
var draggableModal = function ($document) {
    return function (scope, element, attr) {
        var startX = 0, startY = 0; x = 0; y = 0;

        element.css({
            position: 'relative',
            backgroudColor: 'lightGrey',
            cursor: 'pointer'
        });

        element.on('mousedown', function (event) {
            // Prevent default dragging of selected content
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {

            y = event.pageY - startY;
            x = event.pageX - startX;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.off('mousemove', mousemove);
            $document.off('mouseup', mouseup);
        }
    };//end of return
};
var timeModal = function ($interval, dateFilter) {
    function link(scope, element, attrs) {
        var format, timeoutId;

        function updateTime() {
            element.text(dateFilter(new Date(), format));
        }
        scope.$watch(attrs.timeModal, function (value) {
            format = value;
            updateTime();
        });
        element.on('$destroy', function () {
            $interval.cancel(timeoutId);
        });

        // start the UI update process; save the timeoutId for canceling
        timeoutId = $interval(function () {
            updateTime(); // update DOM
        }, 1000);
    }

    return {
        link: link
    };//end if return
};
var activatorModal = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //scope: {
        //        messageInfo:"=message"
        //},
        //templateUrl: '/Template/Activator',
        template: "<div class='modal fade' data-backdrop='static' data-keyboard='false' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog'>" +
                            "<div class='modal-content'>" +
                                "<div class='modal-header'>" +
                                    "<button type='button' class='close' ng-click ='closeActivator()' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
                                    "<div class='row'>" +
                                        "<div class='col-md-2 glyphicon glyphicon-info-sign'></div>" +
                                        "<div class='col-md-10'><h6 class='modal-title'><strong>Nacua-Ybañez Aparment</strong></h6></div>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='modal-body'>" +
                                    "<form id='ActivatorForm' ng-submit='SendActivator(information)'>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "Please activate your account by providing the details below, use the code that we send to your email account." +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='col-lg-12 error-message'>{{message}}</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Username</label>" +
                                                "<input class='form-control' type='text' name='username' ng-model='information.username' placeholder='Please input Username here...' pattern='.{4,50}' required>" +
                                            "</div>" +
                                        "</div>" +
                                        "<div class='clear-fix'></div>" +
                                        "<div class='row'>" +
                                            "<div class='form-group col-lg-12'>" +
                                                "<label>Code</label>" +
                                                "<input class='form-control' type='text' name='activator' ng-model='information.activator' pattern='.{0,5}' placeholder='Please input activator code here...' required>" +
                                            "</div>" +
                                        "</div>" +
                                    "</form>" +
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<input class='btn btn-success' type='submit' value='Activate' form='ActivatorForm' />" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};
var loadingModal = function () {
    return {
        restrict: 'EAC',
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        scope: true,
        //templateUrl: '/Template/Loading',
        template: "<div data-controls-modal='loading' data-backdrop='static' data-keyboard='false' class='modal fade' role='dialog' aria-hidden='true'>" +
                        "<div class='modal-dialog' style='padding-top: 200px'>" +
                            "<img src='/Images/loading.GIF' class='img-responsive img-center' />" +
                        "</div>" +
                    "</div>",
        link: function link(scope, element, attrs) {
            //you can add new scope here for reference
            //scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
};

angular.module('Apartment').directive('draggableModal', ['$document', draggableModal]);
angular.module('Apartment').directive('infoModal', infoModal);
angular.module('Apartment').directive('infoLargeModal', infoLargeModal);
angular.module('Apartment').directive('loginModal', loginModal);
angular.module('Apartment').directive('signUpModal', signUpModal);
angular.module('Apartment').directive('changePassword', changePassword);
angular.module('Apartment').directive('forgotActivatorCode', forgotActivatorCode);
angular.module('Apartment').directive('forgotPassword', forgotPassword);
angular.module('Apartment').directive('timeModal', ['$interval', 'dateFilter', timeModal]);
angular.module('Apartment').directive('activatorModal', activatorModal);
angular.module('Apartment').directive('loadingModal', loadingModal);