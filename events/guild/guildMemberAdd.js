const profileModel = require('../../models/profileSchema');

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        points: 1000,
        pot: 0,
    });
    profile.save();
};
