
import express from "express"

import mongoose from "mongoose"

import cors from "cors"

mongoose
  .connect("mongodb://127.0.0.1:27017/contacts")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to mongodb...", err));

const app = express()

app.use(express.json())

app.use(cors())

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Transporter', 'Non-Transporter'],
    required: true
  },
  call_status: {
    type: String,
    enum: ['Pending', 'Called', 'Interested', 'Not Interested'],
    default: 'Pending'
  },
  call_attempts: {
    type: Number,
    default: 0,
    min: 0
  },
  remarks: {
    type: String,
    default: '',
    trim: true
  }
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes

// Create a new contact
app.post('/api/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get all contacts with optional filters
app.get('/api/contacts', async (req, res) => {
  try {
    const { category, call_status, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (call_status) filter.call_status = call_status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone_number: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get a single contact by ID
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update a contact
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Increment call attempts
app.patch('/api/contacts/:id/call', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { 
        $inc: { call_attempts: 1 },
        call_status: req.body.call_status || 'Called',
        remarks: req.body.remarks
      },
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Delete a contact
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const transporters = await Contact.countDocuments({ category: 'Transporter' });
    const nonTransporters = await Contact.countDocuments({ category: 'Non-Transporter' });
    
    const statusCounts = await Contact.aggregate([
      { $group: { _id: '$call_status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total: totalContacts,
        transporters,
        nonTransporters,
        statusBreakdown: statusCounts.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});