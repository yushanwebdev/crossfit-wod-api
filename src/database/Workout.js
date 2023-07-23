const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
const getAllWorkouts = (filterParams) => {
  const PAGE_SIZE = 2;
  let workouts = DB.workouts;

  if (filterParams.mode) {
    workouts = workouts.filter((workout) =>
      workout.mode.toLowerCase().includes(filterParams.mode)
    );
  }
  if (filterParams.equipment) {
    workouts = workouts.filter((workout) =>
      workout.equipment.includes(filterParams.equipment)
    );
  }
  // sort=createdAt:asc
  if (filterParams.sort) {
    const [key, order] = filterParams.sort.split(":");
    workouts = workouts.sort((a, b) => {
      if (order === "asc") {
        return new Date(a[key]) - new Date(b[key]);
      } else {
        return new Date(b[key]) - new Date(a[key]);
      }
    });
  }
  if (filterParams.length) {
    workouts = workouts.slice(0, filterParams.length);
  }
  if (filterParams.page) {
    const start = (filterParams.page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    workouts = workouts.slice(start, end);
  }

  return workouts;
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
