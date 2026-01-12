// Import mongoose
const mongoose = require("mongoose");

// 1. Connect to your MongoDB database
mongoose.connect("mongodb://localhost:27017/logistics", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection events
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("✅ Connected to logistics database!");
});

// 2. Define a schema
// If you know your fields, define them here. Otherwise use strict:false for flexibility.
const logisticSchema = new mongoose.Schema(
  {
    // Example fields (replace with your actual collection fields)
    name: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "logistic1", // Explicitly bind to your existing collection
  }
);

// 3. Create a model
const Logistic = mongoose.model("Logistic", logisticSchema);

// 4. Query your collection
async function runQueries() {
  try {
    // Find all documents
    const allDocs = await Logistic.find();
    console.log("All documents:", allDocs);

    // Find specific documents
    const pendingDocs = await Logistic.find({ status: "pending" });
    console.log("Pending documents:", pendingDocs);

    // Insert new document
    const newEntry = new Logistic({
      name: "Package A",
      status: "pending",
    });
    await newEntry.save();
    console.log("Inserted new entry:", newEntry);

    // Update existing document
    await Logistic.updateOne({ name: "Package A" }, { status: "delivered" });
    console.log("Updated Package A to delivered");

    // Delete a document (optional)
    await Logistic.deleteOne({ name: "Package A" });
    console.log("Deleted Package A");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close connection when done
    mongoose.connection.close();
  }
}

// Run queries
runQueries();
