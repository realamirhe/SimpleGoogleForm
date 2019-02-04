const mongoose = require("mongoose");
const models = require("./databaseModel");

exports.connect = dbName => {
  mongoose.connect(`mongodb://localhost/${dbName}`);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => console.log(`Connected to ( ${dbName} ) database!`));
};

exports.addForm = newForm =>
  new models.Form({ name: newForm.name, answers: newForm.answers }).save();

exports.getAllFormsName = () => models.Form.find({}).select("name");

exports.getFormAnswersByName = name =>
  models.Form.findOne({ name }).select("answers");
