const factory = require("./handlerFactory");
const Complaint = require("../models/Complaint");
exports.createComplaint = factory.createOne(Complaint);
exports.deleteComplaint = factory.deleteOne(Complaint);
exports.getComplaints = factory.getAll(Complaint, "user");
