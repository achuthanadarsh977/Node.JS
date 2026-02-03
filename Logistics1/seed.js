require("dotenv").config();
const mongoose = require("mongoose");
const Shipment = require("./models/Shipment");
const User = require("./models/User");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Shipment.deleteMany({});
    await User.deleteMany({});

    // Create sample users
    const users = await User.create([
      {
        name: "Alice Johnson",
        email: "alice.j@example.com",
        password: "password123",
        role: "Administrator",
        status: "Active",
        lastLogin: new Date("2023-11-20"),
      },
      {
        name: "Bob Williams",
        email: "bob.w@example.com",
        password: "password123",
        role: "Editor",
        status: "Active",
        lastLogin: new Date("2023-11-19"),
      },
      {
        name: "Charlie Brown",
        email: "charlie.b@example.com",
        password: "password123",
        role: "Viewer",
        status: "Inactive",
        lastLogin: new Date("2023-11-15"),
      },
      {
        name: "Diana Prince",
        email: "diana.p@example.com",
        password: "password123",
        role: "Editor",
        status: "Active",
        lastLogin: new Date("2023-11-21"),
      },
      {
        name: "Eve Adams",
        email: "eve.a@example.com",
        password: "password123",
        role: "Viewer",
        status: "Active",
        lastLogin: new Date("2023-11-18"),
      },
    ]);
    console.log("Users created:", users.length);

    // Create sample shipments
    const shipments = await Shipment.create([
      {
        shipmentId: "SHP001",
        trackingNumber: "TRK987654321",
        status: "In Transit",
        weight: 15.2,
        dimensions: "60x40x30 cm",
        serviceType: "Express",
        sender: {
          name: "Global Freight Inc.",
          email: "shipping@globalfreight.com",
          phone: "+1 (555) 123-4567",
          addressLine1: "123 Commerce St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "United States",
        },
        recipient: {
          name: "Tech Solutions Ltd.",
          email: "receiving@techsolutions.co.uk",
          phone: "+44 20 7946 0958",
          addressLine1: "45 Business Park",
          city: "London",
          state: "England",
          postalCode: "EC1A 1BB",
          country: "United Kingdom",
        },
        origin: "New York, USA",
        destination: "London, UK",
        originWarehouse: "NYC Distribution Center",
        destinationWarehouse: "London Depot",
        deliveryDate: new Date("2023-11-25"),
        notes: "Handle with care - electronic equipment",
      },
      {
        shipmentId: "SHP002",
        trackingNumber: "TRK123456789",
        status: "Pending",
        weight: 8.5,
        dimensions: "40x30x20 cm",
        serviceType: "Standard",
        sender: {
          name: "E-Commerce Hub",
          email: "orders@ecommercehub.com",
          phone: "+1 (555) 987-6543",
          addressLine1: "789 Retail Ave",
          city: "Los Angeles",
          state: "CA",
          postalCode: "90001",
          country: "United States",
        },
        recipient: {
          name: "Retail Innovations",
          email: "import@retailinnovations.de",
          phone: "+49 30 1234567",
          addressLine1: "12 Market Strasse",
          city: "Berlin",
          state: "Berlin",
          postalCode: "10115",
          country: "Germany",
        },
        origin: "Los Angeles, USA",
        destination: "Berlin, Germany",
        deliveryDate: new Date("2023-12-01"),
      },
      {
        shipmentId: "SHP003",
        trackingNumber: "TRK456789123",
        status: "Delivered",
        weight: 22.0,
        dimensions: "80x60x40 cm",
        serviceType: "Express",
        sender: {
          name: "Mega Logistics Corp.",
          email: "export@megalogistics.cn",
          phone: "+86 21 1234 5678",
          addressLine1: "888 Industrial Road",
          city: "Shanghai",
          state: "Shanghai",
          postalCode: "200000",
          country: "China",
        },
        recipient: {
          name: "Fashion Forward Co.",
          email: "warehouse@fashionforward.fr",
          phone: "+33 1 23 45 67 89",
          addressLine1: "56 Mode Boulevard",
          city: "Paris",
          state: "Ile-de-France",
          postalCode: "75001",
          country: "France",
        },
        origin: "Shanghai, China",
        destination: "Paris, France",
        deliveryDate: new Date("2023-11-18"),
      },
      {
        shipmentId: "SHP004",
        trackingNumber: "TRK789123456",
        status: "Cancelled",
        weight: 5.0,
        dimensions: "30x20x15 cm",
        serviceType: "Overnight",
        sender: {
          name: "Prime Shipping",
          email: "dispatch@primeshipping.ae",
          phone: "+971 4 123 4567",
          addressLine1: "100 Trade Center",
          city: "Dubai",
          state: "Dubai",
          postalCode: "00000",
          country: "UAE",
        },
        recipient: {
          name: "Industrial Supplies",
          email: "orders@industrialsupplies.com.au",
          phone: "+61 2 9876 5432",
          addressLine1: "200 Factory Lane",
          city: "Sydney",
          state: "NSW",
          postalCode: "2000",
          country: "Australia",
        },
        origin: "Dubai, UAE",
        destination: "Sydney, Australia",
        deliveryDate: new Date("2023-11-20"),
        notes: "Order cancelled by customer",
      },
      {
        shipmentId: "SHP005",
        trackingNumber: "TRK321654987",
        status: "In Transit",
        weight: 12.3,
        dimensions: "50x40x35 cm",
        serviceType: "Standard",
        sender: {
          name: "Express Delivery Services",
          email: "shipping@expressdelivery.ca",
          phone: "+1 (416) 555-1234",
          addressLine1: "500 Logistics Way",
          city: "Toronto",
          state: "ON",
          postalCode: "M5V 1A1",
          country: "Canada",
        },
        recipient: {
          name: "Home Goods Emporium",
          email: "receiving@homegoods.jp",
          phone: "+81 3 1234 5678",
          addressLine1: "1-2-3 Shibuya",
          city: "Tokyo",
          state: "Tokyo",
          postalCode: "150-0002",
          country: "Japan",
        },
        origin: "Toronto, Canada",
        destination: "Tokyo, Japan",
        deliveryDate: new Date("2023-11-28"),
      },
    ]);
    console.log("Shipments created:", shipments.length);

    console.log("\nSeed completed successfully!");
    console.log("\nYou can login with:");
    console.log("Email: alice.j@example.com");
    console.log("Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
