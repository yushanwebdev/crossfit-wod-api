const DB = require("./db.json");

const getRecordForWorkout = (workoutId) => {
  const record = DB.records.filter((record) => record.workout === workoutId);
  if (!record) {
    throw {
      status: 400,
      message: `Can't find record for the workout id ${workoutId}`,
    };
  }
  return record;
};

module.exports = {
  getRecordForWorkout,
};
