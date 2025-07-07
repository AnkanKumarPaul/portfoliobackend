const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
// mongoose.connect('mongodb+srv://ankanpaul7897:Hazard10@portfolio.fjqfue6.mongodb.net/',
mongoose.connect('mongodb+srv://ankanpaul7897:Hazard10@portfolio.fjqfue6.mongodb.net/test?retryWrites=true&w=majority&appName=portfolio',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Eror!! MongoDB Database Connected Successfully :)');
})

// Schema 
const UserSchema = new mongoose.Schema({
    name: String,
    location: String,
    feedback: String,
});

const User = mongoose.model('User', UserSchema);

// POST route
app.post('/register', async (req, res) => {
    const { name, location, feedback } = req.body;
    const user = new User({ name, location, feedback });
    await user.save();
    res.send("Your Message Sent successfully!");
});

app.listen(5000, () => console.log('✅ Server running at http://localhost:5000'));
