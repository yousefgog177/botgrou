
module.exports = {
	path: '/api/v1/groups/:cookie',
	method: 'get',
	run: async (req, res , client, db) => {
let { headers, params } = req

let token = headers.authorization
    
if(!token) return res.status(401).json({errors: ["authorization"], message: "Request Header authorization"})

if(!params.cookie) return res.status(403).json({errors: ["data"], message: "Request Cookie"})

db.get("web", {}).then(rowsa =>{
let row;
for(const data of rowsa){
 if( data.accounts.find(d => d.token === token && d.cookie === params.cookie)) row = data.accounts.find(d => d.token === token && d.cookie === params.cookie)
}
if(!row) return res.status(401).json({errors: ["authorization"], message: "Faild authorization"})

if(row.enable === false) return res.status(401).json({errors: ["authorization"], message: "Enable Login", data: {token: row.token}})

//if(row.online > 0) return res.status(403).json({errors: ["data"], message: "You Have Max Online for cookie!"})

let groups = client.groupChannels.filter(d => d.recipients.find(user => user.id == row.id))

res.status(200).json(groups)
})
  }
}