module.exports = {
    name: "donate",
    aliases: [],
    permissions: [],
    description: "Donate to the bot developer.",
    execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred) {
        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction Donate')
        .setURL('https://paypal.me/WChan8?locale.x=en_US')
        .setDescription('https://paypal.me/WChan8?locale.x=en_US');
        message.channel.send(newEmbed);
    }
}
