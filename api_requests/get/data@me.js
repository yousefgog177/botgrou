const ms = require('ms')

module.exports = {
	path: '/api/v1/users/@me/:cookie',
	method: 'get',
	run: async (req, res , client, db) => {

let { headers, params } = req

let token = headers.authorization 

if(!token) return res.status(401).json({errors: ["authorization"], message: "Request Header authorization"})

if(!params.cookie) return res.status(403).json({errors: ["data"], message: "Request Cookie"})

db.get("web", {}).then(rowsa =>{
  
let row;
for(var data of rowsa){
data = [data.accounts]
 if( data.find(d => d.token === token && d.cookie === params.cookie)) row = data.accounts.find(d => d.token === token && d.cookie === params.cookie)
}
if(!row) return res.status(401).json({errors: ["authorization"], message: "Faild authorization"})

if(row.token !== token) return res.status(401).json({errors: ["authorization"], message: "Faild authorization"})

db.get("premium", {"owner": row.id}).then(async rows =>{
let premiums = []
for(const d of rows) {
premiums.unshift({"_id": d._id, "group": d.groupid, "endat": d.time, "endms": ms(d.time - Date.now())})

}
let able = true
client.getRESTUser(row.id).catch(err=>{
able = false
}).then(async heg =>{
if(able === true) avatar = heg.avatarURL
res.status(200).json({
"username": heg.username || heg.user.username || null,
"avatar": avatar,
"token": row.token,
"id": row.id,
"enable": row.enable,
"premiums": premiums,
"online": row.online
})
})
})
})


 }
}