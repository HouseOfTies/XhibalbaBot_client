import pkg from 'pg';
const { Pool } = pkg;

export const DBhelper = (bot, message) => {
    const userId = message.from.id;
    const chatId = message.chat.id;
    const { username } = message.from;

    const defaultConfig = {
        user: 'postgres',
        host: 'localhost',
        password: '',
        database: 'xhibadb',
    };
    const pool = new Pool(defaultConfig);
  
    const userChecker = () => {
      
    }

    const selectUser = async () => {
        
    };

    const insertUser = async () => {
        bot.sendMessage(chatId, "done");
    };

    const updateUser = async () => {
        
    };

    const deleteUser = async () => {
        
    };
  
  
    return {
        selectUser,
        insertUser,
        updateUser,
        deleteUser,
    };
  };


/*   const res = await pool.query(`select * from users where userId = ${userId}`);

        if(!message.from.username){
            bot.sendMessage(chatId, "Necesitas de un username (nombre de usuario) para poder registrarte. Ve a configuración > ajustes > editar perfil y registra un nombre de perfil.");
        }else{
            if(res.rowCount === 1) {
                bot.sendMessage(chatId, "Ya eres residente de las profundidades.");
            }else{
                pool.query(`INSERT INTO users(userId) VALUES(${userId})`);
                bot.sendMessage(chatId, `Bienvenido al 7th 🎀\nDesde ahora serás recordado por toda la eternidad. @${username}`);
            };
        } */