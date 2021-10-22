var fs = require('fs');
const { get } = require('snekfetch');
var eris = require('eris');
var moment = require('moment');
var mss = require('ms');
const math = require('math-expression-evaluator');
const request = require('snekfetch');
const crypto = require('crypto');
const { IMGUR_KEY } = process.env;
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea'];
const no = ['no', 'n', 'nah', 'nope'];
let data = process.env
const Util = require('util');
const replaceall = require('replaceall');
class index {

constructor() {
this.bot = new eris(data.BOT_TOKEN);
this.bot.connect()
}

async setgame(status, game){
this.bot.editStatus(status, {name : game , "type": 0})
}

async cal(args, channel){
const almsg1 = replaceall('/', '', args)
const almsg2 = replaceall('*', '', almsg1)
const almsg3 = replaceall('+', '', almsg2)
const almsg4 = replaceall('-', '', almsg3)
const almsg5 = replaceall(' ', '', almsg4)
const error = replaceall('1', '', almsg5)
const error1 = replaceall('2', '', error)
const error2 = replaceall('3', '', error1)
const error3 = replaceall('4', '', error2)
const error4 = replaceall('5', '', error3)
const error5 = replaceall('6', '', error4)
const error6 = replaceall('7', '', error5)
const error7 = replaceall('9', '', error6)
const error8 = replaceall('0', '', error7)
const error9 = replaceall(' ', '', error8)
const tmam1 = replaceall(error8, '', args)
const q = replaceall('q', '', tmam1)
const w = replaceall('w', '', q)
const e = replaceall('e', '', w)
const r = replaceall('r', '', e)
const t = replaceall('t', '', r)
const y = replaceall('y', '', t)
const u = replaceall('u', '', y)
const i = replaceall('i', '', u)
const o = replaceall('o', '', i)
const p = replaceall('p', '', o)
const a = replaceall('a', '', p)
const s = replaceall('s', '', a)
const d = replaceall('d', '', s)
const f = replaceall('f', '', d)
const g = replaceall('g', '', f)
const h = replaceall('h', '', g)
const j = replaceall('j', '', h)
const k = replaceall('k', '', j)
const l = replaceall('l', '', k)
const z = replaceall('z', '', l)
const x = replaceall('x', '', z)
const c = replaceall('c', '', x)
const v = replaceall('v', '', c)
const b = replaceall('b', '', v)
const n = replaceall('n', '', b)
const m = replaceall('m', '', n)
const tmam2 = m
const Q = replaceall('Q', '', tmam2)
const W = replaceall('W', '', Q)
const E = replaceall('E', '', W)
const R = replaceall('R', '', E)
const T = replaceall('T', '', R)
const Y = replaceall('Y', '', T)
const U = replaceall('U', '', Y)
const I = replaceall('I', '', U)
const O = replaceall('O', '', I)
const P = replaceall('P', '', O)
const A = replaceall('A', '', P)
const S = replaceall('S', '', A)
const D = replaceall('D', '', S)
const F = replaceall('F', '', D)
const G = replaceall('G', '', F)
const H = replaceall('H', '', G)
const J = replaceall('J', '', H)
const K = replaceall('K', '', J)
const L = replaceall('L', '', K)
const Z = replaceall('Z', '', L)
const X = replaceall('X', '', Z)
const C = replaceall('C', '', X)
const V = replaceall('V', '', C)
const B = replaceall('B', '', V)
const N = replaceall('N', '', B)
const M = replaceall('M', '', N)
const ss = replaceall('=', '', M)
const sss = replaceall('.', '', ss)
const ssss = replaceall('(', '', sss)
const sssss = replaceall(')', '', ssss)
const ssssss = replaceall('~', '', sssss)
const sssssss = replaceall('`', '', ssssss)
const ok = replaceall('!', '', sssssss)
const okk = replaceall('@', '', ok)
const okkk = replaceall('#', '', okk)
const okkkk = replaceall('$', '', okkk)
const okkkkk = replaceall('%', '', okkkk)
const okkkkkk = replaceall('^', '', okkkkk)
const okkkkkkk = replaceall('&', '', okkkkkk)
const okkkkkkkk = replaceall(',', '', okkkkkkk)
const lo = replaceall('[', '', okkkkkkkk)
const loo = replaceall(']', '', lo)
const looo = replaceall('؛', '', loo)
const loooo = replaceall(':', '', looo)
const as = replaceall(':', '', loooo)
const ass = replaceall('{', '', as)
const asss = replaceall('}', '', ass)
const assss = replaceall('_', '', asss)
const a5 = replaceall('"', '', assss)
const a5r = replaceall('~', '', a5)
const a5rr = replaceall('>', '', a5r)
const a5rrr = replaceall('<', '', a5rr)
const ض = replaceall('ض', '', a5rr)
const ص = replaceall('ص', '', ض)
const ث = replaceall('ث', '', ص)
const ق = replaceall('ق', '', ث)
const ف = replaceall('ف', '', ق)
const غ = replaceall('غ', '', ف)
const ع = replaceall('ع', '', غ)
const ه = replaceall('ه', '', ع)
const خ = replaceall('خ', '', ه)
const ح = replaceall('ح', '', خ)
const ش = replaceall('ش', '', ح)
const س = replaceall('س', '', ش)
const ي = replaceall('ي', '', س)
const ب = replaceall('ب', '', ي)
const ل = replaceall('ل', '', ب)
const ا = replaceall('ا', 'ا', ل)
const ت = replaceall('ت', '', ل)
const ن = replaceall('ن', '', ت)
const م = replaceall('م', '', ن)
const ئ = replaceall('ئ', '', م)
const ء = replaceall('ء', '', ئ)
const ؤ = replaceall('ؤ', '', ء)
const ر = replaceall('ر', '', ؤ)
const لا = replaceall('لا', '', ر)
const ى = replaceall('ى', '', لا)
const ة = replaceall('ة', '', ى)
const و = replaceall('و', '', ة)
const ز = replaceall('ز', '', و)
const ظ = replaceall('ظ', '', ز)
const ذ = replaceall('ذ', '', ظ)
const ج = replaceall('ج', '', ذ)
const ك = replaceall('ك', '', ج)
const د = replaceall('د', '', ك)
const الف = replaceall('ا', '', د)
const hla = replaceall(' ', '', الف)
const tmam = hla
var almsg = almsg5
if(isNaN(almsg)) return this.bot.createMessage(channel, `Error, Please Delete "\`${error9}\`"
❎ \`${args}\`
Error: \`${error9}\`
✅ \`${tmam}\`
Note: Correcting the bot might be a mistake, So you don't rely of bot Correcting
`)
if(almsg.includes("e")) return this.bot.createMessage(channel, `Error, Please Delete "${error9}"
❎ ${args}
Error: ${error9}
✅ ${tmam}
Note: Correcting the bot might be a mistake, So you don't rely of bot Correcting
`)
const question = args
if (args.length < 3) {  
return this.bot.createMessage(channel,`For calculator Length +3`);
} else {
let answer;
try {
answer = math.eval(question);
} catch (err) {
return this.bot.createMessage(channel, `Error Number Has Don't find`) 
}
if(answer === undefined) return this.bot.createMessage(channel, `Error Number Has Don't find`) 
if(answer > 99999999999999999) return this.bot.createMessage(channel, `Error Number Has Don't find`)
if(answer === "Infinity") return this.bot.createMessage(channel, `Error Number Has Don't find`)
this.bot.createMessage(channel,`${question} = ${answer}`)
}
}
async setstream(status, stream){
this.bot.editStatus(status, {name : stream , "type": 1})
}

async user(channel, user){
const heg = user
return this.bot.createMessage(channel, {embed:{
    description: `> **Joined Discord :**\n > **${moment(heg.createdAt).format('YYYY/M/D HH:mm:ss')} | \`${moment(heg.createdAt).fromNow()}\`**`,
	author: {
		name: user.username,
		url: user.avatarURL,
		icon_url: user.avatarURL,
	},
	thumbnail: {
		url: user.avatarURL,
	}
}})
}
async setavatar(ava){
this.bot.editSelf({avatar: ava})
}
async addFriend(id, username, user, discriminator) {
this.bot.addRelationship(id)
}

}


module.exports = index