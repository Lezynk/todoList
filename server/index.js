var express         = require('express'),
    methodOverride  = require('method-override'),
    indexRoutes     = require('./routes/index'),
    app             = express();

// Add DELETE and PUT methods
app.use(methodOverride());

// Serve the Angular/Ionic app
app.use(express.static('../conference/www'));

// Routes
app.use('/',indexRoutes);

// Launch Server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
