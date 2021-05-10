const profileModel = require('../models/profileSchema');

module.exports = {
    name: "end",
    aliases: [],
    permissions: ["MANAGE_GUILD"],
    description: "Start a discord prediction.",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred) {
        if (!pred_started)
            return message.channel.send("Prediction has not yet been started. ");

        if (args.length != 1)
            return message.channel.send("Incorrect number of args.");
        if (isNaN(args[0]))
            return message.channel.send("Invalid choice.");

        for (const user of user_preds) {
            var pred = user[1].option;
            if (pred == args[0]) {
                var winning = parseInt(user[1].amount) * 2;
                try {
                    await profileModel.findOneAndUpdate(
                        {
                            userID: user[0],
                        },
                        {
                            $inc: {
                                points: winning,
                            }
                        });
                    } catch (err) {
                        console.log(err);
                    }
            }
        }

        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction')
        .setDescription(`${message.author.username} has ended the prediction with option ${args[0]} winning.`);
        message.channel.send(newEmbed);
    }
}
