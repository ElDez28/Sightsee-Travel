const Order = require("../models/Order");
const factory = require("./handlerFactory");
const catchAsync = require("../util/catchAsync");
exports.createOrder = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const newDoc = await Order.create(req.body);
  res.status(200).json({
    status: "success",
    data: newDoc,
  });
});

exports.getOrders = factory.getAll(Order, "trip");
