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

    // Scores
    html += partialBoxCentered({ class: 'left score', style: `left: 814px; top: 140px; width: 85px; height: 85px;`, content: `<span id="B2"></span>`});
    html += partialBoxCentered({ class: 'right score', style: `left: 1022px; top: 140px; width: 85px; height: 85px;`, content: `<span id="B3"></span>`});
    html += partialBoxCentered({ class: 'bestof', style: `left: 822px; top: 230px; width: 270px; height: 50px;`, content: `<span id="B5"></span>`});

    html += `<div requires-non-empty="B7">`;
    html += partialBoxRight({ class: 'map label', style: `left: 1120px; top: 1015px; width: 400px; height: 25px;`, content: `<span id="map-label">MAP:</span>`});
    html += partialBoxRight({ class: 'map name', style: `left: 1120px; top: 1040px; width: 400px; height: 25px;`, content: `<span id="B7"></span>`});
    html += `</div>`;

    html += `<video id="B11" class="left" autoplay muted play-to-exit></video>`;
    html += `<video id="B12" class="right" autoplay muted play-to-exit></video>`;
    
    dom.innerHTML += html;

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
