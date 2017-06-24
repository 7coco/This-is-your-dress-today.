const Selector = require('./selector');
const Updater = require('./updater');

class Teller {
    constructor(conn){
        this.conn = conn;
    }

    tellDress(bot, temperature){
        var conn = this.conn;
        var selector = new Selector(conn);
        selector.selectDress(temperature)
        .then((dress) => {
            bot.startConversation(message, (err, convo) => {
                bot.say({
                    channel: 'general',
                    text: this.toString(dress),
                });
            });
            var updater = new Updater(conn);
            this.startConversation(bot, dress, updater);
            updater.updateLastSuggestedAt(conn);
            return dress;
        });
    }

    tellPremiumDress(bot, message){
        bot.reply(message, 'premia_dress');
    }

    reTellDress(bot, message, temperature){
        return new Promise((resolve) => {
            var conn = this.conn;
            var selector = new Selector(conn);
            selector.selectDress(temperature)
            .then((dress) => {
                var updater = new Updater(conn);
                this.startConversation(bot, message, dress, updater);
                updater.updateLastSuggestedAt(dress.dress_id);
                resolve(dress);
            });
        });
    }

    startConversation(bot, message, dress, updater){
        bot.startConversation(message, (err, convo) => {
            convo.say(this.toString(dress));
            convo.ask('Do you wear it? (y/n)', (res, convo) => {
                console.log(res);
                if(res.text == 'y'){
                    updater.updateLastWearedAt(dress.outer_id, dress.under_id);
                    convo.say('Okay! Then, see you tomorrow!');
                    convo.next();
                    return;
                }else if (res.text == 'n'){
                    convo.say('May I select a dress one more?\nIf you want, type "r".');
                    convo.next();
                    return;
                }
            });
        });
    }

    toString(dress){
        return "Good modning, Coco. " +
            "This is your dress today. \n" +
            `${dress.outer_name}\n` +
            `${dress.outer_image_url}\n` +
            `${dress.under_image_url}\n`;
    }
}



module.exports = Teller;
