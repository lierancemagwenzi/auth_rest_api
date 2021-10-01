'use strict';
module.exports = function(app) {
    let globals = require('../controllers/authController');

    app.route('/api/register')
        .post(globals.RegisterUser);

    app.route('/api/token')
        .get(globals.getToken);
};