const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const hbs = require('hbs');
const indexRouter = require('../routes');

const defaultPath = path.join(__dirname, '..');
const app = express();

// view engine setup
app.set('views', path.join(defaultPath, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(defaultPath, 'public'),
  dest: path.join(defaultPath, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
}));

app.use(express.static(path.join(defaultPath, 'public')));
app.use('/js', express.static(path.join(defaultPath, 'node_modules', 'bootstrap', 'dist', 'js'))); // redirect bootstrap JS
app.use('/js', express.static(path.join(defaultPath, 'node_modules', 'jquery', 'dist'))); // redirect JS jQuery
app.use('/js', express.static(path.join(defaultPath, 'node_modules', 'wowjs', 'dist'))); // redirect JS wowjs
app.use('/css', express.static(path.join(defaultPath, 'node_modules', 'wowjs', 'css', 'libs'))); // redirect JS wowjs

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

// Routes
app.use('/', indexRouter);
app.use('/results', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
