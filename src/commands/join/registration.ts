export default function registration(userInfo: any) {
    require('@/loaders/mongoose');
    const User = require('@/models/User');

    const user = new User(userInfo.userInfo);

    user.save((err) => {
        if(err) {
            const response = "Ya estas registrado en los libros de las profundidades. ❌";
            return response;
        }
        else{
            const response = "`⚜️ Bienvenido al 7th ⚜️\nDesde ahora serás recordado por toda la eternidad. ✅\n";
            return response;
        }
    });
}