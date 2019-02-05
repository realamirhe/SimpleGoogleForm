const mongoose = require("mongoose");

const { Schema } = mongoose;

const formSchema = new Schema({
  name: String,
  answers: Array,
  fileName: String
});

exports.Form = mongoose.model("form", formSchema);
