const recordService = require("../services/recordService");

const getRecordForWorkout = (req, res) => {
  const { workoutId } = req.params;

  try {
    const record = recordService.getRecordForWorkout(workoutId);
    res.send({
      status: "OK",
      data: record,
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
  getRecordForWorkout,
};
