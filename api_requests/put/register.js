let randomIdGenerator = require('random-id-generator');

module.exports = {
	path: '/api/v1/login',
	method: 'put',
	run: async (req, res , client, db) => {

let { body, headers } = req

let token = randomIdGenerator(16);
let cookie = randomIdGenerator(751);

let id = body.id

var able = true

client.getRESTUser(id).catch(err=>{
able = false
}).then(user =>{
if(!able) return res.status(403).json({errors: ["data"], message: "user Is Defined"})
db.get("web", {}).then(rowsa =>{
  
let row;
for(const data of rowsa){
 if(data.accounts.find(d => d.id === id)) row = data
}

if(!row){
db.insert("web" , {
accounts: [{
cookie: cookie,
token: token,
"id": user.id,
"enable": false,
online: 0
}],
})
res.status(200).json({errors: [], message: 'success', data: {
token: token,
cookie: cookie,
accounts: [{
cookie: cookie,
id: user.id,
token: token,
enable: false,
online: 0
}],
}})
}else{
row.accounts.unshift({
cookie: cookie,
id: user.id,
token: token,
enable: false,
online: 0
})
db.update("web", {"_id": row._id } , row)
return res.status(200).json({errors: [], message: "Done Login", data: {token: token,
cookie: cookie
}})

}
})
})
}
}