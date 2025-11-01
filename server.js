/********************************************************************************
*  WEB700 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Tien Dung Van   Student ID: 140342247   Date: October 6, 2025
*
*  Published URL: https://web-700-assignment-t4us.vercel.app/about
*
********************************************************************************/

const express = require("express");
const path = require("path");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// 1) Import the legoSets module and create an instance
const LegoData = require("./modules/legoSets");
const legoData = new LegoData();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// 2) Static routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views/about.html"));
});

// 3) Data route: /lego/sets (optionally filtered by ?theme=...)
app.get("/lego/sets", (req, res) => {
  const { theme } = req.query;
  const p = theme ? legoData.getSetsByTheme(theme) : legoData.getAllSets();

  p.then(data => res.json(data))
   .catch(err => res.status(404).json({ message: err }));
});

// 4) Data route: /lego/sets/:set_num (get a single set by set_num)
app.get("/lego/sets/:set_num", (req, res) => {
  legoData.getSetByNum(req.params.set_num)
    .then(set => res.json(set))
    .catch(err => res.status(404).json({ message: err }));
});

app.get("/lego/add-test", (req, res) => {
  const testSet = {
    set_num: "123",
    name: "Test Set",
    year: "2024",
    theme_id: "366",
    num_parts: "120",
    img_url: "https://fakeimg.pl/375x375?text=[+Lego+]"
  };

  legoData.addSet(testSet)
    .then(() => res.redirect("/lego/sets"))
    .catch(err => res.status(422).json({ message: err }));
});


// 5) Custom 404: send the 404.html file
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

// 6) Only start the server after initialize() completes successfully
legoData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: ${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.log(`Failed to start server: ${err}`);
  });
 
module.exports = app;
