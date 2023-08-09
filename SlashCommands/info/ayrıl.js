const { Client, CommandInteraction } = require("discord.js");

// TSK,EGM,PÖH,JGK,Sarsılmaz Rollerini ID'lerini Buraya Giriniz.
const izinVerilmeyenRoller = ["1076093288836251658", "1075881701860982914", "1078034855830499500", "1130958230160416849"];

module.exports = {
    name: "ayrıl",
    description: "Birliğinizden ayrılmanızı sağlar.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const member = interaction.member;

        // Kullanıcının sahip olduğu rolleri kontrol eder
        const kullaniciRolleri = member.roles.cache.map(role => role.id);

        // İzin verilmeyen rolleri filtreler
        const alinacakRoller = kullaniciRolleri.filter(rol => izinVerilmeyenRoller.includes(rol));

        member.roles
            .remove(alinacakRoller)
            .then(() => {
                member.setNickname(" ").catch(error => {
                    console.error("Kullanıcı adı sıfırlanırken hata oluştu:", error);
                });

                interaction.followUp({ content: ":information_source: Başarıyla ayrıldınız!" });
            })
            .catch(error => {
                console.error("Roller alınırken hata oluştu:", error);
            });
    },
};
