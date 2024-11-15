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

    let images = getURLParam("images") != null;

    var rowAttributes = { height: 51, style: 'font-size: 26px; color: #fff;' };
    var rowLeft = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-left'};
    var rowRight = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-right'};
    var rowCenter = { ...rowAttributes, style: rowAttributes.style + "color: #fff;", alignment: 'flex-center-center'};
  
    var imgWidth = 60;
    var gap = 7;

    var outerNameWidth = images ? 252 : 252 + gap + imgWidth;
    var innerNameWidth = images ? 295 : 295 + gap + imgWidth;

    // Define with no images
    var leftCols = [
        { width: outerNameWidth, class: 'padding', ...rowLeft },
        { width: 50, ...rowCenter }
    ];

    var rightCols = [
        { width: 50, ...rowCenter },
        { width: outerNameWidth, class: 'padding', ...rowRight },
    ];

    var qualifiedLeftCols = [
        { width: innerNameWidth, class: 'padding', ...rowLeft }
    ];

    var qualifiedRightCols = [
        { width: innerNameWidth, class: 'padding', ...rowRight }
    ];

    // Add in image cols if including images
    if (images) {
        leftCols.unshift({ width: imgWidth, image: true, ...rowLeft });
        rightCols.push({ width: imgWidth, image: true, ...rowRight });
        qualifiedLeftCols.unshift({ width: imgWidth, image: true, ...rowLeft });
        qualifiedRightCols.push({ width: imgWidth, image: true, ...rowRight });
    }

    function leftSide(cellRef, left, top) {
        if (!images) cellRef = Helpers.relativeColumn(cellRef, 1);
        matchup(cellRef, left, top, leftCols);
    }

    function rightSide(cellRef, left, top) {
        matchup(cellRef, left, top, rightCols);
    }

    function middleLeft(cellRef, left, top) {
        if (!images) cellRef = Helpers.relativeColumn(cellRef, 1);
        dom.innerHTML += table(cellRef, 1, { left: left, top: top}, gap, 75, qualifiedLeftCols);
    }

    function middleRight(cellRef, left, top) {
        dom.innerHTML += table(cellRef, 1, { left: left, top: top}, gap, 75, qualifiedRightCols);
    }
  
    function matchup(cellRef, left, top, cols) {
        dom.innerHTML += table(cellRef, 2, { left: left, top: top}, gap, 75, cols);
    }
  
    // All cellRefs provided are as if the image link is before the name
    var left = 60;
    leftSide('B2', left, 171);
    leftSide('B5', left, 376);
    leftSide('B9', left, 686);
    leftSide('B12', left, 891);

    left = 494;
    middleLeft('F2', left, 208);
    middleLeft('F5', left, 413);
    middleLeft('F9', left, 723);
    middleLeft('F12', left, 928);

    left = 1070;
    middleRight('I2', left, 208);
    middleRight('I5', left, 413);
    middleRight('I9', left, 723);
    middleRight('I12', left, 928);

    left = 1488;
    rightSide('L2', left, 171);
    rightSide('L5', left, 376);
    rightSide('L9', left, 686);
    rightSide('L12', left, 891);

}
