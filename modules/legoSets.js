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

                this.sets = setData.map(set => {
                    const theme = themeData.find(t => t.id == set.theme_id);
                    return { ...set, theme: theme ? theme.name : "Unknown" };
                });

                resolve();
            } catch (err) {
                reject("Error initializing data: " + err);
            }
        });
    }

    getAllSets() { return Promise.resolve(this.sets); }

    getAllThemes() { return Promise.resolve(this.themes); }

    getSetByNum(num) {
        return new Promise((resolve, reject) => {
            const set = this.sets.find(s => s.set_num === num);
            set ? resolve(set) : reject("Set not found");
        });
    }

    getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            const result = this.sets.filter(s =>
                s.theme.toLowerCase().includes(theme.toLowerCase())
            );
            result.length > 0 ? resolve(result) : reject("No matching sets");
        });
    }

    addSet(newSet) {
        return new Promise((resolve, reject) => {
            const exists = this.sets.some(s => s.set_num === newSet.set_num);
            exists ? reject("Set already exists") : resolve(this.sets.push(newSet));
        });
    }

    deleteSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            const index = this.sets.findIndex(s => s.set_num == setNum);
            index !== -1 ? resolve(this.sets.splice(index, 1)) : reject("Set not found");
        });
    }
}

module.exports = LegoData;
