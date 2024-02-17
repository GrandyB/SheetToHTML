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
  
    var rowAttributes = { height: 47, class: 'padding', style: 'font-size: 25px;' };
    var rowImage = { ...rowAttributes, alignment: 'flex-center-center', image: true};
    var rowName = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-left'};
    var rowScore = { ...rowAttributes, style: rowAttributes.style + "color: #000;", alignment: 'flex-center-center'};
  
    var colsLeft = [
        { width: 50, ...rowImage },
        { width: 262, ...rowName },
        { width: 54, ...rowScore }
    ];
    var colsRight = [
        { width: 54, ...rowScore },
        { width: 262, ...rowName },
        { width: 50, ...rowImage }
    ];
    var grandFinalsLeft = [
        { width: 60, ...rowImage, height: 60 },
        { width: 331, ...rowName, height: 60 },
        { width: 67, ...rowScore, height: 60 }
    ];
    var grandFinalsRight = [
        { width: 67, ...rowScore, height: 60 },
        { width: 331, ...rowName, height: 60 },
        { width: 60, ...rowImage, height: 60 }
    ];
  
    function matchup(cellRef, left, top, config) {
        dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 0, 47, config);
    }
  
    // Left side
    var left = 37;
    matchup('D2', left, 112, colsLeft);
    matchup('D6', left, 410, colsLeft);
    matchup('D10', left, 567, colsLeft);
    matchup('D14', left, 865, colsLeft);

    left = 349;
    matchup('J4', left, 261, colsLeft);
    matchup('J12', left, 716, colsLeft);

    // Right side
    left = 1197;
    matchup('T4', left, 261, colsRight);
    matchup('T12', left, 716, colsRight);

    left = 1508;
    matchup('Z2', left, 112, colsRight);
    matchup('Z6', left, 410, colsRight);
    matchup('Z10', left, 567, colsRight);
    matchup('Z14', left, 865, colsRight);

    // Semis
    left = 511;
    matchup('N7', left, 488, colsLeft);
    left = 1036;
    matchup('R7', left, 488, colsRight);

    // Grand finals
    matchup('M16', 499, 940, grandFinalsLeft);
    matchup('P16', 966, 940, grandFinalsRight);
}
