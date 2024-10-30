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
  
    var rowAttributes = { height: 34, style: 'font-size: 20px;' };
    var rowName = { ...rowAttributes, class: 'padding', style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-left'};
    var rowScore = { ...rowAttributes, class: 'padding', style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-center'};
  
    var cols = [
        { width: 34, image: true, class: 'image',  ...rowAttributes },
        { width: 34, image: true, class: 'image flag',  ...rowAttributes },
        { width: 212, ...rowName },
        { width: 34, ...rowScore }
    ];
  
    function matchup(cellRef, left, top) {
        dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 6, 48, cols);
    }
  
    // Winners
    // Ro16
    var left = 47;
    matchup('C2', left, 124);
    matchup('C6', left, 238);
    matchup('C10', left, 352);
    matchup('C14', left, 466);
    matchup('C18', left, 580);
    matchup('C22', left, 694);
    matchup('C26', left, 808);
    matchup('C30', left, 922);

    // Ro8
    left = 464;
    matchup('J4', left, 182);
    matchup('J12', left, 410);
    matchup('J20', left, 637);
    matchup('J28', left, 865);

    // Ro4
    left = 881;
    matchup('Q8', left, 238);
    matchup('Q24', left, 637);

    // Finals
    left = 1126;
    matchup('X16', left, 438);

    // Grand final
    left = 1529;
    matchup('AE21', left, 666);

    // Ro2/decider
    left = 1126;
    matchup('X28', left, 900);
    left = 1521;
    matchup('X32', left, 1240);

    // Losers
    // R1
    left = 85;
    matchup('C36', left, 1308);
    matchup('C40', left, 1532);
    matchup('C45', left, 1760);
    matchup('C49', left, 1985);

    // R2
    left = 499;
    matchup('J36', left, 1283);
    matchup('J40', left, 1507);
    matchup('J45', left, 1735);
    matchup('J49', left, 1961);

    // R3
    left = 912;
    matchup('Q38', left, 1507);
    matchup('Q47', left, 1735);

    // R4
    left = 1326;
    matchup('X38', left, 1481);
    matchup('X47', left, 1709);
}
