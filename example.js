if (!process.env.DRESS_TELLER_TOKEN_PRO) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

const Botkit = require('botkit');
const CronJob = require('cron').CronJob;
const controller = Botkit.slackbot({
    debug: true
});

const bot = controller.spawn({
    token: process.env.DRESS_TELLER_TOKEN_PRO
}).startRTM(function(err, bot, playload){
    if(err) throw new Error('Could not connect to Slack');
    new CronJob({
        // cronTime: '0 7 * * *', // 毎日朝の7時に
        cronTime: '* * * * *',// とにかく毎分
        onTick: tellTDress(),
        start: true,
        timeZone: 'Asia/Tokyo',
    });
});

controller.hears(['hello'], 'direct_message,direct_mention,mention', function(bot, message) {
    bot.reply(message, 'hello!');
});
