const profileModel = require('../models/profileSchema');

module.exports = {
    name: "more",
    aliases: [],
    cooldown: 1800,
    permissions: [],
    description: "Give user random points.",
    async execute(message, args, cmd, client, discord, profileData) {
        const random = Math.floor(Math.random() * 1000) + 1;

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
