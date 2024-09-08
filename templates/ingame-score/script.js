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

    let leftScoreLeft = getAndCheckURLParam("lsLeft");
    let rightScoreLeft = getAndCheckURLParam("rsLeft");
    let scoreTop = getAndCheckURLParam("sTop");

    let bestOfLeft = getAndCheckURLParam("boLeft");
    let bestOfTop = getAndCheckURLParam("boTop");

    let mapLeft = getAndCheckURLParam("mapLeft");
    let mapTop = getAndCheckURLParam("mapTop");

    // Scores
    html += partialBoxCentered({ class: 'left score', style: `left: ${leftScoreLeft}px; top: ${scoreTop}px; width: 85px; height: 85px;`, content: `<span id="B2"></span>`}); // 814
    html += partialBoxCentered({ class: 'right score', style: `left: ${rightScoreLeft}px; top: ${scoreTop}px; width: 85px; height: 85px;`, content: `<span id="B3"></span>`}); // 1022
    html += partialBoxCentered({ class: 'bestof', style: `left: ${bestOfLeft}px; top: ${bestOfTop}px; width: 270px; height: 50px;`, content: `<span id="B5"></span>`}); // 822

    html += `<div requires-non-empty="B7" style="position: absolute; width: 400px; left: ${mapLeft}px; top: ${mapTop}px;">`
        html += `<div id='map-container'>`;
            html += `<span id="map-label" class="label">MAP:</span>`; // 1120
            html += `<span id="B7" class="name"></span>`;
        html += `</div>`
    html += `</div>`;
    
    html += `<div id="streamelements" style="position: absolute; left: 1155px; top: 700px; width: 500px; height: 500px"><iframe style="transform:scale(1);border:none;width:500px;height:500px" id="B9"></iframe></div>`;
    
    dom.innerHTML += html;
}
