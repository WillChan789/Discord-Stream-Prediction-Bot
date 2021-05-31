module.exports = {
    name: 'status',
    aliases: [],
    permissions: [],
    description: "Check current active prediction.",
    execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred, c1pool, c2pool) {
        if (!pred_started)
            return message.channel.send("Prediction has not yet been started. ");

        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction')
        .setDescription(curr_pred[0])
        .addFields(
            { name: "Option 1:", value: curr_pred[1] },
            { name: "Option 2:", value: curr_pred[2] },
            { name: "Option 1 Pool:", value: c1pool, inline: true },
            { name: "Option 2 Pool:", value: c2pool, inline: true },
        );
        message.channel.send(newEmbed);
    }
}
