var md5 = require('md5');
var jwt = require('jsonwebtoken')
var config = require('../config/auth');
const fs = require('fs');

const db = __dirname+'/database/accounts.json'

const short = require('short-uuid');

function existingAccounts() {
    const jsonData = fs.readFileSync(db)
    return JSON.parse(jsonData)
}


function generateApiKey(){

return short.generate();

}


function validateData(data){
    if(data.email!=null&&data.username!=null&&data.password!=null){

        return true;
    }
    else{

        return  false;
    }

}

function getAccountexists(accounts,email){
let exists=false;
    Object.keys(accounts).forEach(function(key) {
        var val = accounts[key];

        console.log(val.email)

if(val.email==email){
    exists=true;
}
    });
    return exists;

}



exports.RegisterUser =(req,res)=> {
    var existAccounts = existingAccounts()

    if(!validateData(req.body)){
        return res.status(500).json({"error":"missing input values"})
    }

    let exists=getAccountexists(existAccounts,req.body.email)

    if(exists){
        return res.status(500).json({"error":"account already exists"})
    }

    console.log(existAccounts);
    let newkey=generateApiKey();
    req.body.id=newkey;

    req.body.password=md5(req.body.password);
    req.body.permissions={create_cart:true}
    existAccounts[newkey] = req.body

    const stringifyData = JSON.stringify(existAccounts)
    fs.writeFileSync(db, stringifyData)
    res.status(200).json({data:req.body,key:newkey});

    var existAccounts = existingAccounts()
    console.log(existAccounts);
}



exports.getToken =(req,res)=> {
    let token = req.headers['auth-key'];
    if(!token){
        return res.status(405).json({"error":"Api key is missing"})
    }
    console.log(token);
    var existAccounts = existingAccounts()

    if(existAccounts[token]!=null){
        var jwt_token = jwt.sign({ id: token }, config.secret, {
            expiresIn: 604800 // expires in 24 hours
        });
        existAccounts[token].access_token=jwt_token;
        const stringifyData = JSON.stringify(existAccounts)
        fs.writeFileSync(db, stringifyData)
        return res.status(200).json({"access_token":jwt_token})
    }

    else{
      return res.status(405).json({"error":"unauthorised"})
    }

}
