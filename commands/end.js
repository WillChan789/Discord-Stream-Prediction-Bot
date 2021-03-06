const profileModel = require('../models/profileSchema');

module.exports = {
    name: "end",
    aliases: [],
    permissions: ["MANAGE_GUILD"],
    description: "Start a discord prediction.",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred, c1pool, c2pool) {
        if (!pred_started)
            return await message.channel.send("Prediction has not yet been started. ");

        if (args.length != 1)
            return await message.channel.send("Incorrect number of args.");
        if (isNaN(args[0]))
            return await message.channel.send("Invalid choice.");

        var total = 0;
        var c1total = 0;
        var c2total = 0;
        for (const user of user_preds) {
            var pred = parseInt(user[1].option);
            total += parseInt(user[1].amount);
            if (pred === 1)
                c1total += parseInt(user[1].amount);
            else if (pred === 2)
                c2total += parseInt(user[1].amount);
        }

        var ratio = 0;
        if (args[0] == 1)
            ratio = (total/c1total).toFixed(1);
        else if (args[0] == 2)
            ratio = (total/c2total).toFixed(1);

        for (const user of user_preds) {
            var pred = parseInt(user[1].option);
            if (pred == args[0]) {
                if (ratio > 1.1)
                    var winning = parseInt(user[1].amount) * ratio;
                else
                    var winning = parseInt(user[1].amount) * 1.15;
                    winning = winning.toFixed(0);
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
        .setDescription(`${message.author.username} has ended the prediction with option ${args[0]} winning ${ratio} times the points.`);
        message.channel.send(newEmbed);
    }
}
