const profileModel = require('../models/profileSchema');

module.exports = {
    name: "predict",
    aliases: ["pred"],
    permissions: [],
    description: "Join a discord prediction.",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer) {
        const option = parseInt(args[0]);
        const amount = args[1];

        if (option > 2 || option < 1 || isNaN(option)) {
            message.channel.send("Invalid option");
            return false;
        }
        if (amount % 1 != 0 || amount <= 0) {
            message.channel.send("Prediction must be whole number.");
            return false;
        }
        try {
            if (amount > profileData.points) {
                message.channel.send("Not enough points.");
                return false;
            }
            if (!pred_timer) {
                message.channel.send("Prediction period is over.");
                return false;
            }
            if (user_preds.has(message.author.id)) {
                message.channel.send(`${message.author.username}, you have already predicted.`);
                return false;
            }

            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        points: -amount,
                    }
                }
            );

            message.channel.send(`${message.author.username} has predicted option ${option} with ${amount} points.`);
            return true;

        } catch (err) {
            console.log(err);
        }
    }
}
