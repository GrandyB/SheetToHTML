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
  
    var rowAttributes = { height: 29, style: 'font-size: 20px;' };
    var rowName = { ...rowAttributes, class: 'padding', style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-left'};
    var rowScore = { ...rowAttributes, class: 'padding', style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-center'};
  
    var cols = [
        { width: 31, image: true, class: 'image1',  ...rowAttributes },
        { width: 225, ...rowName },
        { width: 31, ...rowScore }
    ];
  
    function matchup(cellRef, left, top) {
        dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 18, 48, cols);
    }
  
    // Winners
    // Ro16
    var left = 52;
    matchup('J3', left, 132);
    matchup('J7', left, 246);
    matchup('J11', left, 359);
    matchup('J15', left, 472);
    matchup('J19', left, 585);
    matchup('J23', left, 698);
    matchup('J27', left, 811);
    matchup('J31', left, 924);

    // Ro8
    left = 469;
    matchup('N5', left, 188);
    matchup('N13', left, 416);
    matchup('N21', left, 641);
    matchup('N29', left, 867);

    // Ro4
    left = 886;
    matchup('R9', left, 241);
    matchup('R25', left, 641);

    // Ro2/decider
    left = 1131;
    matchup('V17', left, 479);
    matchup('V31', left, 902);

    // Finals
    left = 1536;
    matchup('Z19', left, 666);
    matchup('Z23', left, 795);

    // Losers
    // R1
    left = 91;
    matchup('B37', left, 1310);
    matchup('B41', left, 1534);
    matchup('B45', left, 1762);
    matchup('B49', left, 1987);

    // R2
    left = 504;
    matchup('F37', left, 1285);
    matchup('F41', left, 1509);
    matchup('F45', left, 1737);
    matchup('F49', left, 1963);

    // R3
    left = 917;
    matchup('J41', left, 1509);
    matchup('J45', left, 1737);

    // R4
    left = 1330;
    matchup('N40', left, 1483);
    matchup('N44', left, 1711);

    
    matchup('Z37', 1526, 1244);
}
