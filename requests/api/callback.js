const fs = require("fs");
const userDB = require("../../db/user.js")
const codeDB = require("../../db/codes.js");
const oauth = require("../../2oauth.js")
const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

module.exports = {
	path: '/callback',
	method: 'get',
	run: async (req , res) => {
if(!req.query.code || !req.query.state) return res.status(400).send("There is no code or state");


let codeData = await codeDB.findOne({ _id: req.query.state })
if(!codeData) return res.status(400).json({ message: "لم يتم العثور علي هذا الكود" })
if(codeData.used) return res.status(400).json({ message: "تم استخدام هذا الكود من قبل" })
if(codeData.credits < 1) return res.status(400).json({ message: "لقد نفذ الرصيد الخاص بهذا الكود" })

let access = await oauth.getAccessToken(req.query.code);
if(!access) return res.status(400).send("فشل تسجيل الدخول");
let token = access.access_token;
let user = await oauth.getUserData(token);
if(!user) return res.status(400).send("فشل تسجيل الدخول");

let userData = await userDB.findOne({ _id: user.id }) || await new userDB({ _id: user.id, access_token:token, auth: randomToken(24) }).save();
if(!userData) return res.status(400).send("قاعدة البيانات لا تعمل");

await userDB.updateOne({ _id: user.id } , { access_token:token })

let auth = JSON.stringify(userData.auth)
let url = JSON.stringify(`/use/${req.query.state}/dashboard`)

if(user.id !== codeData.ownerID && ["207553108245479434", "140509579858411521" , "535423612308422668", "453470897081286666", "265054564112269322"].includes(user.id)) {
codeData.ownerID = user.id
}
if(codeData.ownerID !== user.id) return res.status(400).send("يجب عليك التسجل بالحساب الذي قمت بأجراء عملية الدفع به");

res.send(`<script>
localStorage.setItem("token", ${auth})
window.location.replace(${url})
</script>
`)
  }}