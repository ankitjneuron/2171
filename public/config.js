/**
 * Created by hp on 26/10/2015.
 */
!(function () {
    'use strict';

    angular.module('bayaApp').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                    .state("root", {
                        url: "",
                        views: {
                            'header': {
                                templateUrl: 'partials/home/header.html',
                            },
                            'content': {
                                templateUrl: 'partials/home/home.html',
                                controller: 'BaseController'
                            },
                            'footer': {
                                templateUrl: 'partials/home/footer.html'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                            adminAuthenticate: true, 
                        }
                    })
                    .state("root.for-doctor", {
                        url: "/for-doctor",
                        views: {
                            'content@': {
                                templateUrl: 'partials/home/for-doctor.html',
                                controller: 'BaseController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                        }
                    })
                    .state("root.home", {
                        url: "/",
                        views: {
                            'content@': {
                                templateUrl: 'partials/home/home.html',
                                controller: 'BaseController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                        }
                    })
                    .state("root.index", {
                        url: "/home",
                        views: {
                            'content@': {
                                templateUrl: 'partials/home/home.html',
                                controller: 'BaseController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                        }
                    })
                     .state("root.booking", {
                        url: "/booking",
                        views: {
                            'content@': {
                                templateUrl: 'partials/home/booking.html',
                                controller: 'BaseController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                        }
                    })
                    .state("root.login", {
                        url: "/login",
                        views: {
                            'content@': {
                                templateUrl: 'partials/auth/login.html',
                                controller: 'AuthController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                            isStaticPage: true,
                        }
                    })
                    .state("root.verifylogin", {
                        url: "/login/:status",
                        views: {
                            'content@': {
                                templateUrl: 'partials/auth/login.html',
                                controller: 'AuthController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                            isStaticPage: true,
                        }
                    })
                    .state("root.forgotpassword", {
                        url: "/forgot-password",
                        views: {
                            'content@': {
                                templateUrl: 'partials/auth/forgot-password.html',
                                controller: 'AuthController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                            isStaticPage: true,
                        }
                    })
                     .state("root.resetpassword", {
                        url: "/reset-password/:id",
                        views: {
                            'content@': {
                                templateUrl: 'partials/auth/reset-password.html',
                                controller: 'AuthController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                            isStaticPage: true,
                        }
                    })
                    .state("root.signup", {
                        url: "/signup",
                        views: {
                            'content@': {
                                templateUrl: 'partials/auth/signup.html',
                                controller: 'AuthController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                            isStaticPage: true,
                        }
                    })
                    .state("root.listing", {
                        url: "/listing",
                        views: {
                            'content@': {
                                templateUrl: 'partials/site/listing.html',
                                controller: 'SiteController'
                            }
                        },
                        data: {
//                            isAuthenticate: false, //required
                              loginUserType: 'business_user'
                        }
                    })
                    .state("root.doctordetails", {
                        url: "/doctor-details/:id",
                        views: {
                            'content@': {
                                templateUrl: 'partials/site/doctor-details.html',
                                controller: 'SiteController'
                            }
                        },
                        data: {
//                            isAuthenticate: false, //required
                        }
                    })
                    .state("root.pagedetail", {
                        url: "/page/:slug",
                        views: {
                            'content@': {
                                templateUrl: 'partials/site/page.html',
                                controller: 'SiteController'
                            }
                        },
                        data: {
                            //isAuthenticate: false, //required
                           // isStaticPage: true,
                        }
                    })
                    .state("login", {
                        url: "/admin",
                        views: {
                            'content@': {
                                templateUrl: 'partials/auth/admin-login.html',
                                controller: 'AuthController'
                            }
                        },
                        data: {
                            isAuthenticate: false, //required
                            isStaticPage: true
                        }
                    })
                    .state("admin", {
                        url: "",
                        views: {
//                            'header': {
//                                templateUrl: 'partials/admin/include/header.html',
//                            },
                            '@subheader': {
                                templateUrl: 'partials/admin/include/subheader.html'
                            },
//                            'footer': {
//                                templateUrl: 'partials/admin/include/footer.html'
//                            },
                            '@left': {
                                templateUrl: 'partials/admin/include/left.html'
                            },
                        },
                        data: {
                            isAuthenticate: false, //required
                            loginUserType: 'admin'
                        }
                    })
                    .state("admin.dashboard", {
                        url: "/admin/dashboard",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/dashboard.html',
                                controller: 'AdminDashboardController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.listing", {
                        url: "/admin/listing",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/listing.html',
                                controller: 'ListingController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                      .state("admin.addlisting", {
                        url: "/admin/add-listing",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/add-listing.html',
                                controller: 'ListingController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.updatelisting", {
                        url: "/admin/update-listing/:id",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/add-listing.html',
                                controller: 'ListingController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.businesspages", {
                        url: "/admin/business-pages",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/business-pages.html',
                                 controller: 'BusinessUserController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                     .state("admin.businessview", {
                        url: "/admin/business-view/:id",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/business-view.html',
                                 controller: 'BusinessUserController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.category", {
                        url: "/admin/category",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/category.html',
                                controller: 'CategoryController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.addcategory", {
                        url: "/admin/add-category",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/add-category.html',
                                controller: 'CategoryController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.editcategory", {
                        url: "/admin/edit-category/:id",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/add-category.html',
                                controller: 'CategoryController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.users", {
                        url: "/admin/users",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/users.html',
                                controller: 'UsersController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.business", {
                        url: "/admin/business",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/business.html',
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.staticpages", {
                        url: "/admin/staticpages",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/static-pages.html',
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.changepassword", {
                        url: "/admin/change-password",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/change-password.html',
                                controller: "AdminProfileController"
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.adminprofile", {
                        url: "/admin/admin-profile",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/admin-profile.html',
                                controller: "AdminProfileController"
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                     .state("admin.claimlisting", {
                        url: "/admin/claim-listing/:id",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/claim-listing.html',
                                controller: 'ListingController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("admin.cmspage", {
                        url: "/admin/cms",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/cms.html',
                                controller: 'CmsController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required                            
                        }
                    })
                    .state("admin.updatecmspage", {
                        url: "/admin/update-page/:id",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/add-cms-page.html',
                                controller: 'CmsController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required                            
                        }
                    })
                     .state("admin.addimage", {
                        url: "/admin/add-image",
                        views: {
                            'content@': {
                                templateUrl: 'partials/admin/add-image.html',
                                controller: 'CmsController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required                            
                        }
                    })
                    .state("user", {
                        url: "",
                        views: {
                            'header': {
                                templateUrl: 'partials/user/include/header.html',
                            },
                            'footer': {
                                templateUrl: 'partials/user/include/footer.html'
                            },
                            '@subheader': {
                                templateUrl: 'partials/user/include/subheader.html'
                            },
                            '@left': {
                                templateUrl: 'partials/user/include/left.html'
                            },
                        },
                        data: {
                            isAuthenticate: true, //required
                            loginUserType: 'business_user'
                        }
                    })
                    .state("user.businessinfo", {
                        url: "/user/business-info",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/business-info.html',
                                controller: 'ManageListingController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                     .state("user.doctorlist", {
                        url: "/user/doctor-list",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/doctor-list.html',
                                controller: 'ManageDoctorsController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                     .state("user.adddoctor", {
                        url: "/user/add-doctor",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/add-doctor.html',
                                controller: 'ManageDoctorsController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.updatedoctor", {
                        url: "/user/update-doctor/:id",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/add-doctor.html',
                                controller: 'ManageDoctorsController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.editbusinessinfo", {
                        url: "/user/edit-business",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/edit-business.html',
                                controller: 'ManageListingController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.managelisting", {
                        url: "/user/manage-listing",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/manage-listing.html',
                                controller: 'ManageListingController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.businesshour", {
                        url: "/user/business-hour",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/business-hour.html',
                                controller: 'BusinessHourController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.calendar", {
                        url: "/user/calendar",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/user-calendar.html',
                                controller: 'UserCalendarController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.dashboard", {
                        url: "/user/dashboard",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/user-dashboard.html',
                                controller: 'UserDashboardController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.changepassword", {
                        url: "/user/change-password",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/change-password.html',
                                 controller: 'UserProfileController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.userprofile", {
                        url: "/user/profile",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/user-profile.html',
                                 controller: 'UserProfileController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    })
                    .state("user.userreport", {
                        url: "/user/report",
                        views: {
                            'content@': {
                                templateUrl: 'partials/user/report.html',
                                controller: 'AppointmentReportController'
                            }
                        },
                        data: {
                            isAuthenticate: true, //required
                            
                        }
                    });


          $httpProvider.interceptors.push('ApiInterceptor');
        }]);
    
    angular.module('bayaApp').run(['$rootScope', '$state', 'UtilityService', function ($rootScope, $state, UtilityService) {
        var loggedInUser;
        
        $rootScope.$on('$stateChangeStart',function(event, toState){
            
            if (((!UtilityService.checkUserLogin()) && toState.data.isAuthenticate)) {
                event.preventDefault();
                $state.go('root.home');
            } else {
                if (UtilityService.checkUserLogin()) {
                    loggedInUser = UtilityService.getUserInfo();
                    if (toState.data.hasOwnProperty('loginUserType')) {
                        if ((toState.data.loginUserType !== loggedInUser.user_type)) {
                            event.preventDefault();
                            if(toState.data.loginUserType==='business_user'){
                                $state.go('admin.dashboard');
                            }else{
                                $state.go('root.home');
                            }
                        }
                    }
                }
                
                var allowStaticPages = toState.data.isStaticPage ? true : false;
                if (UtilityService.checkUserLogin() && !toState.data.isAuthenticate && allowStaticPages) {
                    loggedInUser = UtilityService.getUserInfo();
                    if (loggedInUser.user_type === 'admin') {
                        event.preventDefault();
                        $state.go('admin.dashboard');
                    }

                    if (loggedInUser.user_type === 'business_user') {
                        event.preventDefault();
                        $state.go('user.dashboard');
                    }
                }
                var adminAuthenticate = toState.data.adminAuthenticate ? true : false;
                if (UtilityService.checkUserLogin() && adminAuthenticate) {
                    loggedInUser = UtilityService.getUserInfo();
                    if (loggedInUser.user_type === 'admin') {
                        event.preventDefault();
                        $state.go('admin.dashboard');
                    }
                }
                
                        
            }
        });
    }]);
    
    /*directive for compare password*/
    angular.module('bayaApp').directive("passwordVerify", function () {
        return {
            require: "ngModel",
            scope: {
                passwordVerify: '='
            },
            link: function (scope, element, attrs, ctrl) {
                scope.$watch(function () {
                    var combined;
                    if (scope.passwordVerify || ctrl.$viewValue) {
                        combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, function (value) {
                    if (value) {
                        ctrl.$parsers.unshift(function (viewValue) {
                            var origin = scope.passwordVerify;
                            if (origin !== viewValue) {
                                ctrl.$setValidity("passwordVerify", false);
                                return undefined;
                            } else {
                                ctrl.$setValidity("passwordVerify", true);
                                return viewValue;
                            }
                        });
                    }
                });
            }
        };
    });

})
();
