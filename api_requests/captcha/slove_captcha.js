let hcaptcha = require('../../captcha-H.js');

module.exports = {
	path: '/slove_captcha',
	method: 'post',
	run: async (req, res, client) => {
let { body } = req
if(!body || !body.hsw || !body.sloved) return res.status(400).json({ message: "you must add the hsw" });

if(!client.queue[body.hsw]) res.status(400).json({ message: "there is no function with this hsw" });

try {
let response = await client.queue[body.hsw](body.sloved);
res.json({ data: response })
delete client.queue[body.hsw]
} catch (e) {
res.status(400).json({data: e.message})
}

}}