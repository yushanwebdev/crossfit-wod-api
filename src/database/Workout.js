const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const getOneWorkout = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);
  return workout;
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

  if (isAlreadyAdded) {
    return;
  }

  DB.workouts.push(newWorkout);
  saveToDatabase(DB);
  return newWorkout;
};

const updateOneWorkout = (workoutId, workoutData) => {
  const workoutIndex = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (workoutIndex === -1) {
    return;
  }

  DB.workouts[workoutIndex] = {
    ...DB.workouts[workoutIndex],
    ...workoutData,
  };
  saveToDatabase(DB);
  return DB.workouts[workoutIndex];
};

const deleteOneWorkout = (workoutId) => {
  const workoutIndex = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );
  DB.workouts.splice(workoutIndex, 1);
  saveToDatabase(DB);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};