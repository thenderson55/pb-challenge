const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.get("/", function(req, res) {
  res.send({
    message: "PlayBrain desu"
  })
})

app.listen(PORT, function(){
    console.log(`Your node js server is running on port ${PORT}`);
});