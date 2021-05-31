module.exports = {
    name: "invite",
    aliases: [],
    permissions: [],
    description: "Invite discord stream prediction bot to server.",
    execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred, c1pool, c2pool) {
        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction Invite')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=839637441370652682&permissions=8&scope=bot')
        .setDescription('https://discord.com/api/oauth2/authorize?client_id=839637441370652682&permissions=8&scope=bot');
        message.channel.send(newEmbed);
    }
}
