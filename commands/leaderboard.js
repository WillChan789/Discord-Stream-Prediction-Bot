const profileModel = require('../models/profileSchema');

module.exports = {
    name: "leaderboard",
    aliases: ['lb'],
    permissions: [],
    description: "View the leaderboard of points.",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred) {
        const lb = await profileModel.find({
            serverID: message.guild.id,
        }).sort({
            points: -1,
        });

        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction Leaderboard')
        .setDescription("Most Points in Server Sorted");
        for (var i = 0; i < lb.length; i++) {
            newEmbed.addFields(
                { name: `${i+1}:`, value: `${lb[i].userName} with ${lb[i].points} points`}
            );
        }
        message.channel.send(newEmbed);
    }
}
