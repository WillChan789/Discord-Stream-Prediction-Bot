const profileModel = require('../../models/profileSchema');

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        userName: member.username,
        serverID: member.guild.id,
        points: 1000,
    });
    profile.save();
};
