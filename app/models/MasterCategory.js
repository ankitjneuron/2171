/**
 * Created by hp on 7/8/2015.
 */
!(function() {
    'use strict'


    var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , Schema = mongoose.Schema
        , masterCategorySchema;

    /*
     * Define Master Category Schema
     */
    masterCategorySchema = new Schema({
        category_name: {type: String},
        category_icon: {type: String},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });

    masterCategorySchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    /*
     * Save  Category
     */
    masterCategorySchema.statics.saveCategory = function(req, callback) {

        var data = {};
        data = req.body;
        if (req.body.category_id !== undefined && req.body.category_id !== '') {
            MasterCategory.findOne({category_name: req.body.category_name, status: {$ne: 'deleted'},_id:{$ne:req.body.category_id}}, function(err, cat) {
                if (err) {
                    callback(err);
                } else {
                    if (!cat) {
                        MasterCategory.findOne({_id: req.body.category_id}, function(err, category) {
                            if (err) {
                                callback(err);
                            } else {
                                if (req.files.image) {
                                    category.category_icon = req.files.image[0].name;
                                }
                                category.category_name = req.body.category_name;
                                category.save(function(err) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback(null, category);
                                    }
                                });

                            }
                        });
                    } else {
                        callback('Category name already exist.', false);
                    }
                }
            });
        } else {
            MasterCategory.findOne({category_name: req.body.category_name, status: {$ne: 'deleted'}}, function(err, cat) {
                if (err) {
                    callback(err);
                } else {
                    if (!cat) {
                        MasterCategory.create(data, function(err, category) {
                            if (err) {
                                callback(err);
                            } else {
                                if (req.files.image) {
                                    category.category_icon = req.files.image[0].name;
                                } else {
                                    category.category_icon = 'defult_icon.png';
                                }
                                category.save(function(err) {
                                    if (err) {
                                        callback(err);
                                    } else {
                                        callback(null, category);
                                    }
                                });

                            }
                        });
                    } else {
                        callback('Category name already exist.', false);
                    }
                }
            });

        }
    };

    /*
     * Get cms pages
     */
    masterCategorySchema.statics.getCategoryList = function(req, callback) {
        var sortBy = {}
        , where = {};
        if (req.query.category_name) {
            where = {'category_name': {"$regex": req.query.category_name, "$options": "i"}};
        }
        sortBy.updated_at = -1;
        where.status = {$ne: 'deleted'};
        MasterCategory.paginate(where, {
            page: req.params.page,
            limit: 10,
            sortBy: sortBy,
        }, callback);
    };

    /*
     * Get Category List  Category
     */
    masterCategorySchema.statics.getCategory = function(req, callback) {
        MasterCategory.find({}).select('category_name category_icon').exec(callback);
    };
    
    /*
     * Get patient Category List  Category
     */
    masterCategorySchema.statics.getPatientCategory = function(req, callback) {
        MasterCategory.find({status: 'active'}).select('category_name category_icon').exec(callback);
    };

    /*
     * Get Category Detail
     */
    masterCategorySchema.statics.categoryDetail = function(req, callback) {
        MasterCategory.findOne({_id: req.params.id}).exec(callback);
    };

    /*
     * Delete Category
     */
    masterCategorySchema.statics.deleteCategory = function(req, callback) {
        MasterCategory.findOne({_id: req.params.id}, function(err, category) {
            if (err) {
                callback(err);
            } else {
                category.status = 'deleted';
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

    masterCategorySchema.plugin(mongoosePaginate);

    var MasterCategory = mongoose.model('MasterCategory', masterCategorySchema);

    module.exports = MasterCategory;
})();