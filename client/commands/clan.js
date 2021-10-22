module.exports = {
	name: 'clan', // اسم الامر
	description: "clan group", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
db.get("prefix", {"groupid": msg.channel.id}).then(row =>{
let prefixs = "$"
if(!row || row.length < 1) {
prefixs = "$"
}else{
prefixs = row[0].prefix
}
if(args[0]) {args[0] = args[0].toLowerCase()}
if(!args[0]) return bot.createMessage(msg.channel.id, `Command's:
User No Have Clan:
[1] accept
[2] deaccept
[3] invites
[4] create
User Have Clan:
[1] leave
Mod Clan:
[1] invite
[2] info
Admin Clan:
[1] kick
[2] addmod
[3] removemod
Owner Clan:
[1] addadmin
[2] removeadmin
[3] move
[4] delete
[5] rename
`)
if(args[0] === "accept"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
if(!args[1]) return bot.createMessage(msg.channel.id, `use: ${prefixs}clan accept [invite code]`)
db.get("clan-invite", {"code": args[1]}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `I Can't find this code`)
if(row[0].to !== msg.author.id) return bot.createMessage(msg.channel.id, `This Invite For ${row[0].to}`)
db.insert("clan" , {"clan": row[0].name,"name": row[0].name,"id": msg.author.id, rank: "member"})
return bot.createMessage(msg.channel.id, `Done Join clan`)
})
}else{
return bot.createMessage(msg.channel.id, `You Have Already Clan`)
}
})
}
if(args[0] === "deaccept"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
if(!args[1]) return bot.createMessage(msg.channel.id, `use: ${prefixs}clan deaccept [invite code]`)
db.get("clan-invite", {"code": args[1]}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `I Can't find this code`)
if(row[0].to !== msg.author.id) return bot.createMessage(msg.channel.id, `This Invite For ${row[0].to}`)
db.delete("GroupB" , "clan-invite",{"code": args[1]})
return bot.createMessage(msg.channel.id, `Done DeAccept`)
})
}else{
return bot.createMessage(msg.channel.id, `You Have Already Clan`)
}
})
}
if(args[0] === "invites"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
db.get("clan-invite", {"to": msg.author.id}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `You No Have Invites`)
var msgs = ``
for(const data of row) msgs = msgs + `Clan: ${data.name}\nCode: ${data.code}\n=============\n`
return bot.createMessage(msg.channel.id, msgs)
})
}else{
return bot.createMessage(msg.channel.id, `You Have Already Clan`)
}
})
}
if(args[0] === "leave"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank === "owner") return bot.createMessage(msg.channel.id, `Owner can't leave`)
db.delete("clan", {"id": msg.author.id})
return bot.createMessage(msg.channel.id, `Done Leave clan`)
}
})
}
if(args[0] === "delete"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner") return bot.createMessage(msg.channel.id, `Only Owner can delete clan`)
db.get("clan", {"name": rows[0].clan}).then(row =>{
for(const data of row) db.delete("clan", {"id": data.id})
db.get("clan-invite", {"name": row[0].name}).then(r =>{

for(const data of r){ 
db.delete("clan-invite", {"_id": data._id})
}
})
return bot.createMessage(msg.channel.id, `Done Deleted Clan`)
})
}
})
}
if(args[0] === "rename"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner") return bot.createMessage(msg.channel.id, `Only Owner can rename clan`)
if(!args[1]) return bot.createMessage(msg.channel.id, `use: ${prefixs}clan rename [newname]`)
db.get("clan", {"clan": args[1]}).then(ro =>{
if(ro.length < 1) {
var clanname = rows[0].clan
db.get("clan", {"name": clanname}).then(row =>{
for(const data of row){ 
data.name = args[1]
data.clan = args[1]
db.update("clan", {"id": data.id } , data)
}
db.get("clan-invite", {"name": clanname}).then(r =>{
for(const data of r){ 
data.name = args[1]
db.update("clan-invite", {"to": data.id } , data)
}
})
})
return bot.createMessage(msg.channel.id, `Done ReName`)
}else{
return bot.createMessage(msg.channel.id, `This Clan Has Already create`)

}
})
}
})
}
if(args[0] === "removeadmin"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner") return bot.createMessage(msg.channel.id, `Only Owner can add admin`)
if(!args[1]) return bot.createMessage(msg.channel.id, `Mention User`)
let user = msg.mentions[0]
if(!user) return bot.createMessage(msg.channel.id, `I can't find user`)
db.get("clan", {"id": user.id, "clan": rows[0].name}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `Error, User no't join in your clan.`)
if(row[0].rank !== "admin") return bot.createMessage(msg.channel.id, `Error, User has already not admin.`)
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, `You Can't add self.`)
row[0].rank = "mod"
db.update("clan", {"id": user.id } , row[0])
return bot.createMessage(msg.channel.id, `Done.`)
})
}
})
}
if(args[0] === "addadmin"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner") return bot.createMessage(msg.channel.id, `Only Owner can add admin`)
if(!args[1]) return bot.createMessage(msg.channel.id, `Mention User`)
let user = msg.mentions[0]
if(!user) return bot.createMessage(msg.channel.id, `I can't find user`)
db.get("clan", {"id": user.id, "clan": rows[0].name}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `Error, User no't join in your clan.`)
if(row[0].rank === "admin") return bot.createMessage(msg.channel.id, `Error, User has already admin.`)
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, `You Can't add self.`)
row[0].rank = "admin"
db.update("clan", {"id": user.id } , row[0])
return bot.createMessage(msg.channel.id, `Done.`)
})
}
})
}
if(args[0] === "removemod"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner" && rows[0].rank !== "admin") return bot.createMessage(msg.channel.id, `Only Admin's can add Mod`)
if(!args[1]) return bot.createMessage(msg.channel.id, `Mention User`)
let user = msg.mentions[0]
if(!user) return bot.createMessage(msg.channel.id, `I can't find user`)
db.get("clan", {"id": user.id, "clan": rows[0].name}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `Error, User no't join in your clan.`)
if(row[0].rank !== "mod") return bot.createMessage(msg.channel.id, `Error, User has already not Mod.`)
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, `You Can't add self.`)
row[0].rank = "member"
db.update("clan", {"id": user.id } , row[0])
return bot.createMessage(msg.channel.id, `Done.`)
})
}
})
}
if(args[0] === "addmod"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner" && rows[0].rank !== "admin") return bot.createMessage(msg.channel.id, `Only Admin's can add Mod`)
if(!args[1]) return bot.createMessage(msg.channel.id, `Mention User`)
let user = msg.mentions[0]
if(!user) return bot.createMessage(msg.channel.id, `I can't find user`)
db.get("clan", {"id": user.id, "clan": rows[0].name}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `Error, User no't join in your clan.`)
if(row[0].rank === "mod") return bot.createMessage(msg.channel.id, `Error, User has already mod.`)
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, `You Can't add self.`)
row[0].rank = "mod"
db.update("clan", {"id": user.id } , row[0])
return bot.createMessage(msg.channel.id, `Done.`)
})
}
})
}
if(args[0] === "move"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner") return bot.createMessage(msg.channel.id, `Only Owner can move`)
if(!args[1]) return bot.createMessage(msg.channel.id, `Mention User`)
let user = msg.mentions[0]
if(!user) return bot.createMessage(msg.channel.id, `I can't find user`)
db.get("clan", {"id": user.id, "clan": rows[0].name}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `Error, User no't join in your clan.`)
if(user.id === msg.author.id) return bot.createMessage(msg.channel.id, `You Can't add self.`)
if(row[0].rank === "owner") return bot.createMessage(msg.channel.id, `Error`)
row[0].rank = "owner"
db.update("clan", {"id": user.id } , row[0])
db.get("clan", {"id": msg.author.id}).then(rowa =>{
rowa[0].rank = "admin"
db.update("clan", {"id": msg.author.id } , rowa[0])
return bot.createMessage(msg.channel.id, `Done.`)

})
})
}
})
}
if(args[0] === "info"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
  db.get("clan", {"name": rows[0].clan}).then(row =>{
if(row.length < 1) return bot.createMessage(msg.channel.id, `Error`)
for(const datas of row) if(datas.name === rows[0].clan)
if(rows[0].rank !== "owner" && rows[0].rank !== "admin" && rows[0].rank !== "mod") return bot.createMessage(msg.channel.id, `Only Mod's can see info`)
var owners = ``
var admins = ``
var members = ``
var mods = ``
for(const data of row){
if(data.rank === "owner"){
owners = owners + `<@${data.id}>`
}
}
for(const data of row){
if(data.rank === "admin"){
admins = admins + `<@${data.id}>,`
}
}
for(const data of row){
if(data.rank === "mod"){
mods = mods + `<@${data.id}>,`
}
}
for(const data of row){
if(data.rank === "member"){
members = members + `<@${data.id}>,`
}
}
if(!members) members = `None` 
if(!mods) members = `None` 
if(!admins) admins = `None` 
if(!owners) owners = `None` 
return bot.createMessage(msg.channel.id, `Clan: ${rows[0].clan}
Owner: ${owners}
Admin's: ${admins}
Mod's: ${mods}
Member's: ${members}
`)
})
}
})
}
if(args[0] === "invite"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner" && rows[0].rank !== "admin" && rows[0].rank !== "mod") return bot.createMessage(msg.channel.id, `Only Mod's can invite`)
if(!args[1]) return bot.createMessage(msg.channel.id, `Mention User`)
let user = msg.mentions[0]
if(!user) return bot.createMessage(msg.channel.id, `I can't find user`)
   var t = Math.floor(Math.random() * 9) + 0;
   var tt = Math.floor(Math.random() * 9) + 0;
   var ttt = Math.floor(Math.random() * 9) + 0;
   var tttt = Math.floor(Math.random() * 9) + 0;
db.get("clan-invite", {"name": rows[0].clan, "to": user.id}).then(rowss =>{
if(rowss.length < 1) {
db.insert("clan-invite" , {"name": rows[0].clan,"code": `${t}${tt}${ttt}${tttt}`, to: user.id})
return bot.createMessage(msg.channel.id, `Done Invite`)
}else{
return bot.createMessage(msg.channel.id, `You Have realy invited user`)
}
})
}
                                           
})
}
if(args[0] === "kick"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
console.log(rows)
if(rows.length < 1) {
return bot.createMessage(msg.channel.id, `You No Have Already Clan`)
}else{
if(rows[0].rank !== "owner" && rows[0].rank !== "admin") return bot.createMessage(msg.channel.id, `Only Admin's can Kicked`)
if(!args[1]) return bot.createMessage(msg.channel.id, `Mention User`)
let user = msg.mentions[0]
if(!user) return bot.createMessage(msg.channel.id, `I can't find user`)
   var t = Math.floor(Math.random() * 9) + 0;
   var tt = Math.floor(Math.random() * 9) + 0;
   var ttt = Math.floor(Math.random() * 9) + 0;
   var tttt = Math.floor(Math.random() * 9) + 0;
db.get("clan", {"name": rows[0].name,"id": user.id}).then(rowss =>{
if(rowss.length < 1) {
return bot.createMessage(msg.channel.id, `This user has no't on clan`)
}else{
if(rowss[0].rank === "owner" || rowss[0].rank === "admin") return bot.createMessage(msg.channel.id, `Can't Kicked Owner or admin`)
db.get("clan-invite", {"name": rows[0].clan}).then(r =>{
for(const data of r){ 
db.delete("clan-invite", {"id": data.id})
}
})
db.delete("clan",{"id": msg.author.id})
return bot.createMessage(msg.channel.id, `Done Kicked`)
}
})
}
                                           
})
}
if(args[0] === "create"){
db.get("clan", {"id": msg.author.id}).then(rows =>{
if(rows.length < 1) {
if(!args[1]) return bot.createMessage(msg.channel.id, `use: ${prefixs}clan createclan [clan name]`)
db.get("clan", {"clan": args[1]}).then(ro =>{
if(ro.length < 1) {
db.insert("clan" , {"clan": args[1],"name": args[1],"id": msg.author.id, rank: "owner"})
return bot.createMessage(msg.channel.id, `Done Create Clan ${args[1]}`)
}else{
 bot.createMessage(msg.channel.id, `This Clan Has Already create`)
}
})
}else{
return bot.createMessage(msg.channel.id, `You Have Already Clan`)
}
})
}
})
	},
};
