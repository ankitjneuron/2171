/**
 * Created by hp on 7/8/2015.
 */
!(function() {
    'use strict'


    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , MasterState = require('./MasterState')
        , Schema = mongoose.Schema
        , masterCountrySchema;

    /*
     * Define Master Category Schema
     */
    masterCountrySchema = new Schema({
        country_name: {type: String},
        country_code: {type: String},
        iso_code: {type: String},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });

    masterCountrySchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });


    masterCountrySchema.plugin(mongoosePaginate);

    var MasterCountry = mongoose.model('MasterCountry', masterCountrySchema);

    var usStates = [{name: 'ALABAMA', abbreviation: 'AL'}, {name: 'ALASKA', abbreviation: 'AK'}, {name: 'AMERICAN SAMOA', abbreviation: 'AS'}, {name: 'ARIZONA', abbreviation: 'AZ'},
        {name: 'ARKANSAS', abbreviation: 'AR'}, {name: 'CALIFORNIA', abbreviation: 'CA'}, {name: 'COLORADO', abbreviation: 'CO'}, {name: 'CONNECTICUT', abbreviation: 'CT'},
        {name: 'DELAWARE', abbreviation: 'DE'}, {name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'}, {name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'}, {name: 'FLORIDA', abbreviation: 'FL'},
        {name: 'GEORGIA', abbreviation: 'GA'}, {name: 'GUAM', abbreviation: 'GU'}, {name: 'HAWAII', abbreviation: 'HI'}, {name: 'IDAHO', abbreviation: 'ID'},
        {name: 'ILLINOIS', abbreviation: 'IL'}, {name: 'INDIANA', abbreviation: 'IN'}, {name: 'IOWA', abbreviation: 'IA'}, {name: 'KANSAS', abbreviation: 'KS'},
        {name: 'KENTUCKY', abbreviation: 'KY'}, {name: 'LOUISIANA', abbreviation: 'LA'}, {name: 'MAINE', abbreviation: 'ME'}, {name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
        {name: 'MARYLAND', abbreviation: 'MD'}, {name: 'MASSACHUSETTS', abbreviation: 'MA'}, {name: 'MICHIGAN', abbreviation: 'MI'}, {name: 'MINNESOTA', abbreviation: 'MN'},
        {name: 'MISSISSIPPI', abbreviation: 'MS'}, {name: 'MISSOURI', abbreviation: 'MO'}, {name: 'MONTANA', abbreviation: 'MT'}, {name: 'NEBRASKA', abbreviation: 'NE'},
        {name: 'NEVADA', abbreviation: 'NV'}, {name: 'NEW HAMPSHIRE', abbreviation: 'NH'}, {name: 'NEW JERSEY', abbreviation: 'NJ'}, {name: 'NEW MEXICO', abbreviation: 'NM'},
        {name: 'NEW YORK', abbreviation: 'NY'}, {name: 'NORTH CAROLINA', abbreviation: 'NC'}, {name: 'NORTH DAKOTA', abbreviation: 'ND'}, {name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
        {name: 'OHIO', abbreviation: 'OH'}, {name: 'OKLAHOMA', abbreviation: 'OK'}, {name: 'OREGON', abbreviation: 'OR'}, {name: 'PALAU', abbreviation: 'PW'},
        {name: 'PENNSYLVANIA', abbreviation: 'PA'}, {name: 'PUERTO RICO', abbreviation: 'PR'}, {name: 'RHODE ISLAND', abbreviation: 'RI'}, {name: 'SOUTH CAROLINA', abbreviation: 'SC'},
        {name: 'SOUTH DAKOTA', abbreviation: 'SD'}, {name: 'TENNESSEE', abbreviation: 'TN'}, {name: 'TEXAS', abbreviation: 'TX'}, {name: 'UTAH', abbreviation: 'UT'},
        {name: 'VERMONT', abbreviation: 'VT'}, {name: 'VIRGIN ISLANDS', abbreviation: 'VI'}, {name: 'VIRGINIA', abbreviation: 'VA'}, {name: 'WASHINGTON', abbreviation: 'WA'},
        {name: 'WEST VIRGINIA', abbreviation: 'WV'}, {name: 'WISCONSIN', abbreviation: 'WI'}, {name: 'WYOMING', abbreviation: 'WY'}
    ];
    MasterCountry.findOne({country_code: 'US'}, function(err, country) {
        if (!country) {
            MasterCountry.create({
                country_name: 'United States',
                country_code: 'US',
                iso_code: 'USA'
            }, function(err, data) {
                MasterState.remove({}, function() {
                });
                usStates.forEach(function(val) {
                    MasterState.create({
                        state_name: val.name,
                        state_code: val.abbreviation,
                        country_id: data._id
                    }, function(err, state) {
                    });
                });
            });
        }
    });
    module.exports = MasterCountry;
})();