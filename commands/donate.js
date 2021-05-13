module.exports = {
    name: "donate",
    aliases: [],
    permissions: [],
    description: "Donate to the bot developer.",
    execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred) {
        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction Donate')
        .setURL('https://paypal.me/pools/c/8ziaAZmUdP')
        .setDescription('https://paypal.me/pools/c/8ziaAZmUdP');
        message.channel.send(newEmbed);
    }
}
