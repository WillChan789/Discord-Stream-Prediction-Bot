require('dotenv').config();
const profileModel = require('../../models/profileSchema');

const cooldowns = new Map();
var pred_started = false;
var user_preds = new Map();

module.exports = async (Discord, client, message) => {
    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                points: 1000,
                pot: 0,
            });
            profile.save();

        }
    }catch(err) {
        console.log(err);
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find( a => a.aliases && a.aliases.includes(cmd));
    //permissions for commands
    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]

    if (command.permissions.length) {
        let invalidPerm = [];
        for (const perm of command.permissions) {
            if (!validPermissions.includes(perm)) return console.log(`Invalid Permission: ${perm}`);
            if (!message.member.hasPermission(perm)) {
                invalidPerm.push(perm);
                break;
            }
        }
        if (invalidPerm.length) return message.channel.send(`Missing Permission: \` ${invalidPerm} \``);
    }

    //cooldowns for commands
    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const curr_time = Date.now();
    const time_stamp = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    if (time_stamp.has(message.author.id)) {
        const expiration_time = time_stamp.get(message.author.id) + cooldown_amount;

        if (curr_time < expiration_time) {
            const time_left = (expiration_time - curr_time) / 1000 / 60;
            return message.reply(`Wait ${time_left.toFixed(1)} minutes before using d${command.name} again.`);
        }
    }

    time_stamp.set(message.author.id, curr_time);
    setTimeout(() => time_stamp.delete(message.author.id), cooldown_amount);
    
    /*
    if (pred_started && command.name === "start") {
        return message.channel.send("A prediction has already been started. ");
    }
    if (!pred_started && command.name === "predict") {
        return message.channel.send("Prediction has not yet been started. ");
    }
    */

    try {
        var cmdres = command.execute(message, args, cmd, client, Discord, profileData, pred_started, user_preds);

        if (command.name === "start")
            pred_started = true;
        if (command.name === "end" && pred_started) {
            pred_started = false;
            user_preds.clear();
        }
        if (command.name === "predict") {
            var cast = Promise.resolve(cmdres);
            var success;
            cast.then(function(value) {
                success = value;
                if (success) {
                    user_preds.set(message.author.id, {option: args[0], amount: args[1]});
                }
            });
        }
    } catch (err) {
        message.reply("Error executing command.");
        console.log(err);
    }

    //if (command) command.execute(message, args, cmd, client, Discord, profileData, pred_started, user_preds);
}
