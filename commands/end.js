module.exports = {
    name: "end",
    aliases: [],
    permissions: ["MANAGE_GUILD"],
    description: "Start a discord prediction.",
    execute(message, args, cmd, client, discord, profileData) {
        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction')
        .setDescription(`${message.author.username} has ended the prediction with option ${args[0]} winning.`);
        message.channel.send(newEmbed);
    }
}
