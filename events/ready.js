const axios = require("axios");

module.exports = async(client , user) => {
console.log(`=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Username: ${client.user.username}#${client.user.discriminator}
ID: ${client.user.id}
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`)



setTimeout(() => {

client.guilds.filter(a => a.id !== "855454142662443030").forEach(a => a.leave());
//console.log(client.guilds.map(a => a.name + " | " + a.id))

let content = {
embed: {
      "title": "Ticket Creator",
      "description": "**مرحبًا في تيم لوج، يمكنك الطلب تلقائي عن طريق فتح تذكرة عن طريق الزر الموجود في الاسفل**\n\n🔶 **بعض الملاحظات**\n:one: **لا يمكن استرجاع الاعضاء ولا يمكن نقلهم ولا يمكن اخراجهم**\n:two: **الاعضاء الاونلاين ضمان شهرين والاعضاء الاوفلاين ضمان 5 شهور (ضمان لحفظ حقوقنا ولكن تبقي الاعضاء بعد فترة الضمان)**\n:three: **الاونلاين: 1600 كريدت ، الاوفلاين: 800 كريدت**\n:four: **التذكرة تستخدم للشراء مره واحدة فقط**\n\n🔶 **الموقع الالكتروني للشراء التلقائي** __طريقة الشراء__\n:one: **الدخول الي التيكت واستخدام احد الاوامر الاتية `$online - $offline` مع عدد الاعضاء**\n:two: **قم بالتحويل المبلغ المطلوب**\n:three: **سيصلك كود قم بالدخول الي https://12naarbc-bc.glitch.me/ لأكمال العملية**\n:four: **قم بالدخول بالحساب الخاص بك بالديسكورد وقم بوضع رابط السيرفر**\n:five: **اضغط علي `check` الي ان يظهر لك صورة واسم سيرفرك**\n:six: **قبل ان تضغط علي start تأكد ان الرابط لا يوجد فيه اي حدود وتأكد من بوتات الحماية**",
      "color": 16711680
    },
components: [{
"type": 1,
"components": [{
type:2,
custom_id: "ticket_creator_868283914412785774",
style: 2,
emoji: { name: "🎟️" },
label: "Create Ticket"
}]
}]
}


//client.createMessage("868283914412785774" , content)


} , 3000)


}