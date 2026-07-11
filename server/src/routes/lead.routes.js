const express = require("express");
const leadController = require("../controllers/lead.controller");

const router = express.Router();

router.get("/", leadController.getLeads);
router.post("/", leadController.createLead);

module.exports = router;
