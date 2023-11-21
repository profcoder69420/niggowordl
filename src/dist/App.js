"use strict";
exports.__esModule = true;
require("./App.css");
var util_1 = require("./util");
var Game_1 = require("./Game");
var react_1 = require("react");
var About_1 = require("./About");
function useSetting(key, initial) {
    var _a = react_1.useState(function () {
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initial;
        }
        catch (e) {
            return initial;
        }
    }), current = _a[0], setCurrent = _a[1];
    var setSetting = function (value) {
        try {
            var v = value instanceof Function ? value(current) : value;
            setCurrent(v);
            window.localStorage.setItem(key, JSON.stringify(v));
        }
        catch (e) { }
    };
    return [current, setSetting];
}
var now = new Date();
var todaySeed = now.toLocaleDateString("en-US", { year: "numeric" }) +
    now.toLocaleDateString("en-US", { month: "2-digit" }) +
    now.toLocaleDateString("en-US", { day: "2-digit" });
function App() {
    var _a = react_1.useState("game"), page = _a[0], setPage = _a[1];
    var _b = react_1.useState("dark"), theme = _b[0], setTheme = _b[1];
    var prefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    var _c = useSetting("dark", prefersDark), dark = _c[0], setDark = _c[1];
    var _d = useSetting("colorblind", false), colorBlind = _d[0], setColorBlind = _d[1];
    var _e = useSetting("difficulty", 0), difficulty = _e[0], setDifficulty = _e[1];
    var _f = useSetting("keyboard", "qwertyuiop-asdfghjkl-BzxcvbnmE"), keyboard = _f[0], setKeyboard = _f[1];
    var _g = useSetting("enter-left", false), enterLeft = _g[0], setEnterLeft = _g[1];
    var _h = react_1.useState(0), winStreak = _h[0], setWinStreak = _h[1];
    var _j = react_1.useState(localStorage.getItem('text1') || 'hell'), text1 = _j[0], settext1 = _j[1];
    var _k = react_1.useState(localStorage.getItem('text2') || 'o wordl'), text2 = _k[0], settext2 = _k[1];
    var _l = react_1.useState(localStorage.getItem('backgroundImage') || ''), backgroundImage = _l[0], setBackground = _l[1];
    var updateWinStreak = function (won) {
        if (won) {
            setWinStreak(winStreak + 1);
        }
        else {
            setWinStreak(0);
        }
    };
    react_1.useEffect(function () {
        document.body.className = dark ? "dark" : "";
        if (util_1.urlParam("today") !== null || util_1.urlParam("todas") !== null) {
            document.location = "?seed=" + todaySeed;
        }
        setTimeout(function () {
            // Avoid transition on page load
            document.body.style.transition = "0.3s background-color ease-out";
        }, 1);
    }, [dark]);
    react_1.useEffect(function () {
        if (text1) {
            localStorage.setItem('text1', text1);
        }
    }, [text1]);
    react_1.useEffect(function () {
        if (text2) {
            localStorage.setItem('text2', text2);
        }
    }, [text2]);
    react_1.useEffect(function () {
        if (backgroundImage /* && theme==="custom" */) {
            localStorage.setItem('backgroundImage', backgroundImage);
            document.body.style.backgroundImage = 'url(' + backgroundImage + ')';
        }
    }, [backgroundImage]);
    var link = function (emoji, label, page) { return (React.createElement("button", { className: "emoji-link", onClick: function () { return setPage(page); }, title: label, "aria-label": label }, emoji)); };
    return (React.createElement("div", { className: "App-container" + (colorBlind ? " color-blind" : "") },
        React.createElement("h1", null,
            React.createElement("span", { style: {
                    color: difficulty > 0 ? "#e66" : "inherit",
                    fontStyle: difficulty > 1 ? "italic" : "inherit"
                } }, text1),
            text2),
        React.createElement("div", { className: "top-right" }, page !== "game" ? (link("❌", "Close", "game")) : (React.createElement(React.Fragment, null,
            link("❓", "About", "about"),
            link("⚙️", "Settings", "settings")))),
        React.createElement("div", { style: {
                position: "absolute",
                left: 5,
                top: 5,
                visibility: page === "game" ? "visible" : "hidden"
            } },
            React.createElement("a", { href: util_1.seed ? "?random" : "?seed=" + todaySeed }, util_1.seed ? "Random" : "Today's")),
        page === "about" && React.createElement(About_1.About, null),
        page === "settings" && (React.createElement("div", { className: "Settings" },
            React.createElement("div", { className: "Settings-setting" },
                React.createElement("label", { htmlFor: "theme-setting" }, "Theme:"),
                React.createElement("select", { id: "theme-setting", onChange: function (xd) { if (xd.target.value === 'dark') {
                        setDark(true);
                    }
                    else if (xd.target.value === 'light') {
                        setDark(false);
                    } } },
                    React.createElement("option", { value: "dark" }, "Dark"),
                    React.createElement("option", { value: "light" }, "Light"),
                    React.createElement("option", { value: "custom" }, "Custom"))),
            React.createElement("div", { className: "Settings-setting" },
                React.createElement("input", { id: "colorblind-setting", type: "checkbox", checked: colorBlind, onChange: function () { return setColorBlind(function (x) { return !x; }); } }),
                React.createElement("label", { htmlFor: "colorblind-setting" }, "High-contrast colors")),
            React.createElement("div", { className: "Settings-setting" },
                React.createElement("label", { htmlFor: "texts" }, "Custom \"hello wordl\" title"),
                React.createElement("input", { id: "text1", type: "text", style: { width: '50px', textAlign: 'right' }, onChange: function (xd) { return settext1(xd.target.value); }, placeholder: "hell", value: text1 }),
                React.createElement("input", { id: "text2", type: "text", style: { width: '50px' }, onChange: function (xd) { return settext2(xd.target.value); }, placeholder: "o wordl", value: text2 })),
            React.createElement("div", { className: "Settings-setting" },
                React.createElement("input", { id: "difficulty-setting", type: "range", min: "0", max: "2", value: difficulty, onChange: function (e) { return setDifficulty(+e.target.value); } }),
                React.createElement("div", null,
                    React.createElement("label", { htmlFor: "difficulty-setting" }, "Difficulty:"),
                    React.createElement("strong", null, ["Normal", "Hard", "Ultra Hard"][difficulty]),
                    React.createElement("div", { style: {
                            fontSize: 14,
                            height: 40,
                            marginLeft: 8,
                            marginTop: 8
                        } }, [
                        "Guesses must be valid dictionary words.",
                        "Wordle's \"Hard Mode\". Green letters must stay fixed, and yellow letters must be reused.",
                        "An even stricter Hard Mode. Yellow letters must move away from where they were clued, and gray clues must be obeyed.",
                    ][difficulty]))),
            React.createElement("div", { className: "Settings-setting" },
                React.createElement("label", { htmlFor: "keyboard-setting" }, "Keyboard layout:"),
                React.createElement("select", { name: "keyboard-setting", id: "keyboard-setting", value: keyboard, onChange: function (e) { return setKeyboard(e.target.value); } },
                    React.createElement("option", { value: "qwertyuiop-asdfghjkl-BzxcvbnmE" }, "QWERTY"),
                    React.createElement("option", { value: "azertyuiop-qsdfghjklm-BwxcvbnE" }, "AZERTY"),
                    React.createElement("option", { value: "qwertzuiop-asdfghjkl-ByxcvbnmE" }, "QWERTZ"),
                    React.createElement("option", { value: "BpyfgcrlE-aoeuidhtns-qjkxbmwvz" }, "Dvorak"),
                    React.createElement("option", { value: "qwfpgjluy-arstdhneio-BzxcvbkmE" }, "Colemak")),
                React.createElement("input", { style: { marginLeft: 20 }, id: "enter-left-setting", type: "checkbox", checked: enterLeft, onChange: function () { return setEnterLeft(function (x) { return !x; }); } }),
                React.createElement("label", { htmlFor: "enter-left-setting" }, "\"Enter\" on left side")),
            React.createElement("p", { style: { borderBottom: '2px solid rgba(255, 255, 255, 0.2)', width: '100%' } }),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "texts" }, "Background image link "),
                React.createElement("input", { id: "background", type: "text", style: { width: '300px' }, onChange: function (xd) { return setBackground(xd.target.value); }, placeholder: "https://example.com/background.png", value: backgroundImage })))),
        React.createElement(Game_1["default"], { maxGuesses: util_1.maxGuesses, hidden: page !== "game", difficulty: difficulty, colorBlind: colorBlind, keyboardLayout: keyboard.replaceAll(/[BE]/g, function (x) { return (enterLeft ? "EB" : "BE")["BE".indexOf(x)]; }), winStreak: winStreak, updateWinStreak: updateWinStreak, noKeyGrab: page == "settings" })));
}
exports["default"] = App;
