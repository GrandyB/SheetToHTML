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

// This is basically the same as bracket-8player, and uses the same sheet configuration, but has slightly different layouting/sizes
function load() {
  var dom = document.getElementById("main");

  var rowAttributes = { height: 60, class: 'padding', alignment: 'flex-center-center', style: 'font-size: 35px; font-weight: bold;' };
  var rowName = { ...rowAttributes, style: rowAttributes.style + "color: #fff;"};
  var rowScore = { ...rowAttributes, style: rowAttributes.style + "color: #000;"};

  var cols = [
      { width: 304, ...rowName },
      { width: 60, ...rowScore }
  ];

  function matchup(cellRef, left, top) {
      dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 9, 80, cols);
  }

  var left = 141;
  matchup('B2', left, 344);
  matchup('B6', left, 520);
  matchup('B10', left, 699);
  matchup('B14', left, 877);

  left = 763;
  matchup('E4', left, 432);
  matchup('E12', left, 787);

  left = 1387;
  matchup('H8', left, 515);
  matchup('H12', left, 853);
}
