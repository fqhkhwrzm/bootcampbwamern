const createTokenUser = (user) => {
    return {
        name: user.name,
        userId: user._id,
        role: user.email,
        organizer: user.organizer,
    };
};

module.exports = createTokenUser;