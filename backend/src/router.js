var express = require("express");
var bodyParser = require("body-parser");
var database = require("./database/database");

var router = express.Router();
router.use(bodyParser.json());

router.post("/addNewForm", ({ body }, res) =>
  database
    .addForm(body)
    .then(() => res.send("submitted"))
    .catch(err => res.status(500).send(err))
);

router.get("/getAllFormsName", (_, res) =>
  database
    .getAllFormsName()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
);

router.get("/getSelectedFormAnswers", ({ query }, res) =>
  database
    .getFormAnswersByName(query.name)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
);

exports.Router = router;
