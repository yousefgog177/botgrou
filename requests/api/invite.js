const axios = require("axios")
const fs = require("fs");
const userDB = require("../../db/user.js")
const codeDB = require("../../db/codes.js");
const oauth = require("../../2oauth.js")
const code_data = { username: "A7med", "discriminator": "0001", "id":"453470897081286666", "avatarURL": "https://cdn.discordapp.com/avatars/453470897081286666/5a0b1515a6c157093b5430e375cfe595.jpg" }
const url = require("url");

module.exports = {
	path: '/api/invite/',
	method: 'patch',
	run: async (req , res) => {
if(!req.body.code) return res.status(400).send("");

let invCode;

if(req.body.code) {
let ar = url.parse(req.body.code)

if(ar.hostname === "discord.gg") {
invCode = ar.pathname.split("/").join("")
}else
if(ar.hostname === "discord.com"){ // 
invCode = ar.pathname.split("/invite/").join("").split("/").join("")
}else{
let afterdiscord = ar.pathname.split("/")[1]
invCode = afterdiscord || ar.pathname
}}

axios.get("https://discord.com/api/invites/" + invCode + "?with_counts=true&with_expiration=true").then(response => {
if(!response || !response.data) return;
res.json(response.data);
}).catch(err => {
return res.status(400).send(err.message);
})

  }}