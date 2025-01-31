const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const {easy, medium, hard, solved_easy, solved_medium, solved_hard} = require('./utils/game')
const cors = require("cors");
const bcrypt = require('bcrypt');
const userModel = require('./model/userModal')
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./middleware/middleware');

require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);




mongoose.connect('mongodb://127.0.0.1:27017/sudoku')
.then(() => {
    console.log("Mongodb connection succesful");
}).catch((e) => {
    console.log(e);
})

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
    res.send('hi');
    next()
});

app.get('/game', authenticateToken, async (req, res, next) => {
    res.send('working')
})


app.get('/game/:mode/:level', authenticateToken, async (req, res) => {
    console.log('triggered');
    const { mode, level } = req.params;
    let levelIndex = parseInt(level) - 1;

    if (isNaN(levelIndex) || levelIndex < 0) {
        return res.status(400).send('Invalid level. Level should be a positive number.');
    }

    if (!['easy', 'medium', 'hard'].includes(mode)) {
        return res.status(400).send('Invalid mode. Mode should be "easy", "medium", or "hard".');
    }

    try {
        let puzzle;
        let solved;
        if (mode === 'easy') {
            puzzle = easy[levelIndex];
            solved = solved_easy[levelIndex];
        } else if (mode === 'medium') {
            puzzle = medium[levelIndex];
            solved = solved_medium[levelIndex];
        } else if (mode === 'hard') {
            puzzle = hard[levelIndex];
            solved = solved_hard[levelIndex];
        }

        if (!puzzle) {
            return res.status(404).send('Puzzle not found for the given level.');
        }

        res.send({puzzle, solved});
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the puzzle.');
    }
});

app.get('/game/:mode/:levelIndex/:rowIndex/:colIndex/:val', authenticateToken, async (req, res, next) => {
    const { mode, levelIndex, rowIndex, colIndex, val } = req.params;
    let value = parseInt(val);
    let level = parseInt(levelIndex);
    let row = parseInt(rowIndex);
    let col = parseInt(colIndex);
    

    try {
        let cur;
        
        if (mode === 'easy') {
            cur = solved_easy[level - 1][row][col];
        } else if (mode === 'medium') {
            cur = solved_medium[level - 1][row][col];
        } else if (mode === 'hard') {
            cur = solved_hard[level - 1][row][col];
        }

        if (!cur) {
            return res.status(404).send({ error: 'Mode or data not found.' });
        }

        if (cur === value) {
            res.status(200).json({ res: true });
        } else {
            res.status(200).json({ res: false });
        }
    } catch (er) {
        console.error(er);
        res.status(500).send({ error: 'An error occurred while fetching the puzzle.' });
    }
});

app.post('/signup', async (req, res, next) => {
    try{
        console.log(req.body);
    const { username, password, email, age, gender } = req.body;
    console.log(username, password, email, age, gender)
    if (!username || !password || !email || !age || !gender) {
        return res.status(400).send('All fields are required.');
    }
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
        return res.status(400).send('Username already taken.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({username, password: hashedPassword, email, age, gender});
    await user.save();
    res.status(201).send('User registered successfully.');
    }
    catch(error){
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error.');
    }
})

app.post('/login', async (req, res) => {
    try {
        console.log('Process ENV:', process.env);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('email and password are required.');
        }
        const user = await userModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(403).send('Invalid username or password.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('2')
        if (!isPasswordValid) {
            return res.status(403).send('Invalid email or password.');
        }
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'Bhadra@Bhaskar', {
            expiresIn: process.env.JWT_EXPIRATION || '1h',
        });
        res.json({ token, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error.');
    }
});

app.post('/game/:mode/:levelIndex/:userid', authenticateToken, async (req, res) => {
    console.log('triggered this');
    try {
        const { mode, levelIndex, userid } = req.params;
        const level = parseInt(levelIndex);

        if (isNaN(level)) {
            return res.status(400).send("Invalid levelIndex");
        }

        const user = await userModel.findOne({ _id: userid });
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (!Array.isArray(user.solved)) {
            user.solved = [[], [], []];
        }

        switch (mode) {
            case 'easy':
                if (!user.solved[0].includes(level)) {
                    user.solved[0].push(level);
                }
                break;
        
            case 'medium':
                if (!user.solved[1].includes(level)) {
                    user.solved[1].push(level);
                }
                break;
        
            case 'hard':
                if (!user.solved[2].includes(level)) {
                    user.solved[2].push(level);
                }
                break;
            default:
                return res.status(400).send("Invalid mode");
        }

        await user.save();
        res.status(200).send("Level successfully added");
    } catch (error) {
        console.error('Error handling request', error);
        res.status(500).send("Internal server error");
    }
});




app.listen("4000", () =>{
    console.log("listening to port 4000");
})