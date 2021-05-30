//UPDATE THE "MASTERTEST" COLLECION WITH ALL CSGO ITEMS
//TODO: Merge items with the same names. count should be the same 
// before and after with new price data]
// to test, try inserting ak-47 baroque purple with random price

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const API = ['http://csgobackpack.net/api/GetItemsList/v2/']
const fetch = require("node-fetch");

var items = [];

API.map(async url => {try{
     const response = await fetch(url);
     const rawJSON = await response.json();

     items = rawJSON["items_list"];
     update();
}  catch (error) {
     console.log(error);
}})

function update() {
     MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("steamtest");
               
          for (var key in items) {
               var value = items[key];

               var price = value["price"];
               var pop = 0;
               if (price != null && price["30_days"] != null) {
                    var pop = parseInt(price["30_days"].sold, 10);
               } //popularity is measured by 30-day all time selling volume, defaults to 0
               // if no info is avaliable
     
               var query = {name : value.name };
               var update = { $set: { popularity: pop, price : value.price },
                            $setOnInsert: { icon_url: value.icon_url, type: value.type }
                         }; //update with new price if already in collection, create new item with name and icon if not
               const options = { upsert: true };

               dbo.collection("masterTest").updateOne(query, update, options);
          }
          db.close();
})
};
