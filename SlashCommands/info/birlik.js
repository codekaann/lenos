const { Client, CommandInteraction, MessageEmbed, User } = require("discord.js");

const klanHaklari = new Map();

module.exports = {
    name: "kayıt",
    description: "Birliğe Alım Yapmanızı Sağlar.",
    options: [
        {
            name: "kişi",
            description: "Kişi",
            type: "USER",
            required: true
        },
        {
            name: "birlik",
            description: "Birlik Seçiniz",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "Karşı Atak Timi",
                    value: "cat"
                },
                {
                    name: "Emniyet Genel Müdürlüğü",
                    value: "egm"
                },
                {
                    name: "Jandarma Genel Komutanlığı",
                    value: "jgk"
                },
                {
                    name: "Lenos Haber Ajansı",
                    value: "lha"
                }
            ]
        },
        {
            name: "isim",
            description: "Kişi İsmi Varsa Sınıf",
            type: "STRING",
            required: true
        },
        {
            name: "rütbe",
            description: "Rütbesi",
            type: "STRING",
            required: true
        }
    ],
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const ayars = {
            "cat": "1076093288836251658", // TSK rolünün ID'sini buraya yazın
            "egm": "1075881701860982914", // EGM rolünün ID'sini buraya yazın
            "jgk": "1078034855830499500", // JGK rolünün ID'sini buraya yazın
            "lha": "1130958230160416849", // L HABER rolünün ID'sini buraya yazınn
        };

        const rolls = [
            "1076093288836251658", // TSK rolünün ID'sini buraya yazın
            "1075881701860982914", // EGM rolünün ID'sini buraya yazın
            "1078034855830499500", // JGK rolünün ID'sini buraya yazın
            "1130958230160416849", // LHA rolünün ID'sini buraya yazın
        ];

        if (!interaction.member.roles.cache.has("1130819639987933254")) {
            return interaction.followUp({ content: "Bu komutu kullanmak için gerekli yetkiye sahip değilsin" });
        }

        const selectedBirlik = interaction.options.getString("birlik");
        if (!rolls.includes(ayars[selectedBirlik])) {
            return interaction.followUp({ content: "Bu rolü veremezsin!" });
        }

        const birlikRoleId = ayars[selectedBirlik];
        const kişiMember = interaction.options.getMember("kişi");
        const isim = interaction.options.getString("isim");
        const rütbe = interaction.options.getString("rütbe");

        let klanHaklariSayisi = klanHaklari.get(kişiMember.id) || 0;

        if (klanHaklariSayisi >= 50) {
            return interaction.followUp({ content: `:information_source: **Klan Hakkı Bitti (Birliğe Alınmadı)** **|** ${kişiMember.toString()}` });
        }

        kişiMember.roles.add(birlikRoleId).catch(error => {
            console.error("Birlik rolü verilirken hata oluştu:", error);
            const owner = client.users.cache.get("545651586559377410");
            interaction.followUp({ content: `Birlik rolü verilirken bir hata oluştu. Hata sahibine bildirildi: ${owner}` });
        });

        const nickname = `[${selectedBirlik.toUpperCase()}]${isim}[${rütbe}]`;
        kişiMember.setNickname(nickname).catch(error => {
            console.error("Kullanıcı adı değiştirilirken hata oluştu:", error);
            const owner = client.users.cache.get("545651586559377410");
            interaction.followUp({ content: `Kullanıcı adı değiştirilirken bir hata oluştu. Hata sahibine bildirildi: ${owner}` });
        });

        interaction.followUp({ content: `:arrows_counterclockwise: Birliğe Alındı **|** ${kişiMember.toString()} ` });

        klanHaklari.set(kişiMember.id, klanHaklariSayisi + 1);
    },
};
