/**
 * Created by hp on 27/10/2015.
 */
!(function () {
    'use strict'
    var mongoose = require('mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , timestamps = require('mongoose-timestamp')
        , Schema = mongoose.Schema
        , cmsImageSchema;
    /*
     * Define Cms Image Schema
     */
        cmsImageSchema = new Schema({
        image_title: {type: String,required: true},
        image_name: {type: String,required: true},
        original_image_name: {type: String,required: true},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });


    cmsImageSchema.plugin(timestamps,  {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    
    /*
     * Save cms image
     */
    cmsImageSchema.statics.saveImage = function (req, callback) {
        var CmsImageModel;
        CmsImageModel = new CmsImage(req.body);
        if (req.files.image) {
            CmsImageModel.image_name = req.files.image[0].name;
            CmsImageModel.original_image_name = req.files.image[0].originalname;
        }
        CmsImageModel.save(function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, CmsImageModel);
            }
        });

    },
    /*
     * Get cms image
     */
    cmsImageSchema.statics.getImages = function (req, callback) {
        var sortBy = {}
         , where = {};
            sortBy.created_at = -1;
        if (req.query.search) {
            where = {'image_title':{ "$regex": req.query.search, "$options": "i" }};
        }
        where.status = {$ne:'deleted'};
        CmsImage.paginate(where, {
            page: req.params.page,
            limit: 10,
            sortBy: sortBy,            
        }, callback);

    },
     /*
     * Delete image
     */
    cmsImageSchema.statics.deleteImage = function (req, callback) {
         CmsImage.remove({_id: req.params.id}, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    },


    
    cmsImageSchema.plugin(mongoosePaginate);
    
    var CmsImage = mongoose.model('CmsImage', cmsImageSchema);

    module.exports = CmsImage;
})();