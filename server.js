const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://ankanpaul7897:Hazard10@portfolio.fjqfue6.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB connected successfully!');
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
    });

const UserSchema = new mongoose.Schema({
    name: String,
    location: String,
    feedback: String,
});

const User = mongoose.model('User', UserSchema);

// POST route
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

app.listen(10000, () => console.log('🚀 Server running on port 10000'));
