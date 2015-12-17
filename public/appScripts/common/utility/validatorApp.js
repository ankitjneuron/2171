(function () {
    angular.module('validatorApp', ['validation', 'validation.rule'])

        // -------------------
        // config phase
        // -------------------
        .config(['$validationProvider', function ($validationProvider) {
                $validationProvider.showSuccessMessage = false;
                
                // Setup `check states` validation
                $validationProvider
                .setExpression({
                    checkStates: function (value, scope, element, attrs, param) {
                        if(value.length > 0){
                            return true;
                        }else{
                            return false;
                        }
                        return false;
                    }
                })
                .setDefaultMsg({
                    checkStates: {
                        error: 'State is required.',
                        success: 'Thanks!'
                    }
                });
                
                // Setup `check any service is selected or not.` validation
                $validationProvider
                .setExpression({
                    checkAnyServiceIsSelected: function (value, scope, element, attrs, param) {
                        if(value > 0){
                            return true;
                        }else{
                            return false;
                        }
//                        console.log(value);
//                        return false;
                    }
                })
                .setDefaultMsg({
                    checkAnyServiceIsSelected: {
                        error: 'Please select at least one.',
                        success: 'Thanks!'
                    }
                });
                
                // Setup `check us phone number format` validation
                $validationProvider
                .setExpression({
                    checkUserType: function (value, scope, element, attrs, param) {
                        if((value === "broker") || (value === "seller")){
                            return true;
                        }else{
                            return false;
                        }
                    }
                })
                .setDefaultMsg({
                    checkUserType: {
                        error: 'User type is required.',
                        success: 'Thanks!'
                    }
                });
                
                // Setup `check us phone number format` validation
                $validationProvider
                .setExpression({
                    checkPasswordLength: function (value, scope, element, attrs, param) {
                        value = value.trim();
                        if((value === "")){
                            return true;
                        }else{
                            if((value.length > 0) && ((value.length < 6) || (value.length > 15))){
                                return false;
                            }else{
                                return true;
                            }
                        }
                    }
                })
                .setDefaultMsg({
                    checkPasswordLength: {
                        error: 'Password length should be between 6 to 15 characters.',
                        success: 'Thanks!'
                    }
                });
                 // Setup `check password and confirm pasword compare` validation
                $validationProvider
                .setExpression({
                    comparePassword: function (value, scope, element, attrs, param) {
                       var password = $("#"+param).val(); 
                       password = password.trim();
                       var confirmPassword = value.trim();
                        if((password === confirmPassword)){
                            return true;
                        }else{
                                return false;
                        }
                    }
                })
                .setDefaultMsg({
                    comparePassword: {
                        error: 'Password does not match.',
                        success: 'Thanks!'
                    }
                });
        }]);
}).call(this);
