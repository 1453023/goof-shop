var db = require('../models'),
    path = require('path'),
    fs = require('fs'),
    app = require('../app.js');
// env = process.env.NODE_ENV || 'development',
// config = require(path.join(__dirname, '../../public/img')[env];

exports.shop_men = function(req, res) {
    // var img_list = app.dirTree(app.img_path);
    db.products.findAll().then(function(products) {
        if (req.user) {
            res.render("pages/shop", { user: req.user.email, products: products, title: 'G-O-O-F / MEN' });
        } else {
            res.render("pages/shop", { user: "", products: products, title: 'G-O-O-F / MEN' });
        }
    })

}

exports.product_detail = function(req, res) {
    db.products.find({ where: { id: req.params.id } }).then(function(detail) {
        if (req.user) {
            res.render("pages/product_detail", { user: req.user.email, detail: detail, title: 'G-O-O-F / DETAIL' });
        } else {
            res.render("pages/product_detail", { user: "", detail: detail, title: 'G-O-O-F / DETAIL' });
        }
    })
}

exports.cart = function(req, res) {
    // db.cart.findAll({ include: [db.products] }).then(function(cart) {
    //     req.session.cart = cart
    //     if (req.user) {
    //         res.render("pages/shoping_cart", { user: req.user.email, cart: cart, title: 'G-O-O-F / CART' });
    //     } else {
    //         res.render("pages/shopping_cart", { user: "", cart: cart, title: 'G-O-O-F / CART' });
    //     }
    // })
    if (!req.session.cart) {
        return res.render('pages/shopping_cart', { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('pages/shopping_cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
}

function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}

exports.add_cart = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    db.products.findById(productId).then(function(product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop_men');
    });
}

exports.contacts = function(req, res) {
    if (req.user) {
        res.render("pages/contacts", { user: req.user.email, title: "G-O-O-F / CONTACTS" });
    } else {
        res.render("pages/contacts", { user: "", title: "G-O-O-F / CONTACTS" });
    }
}

exports.account = function(req, res) {
    res.render('pages/user_account', { user: req.user.email, title: 'G-O-O-F / ACCOUNT' });
}

// exports.account = function(req, res) {
//     res.render("myAccount.ejs", { username: req.user.username });
// }

exports.search = function(req, res) {
    q = "";
    users = [];
    if (req.query.q) {
        q = req.query.q;
        db.products.findAll({ attributes: ['id', 'username'], where: { username: { like: '%' + req.query.q + '%' } } }).success(function(products) {
            //console.log('Users:', users)
            // res.render("/shop_men", { q: q, username: req.user.username, users: users });
            if (req.user) {
                res.render("pages/shop", { user: req.user.email, products: products, title: 'G-O-O-F / MEN' });
            } else {
                res.render("pages/shop", { user: "", products: products, title: 'G-O-O-F / MEN' });
            }
        });
    } else {
        db.products.findAll().then(function(products) {
            //console.log('Users:', users)
            if (req.user) {
                res.render("pages/shop", { user: req.user.email, products: products, title: 'G-O-O-F / MEN' });
            } else {
                res.render("pages/shop", { user: "", products: products, title: 'G-O-O-F / MEN' });
            }
        });
    }
    //res.render("search.ejs", { q: q, username: req.user.username, users: users })
}