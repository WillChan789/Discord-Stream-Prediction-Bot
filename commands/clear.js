module.exports = {
    name: 'clear',
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    description: "Clear messages!",
    async execute(message, args, cmd, client, discord, profileData, pred_started, user_preds, pred_timer, curr_pred, c1pool, c2pool) {
        if (!args[0]) return message.reply('Please enter amount of messages to clear.');
        if (isNaN(args[0])) return message.reply('Please enter real number.');
        if (args[0] > 100) return message.reply('Cannot remove more than 100 messages.');
        if (args[0] < 1) return message.reply('Cannot remove no messages.');

        await message.channel.messages.fetch({ limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages)
        });
    }
};
