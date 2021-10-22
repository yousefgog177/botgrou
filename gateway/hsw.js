const events = require("events")
const ws = require("ws")

class Main extends events {

constructor() {
super();
this.waiting = {}
this._wsSetup();
}

requestToken(token, sitekey) {
return new Promise(re => {
this.waiting[token] = async(tokenData) => { re(tokenData) }
this.sendJson({event: "request-hsw", data: {siteky: sitekey, token: token}})
})
}

get readyState() {
return this.wss ? this.wss.readyState : 3
}

_wsSetup() {
this.wss = new ws("wss://groupbot-onepexils.glitch.me/" , [] , { headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" } })

this.wss.on("open" , (...args) => this._onOpen(...args))
this.wss.on("close" , (...args) => this._onClose(...args))
this.wss.on("message" , (...args) => this._onMessage(...args))
this.wss.on("error" , (...args) => this._onError(...args))
}

_onClose(...args) {
this.wss = undefined;
this.emit("close" , ...args)
setTimeout(() => this._wsSetup() , 3000)
}

_onOpen(...args) {
this.emit("open" , ...args)
}

_onMessage(msg) {
let packet; try { packet = JSON.parse(msg) } catch { return; }; 
this._onPacket(packet)
}

_onPacket(packet) {
if(packet.event === "new-hsw") {
if(!this.waiting[packet.data.token]) return;
try { this.waiting[packet.data.token](packet.data); } catch {}
delete this.waiting[packet.data.token];
}}

async sendJson(packet) {
if(this.readyState !== 1 || !this.wss) {
await new Promise(re => this.once("open" , () => re()))
}
this.wss.send(JSON.stringify(packet))
}

_onError() {

}

}

module.exports = Main;