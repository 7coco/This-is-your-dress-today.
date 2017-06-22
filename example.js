if (!process.env.DRESS_TELLER_TOKEN_PRO) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var Botkit = require('botkit');
var controller = Botkit.slackbot({
  debug: false
});

var bot = controller.spawn({
  token: process.env.DRESS_TELLER_TOKEN_PRO
}).startRTM();

controller.hears(['hello'], 'direct_message,direct_mention,mention', function(bot, message) {
  bot.reply(message, 'hello!');
});
