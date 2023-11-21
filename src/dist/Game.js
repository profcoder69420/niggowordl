"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
exports.__esModule = true;
var react_1 = require("react");
var Row_1 = require("./Row");
var dictionary_json_1 = require("./dictionary.json");
var clue_1 = require("./clue");
var Keyboard_1 = require("./Keyboard");
var targets_json_1 = require("./targets.json");
var util_1 = require("./util");
var base64_1 = require("./base64");
var GameState;
(function (GameState) {
    GameState[GameState["Playing"] = 0] = "Playing";
    GameState[GameState["Won"] = 1] = "Won";
    GameState[GameState["Lost"] = 2] = "Lost";
})(GameState || (GameState = {}));
var targets = targets_json_1["default"].slice(0, targets_json_1["default"].indexOf("murky") + 1); // Words no rarer than this one
var minLength = 4;
var defaultLength = 5;
var maxLength = 11;
var limitLength = function (n) {
    return n >= minLength && n <= maxLength ? n : defaultLength;
};
function randomTarget(wordLength) {
    var eligible = targets.filter(function (word) { return word.length === wordLength; });
    var candidate;
    do {
        candidate = util_1.pick(eligible);
    } while (/\*/.test(candidate));
    return candidate;
}
function getChallengeUrl(target) {
    return (window.location.origin +
        window.location.pathname +
        "?challenge=" +
        base64_1.encode(target));
}
var initChallenge = "";
var challengeError = false;
try {
    initChallenge = base64_1.decode((_a = util_1.urlParam("challenge")) !== null && _a !== void 0 ? _a : "").toLowerCase();
}
catch (e) {
    console.warn(e);
    challengeError = true;
}
if (initChallenge && !util_1.dictionarySet.has(initChallenge)) {
    initChallenge = "";
    challengeError = true;
}
function parseUrlLength() {
    var lengthParam = util_1.urlParam("length");
    if (!lengthParam)
        return defaultLength;
    return limitLength(Number(lengthParam));
}
function parseUrlGameNumber() {
    var gameParam = util_1.urlParam("game");
    if (!gameParam)
        return 1;
    var gameNumber = Number(gameParam);
    return gameNumber >= 1 && gameNumber <= 1000 ? gameNumber : 1;
}
function Game(_a) {
    var initialWinStreak = _a.winStreak, updateWinStreak = _a.updateWinStreak, maxGuesses = _a.maxGuesses, hidden = _a.hidden, difficulty = _a.difficulty, colorBlind = _a.colorBlind, keyboardLayout = _a.keyboardLayout, noKeyGrab = _a.noKeyGrab;
    var _b = react_1.useState(0), currentwinStreak = _b[0], setCurrentWinStreak = _b[1];
    var _c = react_1.useState(GameState.Playing), gameState = _c[0], setGameState = _c[1];
    var _d = react_1.useState([]), guesses = _d[0], setGuesses = _d[1];
    var _e = react_1.useState(""), currentGuess = _e[0], setCurrentGuess = _e[1];
    var _f = react_1.useState(initChallenge), challenge = _f[0], setChallenge = _f[1];
    var _g = react_1.useState(challenge ? challenge.length : parseUrlLength()), wordLength = _g[0], setWordLength = _g[1];
    var _h = react_1.useState(parseUrlGameNumber()), gameNumber = _h[0], setGameNumber = _h[1];
    var _j = react_1.useState(function () {
        util_1.resetRng();
        // Skip RNG ahead to the parsed initial game number:
        for (var i = 1; i < gameNumber; i++)
            randomTarget(wordLength);
        return challenge || randomTarget(wordLength);
    }), target = _j[0], setTarget = _j[1];
    var _k = react_1.useState(challengeError
        ? "Invalid challenge string, playing random game."
        : "Make your first guess!"), hint = _k[0], setHint = _k[1];
    var currentSeedParams = function () {
        return "?seed=" + util_1.seed + "&length=" + wordLength + "&game=" + gameNumber;
    };
    react_1.useEffect(function () {
        if (util_1.seed) {
            window.history.replaceState({}, document.title, window.location.pathname + currentSeedParams());
        }
    }, [wordLength, gameNumber]);
    var tableRef = react_1.useRef(null);
    var startNextGame = function () {
        if (challenge) {
            // Clear the URL parameters:
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        setChallenge("");
        var newWordLength = limitLength(wordLength);
        setWordLength(newWordLength);
        setTarget(randomTarget(newWordLength));
        setHint("");
        setGuesses([]);
        setCurrentGuess("");
        setGameState(GameState.Playing);
        setGameNumber(function (x) { return x + 1; });
    };
    function share(copiedHint, text) {
        return __awaiter(this, void 0, void 0, function () {
            var url, body, e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = util_1.seed
                            ? window.location.origin + window.location.pathname + currentSeedParams()
                            : getChallengeUrl(target);
                        body = url + (text ? "\n\n" + text : "");
                        if (!(/android|iphone|ipad|ipod|webos/i.test(navigator.userAgent) &&
                            !/firefox/i.test(navigator.userAgent))) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.share({ text: body })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        e_1 = _a.sent();
                        console.warn("navigator.share failed:", e_1);
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, navigator.clipboard.writeText(body)];
                    case 5:
                        _a.sent();
                        setHint(copiedHint);
                        return [2 /*return*/];
                    case 6:
                        e_2 = _a.sent();
                        console.warn("navigator.clipboard.writeText failed:", e_2);
                        return [3 /*break*/, 7];
                    case 7:
                        setHint(url);
                        return [2 /*return*/];
                }
            });
        });
    }
    var onKey = function (key) {
        var _a;
        if (gameState !== GameState.Playing) {
            if (key === "Enter") {
                startNextGame();
            }
            return;
        }
        if (guesses.length === maxGuesses)
            return;
        if (/^[a-z]$/i.test(key)) {
            setCurrentGuess(function (guess) {
                return (guess + key.toLowerCase()).slice(0, wordLength);
            });
            (_a = tableRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            setHint("");
        }
        else if (key === "Backspace") {
            setCurrentGuess(function (guess) { return guess.slice(0, -1); });
            setHint("");
        }
        else if (key === "Enter") {
            if (currentGuess.length !== wordLength) {
                setHint("Too short");
                return;
            }
            if (!dictionary_json_1["default"].includes(currentGuess)) {
                setHint("Not a valid word");
                return;
            }
            for (var _i = 0, guesses_1 = guesses; _i < guesses_1.length; _i++) {
                var g = guesses_1[_i];
                var c = clue_1.clue(g, target);
                var feedback = clue_1.violation(difficulty, c, currentGuess);
                if (feedback) {
                    setHint(feedback);
                    return;
                }
            }
            setGuesses(function (guesses) { return guesses.concat([currentGuess]); });
            setCurrentGuess(function (guess) { return ""; });
            var gameOver = function (verbed) {
                return "You " + verbed + "! The answer was " + target.toUpperCase() + ". (Enter to " + (challenge ? "play a random game" : "play again") + ")";
            };
            if (currentGuess === target) {
                setHint(gameOver("won"));
                setGameState(GameState.Won);
                updateWinStreak(true);
                setCurrentWinStreak(currentwinStreak + 1);
            }
            else if (guesses.length + 1 === maxGuesses) {
                setHint(gameOver("lost"));
                setGameState(GameState.Lost);
                setCurrentWinStreak(currentwinStreak * 0);
            }
            else {
                setHint("");
                util_1.speak(clue_1.describeClue(clue_1.clue(currentGuess, target)));
            }
        }
    };
    react_1.useEffect(function () {
        var onKeyDown = function (e) {
            if (!e.ctrlKey && !e.metaKey) {
                onKey(e.key);
            }
            if (e.key === "Backspace") {
                e.preventDefault();
            }
        };
        if (noKeyGrab !== true) {
            document.addEventListener("keydown", onKeyDown);
        }
        else {
            document.removeEventListener("keydown", onKeyDown);
        }
        return function () {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [currentGuess, gameState, noKeyGrab]);
    var letterInfo = new Map();
    var tableRows = Array(maxGuesses)
        .fill(undefined)
        .map(function (_, i) {
        var _a;
        var guess = (_a = __spreadArrays(guesses, [currentGuess])[i]) !== null && _a !== void 0 ? _a : "";
        var cluedLetters = clue_1.clue(guess, target);
        var lockedIn = i < guesses.length;
        if (lockedIn) {
            for (var _i = 0, cluedLetters_1 = cluedLetters; _i < cluedLetters_1.length; _i++) {
                var _b = cluedLetters_1[_i], clue_2 = _b.clue, letter = _b.letter;
                if (clue_2 === undefined)
                    break;
                var old = letterInfo.get(letter);
                if (old === undefined || clue_2 > old) {
                    letterInfo.set(letter, clue_2);
                }
            }
        }
        return (React.createElement(Row_1.Row, { key: i, wordLength: wordLength, rowState: lockedIn
                ? Row_1.RowState.LockedIn
                : i === guesses.length
                    ? Row_1.RowState.Editing
                    : Row_1.RowState.Pending, cluedLetters: cluedLetters }));
    });
    return (React.createElement("div", { className: "Game", style: { display: hidden ? "none" : "block" } },
        React.createElement("div", { className: "Game-options" },
            React.createElement("label", { htmlFor: "wordLength" },
                "Letters (",
                wordLength,
                "):"),
            React.createElement("input", { type: "range", min: minLength, max: maxLength, id: "wordLength", disabled: gameState === GameState.Playing &&
                    (guesses.length > 0 || currentGuess !== "" || challenge !== ""), value: wordLength, onChange: function (e) {
                    var length = Number(e.target.value);
                    util_1.resetRng();
                    setGameNumber(1);
                    setGameState(GameState.Playing);
                    setGuesses([]);
                    setCurrentGuess("");
                    setTarget(randomTarget(length));
                    setWordLength(length);
                    setHint(length + " letters");
                } }),
            React.createElement("button", { style: { flex: "0 0 auto" }, disabled: gameState !== GameState.Playing || guesses.length === 0, onClick: function () {
                    var _a;
                    setHint("The answer was " + target.toUpperCase() + ". (Enter to play again)");
                    setGameState(GameState.Lost);
                    setCurrentWinStreak(0);
                    (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur();
                } }, "Give up")),
        React.createElement("table", { className: "Game-rows", tabIndex: 0, "aria-label": "Table of guesses", ref: tableRef },
            React.createElement("tbody", null, tableRows)),
        React.createElement("p", { role: "alert", style: {
                userSelect: /https?:/.test(hint) ? "text" : "none",
                whiteSpace: "pre-wrap"
            } }, hint || "\u00A0"),
        React.createElement(Keyboard_1.Keyboard, { layout: keyboardLayout, letterInfo: letterInfo, onKey: onKey }),
        React.createElement("div", { className: "Game-seed-info" }, challenge
            ? "playing a challenge game"
            : util_1.seed
                ? util_1.describeSeed(util_1.seed) + " \u2014 length " + wordLength + ", game " + gameNumber
                : "playing a random game"),
        React.createElement("div", { className: "extras" },
            React.createElement("p", null,
                "Game #",
                gameNumber,
                " (session)"),
            React.createElement("p", null,
                "Win streak: ",
                currentwinStreak),
            React.createElement("p", null,
                util_1.gameName,
                " mod v1.0.4"))));
}
exports["default"] = Game;
