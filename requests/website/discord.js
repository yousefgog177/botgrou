module.exports = {
	path: '/discord',
	method: 'get',
	run: async (req , res, dirname) => {
return res.sendFile(dirname + "/web/discord.html")
  }}