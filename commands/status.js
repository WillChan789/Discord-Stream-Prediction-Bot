module.exports = {
    name: 'status',
    aliases: [],
    permissions: [],
    description: "Check current active prediction.",
    execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred) {
        if (!pred_started)
            return message.channel.send("Prediction has not yet been started. ");

        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction')
        .setDescription(curr_pred[0])
        .addFields(
            { name: "Option 1:", value: curr_pred[1] },
            { name: "Option 2:", value: curr_pred[2] },
        );
        message.channel.send(newEmbed);
    }
}
