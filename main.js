const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const mongoose = require('mongoose');
const profileModel = require('./models/profileSchema');
const fs = require('fs');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err);
});

client.login(process.env.DISCORD_TOKEN);

process.on('SIGINT', async function() {
    console.log('caught int');
    var db = await profileModel.find({});
    var dbjson = JSON.stringify(db);
    try {
        fs.writeFileSync('users.json', dbjson);
        console.log('Wrote to users.json');
    } catch (err) {
        console.log('Error', err);
    }
    process.exit();
});
