
module.exports = {
	path: '/api/v1/get',
	method: 'get',
	run: async (req, res , client, db) => {

let { headers, body } = req


let token = headers.authorization 

if(!token) return res.status(401).json({errors: ["authorization"], message: "Request Header authorization"})

db.get("short", {"code": token}).then(rows =>{

if(rows.length < 1) return res.status(401).json({errors: ["authorization"], message: "Worng authorization"})

res.json({errors: [], message: "success", link: rows[0].link})

})

 }
}