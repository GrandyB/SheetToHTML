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

    let startRef = getURLParam("startRef");
  
    var rowAttributes = { height: 32, class: 'padding', style: 'font-size: 22px;' };
    var rowName = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-left'};
    var rowScore = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-center'};
  
    var cols = [
        { width: 238, ...rowName },
        { width: 33, ...rowScore }
    ];
  
    function matchup(cellRef, left, top) {
        console.log(`Matchup: ${cellRef} @ ${left}/${top}`);
        dom.innerHTML += table(cellRef, 2, { left: left, top: top}, 19, 51, cols);
    }

    function bracket16(start, voffset) {
        var left = 193;
        matchup(start, left, voffset+133);
        matchup(Helpers.relativeRow(start, 4), left, voffset+249);
        matchup(Helpers.relativeRow(start, 8), left, voffset+365);
        matchup(Helpers.relativeRow(start, 12), left, voffset+481);
        matchup(Helpers.relativeRow(start, 16), left, voffset+597);
        matchup(Helpers.relativeRow(start, 20), left, voffset+713);
        matchup(Helpers.relativeRow(start, 24), left, voffset+829);
        matchup(Helpers.relativeRow(start, 28), left, voffset+945);
      
        left = 610;
        var col2Start = Helpers.relativeColumn(Helpers.relativeRow(start, 2), 3);
        matchup(col2Start, left, voffset+191);
        matchup(Helpers.relativeRow(col2Start, 8), left, voffset+423);
        matchup(Helpers.relativeRow(col2Start, 16), left, voffset+655);
        matchup(Helpers.relativeRow(col2Start, 24), left, voffset+887);
      
        left = 1023;
        var col3Start = Helpers.relativeColumn(Helpers.relativeRow(start, 6), 6);
        matchup(col3Start, left, voffset+308);
        matchup(Helpers.relativeRow(col3Start, 16), left, voffset+771);

        left = 1439;
        var col4Start = Helpers.relativeColumn(Helpers.relativeRow(start, 6), 9);
        dom.innerHTML += partialBoxCentered({
            class: 'qual1',
            style: `left: ${left}px; top: ${voffset+333}px; width: 287px; height: ${rowAttributes.height}px; color: #fff; font-size: 22px;`,
            content: `<span id="${col4Start}"></span>`
        });
        dom.innerHTML += partialBoxCentered({
            class: 'qual2',
            style: `left: ${left}px; top: ${voffset+797}px; width: 287px; height: ${rowAttributes.height}px; color: #fff; font-size: 22px;`,
            content: `<span id="${Helpers.relativeRow(col4Start, 16)}"></span>`
        });
    
    }

    function next(start) {
        return Helpers.relativeRow(start, 32);
    }
  
    var offset = 0;
    bracket16(startRef, offset);

    startRef = next(startRef);
    bracket16(startRef, offset += 1080);

    startRef = next(startRef);
    bracket16(startRef, offset += 1080);

    startRef = next(startRef);
    bracket16(startRef, offset += 1080);
}
