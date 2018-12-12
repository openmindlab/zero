const
  Gulp = require('gulp'),
  WebpackStream = require("webpack-stream"),
  Webpack = require("webpack"),
  Connect = require('gulp-connect'),
  Express = require('express'),
  Pug = require("gulp-pug"),
  Sass = require('gulp-sass'),
  Run = require("gulp-run");


const PathConfig = require("./path-config");



Gulp.task("webpack:dev", (done) => {

  WebpackStream( require("./webpack-config.js" ) , Webpack)
    .pipe( Gulp.dest("./build/") )
    .pipe( Connect.reload() )

  done();

});


Gulp.task("views", (done) => {
  Gulp.src(`${PathConfig.ComponentsDir}/**/*.pug`)
    .pipe( Pug() )
    .pipe( Gulp.dest("./build/views") );
  done();
});


Gulp.task('scss', () => {
  // This is where we configure PostCSS plugins
  return Gulp.src( [ `${PathConfig.ComponentsDir}/**/*.scss` ] )
    .pipe(Sass({
      includePaths: ['node_modules/bootstrap-sass/assets/stylesheets/bootstrap']
    }).on('error', Sass.logError))
    .pipe( Gulp.dest("./build/views") )
    .pipe( Connect.reload() );
});


Gulp.task(`webserver`, function(done) {
  const App = Express();

  App.set('view engine', 'pug');
  App.set('views', './src/views');

  App.get("/", (req, res, next) => {
    res.render("home", {components: PathConfig.Components});
  });

  App.get("*.html", (req, res, next) => {
    next();
  });

  Connect.server({
    port: 3000,
    livereload: true,
    root: "./build",
    middleware: () => {
      return [App]
    }
  });
  done();
});


Gulp.task("webserver:reload", (done) => {
  Gulp.src("./src/views/*.pug").pipe(Connect.reload());
  done();
});


Gulp.task(`watch`, function(done) {
  Gulp.watch( `${PathConfig.ComponentsDir}/**/*.pug`,  Gulp.series(['views', 'webserver:reload']) );
  Gulp.watch( `./src/views/*.pug`,  Gulp.series(['views', 'webserver:reload']) );
  Gulp.watch( `${PathConfig.ComponentsDir}/**/*.scss`,  Gulp.series(['scss', 'webserver:reload']) );
  done();
});


Gulp.task('default', Gulp.series(['webpack:dev', 'scss', 'views', 'watch', 'webserver']));


Gulp.task('run', (done) => {

  let task = process.argv[3];
  if ( ! task ) {
    throw "No task defined! usage: gulp run --{taskname}"
  }

  task = task.substring(2);

  console.info("Executing task", task);

  freeze_version( () => {
    Run(`yarn run ${task}`).exec();
    done();
  });

});


Gulp.task("newversion", (done) => {
  generate_new_version( done )
});



function freeze_version(done) {

  let level = "patch";

  const FS = require("fs");
  const SemVer = require("semver");
  const Package = require("./package.json");

  let version = Package.version;

  let new_version = SemVer.inc(version, level);

  console.info("Freezing version from", version, "to", new_version);

  Package.version = new_version;

  FS.writeFileSync( "./package.json", JSON.stringify(Package, null, 2), "utf-8" );

  done();
}

function generate_new_version(done) {

  let level = "patch";

  const FS = require("fs");
  const SemVer = require("semver");
  const Package = require("./package.json");

  let version = Package.version;
  version = SemVer.inc(version, `pre${level}`);

  console.info("Genereate new version", version);

  Package.version = version;

  FS.writeFileSync( "./package.json", JSON.stringify(Package, null, 2), "utf-8" );

  done();
}
