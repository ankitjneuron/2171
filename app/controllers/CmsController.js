/**
 * Created by hp on 27/10/2015.
 */
!(function () {
    'use strict'

 var CmsCategoryModel = require('../models/CmsCategory')
     , CmsPageModel = require('../models/CmsPage')
     , CmsImageModel = require('../models/CmsImage');

    var CmsController = {
        /*
         *Api for create cms category
         */
        cmsCategory: function (req, res, next) {
            CmsCategoryModel.saveCategory(req, function (err, category) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({success: true, data: category, message: 'Category successfully created'});
                }
            });
        },
         /*
         *Api for get cms category
         */
        getCmsCategory: function (req, res, next) {
            CmsCategoryModel.getCategory(req, function (err, category) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({success: true, data: category, message: ''});
                }
            });
        },
         /*
         *Api for create cms category
         */
        cmsPage: function (req, res, next) {
            CmsPageModel.savePage(req, function (err, page) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({success: true, data: page, message: (req.body.page_id) ? 'Page successfully upated.' : 'Page successfully created.'});
                }
            });
        },
        /*
         * Save cms image
         */
        cmsImage: function (req, res, next) {
            CmsImageModel.saveImage(req, function (err, success) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({success: true, data: success, message: 'Cms image saved successfully'});
                }
            });

        },
        /*
         * Get image
         */
        getImage: function (req, res, next) {
            CmsImageModel.getImages(req, function (err, paginatedResults, pageCount, itemCount) {
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
         * Delete listing image
         */
        deleteImage: function (req, res, next) {

            CmsImageModel.deleteImage(req, function (err, image) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({success: true, data: image, message: ''});
                }
            });

        },
         /*
         *Api for get cms page
         */
        getCmsPage: function (req, res, next) {
            CmsPageModel.getPages(req, function (err, paginatedResults, pageCount, itemCount) {
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
         *Api for get cms page detail
         */
        pageDetail: function (req, res, next) {
            CmsPageModel.pageDetail(req, function (err, detail) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({success: true, data: detail, message: ''});
                }
            });
        },
    }
    module.exports = CmsController;
})
();