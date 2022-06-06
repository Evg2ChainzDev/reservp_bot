

const PORT = process.env.PORT || 3000;

const TelegramApi = require('node-telegram-bot-api')
const { textShop, textShipping, textGoods, textContacts, textSupport  } = require('./texts')
const token = "5422803579:AAHqsmew1Ss4UDgx4cRssa5B_Jr19akd0A0";

const bot = new TelegramApi(token, { polling: true });



const reserveMenu = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Информация об магазине", callback_data: "shop" }],
      [{ text: "Информация о доставке", callback_data: "shipping" }],
      [{ text: "Информация о товаре", callback_data: "goods" }],
      [{ text: "Контакты", callback_data: "contacts" }],
      [{ text: "Связаться с менеджером", callback_data: "support" }]
    ],
  }),
};

const start = () => { 
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        `${msg.from.first_name} ${msg.from.last_name}, добро пожаловать в телеграм бот РезервП !`,
        reserveMenu
      );
    }

  });

  bot.on('callback_query', msg => {
    const chatId = msg.message.chat.id;
    const data = msg.data;
    // console.log(data);
    // bot.sendMessage(chatId, data);
    if (data == 'shop') { 
      bot.sendMessage(chatId, textShop, reserveMenu);
    }
    if (data == 'shipping') { 
      bot.sendMessage(chatId, textShipping, reserveMenu);
    }
    if (data == 'goods') { 
      bot.sendMessage(chatId, textGoods, reserveMenu);
    }
    if (data == 'contacts') { 
      bot.sendMessage(chatId, textContacts, reserveMenu);
    }
    if (data == 'support') { 
      bot.sendMessage(chatId, textSupport, reserveMenu);
    }
  })

}

start()


// bot.setMyCommands([
//   {command:'/start', description: 'Приветствие'}
// ])

    // if (text.indexOf("товар", 0) !== -1) {
    //   answearText = "текст с товаром";
    // }
    // if (text.indexOf("акции", 0) !== -1) {
    //   answearText = "текст с акциями";
    // }