const { all } = require("express/lib/application");
const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const allWorkouts = workoutService.getAllWorkouts();
  res.send({
    status: "OK",
    data: allWorkouts,
  });
};

const getOneWorkout = (req, res) => {
  const { workoutId } = req.params;

  const workout = workoutService.getOneWorkout(workoutId);
  res.send({
    status: "OK",
    data: workout,
  });
};

const createNewWorkout = (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  const createdWorkout = workoutService.createNewWorkout(newWorkout);
  res.status(201).send({
    status: "OK",
    data: createdWorkout,
  });
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;

  const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
  res.send({
    status: "OK",
    data: updatedWorkout,
  });
};

const deleteOneWorkout = (req, res) => {
  const { workoutId } = req.params;
  workoutService.deleteOneWorkout(workoutId);
  res.status(204).send({
    status: "OK",
  });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
