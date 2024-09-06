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
  
    var rowAttributes = { height: 32, class: 'padding', style: 'font-size: 22px;' };
    var rowName = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-left'};
    var rowScore = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-center'};
  
    var cols = [
        { width: 238, ...rowName },
        { width: 33, ...rowScore }
    ];
  
    function matchup(cellRef, left, top) {
        dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 19, 51, cols);
    }
  
    var left = 51;
    matchup('B3', left, 138);
    matchup('B6', left, 254);
    matchup('B10', left, 370);
    matchup('B13', left, 486);
    matchup('B17', left, 602);
    matchup('B20', left, 718);
    matchup('B24', left, 834);
    matchup('B27', left, 950);
  
    left = 435;
    matchup('E4', left, 196);
    matchup('E11', left, 428);
    matchup('E18', left, 660);
    matchup('E25', left, 892);

    left = 818;
    matchup('H7', left, 313);
    matchup('H21', left, 776);

    left = 1205;
    matchup('K14', left, 544);

    left = 1569;
    dom.innerHTML += partialBoxCentered({ class: 'qual1', style: `left: ${left}px; top: 568px; width: 287px; height: ${rowAttributes.height}px; color: #fff; font-size: 22px;`, content: '<span id="N14"></span>'});
}
