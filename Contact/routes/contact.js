import express from "express"

import contacts from "../models/Contact.js"


const router = express.router()

router.get("/" , async (req,res) => {
    const contact =  await contacts.find();
    res.json(contact)
})


router.post("/", async (req, res) => {
  const contact = await contacts.create(req.body);
  res.json(contact);
});


router.get("/:id" , async (req,res) => {
    const contact = await contacts.findById(req.params.id)
    res.json(contact)
})
