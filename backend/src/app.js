const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const userRoutes = require("./routes/users.routes.js");

dotenv.config();

const connectDb = require("../config/db.js");
const connectToSocket = require("./controllers/socketManager.js");

const app = express();
const server = http.createServer(app);
const io = connectToSocket(server);

connectDb();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
// Root Route
// app.use("/", (req, res)=>{
//     res.send("Welcome to VideoBuddy!");
// });

//User Route
app.use("/api/v1/users", userRoutes);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
