let axios = require('axios');

module.exports = {
	path: '/fetch',
	method: 'post',
	run: async (req, res) => {
let {body} = req

let method = body.method
let headers = body.headers
let url = body.url
let data = body.data
let agent = body.agent

axios({ method, headers , url , data , agent }).then(ress =>{
res.json(ress.data)
}).catch(err => res.json(err.response.data))
  }
}