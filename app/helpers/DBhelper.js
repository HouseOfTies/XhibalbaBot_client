import pkg from 'pg';
const { Pool } = pkg;

const defaultConfig = {
    user: 'postgres',
    host: 'localhost',
    password: '',
    database: 'xhibadb',
};

export const DBhelper = (bot, message) => {
    const userId = (message.reply_to_message ? message.reply_to_message.from.id : message.from.id);
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

    const selectNick = async () => {
        const query = `SELECT nickname FROM users WHERE userid = ${userId}`;
        const res = await pool.query(query);
        const nickname = res.rows[0].nickname;
        return nickname;
    };

    const insertUser = async () => {
        const query = `INSERT INTO users(userID) values(${userId});`
        const userCheck = await userChecker(userId);

        if(userCheck){
            bot.sendMessage(chatId, "Ya eres residente de las profundidades. ⚜");
        }else{
            pool.query(query);
            bot.sendMessage(chatId, `⚜ Bienvenido al 7th ⚜\nDesde ahora serás recordado por toda la eternidad. ✅`);
        }
    };

    const updateNick = async (value) => {
        const query = `UPDATE users SET nickname = '${value[1]}' WHERE userId = ${userId}`;
        console.log(query);
        const userCheck = await userChecker(userId);

        if(userCheck){
            pool.query(query);
            bot.sendMessage(chatId, `He cambiado tu apodo a: ${value[1]}`);
        }else{
            bot.sendMessage(chatId, "Tienes que estar registrado para poder portar un apodo.");
        }
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
        insertUser,
        updateNick,
        deleteUser,
        selectNick,
    };
  };


