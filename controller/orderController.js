const Order = require("../models/Order");
const factory = require("./handlerFactory");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/AppError");
exports.deleteOrder = factory.deleteOne(Order);
exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const newDoc = await Order.create(req.body);
  res.status(200).json({
    status: "success",
    data: newDoc,
  });
});
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new AppError("You can not update other peoples reservations", 401)
    );
  }
  const newDoc = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: newDoc,
  });
});

exports.getOrders = factory.getAll(Order, "user");
