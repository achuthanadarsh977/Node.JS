import Contact from "../models/Contact.js";
import Group from "../models/Group.js";
import GroupMember from "../models/GroupMember.js";

// GET /contacts — Dashboard
export const getDashboard = async (req, res) => {
  const owner = req.session.user._id;
  const contacts = await Contact.find({ owner, status: "active" }).sort({
    createdAt: -1,
  });
  const activeCount = contacts.length;
  const trashCount = await Contact.countDocuments({ owner, status: "del" });
  const groups = await Group.find({ owner }).sort({ name: 1 });

  res.render("contacts/dashboard", {
    title: "View Contacts",
    contacts,
    activeCount,
    trashCount,
    groups,
  });
};

// GET /contacts/add
export const getAddContact = (req, res) => {
  res.render("contacts/add", { title: "Add Contact" });
};

// POST /contacts/add
export const postAddContact = async (req, res) => {
  const owner = req.session.user._id;
  const { fullname, phone, email, address, company, jobtitle, website } =
    req.body;

  if (!fullname || !fullname.trim()) {
    req.session.error = "Please enter a name.";
    return res.redirect("/contacts/add");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    req.session.error = "Please enter a valid email address!";
    return res.redirect("/contacts/add");
  }

  // Check for duplicate phone
  if (phone && phone.trim()) {
    const existing = await Contact.findOne({
      owner,
      phone: phone.trim(),
      status: { $ne: "permadel" },
    });
    if (existing) {
      req.session.error = `A contact with this phone number already exists. <a href="/contacts/view/${existing._id}">Click here to see this person</a>`;
      return res.redirect("/contacts/add");
    }
  }

  await Contact.create({
    fullname: fullname.trim(),
    phone: phone?.trim() || "",
    email: email?.trim() || "",
    address: address?.trim() || "",
    company: company?.trim() || "",
    jobtitle: jobtitle?.trim() || "",
    website: website?.trim() || "",
    owner,
  });

  req.session.success =
    'Contact added successfully. <a href="/contacts">Go to contacts</a>';
  res.redirect("/contacts/add");
};

// GET /contacts/view/:id
export const getViewContact = async (req, res) => {
  const owner = req.session.user._id;
  const contact = await Contact.findOne({ _id: req.params.id, owner });
  if (!contact) {
    req.session.error = "Contact not found.";
    return res.redirect("/contacts");
  }

  // Get groups this contact belongs to
  const memberships = await GroupMember.find({
    contact: contact._id,
    owner,
    status: "active",
  }).populate("group");
  const groups = memberships.map((m) => m.group).filter(Boolean);

  res.render("contacts/view", { title: "View Contact", contact, groups });
};

// GET /contacts/edit/:id
export const getEditContact = async (req, res) => {
  const owner = req.session.user._id;
  const contact = await Contact.findOne({ _id: req.params.id, owner });
  if (!contact) {
    req.session.error = "You have accessed this page in error.";
    return res.redirect("/contacts");
  }
  res.render("contacts/edit", { title: "Edit Contact", contact });
};

// POST /contacts/edit/:id
export const postEditContact = async (req, res) => {
  const owner = req.session.user._id;
  const { fullname, phone, email, address, company, jobtitle, website } =
    req.body;

  if (!fullname || !fullname.trim()) {
    req.session.error = "Please enter a name.";
    return res.redirect(`/contacts/edit/${req.params.id}`);
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    req.session.error = "Please enter a valid email address!";
    return res.redirect(`/contacts/edit/${req.params.id}`);
  }

  await Contact.updateOne(
    { _id: req.params.id, owner },
    {
      fullname: fullname.trim(),
      phone: phone?.trim() || "",
      email: email?.trim() || "",
      address: address?.trim() || "",
      company: company?.trim() || "",
      jobtitle: jobtitle?.trim() || "",
      website: website?.trim() || "",
    },
  );

  req.session.success = `Edit successful. <a href="/contacts/view/${req.params.id}">Go to edited contact</a> | <a href="/contacts">Go to all contacts</a>`;
  res.redirect(`/contacts/edit/${req.params.id}`);
};

// POST /contacts/delete — soft delete (single from view page)
export const postDeleteContact = async (req, res) => {
  const owner = req.session.user._id;
  const { id } = req.body;

  await Contact.updateOne({ _id: id, owner }, { status: "del" });
  await GroupMember.updateMany({ contact: id, owner }, { status: "del" });

  req.session.success = "Delete successful.";
  res.redirect("/contacts");
};

// POST /contacts/bulk-delete — soft delete multiple
export const postBulkDelete = async (req, res) => {
  const owner = req.session.user._id;
  let { checkbox } = req.body;
  if (!checkbox) return res.redirect("/contacts");
  if (!Array.isArray(checkbox)) checkbox = [checkbox];

  await Contact.updateMany(
    { _id: { $in: checkbox }, owner },
    { status: "del" },
  );
  await GroupMember.updateMany(
    { contact: { $in: checkbox }, owner },
    { status: "del" },
  );

  req.session.success = "Delete successful.";
  res.redirect("/contacts");
};

// POST /contacts/bulk-move — move contacts to a group
export const postBulkMove = async (req, res) => {
  const owner = req.session.user._id;
  let { checkbox, group_id } = req.body;
  if (!checkbox || !group_id) return res.redirect("/contacts");
  if (!Array.isArray(checkbox)) checkbox = [checkbox];

  const group = await Group.findOne({ _id: group_id, owner });
  if (!group) {
    req.session.error = "Group not found.";
    return res.redirect("/contacts");
  }

  for (const contactId of checkbox) {
    const exists = await GroupMember.findOne({
      group: group_id,
      contact: contactId,
      owner,
    });
    if (!exists) {
      await GroupMember.create({
        group: group_id,
        contact: contactId,
        owner,
      });
    }
  }

  req.session.success = "Move successful.";
  res.redirect("/contacts");
};

// GET /contacts/trash
export const getTrash = async (req, res) => {
  const owner = req.session.user._id;
  const contacts = await Contact.find({ owner, status: "del" }).sort({
    updatedAt: -1,
  });
  const activeCount = await Contact.countDocuments({ owner, status: "active" });
  const trashCount = contacts.length;

  res.render("contacts/trash", {
    title: "Trash",
    contacts,
    activeCount,
    trashCount,
  });
};

// POST /contacts/restore — restore from trash
export const postRestore = async (req, res) => {
  const owner = req.session.user._id;
  let { checkbox } = req.body;
  if (!checkbox) return res.redirect("/contacts/trash");
  if (!Array.isArray(checkbox)) checkbox = [checkbox];

  await Contact.updateMany(
    { _id: { $in: checkbox }, owner },
    { status: "active" },
  );
  await GroupMember.updateMany(
    { contact: { $in: checkbox }, owner },
    { status: "active" },
  );

  req.session.success = "Restore successful.";
  res.redirect("/contacts");
};

// POST /contacts/permanent-delete
export const postPermanentDelete = async (req, res) => {
  const owner = req.session.user._id;
  let { checkbox } = req.body;
  if (!checkbox) return res.redirect("/contacts/trash");
  if (!Array.isArray(checkbox)) checkbox = [checkbox];

  await Contact.updateMany(
    { _id: { $in: checkbox }, owner },
    { status: "permadel" },
  );

  req.session.success = "Delete successful.";
  res.redirect("/contacts/trash");
};
