// This is the build file to minifu css, js and deploy it to AWS

var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var uglify = require('gulp-uglify');
var awspublish = require('gulp-awspublish')
var cloudfront = require('gulp-cloudfront-invalidate-aws-publish');


// Minify css
gulp.task('css', function(){
  return gulp.src('css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('css/*.min.css'))
});


// This will minify js
gulp.task('js', function() {
  return gulp.src('js/*.js')    
    .pipe(uglify())
    .pipe(gulp.dest('js/*.min.js'));
});

gulp.task('publish',function() {
  // create a new publisher using S3 options 
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property 
  var publisher = awspublish.create({
    region: 'eu-west-2',
    params: {
      Bucket: 'duckthievesweb'
    }
  });

  // define custom headers 
  var headers = {
    'Cache-Control': 'max-age=3600, no-transform, public'
  };

  var cfSettings = {
    distribution: 'E1XVC1JHQ4SRN8', // Cloudfront distribution ID 
    wait: false,                     // Whether to wait until invalidation is completed (default: false) 
    indexRootPath: true             // Invalidate index.html root paths (`foo/index.html` and `foo/`) (default: false) 
  }

  return gulp.src(['**/*', '!./node_modules/**'])
    .pipe(publisher.publish(headers))
    .pipe(cloudfront(cfSettings))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});


gulp.task('default', [ 'publish' ], function() {

});