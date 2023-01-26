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
exports.getAll = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.find();
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const features = new APIFeatures(query, req.query).filter();

    const data = await features.query;
    if (!data) return next(new AppError("No data found", 404));

    res.status(200).json({
      status: "success",
      data,
    });
  });
};
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const data = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) return next(new AppError("No document found with that id", 404));

    res.status(200).json({
      status: "success",
      data,
    });
  });
};
