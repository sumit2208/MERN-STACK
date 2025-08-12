const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const userRoute = require("./routes/userRoute") 
require("dotenv").config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

db();
 

app.use("/api/user",userRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
