(function() {
    "use strict";

    updateCurrentTime();
    function updateCurrentTime() {
        document.getElementById("currentTime").innerText = getCurrentTime();
        setTimeout(updateCurrentTime, 10 * 1000);
    }

    function getCurrentTime() {
        const date = new Date();

        const offset = -date.getTimezoneOffset() / 60;
        return  date.toLocaleDateString()+'   '+ complete(date.toLocaleTimeString());
    }

    function complete(src, length = 2, char = '0') {
        src = src + '';

        while (src.length < length) {
            src = char + src;
        }

        return src;
    }
})();