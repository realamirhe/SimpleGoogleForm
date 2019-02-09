const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database/database");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "/files"),
  filename: (_, file, callback) =>
    callback(null, Date.now().toString() + path.extname(file.originalname))
});

const upload = multer({ storage }).single("pdf");

const router = express.Router();
router.use(bodyParser.json());

router.post("/addNewForm", (req, res) =>
  upload(req, res, err => {
    if (err) console.log(err);
    else if (!req.file) return res.status(400).send("no files were uploaded");
    database
      .addForm(req.body, `${req.file.filename}`)
      .then(() => res.send("submitted in database"))
      .catch(error => res.status(500).send(error));
    return imageToBase64(req, res);
  })
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

router.post("/uploadAudio", (req, res) =>
  upload(req, res, err => {
    if (err) console.log(err);
    else if (!req.file) return res.status(400).send("no files were uploaded");
    database
      .addAudio(req.body, `${req.file.filename}`)
      .then(() => res.send("submitted in database"))
      .catch(error => res.status(500).send(error));
    return imageToBase64(req, res);
  })
);

exports.Router = router;
