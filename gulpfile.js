const gulp = require('gulp');
const gulp_tslint = require('gulp-tslint');
const del = require('del');
const shell = require('gulp-shell');
const fs = require('fs-extra');
const path = require('path');

////////////////////////////////////////////////////

// 通过NODE_ENV来设置环境变量，如果没有指定则默认为开发环境
const DEV = 'development';
const PRO = 'production';

let env = process.env.NODE_ENV || DEV;
env = env.toLowerCase();

console.log(`The env is (${env})`);

////////////////////////////////////////////////////

gulp.task('default', ['build']);
gulp.task('start', ['build'], shell.task(['yarn run tsc-dev']));
gulp.task('build', ['deploy'], shell.task(['yarn run tsc-production']));

gulp.task('tslint', () => {
  return gulp.src(['./api/**/*.ts', '!**/*.d.ts', '!node_modules/**'])
    .pipe(gulp_tslint({
      formatter: "verbose"
    }))
    .pipe(gulp_tslint.report({
      emitError: true,
      summarizeFailureOutput: true
    }));
});

////////////////////////////////////////////////////

function deploy() {
  const srcFolder = path.join(__dirname, './app');
  const distFolder = path.join(__dirname, './build/dist');
  const appPackageConfig = path.join(__dirname, './package.json');

  fs.mkdirsSync(distFolder + '/logs');
  fs.mkdirsSync(distFolder + '/assets/upload');
  fs.mkdirsSync(distFolder + '/assets/users');

  fs.copySync(srcFolder + '/assets', distFolder + '/assets');

  const packageConfig = fs.readJsonSync(appPackageConfig);
  delete packageConfig.devDependencies;
  delete packageConfig.scripts;
  fs.outputJson(distFolder + '/package.json', packageConfig);
}

///////////////////////////////////////////////////

gulp.task('clean-dist', () => {
  return del('./build/dist/', { force: true });
});

gulp.task('deploy', ['clean-dist', 'tslint'], () => {
  return deploy();
});
