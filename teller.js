const connection = require('./mysqlConnection.js');

class Teller {
    static tellDress(){
        console.log("tell dress");
        //console.log(connection);
    }

    static tellPremiumDress(bot, message){
        bot.reply(message, 'premia_dress');
    }

    static reTellDress(bot, message){
        bot.reply(message, 'Re choice dress');
    }
}


module.exports = Teller;
