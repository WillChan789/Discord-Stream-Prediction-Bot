module.exports = {
    name: "help",
    aliases: [],
    permissions: [],
    description: "Show commands to user. ",
    execute(message, args, cmd, client, discord, profileData, pred_started, user_preds) {
        const newEmbed = new discord.MessageEmbed()
        .setColor('#0b6eef')
        .setTitle('Discord Stream Prediction Help')
        .setDescription("Commands")
        .addFields(
            { name: "balance (bal):", value: "Check your balance. Usage: dbalance, dbal" },
            { name: "more:", value: "Get a random amount of points every 30 minutes. Usage: dmore" },
            { name: "start:", value: 'Start a prediction. Usage: dstart "Will I win this game" yes no' },
            { name: "predict (pred):", value: "Make a prediction. Usage: dpredict 1 100, dpred 2 100"},
            { name: "end *requires Manage Server permission*:", value: "End the current prediction. Usage: dend 1, dend 2"},
            { name: "invite:", value: "Invite bot to server. Usage: dinvite"},
            { name: "daily:", value: "Get a random amount of points every 20 hours. Usage: ddaily"},
            { name: "donate:", value: "Donate to developer. Usage: ddonate"},


        );
        message.channel.send(newEmbed);
    }
}
