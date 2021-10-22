let randomIdGenerator = require('random-id-generator');
let fetch = require('node-fetch')
module.exports = {
	path: '/api/v1/create',
	method: 'post',
	run: async (req, res , client, db) => {

let { headers, body } = req

if(!body.link) return res.status(403).json({errors: ['body'], message: "Request Body", request: ['link']})

let code = randomIdGenerator(6)

var able = true
fetch((body.link) , {method: 'GET', headers: { 'Content-Type': 'application/json' }, referrerPolicy: "no-referrer"}).catch(err =>{
able = false
}).then(async onea =>{
if(!able) return res.status(403).json({errors: ['URL'], message: "Failed To Fetch"})
db.insert("short" , {
code: code,
link: body.link
})
res.status(200).json({errors: [], message: "success", code: code})

})


 }
}