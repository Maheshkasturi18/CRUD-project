const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();
app.use(cors());

const PORT = 8000;

mongoose.connect("mongodb+srv://kmahesh18001:maheshdb@dbmahesh.eigv8fl.mongodb.net/crudoperation")
.then(()=> console.log('connect to DB'))
.catch((err) => console.log('err'))

app.get("/", (req, res)=>{
  res.json({message: "Server is runnning curd"});
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
