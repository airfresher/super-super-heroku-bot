const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client({ autoconnect: true });
const broadcast = client.createVoiceBroadcast();
const streamOptions = { seek:0, volumn: 1};
const channel = "529291148339052545";
let is_inchannel = false;
client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
});
client.on('message', (message) => {
    if(message.content.substring(0,2) == ">>"){
        const player = message.member.voiceChannel.join();
       
        let arr = message.content.split(">>")[1];
        let msg = arr.split(" ")[0];
        switch(msg){
                    case 'join':
                message.member.voiceChannel.join().then(connection => {
                    is_inchannel = true;
                    console.log("entered voicechannel");
                   
                });
                break;
                    case 'leave':
                if(is_inchannel){
                    message.member.voiceChannel.leave();
                    is_inchannel = false;
                }
                else{
                    message.reply("現在不在頻道中");
                }
                break;
                    case 'youtube':
                    case 'yt':
                if(is_inchannel){
                    try
                    {
                        let URL = arr.split(" ")[1];
                        console.log(URL);
                        message.member.voiceChannel.join().then(connection => {
                            const stream = ytdl(URL, streamOptions);
                            broadcast.playStream(stream);
                            const dispatcher = connection.playBroadcast(broadcast);
                        });
                       
                    }
                    catch(error)
                    {
                       message.reply("輸入格式有誤");
                   }
                   
                }
                break;        
                    case 'pause':
                    case 'p':
                if(is_inchannel){
                    player.then(connection => {
                        broadcast.pause();
                        const dispatcher = connection.playBroadcast(broadcast);
 
                    })
                }
                break;
 
            case 'unpause':
            case 'up':
                if(is_inchannel){
                    player.then(connection => {
                        broadcast.resume();
                        const dispatcher = connection.playBroadcast(broadcast);
                    })
                }
    }
  }
});  
client.login(process.BOT_TOKEN);
