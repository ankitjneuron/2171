module.exports = function(grunt) {
    var projectjsfile = [
                            'public/app.js',
                            'public/config.js',
                            'public/appScripts/common/directives/directive.js',
                            'public/appScripts/common/factory/interceptor.js',
                            'public/appScripts/common/utility/validatorApp.js',
                            'public/appScripts/common/factory/CommonUtility.js',
                            'public/appScripts/common/controllers/BaseController.js',
                            'public/appScripts/common/services/UtilityService.js',
                            'public/appScripts/auth/controllers/AuthController.js',
                            'public/appScripts/auth/services/AuthService.js',
                            'public/appScripts/admin/controllers/CategoryController.js',
                            'public/appScripts/admin/services/CategoryService.js',
                            'public/appScripts/admin/controllers/ListingController.js',
                            'public/appScripts/admin/services/ListingService.js',
                            'public/appScripts/admin/controllers/UsersController.js',
                            'public/appScripts/admin/services/UsersService.js',
                            'public/appScripts/admin/controllers/AdminDashboardController.js',
                            'public/appScripts/admin/controllers/AdminProfileController.js',
                            'public/appScripts/admin/services/AdminProfileService.js',
                            'public/appScripts/user/services/UserProfileService.js',
                            'public/appScripts/user/controllers/UserProfileController.js',
                            'public/appScripts/admin/controllers/BusinessPageController.js',
                            'public/appScripts/site/controllers/SiteController.js',
                            'public/appScripts/admin/controllers/CmsController.js',
                            'public/appScripts/admin/services/CmsService.js',
                            'public/appScripts/site/services/SiteService.js',
                            'public/appScripts/user/services/UserCalendarService.js',
                            'public/appScripts/user/controllers/UserCalendarController.js',
                            'public/appScripts/user/controllers/ManageListingController.js',
                            'public/appScripts/user/services/ManageListingService.js',
                            'public/appScripts/user/controllers/ManageDoctorsController.js',
                            'public/appScripts/user/services/ManageDoctorsService.js',
                            'public/appScripts/user/controllers/UserDashboardController.js',
                            'public/appScripts/user/services/UserDashboardService.js',
                            'public/appScripts/user/controllers/BusinessHourController.js',
                            'public/appScripts/user/services/ManageBusinessHourService.js',
                            'public/appScripts/user/controllers/AppointmentReportController.js',
                            'public/appScripts/user/services/AppointmentReportService.js',
                           // 'public/appScripts/common/filters/truncateEventTitle.js',
                           // 'public/appScripts/common/directives/mwlcalendar.js',
                           // 'public/appScripts/common/directives/mwlcalendaryear.js',
                            //'public/appScripts/common/directives/mwlcalendarmonth.js',
                            //'public/appScripts/common/directives/mwlcalendarweek.js',
                            //'public/appScripts/common/directives/mwlcalendarday.js',
                            //'public/appScripts/common/services/calendarhelper.js',
                            //'public/appScripts/common/services/moment.js'
    ];
// Gruntfile.js
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
//    pkg: grunt.file.readJSON('package.json'),
//
//    ...

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'public/build/script.min.js': projectjsfile
                }
            }
        },
        concat: {
            options: {
                separator: '\n;\n\n'
            },
            dist: {
                src: ["public/js/jquery.min.js",
                    "public/js/bootstrap.min.js",
                    "public/js/owl.carousel.js",
                    "public/js/wow.min.js",
                    "public/js/bootstrap-select.js",
                    "public/vendor/angular/angular.min.js",
                    "public/vendor/angular-bootstrap/ui-bootstrap.min.js",
                    "public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js",
                    "public/vendor/angular-ui-router/release/angular-ui-router.min.js",
                    "public/vendor/ngstorage/ngStorage.min.js",
                    "public/vendor/angular-resource/angular-resource.min.js",
                    "public/vendor/lodash/dist/lodash.min.js",
                    "public/js/angularjs-dropdown-multiselect.min.js",
                    "public/vendor/angular-validation/dist/angular-validation.min.js",
                    "public/vendor/angular-validation/dist/angular-validation-rule.min.js",
                    "public/vendor/toastr/toastr.min.js",
                    "public/vendor/mCustomScrollbar/js/jquery.mCustomScrollbar.min.js",
                    "public/vendor/angular-ui-switch/angular-ui-switch.min.js",
                    "public/vendor/angular-ui-mask/dist/mask.min.js",
                    "public/js/angular-scroll.js",
                    "public/js/bootbox.min.js",
                    "public/vendor/ngBootbox/ngBootbox.js",
                    "public/templates/moment.min.js",
                    "public/vendor/angular-svg-round-progressbar/build/roundProgress.min.js",
                    //"public/js/ui-bootstrap-tpls-0.14.3.min.js",
                ],
                dest: 'public/build/all.min.js'
            }
        },
        jshint: {
            beforeconcat: projectjsfile,
            afterconcat: ['public/build/script.min.js']
        },
        watch: {
            scripts: {
                files: projectjsfile,
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            },
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/build/combine.css': [
                        //'public/css/bootstrap.css',
                        //'public/vendor/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'cssmin', 'watch']);
};