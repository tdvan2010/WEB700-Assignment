/********************************************************************************
*  WEB700 – Assignment 05
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Tien Dung Van   Student ID: 140342247   Date: October 6, 2025
*
*  Published URL: 
*
********************************************************************************/

const express = require("express");
const path = require("path");
const LegoData = require("./modules/legoSets");

const app = express();
const legoData = new LegoData();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/lego/sets", async (req, res) => {
    try {
        const theme = req.query.theme;
        const sets = theme
            ? await legoData.getSetsByTheme(theme)
            : await legoData.getAllSets();

        res.render("sets", { sets });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/lego/sets/:id", async (req, res) => {
    try {
        const set = await legoData.getSetByNum(req.params.id);
        res.render("set", { set });
    } catch (err) {
        res.status(404).send("Set not found");
    }
});

app.get("/lego/themes", async (req, res) => {
    try {
        const themes = await legoData.getAllThemes();
        res.render("themes", { themes });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// ❗ MUST HAVE: Vercel serverless trả về app
module.exports = app;
