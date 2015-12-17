/**
 * Created by hp on 7/6/2015.
 */
!(function () {
    'use strict'

    module.exports = {
        app: {
            email: 'user1@neuronsolutions.com',
            name: '',
            gcm_api_key: 'AIzaSyBAKn-WGicFDBcGrTPogePgfz8lbcTAWjs',
            siteurl:'http://192.168.0.157:2171/'
        },
        database: {
            mongodb: {
                url: 'mongodb://localhost:27017/baya'
                
            }
        },
          mail: {
            from_email: 'contact@baya.com',
            from_name: 'baya',
            no_reply_email: '',
            smtp: {
                host: '',
                port: '',
                user: '',
                password: ''
            },
            sendgrid: {
                api_user: '',
                api_password: ''
            }
        },
         twilio: {
            registered_number: '+14155992671',
            account_sid: 'AC482ec7178a2b398e456813d91c53abac',
            auth_token: '525e4e41af197bff8ae14aed288d39b3',
            country_code: "+91"
        },
    }
})();