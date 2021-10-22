const fs = require("fs");
const userDB = require("../../db/user.js")
const codeDB = require("../../db/codes.js");
const oauth = require("../../2oauth.js")
const code_data = { username: "A7med", "discriminator": "0001", "id":"453470897081286666", "avatarURL": "https://cdn.discordapp.com/avatars/453470897081286666/5a0b1515a6c157093b5430e375cfe595.jpg" }

module.exports = {
	path: '/test',
	method: 'get',
	run: async (req , res, dirname) => {
var query = req.query.name || "done"
try {
let file = fs.readFileSync(`./messages/${query}.html`, {encoding:'utf8', flag:'r'})
return res.sendFile(dirname + "/messages/" + query + ".html")
} catch {
return res.status(403).json({errors: ['No-File', 'invaild-file'], message: "This File Don't Find"})
}
  }}