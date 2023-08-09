const client = require("../index");

client.on('ready', () => {
    client.user.setActivity(`✨ Lenos Gaming #2023`)
    console.log(`${client.user.tag} isimli bot başarıyla şu an aktifleştirildi!`);
   });