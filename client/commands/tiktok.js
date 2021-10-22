const fetch = require('node-fetch')

module.exports = {
	name: 'tiktok', // اسم الامر
	description: "Ramdon video tik tok", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(db,bot ,msg , args) {
const got = require('got');
fetch(`https://m.tiktok.com/api/recommend/item_list/?aid=1988&app_name=tiktok_web&device_platform=web&referer=&root_referer=&user_agent=Mozilla%2F5.0+(Windows+NT+10.0)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F88.0.4324.104+Safari%2F537.36&cookie_enabled=true&screen_width=1360&screen_height=768&browser_language=ar-EG&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F88.0.4324.104+Safari%2F537.36&browser_online=true&ac=4g&timezone_name=Africa%2FCairo&priority_region=EG&verifyFp=verify_kkqd2vf4_RM6KnwbP_0KO9_400Z_AenG_DANMWSGsrJv7&appId=1233&region=EG&appType=m&isAndroid=false&isMobile=false&isIOS=false&OS=windows&did=6925513396894320129&tt-web-region=EG&uid=6925331196185838597&count=30&itemID=1&language=ar&fromPage=fyp&insertedItemID=&_signature=_02B4Z6wo00f01JaKwIwAAIDBMVBrk4SiNjyWi8QAAEX285` , {
method: 'GET', headers: { 'Content-Type': 'application/json' , cookie: "tt_webid_v2=6925513396894320129; tt_webid=6925513396894320129; tt_csrf_token=RuEwQHy3hvCa3wmXdX2vBloQ; ttwid=1%7CpRF2aUk6G3XRrsdZrBFu62F1Yq9D0lAUrwMGpActmN0%7C1612471763%7C2aa20c302dbf30e2bf9a3ac9bfb369038b71e642017371d8da3163703a295612; passport_csrf_token=2f8a909a298e05e9c0f889fa30faf17b; passport_csrf_token_default=2f8a909a298e05e9c0f889fa30faf17b; sid_guard=00d30156d6e69e111a367d7ea2d5f3dd%7C1612471834%7C5184000%7CMon%2C+05-Apr-2021+20%3A50%3A34+GMT; uid_tt=8f1a43af4832595261e7d7ae1985918dc287692a84ad1f5e48abaf3166ca85f8; uid_tt_ss=8f1a43af4832595261e7d7ae1985918dc287692a84ad1f5e48abaf3166ca85f8; sid_tt=00d30156d6e69e111a367d7ea2d5f3dd; sessionid=00d30156d6e69e111a367d7ea2d5f3dd; sessionid_ss=00d30156d6e69e111a367d7ea2d5f3dd; store-idc=alisg; store-country-code=eg; odin_tt=b10dd0174c7e26bfe356655a64ba5080fdf01d49ed5808386f0d29b2c0945143c601d385034c49fd22f838be8d10e2e6425e6375d65dbda0593b2c5c4ee8aa4c07215865a0c7f8d6fef348ec287df9ee; csrf_session_id=585a0a631a014041b2a32840eec343e4; bm_sz=B72ADA08DFBFF71994E7F9BBB39C2440~YAAQnrOe1Q8HqUR4AQAAz6eVTAuO2aADyzSvB3GHd0tVwmiTv3J0cWyG56RR1L6uMiMUNLhMVn4p4B3ekYtbyRvUDTwNzX65xKnmnZnRsSGwETM7VUWMimy2dv3bikjEuNkHlPnFSLIeT83Zqfx0tdaURx4+iETuqVmnX65qDheRXczdSC8w5eC1HSN9QENp; _abck=40709903CB88A4C9E790F4DBB379690D~0~YAAQnrOe1RAHqUR4AQAAz6eVTAWidozIhoefw8FCCG7RbzDoE2c1A37L8wE1sK6TQSLGVDUIxmM8yA1sO/8f9KSr0dseuZa8N1ovz+hO0MbQnIp8PoODkTPM2i+80XZ6eIrwnf437qf4lFYY/dSrphBSMQyVPJDRPfeZXmSz/EjALnDdijr5nAqW6ubirQSwl2tF/bdEepOVFMkPJJPMEopIjmHWK7GA28yOj7K/fbPww/exc+SGcP5DhnKDs6Jvrh0Z4qtkBoN80pl7ptIXO3QGQts6i/8QKtW3PHaqEoU37DtFmzKYLwn2UEVLLCV3Q0jNObCnIM9ivQexmuQigFv1lEpNC+mfocnzOD1RAKwfhEQWx3HCEe0sBvWqf/0raQu7vFk=~-1~-1~-1; R6kq3TV7=AEe4lUx4AQAARyPgEYgqwG2qU3nYnpSeS6giedLVlveRNU87DvJpQxm7wR3c|1|0|857a86632dc98b505da26f3d80127b9333002fe8; ak_bmsc=5C9FD5F0D0819A11E307F780CBCCF010D59EB39E5673000043245560D8C98167~pl2rQUHrjmjv5nX7V4GEmlOlg1FCd0eJtyne7AHOz7+Hlh50IDBFQibO+SpAgJW2RVpndU86+dCpH1ZI50npxydU9DWjRZTx6sNlOy4+n/nZENDFtRxfJz6AZeSz8REBD3hCcpQwCiy9yrbBjn9dDiKFXMEvZJvaQlIlcLg/bo+9rEP7aPXEMwvbw+4KsyNE3YjqShMO1QCMtQ7ySw4nbl73jsxJwHDtyHlRaBoMlA94FSapuHbwHQ/5anowjtspYy; cmpl_token=AgQQAPMsF-RMpbAlVqBkpF08-n3EjnqHf4OnYPicAg; bm_sv=577F6E19392A1DE66EB22D591C5E3431~iP0CZxJZ2dtIUGBJo3kJnzjj5x9BSWTx8VIzS2z7w0lUwZP5QKPIxqmlUR6dGT84ChwUAi+jpVa7qkcPz9M/EcuyFdjPFAQogGMg4i33K20xdEqmUix6jGSTtm7U8u3YI4iuxEN10kqyk1p+rhy/bVKXD+BDA2/1eJmE/61lJYg=" }, referrerPolicy: "no-referrer"}).then(async ressa =>{
  let json = await ressa.json();
let data = json.itemList[Math.floor(Math.random() * json.itemList.length)]
        const response = await got(data.video.playAddr, { responseType: 'buffer' });
        const buffer = response.body;
bot.createMessage(msg.channel.id, {embed:{

      "color": 176905,
      "fields": [
        {
          "name": "Description",
          "value": data.desc
        },
        {
          "name": "Share",
          "value": data.stats.shareCount
        },
        {
          "name": "Likes",
          "value": data.stats.diggCount
        },
        {
          "name": "Comment",
          "value": data.stats.commentCount
        },
        {
          "name": "Play",
          "value": data.stats.playCount
        },     {
          "name": "Nickname",
          "value": data.author.nickname
        },
        {
          "name": "Verified?",
          "value": data.author.verified
        },
        {
          "name": "ID",
          "value": data.author.uniqueId
        }
]
        
}})
return bot.createMessage(msg.channel.id, `Download Here =>`, [{file:buffer, name: "tiktok.mp4"}])
})
	},
};
