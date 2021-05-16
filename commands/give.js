const profileModel = require('../models/profileSchema');

module.exports = {
    name: "give",
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Give amount of points to a user.",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred) {
        if (message.author.id != message.guild.ownerID)
            return message.channel.send("You are not the server owner.");
        var user = message.mentions.users.firstKey();
        var amount = args[1];

        const response = await profileModel.findOneAndUpdate({
            userID: user,
        }, {
            $inc: {
                points: amount,
            },
        });

        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction')
        .setDescription(`${message.mentions.users.first().username} has gained ${amount} points.`);
        return message.channel.send(newEmbed);
    }
}
