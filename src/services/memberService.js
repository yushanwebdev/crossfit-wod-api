const Member = require("../database/Member");

const getOneMember = (memberId) => {
  const member = Member.getOneMember(memberId);
  return member;
};

module.exports = {
  getOneMember,
};
