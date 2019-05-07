const Gulp = require('gulp');
const execSync = require('child_process').execSync;

function build(generateStats = false, optimize = false) {
  execSync(
    `ng build --prod` +
    (generateStats ? ' --statsJson' : '') +
    (optimize ? ' --buildOptimizer' : ''),
    {stdio: 'inherit'}
  )
}

function showWebpackReport() {
  build( true);
  execSync(
    `node ./node_modules/webpack-bundle-analyzer/lib/bin/analyzer ./dist/stats.json`,
    {stdio: "inherit"}
  )
}

function serve(aot = false) {
  const environment = getEnvironment();
  execSync(
    'ng serve' +
    (aot ? ' --aot' : '') +
    ` --proxy-config conf/${environment.env}/proxy.conf.json`,
    {stdio: "inherit"}
  )
}

Gulp.task('start:jit', (callback) => {
  callback(serve(false));
});

Gulp.task('start:aot', (callback) => {
  callback(serve(true));
});

Gulp.task('build', (callback) => {
  callback(build());
});

Gulp.task('build:production', (callback) => {
  callback(build(false, true));
});

Gulp.task('build:opt', (callback) => {
  callback(build(false, true));
});

Gulp.task('build:stats', (callback) => {
  callback(build(true, true));
});

Gulp.task('report', (callback) => {
  callback(showWebpackReport());
});

function getEnvironment() {
  let args = {};
  try {
    JSON.parse(process.env.npm_config_argv).original
      .filter(arg => arg.startsWith("--"))
      .map(arg => arg.substring(2))
      .map(arg => arg.split("="))
      .forEach(arg => args[arg[0]] = arg[1]);
  } catch (e) {
  }

  if (!args.env) {
    console.warn("'--env' argument isn't specified, default value 'dev1' will be used");
  }

  return {env: 'dev1', ...args};
}
