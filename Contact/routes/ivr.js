import express from "express";
import contacts from "../models/Contact.js";

const router = express.Router();

/*
Twilio / Exotel webhook hits this URL
*/
router.post("/voice", async (req, res) => {
  const response = `
  <Response>
    <Gather numDigits="1" action="/ivr/category" method="POST">
      <Say>
        Welcome to XYZ Logistics.
        If you are a Transporter press 1.
        If you are not a Transporter press 2.
      </Say>
    </Gather>
  </Response>
  `;
  res.type("text/xml");
  res.send(response);
});

/* CATEGORY HANDLER */
router.post("/category", async (req, res) => {
  const digit = req.body.Digits;

  let message = "";

  if (digit === "1") {
    message = `
    <Gather numDigits="1" action="/ivr/transporter">
      <Say>
        Press 1 if you own trucks.
        Press 2 if you want loads.
        Press 3 to talk to agent.
      </Say>
    </Gather>`;
  } else {
    message = `
    <Gather numDigits="1" action="/ivr/non-transporter">
      <Say>
        Press 1 if you need transport service.
        Press 2 for future requirement.
        Press 3 if not interested.
      </Say>
    </Gather>`;
  }

  res.type("text/xml");
  res.send(`<Response>${message}</Response>`);
});

/* TRANSPORTER LOGIC */
router.post("/transporter", async (req, res) => {
  const d = req.body.Digits;
  let lead = "COLD";

  if (d === "1" || d === "2") lead = "HOT";

  await Contact.findOneAndUpdate(
    { phone: req.body.From },
    { ivrResponse: d, leadType: lead, callStatus: "COMPLETED" }
  );

  res.type("text/xml");
  res.send("<Response><Say>Thank you. Our executive will contact you.</Say></Response>");
});

/* NON-TRANSPORTER LOGIC */
router.post("/non-transporter", async (req, res) => {
  const d = req.body.Digits;
  let lead = "COLD";

  if (d === "1") lead = "HOT";
  if (d === "2") lead = "WARM";

  await Contact.findOneAndUpdate(
    { phone: req.body.From },
    { ivrResponse: d, leadType: lead, callStatus: "COMPLETED" }
  );

  res.type("text/xml");
  res.send("<Response><Say>Thank you for your response.</Say></Response>");
});

export default router;
