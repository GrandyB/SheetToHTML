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

    if (getURLParam("big-icons") != null) {
        document.getElementById("main").classList.add(`big-icons`);
    }

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

    // Objects are as follows:
    // { mapName, mapImage, current, leftWinLossRef, leftCivRefs, rightWinLossRef, rightCivRefs }
    // leftCivRefs/rightCivRefs: { stateRef, nameRef, imageRef, classesRef }
    Handlebars.registerPartial("game", `
        <div class="game" requires-non-empty="{{mapName}}" apply-as-classes="{{current}}">
            {{> map nameRef=mapName imageRef=mapImage }}
            <div class="civ-list left-civs" apply-as-classes="{{leftWinLossRef}}">
                {{#each leftCivRefs}}
                    <div class="left-civ" apply-as-classes="{{classesRef}}">{{> civ nameRef=nameRef imageRef=imageRef }}</div>
                {{/each}}
            </div>
            <div class="civ-list right-civs" apply-as-classes="{{rightWinLossRef}}">
                {{#each rightCivRefs}}
                    <div class="right-civ" apply-as-classes="{{classesRef}}">{{> civ nameRef=nameRef imageRef=imageRef }}</div>
                {{/each}}
            </div>
        </div>
    `);
    const gamePartial = Handlebars.compile(`{{> game }}`);

    // { left, top, players }
    // players: [{ nameRef, imageRef }, { nameRef, imageRef }]
    Handlebars.registerPartial("team-players", `
        <div class="team-players {{class}}" style="left: {{left}}px; top: {{top}}px; width: {{width}}px;">
            {{#each players}}
                <div requires-non-empty="{{nameRef}}">
                    <div class="team-player-container">
                        <img id="{{imageRef}}" />
                        <div id="{{nameRef}}"></div>
                    </div>
                </div>
            {{/each}}
        </div>
    `);
    const playersPartial = Handlebars.compile(`{{> team-players}}`);

    // GAMES
    html += `<div class="games-container" apply-as-classes="N20">`; // maps-X
    html += `<div class="games">`
    let gameCellRefs = ["B12", "B20", "B28", "B36", "B44", "B52", "B60", "B68", "B76"];
    gameCellRefs.forEach(topLeftRef => {
        let mapName = Helpers.relativeRowThenColumn(topLeftRef, 1, 2);
        let mapImage = Helpers.relativeColumn(topLeftRef, 10);
        let current = Helpers.relativeRow(mapImage, 2);
        
        let leftWinLossRef = topLeftRef;
        let leftCivRefs = [];
        for (var i = 1; i <= 3; i++) {
            let stateRef = Helpers.relativeRow(leftWinLossRef, i);
            let nameRef = Helpers.relativeColumn(stateRef, 1);
            let imageRef = Helpers.relativeColumn(stateRef, 5);
            let classesRef = Helpers.relativeColumn(stateRef, 6);
            leftCivRefs.push({ stateRef, nameRef, imageRef, classesRef });
        }

        let rightWinLossRef = Helpers.relativeColumn(leftWinLossRef, 4);
        let rightCivRefs = [];
        for (var i = 1; i <= 3; i++) {
            let stateRef = Helpers.relativeRow(rightWinLossRef, i);
            let nameRef = Helpers.relativeColumn(stateRef, -1);
            let imageRef = Helpers.relativeColumn(stateRef, 3);
            let classesRef = Helpers.relativeColumn(stateRef, 4);
            rightCivRefs.push({ stateRef, nameRef, imageRef, classesRef });
        }

        html += gamePartial({mapName, mapImage, current, leftWinLossRef, leftCivRefs, rightWinLossRef, rightCivRefs});
    });
    html += `</div>`;
    html += `</div>`;

    // NAMES AND SCORES
    html += partialBoxCentered({ class: 'player left country', style: `left: 10px; top: 8px; width: 275px; opacity: 0.2;`, content: '<img id="C1" />'});
    html += partialBoxCentered({ class: 'player right country', style: `left: 1310px; top: 8px; width: 275px; opacity: 0.2`, content: '<img id="C2" />'});

    html += partialBoxRight({ class: 'player left name', style: `left: 20px; top: 64px; width: 470px; height: 90px;`, content: '<span id="B1"></span>'});
    html += partialBoxRight({ class: 'player left seed', style: `left: 20px; top: 30px; width: 470px; height: 90px;`, content: '<span id="B4"></span>'});
    html += partialBoxCentered({ class: 'player left country', style: `left: 500px; top: 60px; width: 75px;`, content: '<img id="C1" />'});
    html += partialBoxCentered({ class: 'player left score', style: `left: 621px; top: 72px; width: 90px; height: 90px;`, content: '<span id="D1"></span>'});
    html += partialBoxCentered({ class: 'player right score', style: `left: 908px; top: 72px; width: 90px; height: 90px;`, content: '<span id="D2"></span>'});
    html += partialBoxLeft({ class: 'player right name', style: `left: 1122px; top: 64px; width: 470px; height: 90px;`, content: '<span id="B2"></span>'});
    html += partialBoxLeft({ class: 'player right seed', style: `left: 1122px; top: 30px; width: 470px; height: 90px;`, content: '<span id="B5"></span>'});
    html += partialBoxCentered({ class: 'player right country', style: `left: 1035px; top: 60px; width: 75px;`, content: '<img id="C2" />'});

    // PLAYER LISTS
    // { left, top, players }
    // players: [{ nameRef, imageRef }, { nameRef, imageRef }]
    let leftPlayers = [];
    leftPlayers.push({nameRef: "B7", imageRef: "C7"}, {nameRef: "D7", imageRef: "E7"}, {nameRef: "F7", imageRef: "G7"}, {nameRef: "H7", imageRef: "I7"});
    html += playersPartial({ left: 70, top: 140, width: 500, class: 'left', players: leftPlayers});
    let rightPlayers = [];
    rightPlayers.push({nameRef: "B8", imageRef: "C8"}, {nameRef: "D8", imageRef: "E8"}, {nameRef: "F8", imageRef: "G8"}, {nameRef: "H8", imageRef: "I8"});
    html += playersPartial({ left: 1050, top: 140, width: 500, class: 'right',  players: rightPlayers});

    // ROUND INFO
    html += `<div class="round-info">`;
    html += '<div id="O1" style="text-align: center;"></div>';
    html += '<div id="O2" style="text-align: center;"></div>';
    html += `</div>`;

    // LOBBY INFO
    html += `<div id="lobby-info">`;
    html += `<span id="O16" class="label" requires-non-empty="O16"></span>`;
    html += `<span timer-id="O17"></span>`;
    html += `</div>`;

    // TALENT NAMES AND HANDLES
    html += partialBoxCentered({ class: 'talent', style: `left: 140px; top: 1025px; width: 430px; height: 40px;`, content: '<span id="Q4"></span>'});
    html += partialBoxCentered({ class: 'talent', style: `left: 1055px; top: 1025px; width: 430px; height: 40px;`, content: '<span id="Q5"></span>'});
    if (parseInt(numCams) === 3) {
        html += partialBoxCentered({ class: 'talent', style: `left: 592px; top: 1025px; width: 430px; height: 40px;`, content: '<span id="Q6"></span>'});
    }

    dom.innerHTML += html;
}
