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

  var rowAttributes = { height: 51, class: 'padding', alignment: 'flex-center-center', style: 'font-size: 35px;' };
  var rowName = { ...rowAttributes, style: rowAttributes.style + "color: #fff;"};
  var rowScore = { ...rowAttributes, style: rowAttributes.style + "color: #fff;"};
  var rowImage = { ...rowAttributes, class: "image", alignment: 'flex-center-center', image: true};

  var cols = [
      { width: 51, ...rowImage },
      { width: 323, ...rowName },
      { width: 95, ...rowScore }
  ];

  function matchup(cellRef, left, top) {
      dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 10, 77, cols);
  }

  var left = 125;
  matchup('C2', left, 255);
  matchup('C6', left, 438);
  matchup('C10', left, 627);
  matchup('C14', left, 810);

  left = 714;
  matchup('H4', left, 346);
  matchup('H12', left, 720);

  left = 1300;
  matchup('M8', left, 533);
  matchup('M12', left, 802);
}
