
/********************************************************************************
*  WEB700 – Assignment 05
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Tien Dung Van Student ID: 140342247 Date: 30/10/2025
*
*  Published URL: https://web-700-assignment-8und.vercel.app/
*
********************************************************************************/


class LegoData {
    constructor() {
        this.sets = [];
        this.themes = [];
    }

    initialize() {
        return new Promise((resolve, reject) => {
            try {
                const setData = require("../data/setData.json");
                const themeData = require("../data/themeData.json");
                this.themes = [...themeData];

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
    
    getAllThemes() {
    return new Promise((resolve, reject) => {
        if (this.themes.length > 0) {
            resolve(this.themes);
        } else {
            reject("no themes available");
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

    getThemeById(id) {
    return new Promise((resolve, reject) => {
        const theme = this.themes.find(t => t.id == id);
        if (theme) {
            resolve(theme);
        } else {
            reject("unable to find requested theme");
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

    
    addSet(newSet) {
        return new Promise((resolve, reject) => {
            const exists = this.sets.find(s => s.set_num === newSet.set_num);
            if (exists) {
                reject("Set already exists");
            } else {
                this.sets.push(newSet);
                resolve(newSet);
            }
        });
    }
}

deleteSetByNum(setNum) {            // 🔸 HÀM MỚI
        return new Promise((resolve, reject) => {
            const index = this.sets.findIndex(s => s.set_num == setNum);
            if (index !== -1) {
                this.sets.splice(index, 1);
                resolve();
            } else {
                reject("set not found");
            }
        });
    }
}

module.exports = LegoData;


