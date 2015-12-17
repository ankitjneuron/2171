/**
 * Created by hp on 27/10/2015.
 */
!(function() {
    'use strict'

    var mongoose = require('mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , timestamps = require('mongoose-timestamp')
        , Schema = mongoose.Schema
        , cmsPageSchema;
    /*
     * Define Cms Page Schema
     */
    cmsPageSchema = new Schema({
        category_id: {type: Schema.Types.ObjectId, ref: 'CmsCategory', required: true},
        page_title: {type: String, required: true},
        slug: {type: String, required: true},
        page_content: {type: Schema.Types.Mixed},
        status: {type: String, default: 'active', enum: ['active', 'inactive', 'deleted']}
    });


    cmsPageSchema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    /*
     * Create and update Cms Page
     */
    cmsPageSchema.statics.savePage = function(req, callback) {
        var CmsPageModel;
        if (req.body.page_id) {
            CmsPage.findOne({'_id': req.body.page_id}, function(err, page) {
                if (err) {
                    return callback(err);
                } else {
                    if (page) {
                        page.page_content = req.body.page_content;
                        page.save(function(err) {
                            if (err) {
                                return callback(err);
                            } else {
                                callback(null, true);
                            }
                        });
                    } else {
                        return callback(err);
                    }
                }
            });
        } else {
            CmsPageModel = new CmsPage(req.body);
            CmsPageModel.save(function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, CmsPageModel);
                }
            });
        }

    },
        /*
         * Get Page public list
         */
        cmsPageSchema.statics.getCmsPageList = function(req, callback) {
            CmsPage.find({}).select('page_title page_content').exec(callback);
        };

    /*
     * Get cms pages
     */
    cmsPageSchema.statics.getPages = function(req, callback) {
        var sortBy = {}
            , where = {};
        sortBy.created_at = -1;
        if (req.query.search) {
            where = {'page_title':{ "$regex": req.query.search, "$options": "i" }};
        }
        where.status = {$ne: 'deleted'};
        CmsPage.paginate( where, {
            page: req.params.page,
            limit: 10,
            populate: [{path:'category_id',select:'category_name'}],
            sortBy: sortBy,
        }, callback);
    },
        /*
         * Get Page detail
         */
        cmsPageSchema.statics.pageDetail = function(req, callback) {
            CmsPage.findOne({_id: req.params.id}).select('page_title slug page_content').exec(callback);
        };
        /*
         * Get Page detail by slug
         */
        cmsPageSchema.statics.pageDetailBySlug = function(req, callback) {
            CmsPage.findOne({slug: req.params.slug}).select('page_title slug page_content').exec(callback);
        };
    cmsPageSchema.plugin(mongoosePaginate);

    var CmsPage = mongoose.model('CmsPage', cmsPageSchema);

    module.exports = CmsPage;
})();