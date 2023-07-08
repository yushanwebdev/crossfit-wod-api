const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const getOneWorkout = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);

  if (!workout) {
    throw {
      status: 404,
      message: `Workout with id '${workoutId}' not found.`,
    };
  }

  return workout;
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name '${newWorkout.name}' already exists.`,
    };
  }

  DB.workouts.push(newWorkout);
  saveToDatabase(DB);
  return newWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;

  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name '${changes.name}' already exists.`,
    };
  }

  const workoutIndex = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (workoutIndex === -1) {
    throw {
      status: 404,
      message: `Workout with id '${workoutId}' not found.`,
    };
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

  if (workoutIndex === -1) {
    throw {
      status: 404,
      message: `Workout with id '${workoutId}' not found.`,
    };
  }

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
