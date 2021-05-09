const profileModel = require('../models/profileSchema');

module.exports = {
    name: "daily",
    aliases: [],
    cooldown: 72000,
    permissions: [],
    description: "Give user random daily points.",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer) {
        const max = 1000;
        const min = 750;
        const random = Math.floor(Math.random() * (max - min + 1) + min);

        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                points: random,
            },
        });
        return message.channel.send(`${message.author.username} has received ${random} points.`);
    },
};
