// consoleOverride.js
export default function overrideConsole() {
    // console.log = function () { };
    console.warn = function () { };
    console.error = function () { };
}