if (!process.env.DRESS_TELLER_TOKEN_PRO) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

const Botkit = require('botkit');
const CronJob = require('cron').CronJob;
const request = require("request-promise-native");

const conn = require('./mysqlConnection.js');
const Teller = require('./teller.js');
const Weather = require('./weather.js');
const Updater = require('./updater.js');
const controller = Botkit.slackbot({
    debug: false
});

var teller = new Teller(conn);
var weather = new Weather(request);
const bot = controller.spawn({
    token: process.env.DRESS_TELLER_TOKEN_PRO
}).startRTM((err, bot, playload) => {
    if(err) throw new Error('Could not connect to Slack');
    new CronJob({
        // cronTime: '0 7 * * *', // 毎日朝の7時に
        cronTime: '0 7 * * *',// とにかく毎分
        onTick: function(){
            bot.say();
        },
        start: true,
        timeZone: 'Asia/Tokyo',
    });
});

controller.hears(['hello'], 'direct_message,direct_mention,mention', (bot, message) => {
    bot.reply(message, 'hello!');
});

controller.hears("^p$", 'direct_message, direct_mention, mention', (bot, message) => {
    teller.tellPremiumDress(bot, message);
});

controller.hears("^r$", 'message_received', (bot, message) => {
    weather.getTempereture()
    .then((temperature) => {
        teller.reTellDress(bot, message, weather.getTemperetureZone(temperature));
    });
});
