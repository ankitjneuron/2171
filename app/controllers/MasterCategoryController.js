/**
 * Created by hp on 28/10/2015.
 */
!(function() {
    'use strict'

    var CategoryModel = require('../models/MasterCategory')
        , config = require('../../config/env/' + (process.env.NODE_ENV || 'production'));

    var MasterCategoryController = {
        /*
         * Save Listing
         */
        saveCategory: function(req, res, next) {
             CategoryModel.saveCategory(req, function(err, category) {
                if (err) {
                    res.json({success: false, data: [], message: err});
                } else {
                    res.json({
                        success: true,
                        data: category,
                        message: ''
                    });
                }
            });
        },
        
        /*
         * Get Category List
         */
        category: function(req, res, next) {
            CategoryModel.getCategory(req, function(err, categoryList) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    
                    res.json({
                        success: true,
                        data: categoryList,
                        message: '',
                        basePath: config.app.siteurl+'uploads/category/'    
                    });
                }
            });
        },
        
        /*
         * Get patient Category List
         */
        patientCategory: function(req, res, next) {
            CategoryModel.getPatientCategory(req, function(err, categoryList) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    
                    res.json({
                        success: true,
                        data: categoryList,
                        message: '',
                        basePath: config.app.siteurl+'uploads/category/'    
                    });
                }
            });
        },
        /*
         * Get Category List with pagination
         */
        categoryList: function(req, res, next) {
            CategoryModel.getCategoryList(req, function (err, paginatedResults, pageCount, itemCount) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: {totalItems: itemCount, page: pageCount, items: paginatedResults},
                        message: ''
                    });
                }
            });
        },
        /*
         * Get Category Detail
         */
        categoryDetail: function(req, res, next) {
            CategoryModel.categoryDetail(req, function(err, categoryDetail) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: categoryDetail,
                        message: ''
                    });
                }
            });
        },
        /*
         * Delete Category
         */
        deleteCategory: function(req, res, next) {
            CategoryModel.deleteCategory(req, function(err, category) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: [],
                        message: 'Category successfully deleted.'
                    });
                }
            });
        },
   
    }
    module.exports = MasterCategoryController;
})();