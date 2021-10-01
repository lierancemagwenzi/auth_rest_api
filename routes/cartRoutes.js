'use strict';
module.exports = function(app) {
    let globals = require('../controllers/CartController');

    app.route('/api/cart/add')
        .post(globals.CreateCart);

    app.route('/api/cart/item/delete')
        .post(globals.DeleteItem);

    app.route('/api/cart/')
        .get(globals.getCart);

    app.route('/api/cart/delete')
        .get(globals.DeleteCart);

};