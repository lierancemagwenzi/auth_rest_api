var md5 = require('md5');
var jwt = require('jsonwebtoken')
var config = require('../config/auth');
const fs = require('fs');
const db = __dirname+'/database/accounts.json'


const carts = __dirname+'/database/carts.json'


const short = require('short-uuid');

function existingCarts() {
    const jsonData = fs.readFileSync(carts)
    return JSON.parse(jsonData)
}

function existingAccounts() {
    const jsonData = fs.readFileSync(db)
    return JSON.parse(jsonData)
}


function getUser(id){

    let existAccounts = existingAccounts()


    if(existAccounts[id]!=null){

        return existAccounts[id];
    }

return  null;
}

exports.CreateCart =(req,res)=> {
    let token = req.headers['access-token'];

    if(!token){
        return res.status(405).json({"error":"Api key is missing"})
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if(err){
            return res.status(405).json({"error":"invalid access token"})
        }

        if(getUser(decoded.id)==null){
            return res.status(500).json({"error":"This account has been deleted"})
        }

        if(!getUser(decoded.id).permissions.create_cart){
            return res.status(505).json({"error":"Account has missing permissions"})
        }

            console.log(decoded.id)
            var existCarts = existingCarts()
            if(existCarts[decoded.id]!=null){
                console.log("cart available")

                let cart=existCarts[decoded.id];
                let product=req.body;
                let exists=false;
                for(let i=0;i<cart.length;i++){
                    if(cart[i].item==product.item){
                        exists=true;
                        cart[i].quantity=product.quantity;
                    }
                }
                if(exists){
                }
                else{
                    cart.push(product);
                }

                existCarts[decoded.id]=cart;
                const stringifyData = JSON.stringify(existCarts)
                fs.writeFileSync(carts, stringifyData)
                return res.status(200).json({"status":"cart updated"})
            }

        else{
            let product=req.body;
            let cart=[];
            cart.push(product)
                existCarts[decoded.id]=cart;
                const stringifyData = JSON.stringify(existCarts)
                fs.writeFileSync(carts, stringifyData)
                return res.status(200).json({"status":"item added to cart"})
            }


    });
}


exports.DeleteItem =(req,res)=> {
    let token = req.headers['access-token'];

    if(!token){
        return res.status(405).json({"error":"Api key is missing"})
    }
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err){
            return res.status(405).json({"error":"invalid access token"})
        }
        else{
            var existCarts = existingCarts()


            if(existCarts[decoded.id]!=null) {
                let cart = existCarts[decoded.id];
                let product = req.body;
                let exists=false;
                for(i = 0; i < cart.length; i++){
                    if(cart[i].item==product.item){
                        exists=true;
                        cart.splice(i, 1);
                    }
                }

if(exists){
    existCarts[decoded.id]=cart;
    const stringifyData = JSON.stringify(existCarts)
    fs.writeFileSync(carts, stringifyData)
    return res.status(200).json({"status":"item removed from cart"})
}

else{
    return res.status(501).json({"status":"item not found in cart"})
}
            }

            else{
                return res.status(500).json({"status":"cart is empty"})
            }

        }
    })

}



exports.getCart =(req,res)=> {
    let token = req.headers['access-token'];

    if(!token){
        return res.status(405).json({"error":"Api key is missing"})
    }
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err){
            return res.status(405).json({"error":"invalid access token"})
        }
        else{
            var existCarts = existingCarts()
            if(existCarts[decoded.id]!=null) {
                return  res.status(200).json({data:existCarts[decoded.id]})
            }

            else{
                return res.status(500).json({"status":"cart is empty"})
            }

        }
    })
}


exports.DeleteCart =(req,res)=> {
    let token = req.headers['access-token'];
    if(!token){
        return res.status(405).json({"error":"Api key is missing"})
    }
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err){
            return res.status(405).json({"error":"invalid access token"})
        }
        else{
            var existCarts = existingCarts()
            if(existCarts[decoded.id]!=null) {
               let key=decoded.id;
                delete existCarts[key];
                const stringifyData = JSON.stringify(existCarts)
                fs.writeFileSync(carts, stringifyData)
                return  res.status(200).json({"status":"cart removed"})
            }

            else{
                return res.status(500).json({"status":"cart is empty"})
            }

        }
    })

}
