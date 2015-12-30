var Imagemin = require('imagemin');

new Imagemin()
	.src('src/assets/images/**/*.{gif,jpg,png,svg}')
	.dest('dist/assets/images')
	.use(Imagemin.jpegtran({ progressive: true }))
	.use(Imagemin.gifsicle({ interlaced: true }))
	.use(Imagemin.optipng())
	.use(Imagemin.svgo({ cleanupIDs: false }))
	.run(function (err, files) {
        if (err) {
            console.error('Error:', err, files);
        }
	});
