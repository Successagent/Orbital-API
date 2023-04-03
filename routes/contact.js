const Contact = require("../models/Contact");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");

//create a new Contact;
router.post("/", async (req, res) => {
  console.log(req.body);
  const newContact = new Contact({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    message: req.body.message,
  });
  try {
    const savedContact = await newContact.save();
    res.status(200).json("Contact Added");
    console.log(savedContact);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//delete Contact;
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedContact);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get Contact
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//get all Contact;
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
