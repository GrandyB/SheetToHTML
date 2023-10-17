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
  
    var rowAttributes = { height: 37, class: 'padding', style: 'font-size: 25px;' };
    var rowName = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-left'};
    var rowScore = { ...rowAttributes, style: rowAttributes.style + "color: #000;", alignment: 'flex-center-center'};
  
    var cols = [
        { width: 268, ...rowName },
        { width: 60, ...rowScore }
    ];
  
    function matchup(cellRef, left, top) {
        dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 12, 53, cols);
    }
  
    var left = 103;
    matchup('B2', left, 87);
    matchup('B6', left, 213);
    matchup('B10', left, 338);
    matchup('B14', left, 466);
    matchup('B18', left, 591);
    matchup('B22', left, 717);
    matchup('B26', left, 842);
    matchup('B30', left, 969);
  
    left = 560;
    matchup('E4', left, 150);
    matchup('E12', left, 402);
    matchup('E20', left, 654);
    matchup('E28', left, 906);
  
    left = 1017;
    matchup('H8', left, 276);
    matchup('H24', left, 781);

    left = 1474;
    matchup('K16', left, 529);
    matchup('K21', left, 741);
}
