// 📦 Required Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ App Initialization
const app = express();
app.use(express.json()); // Built-in body parser
app.use(cors({ origin: '*' })); // Allow requests from all origins

// 🌐 MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ankanpaul7897:Hazard10@portfolio.fjqfue6.mongodb.net/test?retryWrites=true&w=majority&appName=portfolio';

// 📡 MongoDB Connection (no options needed for Mongoose v7+)
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB Database Connected Successfully!'))
    .catch((error) => console.error('❌ MongoDB Connection Error:', error));

// 🧾 Mongoose Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    feedback: { type: String, required: true },
});

// 📄 Mongoose Model
const User = mongoose.model('User', UserSchema);

// 📨 POST Route to Register Feedback
app.post('/register', async (req, res) => {
    const { name, location, feedback } = req.body;

    // Basic validation
    if (!name || !location || !feedback) {
        return res.status(400).send("❗ All fields are required.");
    }

    try {
        const user = new User({ name, location, feedback });
        await user.save();
        res.status(200).send("✅ Your Message Sent successfully!");
    } catch (err) {
        console.error('❌ Error saving feedback:', err);
        res.status(500).send("❌ Something went wrong.");
    }
});

// 🚀 Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
