import Contact from "../models/Contact.js";

// Dashboard
export const dashboard = async (req, res) => {
  const contacts = await Contact.find();
  res.render("dashboard", { contacts });
};

// Add Form
export const addForm = (req, res) => {
  res.render("add");
};

// Create Contact
export const createContact = async (req, res) => {
  await Contact.create(req.body);
  res.redirect("/");
};

// Edit Form
export const editForm = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("edit", { contact });
};


// Update Contact
export const updateContact = async (req, res) => {
  const updateData = req.body;

  if (req.body.call_status === "Called") {
    updateData.$inc = { call_attempts: 1 };
  }

  await Contact.findByIdAndUpdate(req.params.id, updateData);
  res.redirect("/");
};



// Delete Contact
export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
