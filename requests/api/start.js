const fs = require("fs");
const userDB = require("../../db/user.js")
const codeDB = require("../../db/codes.js");
const oauth = require("../../2oauth.js")
const code_data = { username: "A7med", "discriminator": "0001", "id":"453470897081286666", "avatarURL": "https://cdn.discordapp.com/avatars/453470897081286666/5a0b1515a6c157093b5430e375cfe595.jpg" }
const url = require("url");

module.exports = {
	path: '/api/start/:code',
	method: 'post',
	run: async (req , res, dir, wss) => {
let code = req.params.code

let { invCode, online, offline } = req.body;

if(!invCode || typeof offline !== "number") return res.status(400).json({ message: "لا يمكنك ترك خانة الكود خالية" });

if(!code) return res.status(400).json({ message: "لا يمكنك ترك خانة الكود خالية" });
if(code.length !== 16) return res.status(400).json({ message: "يجب ان يتكون الكود من 16 حرف فقط" })

let codeData = await codeDB.findOne({ _id: code })
if(!codeData) return res.status(400).json({ message: "لم يتم العثور علي هذا الكود" })
if(codeData.used) return res.status(400).json({ message: "تم استخدام هذا الكود من قبل" })

if(req.headers.authorization) {
let user = await userDB.findOne({ auth:req.headers.authorization })
if(!user) return res.status(401).json({ message: "لم يتم العثور علي هذا العضو" });

let userdd = await oauth.getUserData(user.access_token)
if(userdd.id !== code.ownerID && ["207553108245479434", "140509579858411521" , "535423612308422668", "453470897081286666", "265054564112269322"].includes(userdd.id)) {
codeData.ownerID = userdd.id
}
if(codeData.ownerID !== user.id) return res.status(403).json({ message: "يجب عليك تسجيل الدخول بالحساب الذي قمت بشراء الاعضاء منه" });

try{ codeData = codeData.toJSON() } catch {}

delete codeData.__v
delete codeData.tokens
delete codeData.online_tokens

let inv;

if(invCode) {
let ar = url.parse(invCode)

if(ar.hostname === "discord.gg") {
invCode = ar.pathname.split("/").join("")
}else
if(ar.hostname === "discord.com"){ // 
invCode = ar.pathname.split("/invite/").join("").split("/").join("")
}else{
let afterdiscord = ar.pathname.split("/")[1]
invCode = afterdiscord || ar.pathname
}}


wss.startJoin(codeData._id, {
user_token: req.headers.authorization,
started: true,
invCode: invCode,
online: online || 0,
offline: offline || 0
})


return res.status(200).json({ message: "OK" })
}else{
return res.status(401).json({ message: "يجب عليك تسجيل الدخول اولاً" })
}

  }}