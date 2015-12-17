var Message = {
    en: {
        error: {
            signup: "Something went wrong please try again!",
            login: "Incorrect email or password.",
            logout: "Something went wrong please try again!",
            api_error: "Please try again later.",
            invalid_file_formate : "Please Select only image.",
            createListing: "Something went wrong please try again!",
            commonErr: "Something went wrong please try again!",
            category_delete: "Category successfully deleted.",
            listing_delete: "Listing successfully deleted." ,
            updateUserStatus: "Status updated unsuccessfully.",
            session_expired: "Your session has been expired.",
            image_delete: "Image successfully deleted.",
            account_activation_failed : "You have already verified your account.",
            
        },
        success:{
            signup: "You have successfully registered",
            user_signup: "Your account has been successfully created. Activate account please click on verification link sent on your email address.",
            login: "You have logged in successfully",
            logout: "You have logged out successfully",
            category_success: "Category successfully created.",
            image_success: "Image successfully saved.",
            category_update: "Category successfully updated.",
            category_delete: "Category successfully deleted.",
            createListing: "Listing added successfully",
            password_changed: "Password successfully changed.",
            updateListing: "Listing updated successfully.",
            updateUserStatus: "Status updated successfully.",
            updateAdminProfile: "Admin profile updated successfully.",
            updateUserProfile: "User profile updated successfully.",
            forgotpassword: "Please check your email to reset your password.",
            reject_business_listing: "Business successfully rejected.",
            accept_business_listing: "Business successfully accepted.",
            reset_password: "Password successfully reset.",
            cms_page_update_success: "Page successfully updated.",
            account_activate_success : "Your account successfully activated.",
            doctor_save_success : "Doctor successfully added.",
            doctor_delete : "Doctor successfully deleted.",
            submit_availability : "Availibility successfully submitted.",
            updateBusinessInfo : "Business info successfully updated.",
            appoointmentReschedule : "Appointment successfully rescheduled."
        },
        alert:{
            category_delete: "Are you sure you want to delete this category ?",
            listing_delete: "Are you sure you want to delete this listing ?",
            cms_image_delete: "Are you sure you want to delete this image ?",
            claimOnList: "Are you sure you want to claim on this listing ?",
            cancel_claim: "Are you sure you want to cancel claim on this listing ?",
            doctor_delete: "Are you sure you want to delete this doctor ?",
        },
        validation:{

        }
    },
    getErrorMessage:function(key){
        return this[lang].error[key];
    },
    getSuccessMessage:function(key){
        return this[lang].success[key];
    },
    getValidationMessage:function(key){
        return this[lang].validation[key];
    },
     getAlertMessage:function(key){
        return this[lang].alert[key];
    }
}
