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
    html += '<div id="series-container">';

    Handlebars.registerPartial("map-entry", `
        <div class="map-entry" requires-non-empty="{{requiresNonEmpty}}" apply-as-classes="{{currentRef}}">
            <div class="pre"></div>
            <div class="entry">
                <img id="{{imageRef}}" class="map-img" />
                <span id="{{nameRef}}" class="map-name"></span>
                <span id="{{winnerRef}}" class="winner-name"></span>
            </div>
            <div class="post"></div>
        </div>
    `);
    const mapEntryPartial = Handlebars.compile(`{{> map-entry }}`);

    const startRef = 'C2';
    for (var i = 0; i < 9; i++) {
        const nameRef = Helpers.relativeRow(startRef, i);
        const imageRef = Helpers.relativeColumn(nameRef, 1);
        const currentRef = Helpers.relativeColumn(nameRef, 2);
        const winnerRef = Helpers.relativeColumn(nameRef, 3);
        const requiresNonEmpty = nameRef;

        html += mapEntryPartial({nameRef, imageRef, currentRef, winnerRef, requiresNonEmpty});
        
    }

    html += '</div>';
    
    dom.innerHTML += html;
}
