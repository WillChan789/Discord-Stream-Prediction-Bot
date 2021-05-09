const profileModel = require('../models/profileSchema');

module.exports = {
    name: "more",
    aliases: [],
    cooldown: 3600,
    permissions: [],
    description: "Give user random points.",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds) {
        const max = 500;
        const min = 100;
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
