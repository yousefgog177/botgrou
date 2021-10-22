var fs = require('fs');
var { MongoClient } = require('mongodb');


class index {

constructor(URL , DB) {
         this.url = URL
this.cache = {}
this.DB = DB
this.database = new MongoClient(URL , { useUnifiedTopology: true })
    this.database.connect().then(ready =>{
this.cache_setup()
})
	}

async cache_setup(){
  var dbo = this.database.db(this.DB);
let lol = {}
let update = (col) => {
return new Promise(async (resolve, reject) => {
  await dbo.collection(col.name).find({}).toArray(async function(err, result) {
    if (!err) {
resolve(result)
}
  });
});



}

await dbo.listCollections().toArray(async (err, collections) =>{
await collections.forEach(async col =>{
update(col).then(data =>{
this.cache[col.name] = data
})
})
});

setInterval(async ()=>{

await dbo.listCollections().toArray(async (err, collections) => {
await collections.forEach(async col =>{

update(col).then(data =>{
this.cache[col.name] = data
})

})
});

}, 2000)



}

 insert(colName , data) {

  var dbo = this.database.db(this.DB);
  dbo.collection(colName).insertOne(data, function(err, res) {
    if (err) throw err;
    return true
  });

}

  async get(colName , query){

let dbName = this.DB

let cache = this.cache[colName]

let keys = Object.keys(query)

for (let lol of keys){
try{
cache = cache.filter(l => l[lol] == query[lol])
} catch {
return []
}
}
return cache

}

  async delete(colName , query){
let dbName = this.DB
return new Promise(async (resolve, reject) => {
  var dbo = this.database.db(dbName);
  await dbo.collection(colName).deleteOne(query, async function(err, result) {
    if (err) return resolve([])

    return resolve(result)
});

})
}

  async update(colName , query , newValues){
return new Promise(async (resolve, reject) => {
delete newValues._id
  var dbo = this.database.db(this.DB);
  await dbo.collection(colName).updateMany(query, { $set: newValues }, async function(err, res) {
    if (err) return resolve([])
    return resolve(res)


  });

})

}
                   

 
}
module.exports = index