//let con = JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
const fs = require('fs')
module.exports = {
	path: '/api/v1/premium/:id/:cookie',
	method: 'get',
	run: async (req, res , client, db) => {
let { headers, params } = req
let con = JSON.parse(fs.readFileSync("./data/config.json", "utf8"))
let token = headers.authorization
    
if(!token) return res.status(401).json({errors: ["authorization"], message: "Request Header authorization"})

if(!params.cookie) return res.status(403).json({errors: ["data"], message: "Request Cookie"})

if(!params.id) return res.status(403).json({errors: ["data"], message: "Request Cookie"})

db.get("web", {}).then(rowsa =>{
  
let row;
for(const data of rowsa){
 if(data.accounts.find(d => d.token === token && d.cookie === params.cookie)) row = data.accounts.find(d => d.token === token && d.cookie === params.cookie)
}
if(!row) return res.status(401).json({errors: ["authorization"], message: "Faild authorization"})

if(row.enable === false) return res.status(401).json({errors: ["authorization"], message: "Enable Login"})

db.get("premium", {"groupid": params.id}).then(rows =>{
let premium = false
for(const data of rows){
if(data.time - Date.now() > 1) premium = true
}

res.status(200).json({premium: premium})
})
})
  }
}