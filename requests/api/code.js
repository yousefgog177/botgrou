const fs = require("fs");
const userDB = require("../../db/user.js");
const codeDB = require("../../db/codes.js");
const oauth = require("../../2oauth.js");
const code_data = { username: "A7med", "discriminator": "0001", "id":"453470897081286666", "avatarURL": "https://cdn.discordapp.com/avatars/453470897081286666/5a0b1515a6c157093b5430e375cfe595.jpg" }

module.exports = {
	path: '/api/code/:code',
	method: 'get',
	run: async (req , res, dirname, wss, client) => {
let code = req.params.code
if(!code) return res.status(400).json({ message: "لا يمكنك ترك خانة الكود خالية" })
if(code.length !== 16) return res.status(400).json({ message: "يجب ان يتكون الكود من 16 حرف فقط" })


let codeData = await codeDB.findOne({ _id: code })
if(!codeData) return res.status(400).json({ message: "لم يتم العثور علي هذا الكود" })
if(codeData.used) return res.status(400).json({ message: "تم استخدام هذا الكود من قبل" })
if(codeData.credits < 1) return res.status(400).json({ message: "لقد نفذ الرصيد الخاص بهذا الكود" })

let user = client.users.get(codeData.ownerID) || await client.getRESTUser(codeData.ownerID);
let user_data = { username:user.username, discriminator:user.discriminator, id:user.id,avatarURL: user.avatarURL   }

if(req.headers.authorization) {
let user = await userDB.findOne({ auth:req.headers.authorization })
if(!user) return res.json(user_data || code_data);
let userdd = await oauth.getUserData(user.access_token)
if(userdd.id !== code.ownerID && ["207553108245479434", "140509579858411521" , "535423612308422668", "453470897081286666", "265054564112269322"].includes(userdd.id)) {
codeData.ownerID = userdd.id
}
if(codeData.ownerID !== user.id) return res.json(user_data || code_data);

return res.json({ href: `/use/${code}/dashboard` })
}else{
return res.json(user_data || code_data)
}
  }}