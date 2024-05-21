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
        </div>
    `);
    const mapPartial = Handlebars.compile(`{{> map }}`);

    function addMaps(left, top, startRef) {
        var box = `<div class="map-box" style="left: ${left}px; top: ${top}px">`;
        for (var i = 0; i < 3; i++) {
            const nameRef = Helpers.relativeRow(startRef, i);
            const imageRef = Helpers.relativeColumn(nameRef, 1);
            const classesRef = Helpers.relativeColumn(nameRef, 2);

            box += mapPartial({nameRef, imageRef, classesRef})
        }
        box += "</div>";
        html += box;
    }

    var top = 472;
    addMaps(136, top, "A47", html);
    addMaps(406, top, "A51", html);
    addMaps(676, top, "A55", html);
    addMaps(946, top, "A59", html);
    addMaps(1216, top, "A63", html);

    // LOBBY INFO
    html += `<div id="lobby-info">`;
    html += `<span id="L16" class="label" requires-non-empty="L16"></span>`;
    html += `<span id="L17" class="timer" style="display: none"></span>`;
    html += `<span id="timer-output"></span>`;
    html += `</div>`;

    // NAMES AND SCORES
    html += partialBoxRight({ class: 'player left name', style: `left: 160px; top: 64px; width: 400px; height: 90px;`, content: '<span id="B1"></span>'});
    html += partialBoxCentered({ class: 'player left score', style: `left: 608px; top: 64px; width: 90px; height: 90px;`, content: '<span id="D1"></span>'});
    html += partialBoxCentered({ class: 'player right score', style: `left: 918px; top: 64px; width: 90px; height: 90px;`, content: '<span id="D2"></span>'});
    html += partialBoxLeft({ class: 'player right name', style: `left: 1052px; top: 64px; width: 400px; height: 90px;`, content: '<span id="B2"></span>'});

    // TALENT NAMES AND HANDLES
    html += partialBoxCentered({ class: 'talent', style: `left: 140px; top: 410px; width: 430px; height: 40px;`, content: '<span id="Q4"></span>'});
    html += partialBoxCentered({ class: 'talent', style: `left: 1055px; top: 410px; width: 430px; height: 40px;`, content: '<span id="Q5"></span>'});

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
