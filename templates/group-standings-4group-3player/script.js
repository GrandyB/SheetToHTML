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

    var rowAttributes = { height: 40, class: 'padding', alignment: 'flex-center-center', style: 'font-size: 25px; font-weight: 900;' };
    var rowWhite = { ...rowAttributes, style: rowAttributes.style + "color: #fff;"};
    var rowPurple = { ...rowAttributes, style: rowAttributes.style + "color: #381D64;"};

    var matchupColumns = [
        { width: 280, ...rowWhite },
        { width: 50, ...rowPurple },
        { width: 50, ...rowPurple },
        { width: 280, ...rowWhite }
    ];

    var standingsColumns = [
        { width: 389, ...rowWhite },
        { width: 70, ...rowWhite },
        { width: 74, ...rowWhite },
        { width: 67, ...rowPurple }
    ];

    function group(left, top, standingCell, matchesCell) {
        dom.innerHTML += table(standingCell, 3, { left: (left+61), top: top}, 4, 45, standingsColumns);
        dom.innerHTML += table(matchesCell, 3, { left: left, top: (top+186)}, 4, 45, matchupColumns);
    }

    group(86, 219, 'B3', 'N2');     // A
    group(86, 712, 'B15', 'N14');   // B
    group(1163, 219, 'B27', 'N26'); // C
    group(1163, 712, 'B39', 'N38'); // D
}
