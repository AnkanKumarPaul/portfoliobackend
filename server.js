// 📦 Required Modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ App Initialization
const app = express();
app.use(express.json()); // Built-in body parser
app.use(cors({ origin: '*' })); // Allow requests from all origins

// 🌐 MongoDB Connection String
const MONGODB_URI = 'mongodb+srv://ankanpaul7897:Hazard10@portfolio.fjqfue6.mongodb.net/test?retryWrites=true&w=majority&appName=portfolio';

// 📡 MongoDB Connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const database = mongoose.connection;

// ❌ MongoDB Connection Error
database.on('error', (error) => {
    console.error('❌ MongoDB Connection Error:', error);
});

// ✅ MongoDB Connected
database.once('connected', () => {
    console.log('✅ MongoDB Database Connected Successfully!');
});

// 🧾 Mongoose Schema
const UserSchema = new mongoose.Schema({
    name: String,
    location: String,
    feedback: String,
});

// 📄 Mongoose Model
const User = mongoose.model('User', UserSchema);

// 📨 POST Route to Register Feedback
app.post('/register', async (req, res) => {
    try {
        const { name, location, feedback } = req.body;
        const user = new User({ name, location, feedback });
        await user.save();
        res.status(200).send("Your Message Sent successfully!");
    } catch (err) {
        console.error('❌ Error saving feedback:', err);
        res.status(500).send("Something went wrong.");
    }
});

// 🚀 Start the Server
app.listen(5000, () => console.log('✅ Server running at http://localhost:5000'));
