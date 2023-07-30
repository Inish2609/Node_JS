const asyncHandler = require("express-async-handler")

const Contact = require("../models/contactSchema")

//@desc Gets The Contact
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler( async (req, res) => {
  const contact = await Contact.find({user_id : req.user.id});
  res.json(contact);
});

//@desc Get The Contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler( async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(400);
    throw new Error("User Dont Have The Permission to Access The Other User Contact")
  }
  res.json(contact);
});

//@desc Create The Contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  console.log("The Body Data Are ", req.body);
  const { name,email,phone } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("All Fields Are Mandatory");
  }
  const contact = await Contact.create({
    name,email,phone,user_id : req.user.id
  })
  res.json(contact);
});

//@desc UPDATE The Contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error(
      "User Dont Have The Permission to Access The Other User Contact"
    );
  }
  const updateContacts = await Contact.findByIdAndUpdate(req.params.id,req.body,{new : true});
  res.json(updateContacts);
});

//@desc DELETE The Contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(400);
    throw new Error(
      "User Dont Have The Permission to Access The Other User Contact"
    );
  }
  await Contact.deleteOne({ _id : req.params.id });
  res.json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
