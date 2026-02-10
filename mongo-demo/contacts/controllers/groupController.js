import Group from "../models/Group.js";
import GroupMember from "../models/GroupMember.js";
import Contact from "../models/Contact.js";

// GET /groups — List all groups
export const getGroups = async (req, res) => {
  const owner = req.session.user._id;
  const groups = await Group.find({ owner }).sort({ createdAt: -1 });

  // Get member counts for each group
  const groupData = [];
  for (const g of groups) {
    const count = await GroupMember.countDocuments({
      group: g._id,
      owner,
      status: "active",
    });
    groupData.push({ ...g.toObject(), contactCount: count });
  }

  res.render("groups/list", { title: "Groups", groups: groupData });
};

// GET /groups/add
export const getAddGroup = (req, res) => {
  res.render("groups/add", { title: "Create Group" });
};

// POST /groups/add
export const postAddGroup = async (req, res) => {
  const owner = req.session.user._id;
  const { group_name, group_description } = req.body;

  if (!group_name || !group_name.trim()) {
    req.session.error = "Enter group name.";
    return res.redirect("/groups/add");
  }

  // Check for duplicate group name
  const existing = await Group.findOne({
    owner,
    name: group_name.trim(),
  });
  if (existing) {
    req.session.notify = "This group already exists.";
    return res.redirect("/groups/add");
  }

  await Group.create({
    name: group_name.trim(),
    description: group_description?.trim() || "",
    owner,
  });

  req.session.success = "Group created successfully.";
  res.redirect("/groups/add");
};

// GET /groups/view/:id
export const getViewGroup = async (req, res) => {
  const owner = req.session.user._id;
  const group = await Group.findOne({ _id: req.params.id, owner });
  if (!group) {
    req.session.error = "You have accessed this page in error.";
    return res.redirect("/groups");
  }

  const memberships = await GroupMember.find({
    group: group._id,
    owner,
    status: "active",
  }).populate("contact");

  const members = memberships
    .map((m) => m.contact)
    .filter((c) => c && c.status === "active");

  res.render("groups/view", { title: "View Group", group, members });
};

// GET /groups/edit/:id
export const getEditGroup = async (req, res) => {
  const owner = req.session.user._id;
  const group = await Group.findOne({ _id: req.params.id, owner });
  if (!group) {
    req.session.error = "You have accessed this page in error.";
    return res.redirect("/groups");
  }
  res.render("groups/edit", { title: "Edit Group", group });
};

// POST /groups/edit/:id
export const postEditGroup = async (req, res) => {
  const owner = req.session.user._id;
  const { group_name, group_description } = req.body;

  if (!group_name || !group_name.trim()) {
    req.session.error = "Please enter a group name.";
    return res.redirect(`/groups/edit/${req.params.id}`);
  }

  await Group.updateOne(
    { _id: req.params.id, owner },
    {
      name: group_name.trim(),
      description: group_description?.trim() || "",
    },
  );

  req.session.success = 'Update successful. <a href="/groups">Go to Groups</a>';
  res.redirect(`/groups/edit/${req.params.id}`);
};

// POST /groups/delete — delete groups (only if empty)
export const postDeleteGroups = async (req, res) => {
  const owner = req.session.user._id;
  let { checkbox } = req.body;
  if (!checkbox) return res.redirect("/groups");
  if (!Array.isArray(checkbox)) checkbox = [checkbox];

  for (const groupId of checkbox) {
    const hasMembers = await GroupMember.findOne({
      group: groupId,
      owner,
      status: "active",
    });
    if (hasMembers) {
      req.session.error =
        "Delete NOT successful. Make sure the group(s) contain no contacts and try again.";
      return res.redirect("/groups");
    }
  }

  await Group.deleteMany({ _id: { $in: checkbox }, owner });
  // Also clean up any inactive memberships
  await GroupMember.deleteMany({ group: { $in: checkbox }, owner });

  req.session.success = "Delete successful.";
  res.redirect("/groups");
};

// POST /groups/remove-members/:id — remove contacts from a group
export const postRemoveMembers = async (req, res) => {
  const owner = req.session.user._id;
  let { checkbox } = req.body;
  const groupId = req.params.id;
  if (!checkbox) return res.redirect(`/groups/view/${groupId}`);
  if (!Array.isArray(checkbox)) checkbox = [checkbox];

  await GroupMember.deleteMany({
    group: groupId,
    contact: { $in: checkbox },
    owner,
  });

  req.session.success = "Members removed successfully.";
  res.redirect(`/groups/view/${groupId}`);
};
