const fs = require("fs");
const login = require("facebook-chat-api");
var answeredThreads = {};
// login({email: "duongnv1996@gmail.com", password: "duong1221011999"}, (err, api) => {
//      if(err) {
//         switch (err.error) {
//             case 'login-approval':
//                 console.log('Enter code > ');
//                 rl.on('line', (line) => {
//                     err.continue(line);
//                     rl.close();
//                 });
//                 break;
//             default:
//                 console.error(err.error);
//         }
//         return;
//     }
//     fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
// });
login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    // Here you can use the api
    api.listen(function callback(err, message) {
        var d = new Date();
        var h = d.getHours();
        if(h >= 0 && h <= 6 ){
            api.getUserInfo(message.senderID, function(err, ret) {
                if(err) return console.error(err);
                for(var prop in ret) {
                    if(ret.hasOwnProperty(prop) && ret[prop].name) {
                        api.sendMessage( "BOT : Xin lỗi nha " + ret[prop].name + ", Giờ mình đi ra ngoài rồi, không có thời gian trả lời bạn.", prop, function(){
                            answeredThreads[message.threadID] = true;
                        });
                    }
                }
            });
        }
    });
});