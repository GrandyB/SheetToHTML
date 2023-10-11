// MIT License
//
// Copyright (c) 2023 Mark "Grandy" Bishop
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

// TODO: Use css to position, or js to position, not both in one file
function load() {
  function px(thing) {
    return thing + "px";
  }

  // data = { left, top, cell }
  function createMatchup(data) {
    var dom = document.getElementById("main");

    data.left = px(data.left);
    data.top = px(data.top);

    data.score1Left = "423px";
    data.score2Left = "503px";
    data.name2Left = "584px";

    data.name1Data = data.cell;
    data.score1Data = Helpers.relativeColumn(data.cell, 1);
    data.score2Data = Helpers.relativeColumn(data.cell, 2);
    data.name2Data = Helpers.relativeColumn(data.cell, 3);

    console.debug(data);

    var item = Handlebars.compile(`
        <div class="matchup" style="left: {{left}}; top: {{top}}">
            <div class="name" style="left: 0; top: 0">
                <span class="value" id="{{name1Data}}"></span>
            </div>
            <div class="score" style="left: {{score1Left}}; top: 0">
                <span class="value" id="{{score1Data}}"></span>
            </div>
            <div class="score" style="left: {{score2Left}}; top: 0">
                <span class="value" id="{{score2Data}}"></span>
            </div>
            <div class="name" style="left: {{name2Left}}; top: 0">
                <span class="value" id="{{name2Data}}"></span>
            </div>
        </div>
    `);

    const html = item(data);
    dom.innerHTML += html;
  }

  function createTableRow(data) {
    var dom = document.getElementById("main");

    data.left = px(data.left);
    data.top = px(data.top);

    data.nameData = data.cell;
    data.col1Data = Helpers.relativeColumn(data.cell, 1);
    data.col2Data = Helpers.relativeColumn(data.cell, 2);
    data.col3Data = Helpers.relativeColumn(data.cell, 3);

    console.debug(data);

    var item = Handlebars.compile(`
        <div class="table-row" style="left: {{left}}; top: {{top}}">
            <div class="table-inner">
                <div class="table-name">
                    <span class="value" id="{{nameData}}"></span>
                </div>
                <div class="table-col1">
                    <span class="value" id="{{col1Data}}"></span>
                </div>
                <div class="table-col2">
                    <span class="value" id="{{col2Data}}"></span>
                </div>
                <div class="table-col3">
                    <span class="value" id="{{col3Data}}"></span>
                </div>
            </div>
        </div>
    `);

    const html = item(data);
    dom.innerHTML += html;
  }

  var leftAmt = 939;
  createTableRow({ left: leftAmt, top: 135, cell: "B2" });
  createTableRow({ left: leftAmt, top: 201, cell: "B3" });
  createTableRow({ left: leftAmt, top: 268, cell: "B4" });
  createTableRow({ left: leftAmt, top: 334, cell: "B5" });

  // Use a variable to shift and re-use the 'left' amount per round
  leftAmt = 849;
  createMatchup({ left: leftAmt, top: 516, cell: "M2" });
  createMatchup({ left: leftAmt, top: 582, cell: "M3" });
  
  createMatchup({ left: leftAmt, top: 707, cell: "M6" });
  createMatchup({ left: leftAmt, top: 773, cell: "M7" });
  
  createMatchup({ left: leftAmt, top: 898, cell: "M10" });
  createMatchup({ left: leftAmt, top: 964, cell: "M11" });
}
