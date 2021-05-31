const profileModel = require('../models/profileSchema');

module.exports = {
    name: "more",
    aliases: [],
    permissions: [],
    description: "Give user random points.",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred, c1pool, c2pool) {
        if (profileData.points != 0)
            return message.channel.send("You need to have 0 points to use this command.");

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
