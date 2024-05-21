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

    const imageBorderRef = "O9";
    const winImageRef = "O10";
    const banImageRef = "O11";
    const snipeImageRef = "O12";
    
    const streamElements1Ref = "O15";
    const streamElements2Ref = "O16";
    const streamElements3Ref = "O17";

    let numCams = getURLParam("cams");
    if (!numCams) numCams = 2;
    document.getElementById("main").classList.add(`cams-${numCams}`);

    Handlebars.registerPartial("map", `
        <div class="map" requires-non-empty="{{nameRef}}" apply-as-classes="{{classesRef}}">
            <div class="entry">
                <img id="{{imageRef}}" class="map-img" />
            </div>
            <div class="highlight">&nbsp;</div>
        </div>
    `);
    const mapPartial = Handlebars.compile(`{{> map }}`);

    // TODO: Pick/ban icons?
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
    html += `<div class="draft left">`;

    // LEFT CIV DRAFT
    addArea("civ-draft", "B16", (h, startRef) => {
        var h = "";
        for (var i = 0; i < 15; i++) {
            const nameRef = Helpers.relativeRow(startRef, i);
            const imageRef = Helpers.relativeColumn(nameRef, 1);
            const classesRef = Helpers.relativeColumn(nameRef, 2);
            const typeRef = Helpers.relativeColumn(nameRef, 3);

            h += civPartial({nameRef, imageRef, classesRef, typeRef});
        }
        return h;
    });
    html += `</div>`;

    // GAMES
    html += `<div class="games-container" apply-as-classes="K5">`;
    addArea("games", "B5", (h, startRef) => {
        var h = "";
        for (var i = 0; i < 9; i++) {
            const leftCivName = Helpers.relativeRow(startRef, i);
            const leftCivImg = Helpers.relativeColumn(leftCivName, 1);
            const leftCivClasses = Helpers.relativeColumn(leftCivName, 2);
            const rightCivName = Helpers.relativeColumn(leftCivName, 3);
            const rightCivImg = Helpers.relativeColumn(leftCivName, 4);
            const rightCivClasses = Helpers.relativeColumn(leftCivName, 5);
            const mapName = Helpers.relativeColumn(leftCivName, 6);
            const mapImage = Helpers.relativeColumn(leftCivName, 7);
            const current = Helpers.relativeColumn(leftCivName, 8);

            h += gamePartial({leftCivName, leftCivImg, leftCivClasses, rightCivName, rightCivImg, rightCivClasses, mapName, mapImage, current});
        }
        return h;
    });
    html += `</div>`;

    // LOBBY INFO
    html += `<div id="lobby-info">`;
    html += `<span id="L16" class="label" requires-non-empty="L16"></span>`;
    html += `<span id="L17" class="timer" style="display: none"></span>`;
    html += `<span id="timer-output"></span>`;
    html += `</div>`;

    html += `<div class="draft right">`;
    // RIGHT CIV DRAFT
    addArea("civ-draft", "F16", (h, startRef) => {
        var h = "";
        for (var i = 0; i < 15; i++) {
            const nameRef = Helpers.relativeRow(startRef, i);
            const imageRef = Helpers.relativeColumn(nameRef, 1);
            const classesRef = Helpers.relativeColumn(nameRef, 2);
            const typeRef = Helpers.relativeColumn(nameRef, 3);

            h += civPartial({nameRef, imageRef, classesRef, typeRef});
        }
        return h;
    });
    html += `</div>`;

    // NAMES AND SCORES
    html += partialBoxRight({ class: 'player left name', style: `left: 160px; top: 64px; width: 400px; height: 90px;`, content: '<span id="B1"></span>'});
    html += partialBoxCentered({ class: 'player left score', style: `left: 608px; top: 64px; width: 90px; height: 90px;`, content: '<span id="D1"></span>'});
    html += partialBoxCentered({ class: 'player right score', style: `left: 918px; top: 64px; width: 90px; height: 90px;`, content: '<span id="D2"></span>'});
    html += partialBoxLeft({ class: 'player right name', style: `left: 1052px; top: 64px; width: 400px; height: 90px;`, content: '<span id="B2"></span>'});

    // ROUND INFO
    html += `<div class="round-info">`;
    html += '<div id="O1" style="text-align: right;"></div>';
    html += '<div id="O2" style="text-align: left;"></div>';
    html += `</div>`;

    // TALENT NAMES AND HANDLES
    html += partialBoxCentered({ class: 'talent', style: `left: 140px; top: 1025px; width: 430px; height: 40px;`, content: '<span id="Q4"></span>'});
    html += partialBoxCentered({ class: 'talent', style: `left: 1055px; top: 1025px; width: 430px; height: 40px;`, content: '<span id="Q5"></span>'});
    if (parseInt(numCams) === 3) {
        html += partialBoxCentered({ class: 'talent', style: `left: 592px; top: 1025px; width: 430px; height: 40px;`, content: '<span id="Q6"></span>'});
    }
    // ALERTS AND CHAT ETC
    html += `<div class="streamelements one" style="position: absolute; left: 555px; top: 660px; width: 500px; height: 500px" requires-non-empty="${streamElements1Ref}"><iframe style="transform:scale(1);border:none;width:500px;height:500px" id="${streamElements1Ref}"></iframe></div>`;
    html += `<div class="streamelements two" style="position: absolute; left: 1620px; top: 0px; width: 300px; height: 700px" requires-non-empty="${streamElements2Ref}"><iframe style="transform:scale(1);border:none;width:300px;height:700px" id="${streamElements2Ref}"></iframe></div>`;
    html += `<div class="streamelements three" style="position: absolute; left: 1620px; top: 730px; width: 300px; height: 350px" requires-non-empty="${streamElements3Ref}"><iframe style="transform:scale(1);border:none;width:300px;height:350px" id="${streamElements3Ref}"></iframe></div>`;
    
    dom.innerHTML += html;

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
}
