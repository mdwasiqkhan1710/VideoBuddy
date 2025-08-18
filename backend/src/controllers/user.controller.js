const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { status } = require("http-status")
const Meeting = require("../models/meeting.model");

//Register Route
const register = async(req, res) => {
    const {name, username, password} = req.body;

    try {
        const ExisitingUser = await User.findOne({username});
        if(ExisitingUser) return res.status(status.BAD_REQUEST).json({message : "User already exist for this username!"});

        newUser = new User({name, username, password});
        await newUser.save();

        //JasonWeb Token Payload
        const payload = {user :{id : newUser._id}};

        //Signing and returning the token with user data
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"48h"}, (err, token) =>{
            if(err) throw err;
            //Send the user & token in response
            // res.status(status.CREATED).json({user: {_id: newUser._id, name: newUser.name, username:newUser.username,}, token,});
        });
        res.status(status.CREATED).json({message: "User registered successfully!"});
    } catch (error) {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).send("Server error while registering the user!");
    }
};

//Login Route 
const login = async(req, res) =>{
    const {username, password} = req.body;


    if(!username || !password) res.status(status.BAD_REQUEST).json({message: "Please provide both username and password!"});

    try {
        const newUser = await User.findOne({username});

        if(!newUser) return res.status(status.NOT_FOUND).json({message: "Incorrect username or password!"});

        const isMatch = await newUser.matchPassword(password);

        if(!isMatch) return res.status(status.BAD_REQUEST).json({message: "Incorrect username or password!"});

        
        const payload = {user :{id : newUser._id}};

       

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"48h"}, (err, token) =>{
            if(err) throw err;
            
            res.status(status.OK).json({user: {_id: newUser._id, name: newUser.name, username: newUser.username,}, token,});
    }); 
    } catch (error) {
        console.log(error);
        res.status(status.INTERNAL_SERVER_ERROR).send("Server error while logging the user!");
    }
};

const getUserFromToken = async (token) => {
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.user.id);
  } catch (error) {
    return null;
  }
};

const getUserHistory = async (req, res) => {
    try {
        // Get token from query parameters
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(status.UNAUTHORIZED).json({
                message: "Authentication token missing"
            });
        }

        // Verify token and get user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user) {
            return res.status(status.NOT_FOUND).json({
                message: "User not found"
            });
        }

        // Find meetings for this user
        const meetings = await Meeting.find({ user_id: user._id });
        
        res.status(status.OK).json({
            success: true,
            meetings
        });
    } catch (error) {
        console.error("History error:", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "Failed to get history",
            error: error.message
        });
    }
};

const addToHistory = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { meeting_code } = req.body;
        
        if (!token) {
            return res.status(status.UNAUTHORIZED).json({
                message: "Authentication token missing"
            });
        }

        // Verify token and get user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user) {
            return res.status(status.NOT_FOUND).json({
                message: "User not found"
            });
        }

        // Create new meeting
        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        });

        await newMeeting.save();

        res.status(status.CREATED).json({
            success: true,
            message: "Added to history",
            meeting: newMeeting
        });
    } catch (error) {
        console.error("Add history error:", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({
            message: "Failed to add to history",
            error: error.message
        });
    }
};


module.exports = {login, register, getUserHistory, addToHistory};