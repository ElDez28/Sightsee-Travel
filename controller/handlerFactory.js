const catchAsync = require("../util/catchAsync");
const APIFeatures = require("../util/ApiFeatures");
exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    const newDoc = await Model.create(req.body);
    res.status(200).json({
      status: "success",
      data: newDoc,
    });
  });
};
exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    let filter = {};
    const features = new APIFeatures(Model.find(filter), req.query).filter();

    const data = await features.query;

    res.status(200).json({
      status: "success",
      data,
    });
  });
};
