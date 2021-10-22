const fs = require("fs");
const userDB = require("../../db/user.js")
const codeDB = require("../../db/codes.js");
const oauth = require("../../2oauth.js")

module.exports = {
	path: '/api/check_code/:code',
	method: 'get',
	run: async (req , res) => {
let code = req.params.code
if(!code) return res.status(400).json({ message: "لا يمكنك ترك خانة الكود خالية" })
if(code.length !== 16) return res.status(400).json({ message: "يجب ان يتكون الكود من 16 حرف فقط" })

let codeData = await codeDB.findOne({ _id: code })
if(!codeData) return res.status(400).json({ message: "لم يتم العثور علي هذا الكود" })
if(codeData.used) return res.status(400).json({ message: "تم استخدام هذا الكود من قبل" })
if(codeData.credits < 1) return res.status(400).json({ message: "لقد نفذ الرصيد الخاص بهذا الكود" })

return res.json({ href: `/use/${code}` })
  }}