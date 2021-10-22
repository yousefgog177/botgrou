
module.exports = {
	path: '/api/v1/users/:id',
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

if(row.token !== token) return res.status(401).json({errors: ["authorization"], message: "Faild authorization"})

res.status(200).json(row)
})



 }
}