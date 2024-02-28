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

  var rowAttributes = { height: 57, class: 'padding', alignment: 'flex-center-center', style: 'font-size: 35px;' };
  var rowName = { ...rowAttributes, style: rowAttributes.style + "color: #fff;"};
  var rowScore = { ...rowAttributes, style: rowAttributes.style + "color: #000;"};

  var cols = [
      { width: 56, height: 57, image: true },
      { width: 248, ...rowName },
      { width: 58, ...rowScore }
  ];

  function matchup(cellRef, left, top) {
      dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 8, 78, cols);
  }

  var left = 82;
  matchup('B3', left, 495);
  matchup('B7', left, 713);

  left = 524;
  matchup('F3', left, 454);
  matchup('F7', left, 674);

  left = 971;
  matchup('J3', left, 416);
  matchup('J7', left, 636);

  left = 1439;
  matchup('N5', left, 526);

  matchup('N9', left, 829);
}
