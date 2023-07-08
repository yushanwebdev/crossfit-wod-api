const memberService = require("../services/memberService");

const getOneMember = (req, res) => {
  const { memberId } = req.params;

  try {
    const member = memberService.getOneMember(memberId);

    res.send({
      status: "OK",
      data: member,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: {
        error: error?.message || error,
      },
    });
  }
};

module.exports = {
  getOneMember,
};
