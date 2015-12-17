/**
 * Created by hp on 27/10/2015.
 */
!(function () {
    'use strict'

    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , Schema = mongoose.Schema
        , cmsCategorySchema;
    /*
     * Define Cms Category Schema
     */
    var cmsCategorySchema = new Schema({
        category_name: {type: String},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });

    cmsCategorySchema.plugin(timestamps,  {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    /*
     * Create Category
     */
    cmsCategorySchema.statics.saveCategory = function (req, callback) {
        CmsCategory.create(req.body, function(err, category) {
            if (err) {
                callback(err);
            } else {
                category.save(function(err) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, category);
                    }
                });

            }
        });
    };
    
      /*
     * Get Category
     */
    cmsCategorySchema.statics.getCategory = function (req, callback) {
         CmsCategory.find({status: 'active'}).select('category_name').exec(callback);
    };
    
   
    var CmsCategory = mongoose.model('CmsCategory', cmsCategorySchema);

    var category = ['HOME','HOW IT WORKES','ABOUT US','TESTIMONIALS','BAYA APP','DOCTORS','Terms & Conditions', 'Privacy Policy'];
        category.forEach(function(cat){
            CmsCategory.findOne({category_name: cat}, function(err, data) {
                if (!data) {
                    CmsCategory.create({
                        category_name: cat,
                    }, function(err, model) {

                    })
                }
            });
        });
    module.exports = CmsCategory;
})();