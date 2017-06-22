if (!process.env.DRESS_TELLER_TOKEN_PRO) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

const Botkit = require('botkit');
const CronJob = require('cron').CronJob;
const connection = require('./mysqlConnection.js');
const Teller = require('./teller.js');
const controller = Botkit.slackbot({
    debug: false
});

const bot = controller.spawn({
    token: process.env.DRESS_TELLER_TOKEN_PRO
}).startRTM((err, bot, playload) => {
    if(err) throw new Error('Could not connect to Slack');
    new CronJob({
        // cronTime: '0 7 * * *', // 毎日朝の7時に
        cronTime: '* * * * *',// とにかく毎分
        onTick: function(){
            Teller.tellDress();
        },
        start: true,
        timeZone: 'Asia/Tokyo',
    });
});

controller.hears(['hello'], 'direct_message,direct_mention,mention', (bot, message) => {
    bot.reply(message, 'hello!');
});

controller.hears("^p$", 'direct_message, direct_mention, mention', (bot, message) => {
    Teller.tellPremiumDress(bot, message);
});

controller.hears("^r$", 'direct_message, direct_mention, mention', (bot, message) => {
    Teller.reTellDress(bot, message);
});
