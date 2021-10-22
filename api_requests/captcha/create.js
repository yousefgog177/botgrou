let randomIdGenerator = require('random-id-generator');
let fetch = require('node-fetch')
module.exports = {
	path: '/api/v1/captcha/create',
	method: 'post',
	run: async (req, res , client, db) => {
let {body} = req
if(!body.captcha_key) return res.status(403).json({errors: ['Request Body'], message: "Request Body Captcha Key"})

let id = randomIdGenerator(16)

db.insert("captcha_key" , {
captcha_key: body.captcha_key,
id: id
})
res.status(200).json({captcha_key: body.captcha_key,
id: id})
  }
}