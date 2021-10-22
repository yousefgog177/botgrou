let hcaptcha = require('../../captcha-H.js');

module.exports = {
	path: '/get_hsw',
	method: 'get',
	run: async (req, res, client) => {

let {query} = req

let url = query.url || "discord.com"
let sitekey = query.sitekey || "f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34"

try {
const response = await hcaptcha(url, sitekey);
client.queue[response.hsw] = response.function
res.json(response)
} catch (e) {
res.status(400).json({data: e.message})
}

}}