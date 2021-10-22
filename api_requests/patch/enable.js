
module.exports = {
	path: '/api/v1/enable',
	method: 'patch',
	run: async (req, res , client, db) => {

let { body, headers } = req

if(headers.authorization !== "YOUSUF3MK41371755") return res.status(401).json({errors: ["authorization"], message: "Failed Key authorization Staff"})

if(!body.token) return res.status(403).json({errors: ["body"], message: "request Body token"})

if(!body.id) return res.status(403).json({errors: ["body"], message: "request Body id"})

db.get("web", {}).then(rowss =>{

let rows;
let rows2;
for(const data of rowss){
let datas = data.accounts.find(d => d).token === body.token
if(datas) rows = data.accounts.find(d => d)
if(datas) rows2 = data
}
if(!rows) return res.status(403).json({erorrs: ["data"], message: "Token Is Defined"})
rows2.accounts.shift({
    cookie: rows.cookie,
    token: rows.token,
    id: rows.id,
    enable: rows.enable,
    online: rows.online
})
rows2.accounts.unshift({
    cookie: rows.cookie,
    token: rows.token,
    id: rows.id,
    enable: true,
    online: rows.online
})
console.log(rows2)
if(rows.id !== body.id) return res.status(401).json({errors: ["authorization"], message: "Just owner token can enable"})

if(rows.enable === true) return res.status(403).json({errors: ["data"], message: "this token is already enable"})

db.update("web", {"_id": rowss[0]._id } , rows2)

res.status(200).json({errors: [], message: "You Now Is Enabled"})
})

  }
}