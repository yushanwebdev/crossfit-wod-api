const DB = require("./db.json");

const getOneMember = (memberId) => {
  const member = DB.members.find((member) => member.id === memberId);

  if (!member) {
    throw {
      status: 404,
      message: `Member with id '${memberId}' not found.`,
    };
  }

  return member;
};

module.exports = {
  getOneMember,
};
