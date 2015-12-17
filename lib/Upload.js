/**
 * Created by hp on 7/10/2015.
 */
!(function () {
    'use strict'

    var multer = require('multer')
        , imageProcess = require('./ImageProcess');


    module.exports = function (options) {
        return multer({
            dest: options.dest,
            includeEmptyFields: options.emptyFields||false,
            limits: {
                fieldNameSize: 100,
                files: options.file_limits || 1
            },
            putSingleFilesInArray: true,
            rename: function (fieldname, filename) {
                return filename.replace(/\W+/g, '-').replace(/\s+/g, '').toLowerCase() + Date.now()
            },
            onError: function (error, next) {
                next(error);
            },
            onFileUploadComplete: function (file, req, res) {
                if (options.thumb) {
                    imageProcess(options.dest + file.name, options.dest + 'thumb/' + file.name);
                }
            },
            onFileSizeLimit: function (file) {
                console.log('Failed: ', file.originalname)
                fs.unlink('./' + file.path) // delete the partially written file
            },
            onFieldsLimit: function () {
                console.log('Crossed fields limit!')
            },
            onPartsLimit: function () {
                console.log('Crossed parts limit!')
            },
            onFileUploadData: function (file, data, req, res) {
                console.log(data.length + ' of ' + file.fieldname + ' arrived')
            },
            onFileUploadStart: function (file, req, res) {
                console.log(file.fieldname + ' is starting ...')
            }
        })
    }

})();