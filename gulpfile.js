var gulp = require("gulp");
var gm = require("gulp-gm");
var newer = require("gulp-newer")
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass");


// //copy all HTML files
// gulp.task("copyHtml", function(){
//     gulp.src("src/*.html")
//         .pipe(gulp.dest("dist"));
// });

//reduces size of images
gulp.task('imageMin', () =>
    gulp.src('src/food/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/food'))
);

//compiles scss into css
gulp.task("sass", function(){
    gulp.src("src/sass/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("public/stylesheets"));
});

//resizes new images
gulp.task('resizeImages', () =>
    gulp.src('src/foodbig')
     .pipe(newer('public/images/food'))
      .pipe (gm(function(gmfile){
          gmfile.setFormat('jpg').quality(94);
          return gmfile.resize(1600, 1200);
      }))
       .pipe(imagemin())
        .pipe(gulp.dest('public/images/food'))
);

//watch scss files
gulp.task('watch', function(){
    gulp.watch('src/sass/*.scss', ['sass']);
});