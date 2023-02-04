const factory = require("./handlerFactory");
const Tour = require("../models/Tour");
exports.createTour = factory.createOne(Tour);
exports.getTours = factory.getAll(Tour);
exports.getOne = factory.getOne(Tour);
