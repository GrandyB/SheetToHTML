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
  
    var left = 193;
    matchup('B2', left, 133);
    matchup('B6', left, 249);
    matchup('B10', left, 365);
    matchup('B14', left, 481);
    matchup('B18', left, 597);
    matchup('B22', left, 713);
    matchup('B26', left, 829);
    matchup('B30', left, 945);
  
    left = 610;
    matchup('E4', left, 191);
    matchup('E12', left, 423);
    matchup('E20', left, 655);
    matchup('E28', left, 887);
  
    left = 1023;
    matchup('H8', left, 308);
    matchup('H24', left, 771);

    left = 1439;
    dom.innerHTML += partialBoxCentered({ class: 'qual1', style: `left: ${left}px; top: 333px; width: 287px; height: ${rowAttributes.height}px; color: #fff; font-size: 22px;`, content: '<span id="K8"></span>'});
    dom.innerHTML += partialBoxCentered({ class: 'qual2', style: `left: ${left}px; top: 797px; width: 287px; height: ${rowAttributes.height}px; color: #fff; font-size: 22px;`, content: '<span id="K24"></span>'});
}
