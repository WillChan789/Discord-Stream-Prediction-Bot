module.exports = {
    name: "balance",
    aliases: ['bal'],
    permissions: [],
    description: "Check user balance.",
    execute(message, args, cmd, client, discord, profileData, pred_started, user_preds) {
        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle(`${message.author.username}'s Balance`)
        .addFields(
            {name: 'Points:', value: `${profileData.points}`}
        );
        message.channel.send(newEmbed);
        //chat message instead of embed
        //message.channel.send(`You have ${profileData.points} points.`);
    }
};
