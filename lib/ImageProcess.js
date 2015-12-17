/**
 * Created by hp on 8/6/2015.
 */
!(function () {
    'use strict'

    var easyimg = require('easyimage');

    var compressAndResize = function compressAndResize(imageUrl, thumbUrl) {
        easyimg.rescrop({
            src: imageUrl, dst: thumbUrl,
            width: 200, height: 200,
            cropwidth: 128, cropheight: 128,
            x: 0, y: 0
        }).then(
            function (image) {
                //console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
            },
            function (err) {
                console.log(err);
            }
        );
    }

    module.exports = compressAndResize;
})();