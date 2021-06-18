import pkg from 'pg';
const { Pool } = pkg;

const defaultConfig = {
    user: 'postgres',
    host: 'localhost',
    password: '',
    database: 'xhibadb',
};

export const DBhelper = (bot, message) => {
    const userId = message.from.id || (message.reply_to_message ? message.reply_to_message : message.from.id);
    const chatId = message.chat.id;
    const { username } = message.from;


    const pool = new Pool(defaultConfig);
  
    const userChecker = async () => {
        let userExist = null;
        const query = `SELECT * FROM users WHERE userid = ${(userId)}`;
        const res = await pool.query(query);
        res.rowCount === 0 ? userExist = false : userExist = true;

        return userExist;
        }

    const selectUser = async () => {
        
    };

    const insertUser = async () => {
        const query = `insert into users(userID) values(${userId});`
        const userCheck = await userChecker(userId);

        if(userCheck){
            bot.sendMessage(chatId, "Ya eres residente de las profundidades. ⚜");
        }else{
            pool.query(query);
            bot.sendMessage(chatId, `⚜ Bienvenido al 7th ⚜\nDesde ahora serás recordado por toda la eternidad. ✅`);
        }
    };

    const updateUser = async () => {
        
    };

    const deleteUser = async () => {
        const query = `delete from users where userid = ${userId};`
        const userCheck = await userChecker(userId);

        if(userCheck){
            bot.sendMessage(chatId, "Fue bueno tenerte en el abismo, pero veo que quieres ascender. Vuelve pronto. 🌬💨🍃");
            pool.query(query);
        }else{
            bot.sendMessage(chatId, `No puedo eliminar un nombre que no ha sido registrado. ❌`);
        }
    };
  
  
    return {
        userChecker,
        selectUser,
        insertUser,
        updateUser,
        deleteUser,
    };
  };


