let randomIdGenerator = require('random-id-generator');
let fetch = require('node-fetch')
module.exports = {
	path: '/api/v1/captcha/:id',
	method: 'get',
	run: async (req, res , client, db) => {
let {params} = req
if(!params.id) return res.status(403).json({errors: ['Request Body'], message: "Request Body Captcha Key"})
let data = await db.get("captcha_key", {"id": params.id})
if(!data[0]) return res.status(403).json({erorrs: ['dataID'], message: "Invaild ID"})
res.status(200).json({captcha_key: data[0].captcha_key})
  }
}