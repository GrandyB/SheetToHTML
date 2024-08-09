// MIT License
//
// Copyright (c) 2023 Mark "Grandy" Bishop
// https://github.com/GrandyB/SheetToHTML
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

function load() {
    var dom = document.getElementById("main");

    var html = "";
    const winImageRef = "O10";
    const banImageRef = "O11";
    const snipeImageRef = "O12";

    Handlebars.registerPartial("map", `
        <div class="map" requires-non-empty="{{nameRef}}" apply-as-classes="{{classesRef}}">
            <div class="entry">
                <img id="{{imageRef}}" class="map-img" />
            </div>
            <div class="highlight">&nbsp;</div>
        </div>
    `);
    const mapPartial = Handlebars.compile(`{{> map }}`);

    Handlebars.registerPartial("civ", `
        <div class="civ" apply-as-classes="{{classesRef}}">
            <img id="{{imageRef}}" class="civ-img" />
            <img id="${winImageRef}" class="civ-win" />
            <img id="${banImageRef}" class="civ-ban" />
            <img id="${snipeImageRef}" class="civ-snipe" />
        </div>
    `);
    const civPartial = Handlebars.compile(`{{> civ }}`);

    Handlebars.registerPartial("game", `
        <div class="game" requires-non-empty="{{mapName}}" apply-as-classes="{{current}}">
            {{> map nameRef=mapName imageRef=mapImage }}
            <div class="left-civ" apply-as-classes="{{leftCivClasses}}">{{> civ nameRef=leftCivName imageRef=leftCivImg }}</div>
            <div class="right-civ" apply-as-classes="{{rightCivClasses}}">{{> civ nameRef=leftCivName imageRef=rightCivImg }}</div>
        </div>
    `);
    const gamePartial = Handlebars.compile(`{{> game }}`);

    function addArea(classes, startRef, func) {
        var h = `<div class="${classes}">`;
        h += func(h, startRef);
        h += `</div>`;
        html += h;
    }

    // CURRENT GAME
    addArea("current-game", "", (h, startRef) => {
        return gamePartial({leftCivName: 'H2', leftCivImg: 'I2', leftCivClasses: '',
            rightCivName: 'K2', rightCivImg: 'L2', rightCivClasses: '',
            mapName: 'H1', mapImage: 'I1', current: ''});
    });

    // LOBBY INFO
    html += `<div id="lobby-info">`;
    html += `<span id="L16" class="label" requires-non-empty="L16"></span>`;
    html += `<span timer-id="L17"></span>`;
    html += `</div>`;

    html += partialBoxCentered({ class: 'player left score', content: '<span id="D1"></span>'});
    html += partialBoxCentered({ class: 'player right score', content: '<span id="D2"></span>'});

    dom.innerHTML += html;

    var container = document.getElementById("container");
    container.innerHTML += `<video id="E1" class="h2h left" autoplay muted play-to-exit></video>`;
    container.innerHTML += `<video id="E2" class="h2h right" autoplay muted play-to-exit></video>`;

    function startCountdownListener(input, output) {
        const outputElement = document.querySelector(output);
        
        setInterval(() => {
            const element = document.querySelector(input);
            const timestamp = parseInt(element.innerHTML);
            // Check if innerHTML is not empty and is a valid Unix timestamp
            if (element.innerHTML.trim() !== "" && !isNaN(timestamp) && timestamp > 0) {
                const now = Math.floor(Date.now() / 1000); // Current Unix timestamp
                const timeDifference = timestamp - now;
                if (timeDifference <= 0) {
                    outputElement.innerHTML = "00:00";
                } else {
                    const minutes = Math.floor(timeDifference / 60);
                    const seconds = timeDifference % 60;
                    outputElement.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            } else {
                outputElement.innerHTML = "";
            }
        }, 1000); // Update every second
    }

    // Start the listener for elements matching the given CSS selector
    startCountdownListener('#lobby-info .timer', '#timer-output');

    document.querySelectorAll("video").forEach(v => {
        Helpers.addVideoSrcListener(v, (videoElement) => {
            if (videoElement.src !== "") {
                setTimeout(() => {
                    videoElement.pause();
                }, 4000);
            }
        });
    });
}
