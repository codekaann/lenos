const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "birimler",
  description: "Birimlerde bulunan kullanıcıları listeler",
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    const birimler = [
      { ad: "C.A.T.", rolId: "1076093288836251658" },
      { ad: "J.G.K.", rolId: "1078034855830499500" },
      { ad: "E.G.M.", rolId: "1075881701860982914" },
      { ad: "L.H.A.", rolId: "1130958230160416849" }
    ];

    const embed = new MessageEmbed()
      .setTitle("Birimlerdeki Kullanıcılar")
      .setColor("#0099ff");

    birimler.forEach(birim => {
      const birimRol = interaction.guild.roles.cache.get(birim.rolId);
      const kullanıcılar = birimRol.members;

      const kullanıcıEtiketleri = kullanıcılar.map(kullanıcı => kullanıcı.toString());
      const kullanıcıSayısı = kullanıcılar.size;

      embed.addField(birim.ad, `${birimRol.name} (${kullanıcıSayısı} Kişi)\n${kullanıcıEtiketleri.join(", ")}`, true);
    });

    interaction.reply({ embeds: [embed] });
  }
};
