const Record = require("../database/Record");

const getRecordForWorkout = (workoutId) => {
  const record = Record.getRecordForWorkout(workoutId);
  return record;
};

module.exports = {
  getRecordForWorkout,
};
