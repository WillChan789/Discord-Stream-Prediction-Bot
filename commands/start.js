module.exports = {
    name: "start",
    aliases: [],
    permissions: [],
    description: "Start a discord prediction.",
    execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer) {
        if (pred_started)
            return message.channel.send("A prediction has already been started. ");

        const user_args = message.content.split('"');
        const choice1 = user_args[2].slice(1).split(" ")[0];
        const choice2 = user_args[2].slice(1).split(" ")[1];

        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction')
        .setDescription(user_args[1])
        .addFields(
            { name: "Option 1:", value: choice1 },
            { name: "Option 2:", value: choice2 },
        );
        message.channel.send(newEmbed);
    }
}
