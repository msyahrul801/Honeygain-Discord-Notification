const fs = require("fs");
const humanizeDuration = require("humanize-duration");

module.exports = {
    log: (msg, type) => {
        let symbol = " ";
        switch (type) {
            case "warn":
                symbol = "!";
                break;
            case "success":
                symbol = "+";
                break;
            case "info":
                symbol = "?";
                break;
        }
        console.log(`[ ${symbol} ] ${msg}`);
    },

    delay: async(ms) => {
        return await new Promise((resolve) => setTimeout(resolve, ms));
    },

    shortEnglishHumanizer: humanizeDuration.humanizer({
        language: "shortEn",
        languages: {
            shortEn: {
                y: () => "y",
                mo: () => "mo",
                w: () => "w",
                d: () => "d",
                h: () => "h",
                m: () => "m",
                s: () => "s",
                ms: () => "ms",
            },
        },
    }),

    bytesToSize: (bytes) => {
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        if (bytes == 0 || isNaN(bytes)) return "0 B";
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0) return `${bytes} ${sizes[i]}`;
        return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
    },

    getOld: (ref, file) => {
        if (!ref) return {};
        return JSON.parse(fs.readFileSync(`data/${ref}/${file}_old.json`, "utf8"));
    },
};