
module.exports = {
	path: '/api/v1/edit',
	method: 'patch',
	run: async (req, res , client, db) => {

let { headers, body } = req

if(!body.cookie) return res.status(401).json({errors: ["authorization"], message: "Faild authorization"})

let token = headers.authorization 

if(!token) return res.status(401).json({errors: ["authorization"], message: "Request Header authorization"})

db.get("web", {}).then(rowa =>{
let row;
for(const data of rowa){
 if(data.accounts.find(d => d.token === token && d.cookie === body.cookie)) row = data.accounts.find(d => d.token === token && d.cookie === body.cookie)
}

if(!row) return res.status(401).json({errors: ["authorization"], message: "Faild authorization"})

if(row.enable === false) return res.status(401).json({errors: ["authorization"], message: "Enable Login"})

//if(row.online > 1) return res.status(403).json({errors: ["data"], message: "You Have Max Online for cookie!"})

if(!body.id) return res.status(403).json({errors: ["body"], message: "Request Body"})



let groups = client.groupChannels.filter(d => d.recipients.find(user => user.id == row.id))
let group = groups.find(d => d.id === body.id)

if(!group) return res.status(403).json({errors: ["data"], message: "Join This Group Please!"})

let newprefix = body.prefix || row.prefix
if(!newprefix) return res.status(403).json({errors: ['data'], message: "Enter Prefix"})
if(newprefix.length > 1) return res.status(403).json({errors: ["data"], message: "Max Length 1"})
if(newprefix.length < 0) return res.status(403).json({errors: ["data"], message: "Less Length 1"})

db.get("prefix", {"groupid": body.id}).then(rowsh =>{
if(rowsh.length < 1){
db.insert("prefix" , {"groupid": body.id,"prefix": newprefix})
}else{
rowsh[0].prefix = newprefix
db.update("prefix", {"groupid": body.id } , rowsh[0])
}
})

res.status(200).json({errors: [], message: "Done Edit!"})

})



 }
}