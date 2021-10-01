## API DOCUMENTATION

## PORT =9001

## API URL=http://127.0.0.1:9001/api/{endpoint}
## FIRST RUN NPM INSTALL

##THE API USES JSON AS DB

## REGISTER A NEW USER





POST http://127.0.0.1:9001/api/register

body:
{
"username":"lierance",
"email":"magwenzi@gmail.com",
"password":"012345"

}

Response

{
    "data": {
        "username": "lierance",
        "email": "magwenzi@gmail.com",
        "password": "45bb1eb408177701659784acf60b00ce",
        "id": "giG8mMHJSyJbPu6VodC4Zq",
        "permissions": {
            "create_cart": true
        }
    },
    "key": "giG8mMHJSyJbPu6VodC4Zq"
}

If an account already exists you get an error with status code
The response contains the api key which should be passed in the get token request to get an access token which expires in 24 hours




## GET ACCESS TOKEN

pass api key from registration above  in header as {"auth-key": "giG8mMHJSyJbPu6VodC4Zq"}


  method: 'get',
  url: 'http://127.0.0.1:9001/api/token',
  headers: { 
    'auth-key': 'qqNYgDVQy4vqoGJvdwJdjc'
  }


Response
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFxTllnRFZReTR2cW9HSnZkd0pkamMiLCJpYXQiOjE2MzMwOTQ0NDAsImV4cCI6MTYzMzY5OTI0MH0.zFnIpTNSytRwDUeOgS0XuZ8z8GaF-UoRZpL1oLW2SmM"
}


The token expires in 24 hours


## CREATE CART

method: 'post',
url: 'http://127.0.0.1:9001/api/cart/add'

  headers: { 
    'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFxTllnRFZReTR2cW9HSnZkd0pkamMiLCJpYXQiOjE2MzMwOTM4MjcsImV4cCI6MTYzMzY5ODYyN30.wYeaAdPmguBGSdQRwqHvZdqEPRc0F797kaEnrlTTdXU', 
    'Content-Type': 'application/json'
  },
var data = JSON.stringify({"item":"pizza","price":20,"quantity":300});


The reponse 

{
    "status": "item added to cart"
}



if item was already in cart,it only updates the quantity. the reponse is 

{
    "status": "cart updated"
}



## DELETE ITEM FROM CART

  method: 'post',
  url: 'http://127.0.0.1:9001/api/cart/item/delete',
  headers: { 
    'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFxTllnRFZReTR2cW9HSnZkd0pkamMiLCJpYXQiOjE2MzMwOTM4MjcsImV4cCI6MTYzMzY5ODYyN30.wYeaAdPmguBGSdQRwqHvZdqEPRc0F797kaEnrlTTdXU', 
    'Content-Type': 'application/json'
  },

var data = JSON.stringify({"item":"pizza"});



The reponse 

{
    "status": "item removed from cart"
}




## GET CART


  method: 'get',
  url: 'http://127.0.0.1:9001/api/cart/',
  headers: { 
    'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFxTllnRFZReTR2cW9HSnZkd0pkamMiLCJpYXQiOjE2MzMwOTM4MjcsImV4cCI6MTYzMzY5ODYyN30.wYeaAdPmguBGSdQRwqHvZdqEPRc0F797kaEnrlTTdXU'
  }


Response 

{
    "data": [
        {
            "item": "pizza",
            "price": 20,
            "quantity": 300
        }
    ]
}


## DELETE CART

  method: 'get',
  url: 'http://127.0.0.1:9001/api/cart/delete',
  headers: { 
    'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InFxTllnRFZReTR2cW9HSnZkd0pkamMiLCJpYXQiOjE2MzMwOTM4MjcsImV4cCI6MTYzMzY5ODYyN30.wYeaAdPmguBGSdQRwqHvZdqEPRc0F797kaEnrlTTdXU'
  }

Response is 

{
    "status": "cart removed"
}













