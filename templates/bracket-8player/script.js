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
  var leftOffset = 394; // distance from name to score
  var topOffset = 76; // distance from top of first name to top of second name

  function px(thing) {
    return thing + "px";
  }

  // data = { left, top, cell }
  function createItem(data) {
    var dom = document.getElementById("main");

    data.leftOffset = px(leftOffset);
    data.topOffset = px(topOffset);
    data.left = px(data.left);
    data.top = px(data.top);

    data.name1Data = data.cell;
    data.score1Data = Helpers.relativeColumn(data.cell, 1);
    data.name2Data = Helpers.relativeRow(data.cell, 1);
    data.score2Data = Helpers.relativeColumn(Helpers.relativeRow(data.cell, 1), 1);

    console.debug(data);

    var item = Handlebars.compile(`
        <div class="entry" style="left: {{left}}; top: {{top}}">
            <div class="name" style="left: 0; top: 0">
                <span class="value" id="{{name1Data}}"></span>
            </div>
            <div class="score" style="left: {{leftOffset}}; top: 0">
                <span class="value" id="{{score1Data}}"></span>
            </div>
            <div class="name" style="left: 0; top: {{topOffset}}">
                <span class="value" id="{{name2Data}}"></span>
            </div>
            <div class="score" style="left: {{leftOffset}}; top: {{topOffset}}">
                <span class="value" id="{{score2Data}}"></span>
            </div>
        </div>
    `);

    const html = item(data);
    dom.innerHTML += html;
  }

  // Use a variable to shift and re-use the 'left' amount per round
  var leftAmt = 125;
  // Ro16
  createItem({ left: leftAmt, top: 255, cell: "B2" });
  createItem({ left: leftAmt, top: 438, cell: "B6" });
  createItem({ left: leftAmt, top: 627, cell: "B10" });
  createItem({ left: leftAmt, top: 810, cell: "B14" });

  // Ro8
  leftAmt = 714;
  createItem({ left: leftAmt, top: 346, cell: "E4" });
  createItem({ left: leftAmt, top: 720, cell: "E12" });

  // Semis
  leftAmt = 1300;
  createItem({ left: leftAmt, top: 533, cell: "H8" });
  createItem({ left: leftAmt, top: 802, cell: "H12" });
}
