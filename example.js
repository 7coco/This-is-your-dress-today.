if (!process.env.DRESS_TELLER_TOKEN_PRO) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const Botkit = require('botkit');
const CronJob = require('cron').CronJob;
const controller = Botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
  token: process.env.DRESS_TELLER_TOKEN_PRO
}).startRTM();

controller.hears(['hello'], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'hello!');
});
