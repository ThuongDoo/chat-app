require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const { Server } = require("socket.io");

const authRouter = require("./api/routes/authRoutes");
const onConnection = require("./socket");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

io.engine.use(cookieParser(process.env.JWT_SECRET));
io.engine.use((req, res, next) => {
  const token = req.signedCookies.token;
  console.log("token", token);
});

io.on("connection", onConnection);

app.get("/", (req, res) => {
  res.send("helo");
});

app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log("server is listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
