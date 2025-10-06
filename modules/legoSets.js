
/********************************************************************************
*  WEB700 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Tien Dung Van Student ID: 140342247 Date: 6/10/2025
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/


class LegoData {
    constructor() {
        this.sets = [];
    }

    initialize() {
        return new Promise((resolve, reject) => {
            try {
                const setData = require("../data/setData.json");
                const themeData = require("../data/themeData.json");

                setData.forEach(set => {
                    const themeObj = themeData.find(theme => theme.id == set.theme_id);
                    const themeName = themeObj ? themeObj.name : "Unknown";
                    const newSet = { ...set, theme: themeName };
                    this.sets.push(newSet);
                });
                resolve(); 
            } catch (err) {
                reject("Error initializing data: " + err.message);
            }
        });
    }

    getAllSets() {
        return new Promise((resolve, reject) => {
            if (this.sets.length > 0) {
                resolve(this.sets);
            } else {
                reject("No sets available");
            }
        });
    }

    getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            const foundSet = this.sets.find(set => set.set_num === setNum);
            if (foundSet) {
                resolve(foundSet);
            } else {
                reject("unable to find requested set");
            }
        });
    }

    getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            const lowerTheme = theme.toLowerCase();
            const foundSets = this.sets.filter(set => set.theme.toLowerCase().includes(lowerTheme));
            if (foundSets.length > 0) {
                resolve(foundSets);
            } else {
                reject("unable to find requested sets");
            }
        });
    }
}

module.exports = LegoData;


