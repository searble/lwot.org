var express = require("express");
var router = express.Router();

router.post("/", function (req, res) {
    res.send("Leave Work On Time!");
});

module.exports = router;