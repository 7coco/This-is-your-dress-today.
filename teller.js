const Selector = require('./selector');

class Teller {
    constructor(conn){
        this.conn = conn;
    }

    tellDress(bot, temperature){
        var conn = this.conn;
        //var temperature = getTempereture();
        var selector = new Selector(conn);
        selector.selectDress(temperature)
        .then((dress) => {
            bot.say({
                channel: 'general',
                text: this.toString(dress),
            });
        });
    }

    tellPremiumDress(bot, message){
        bot.reply(message, 'premia_dress');
    }

    reTellDress(bot, message, temperature){
        var conn = this.conn;
        var selector = new Selector(conn);
        selector.selectDress(temperature)
        .then((dress) => {
            bot.reply(message, this.toString(dress));
        });
    }

    toString(dress){
        return "Good modning, Coco." +
            "This is your dress today. \n" +
            `${dress.outer_name}\n` +
            `${dress.outer_image_url}\n` +
            `${dress.under_image_url}\n`;
    }
}



module.exports = Teller;
