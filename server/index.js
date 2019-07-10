const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static('build'));

app.get("/api", function(req, res) {
  res.send({
    message: "PlayBrain desu"
  })
})

app.get('*', (req, res) => {
  app.use(express.static('build'));
});

app.listen(PORT, function(){
    console.log(`Your node js server is running on port ${PORT}`);
});