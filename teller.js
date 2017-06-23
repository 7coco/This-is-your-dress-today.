const Selector = require('./selector');

class Teller {
    constructor(conn){
        this.conn = conn;
    }

    tellDress(bot){
        var conn = this.conn
        //var temperature = getTempereture();
        var selector = new Selector(conn);
        var temperature = 25;
        selector.selectDress()
        .then((dress) => {
            console.log(this.toString(dress));
            bot.say({
                channel: 'general',
                text: this.toString(dress),
            });
        });
    }

    tellPremiumDress(bot, message){
        bot.reply(message, 'premia_dress');
    }

    reTellDress(bot, message){
        bot.reply(message, 'Re choice dress');
    }

    toString(dress){
        return "This is your dress today. \n" +
            `${dress.outer_name}\n` +
            `${dress.outer_image_url}\n` +
            `${dress.under_image_url}\n`;
    }
}



module.exports = Teller;
