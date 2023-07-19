const Workout = require("../database/Workout");
const { v4: uuid } = require("uuid");

const getAllWorkouts = (filterParams) => {
  const allWorkouts = Workout.getAllWorkouts(filterParams);
  return allWorkouts;
};

const getOneWorkout = (workoutId) => {
  const workout = Workout.getOneWorkout(workoutId);
  return workout;
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", {
      timeZone: "UTC",
    }),
    updateAt: new Date().toLocaleString("en-US", {
      timeZone: "UTC",
    }),
  };

  const createdWorkout = Workout.createNewWorkout(workoutToInsert);
  return createdWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
  const workoutToUpdate = {
    ...changes,
    updateAt: new Date().toLocaleString("en-US", {
      timeZone: "UTC",
    }),
  };
  const updateWorkout = Workout.updateOneWorkout(workoutId, workoutToUpdate);
  return updateWorkout;
};

const deleteOneWorkout = (workoutId) => {
  Workout.deleteOneWorkout(workoutId);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
