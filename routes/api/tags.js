var express = require('express');
var router = express.Router();

router.get('/lista', (req, res, next) => {
    res.json(
        [
            "work",
            "mobile",
            "lifestyle",
            "motor"
        ]
    );
});

module.exports = router;