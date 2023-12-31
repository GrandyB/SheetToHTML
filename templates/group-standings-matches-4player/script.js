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

    var rowAttributes = { height: 59, class: 'padding', alignment: 'flex-center-center', style: 'font-size: 35px;' };
    var rowWhite = { ...rowAttributes, style: rowAttributes.style + "color: #fff;"};
    var rowBlack = { ...rowAttributes, style: rowAttributes.style + "color: #000;"};

    // Standings
    dom.innerHTML += table('B2', 4, { left: 939, top: 135}, 6, 66, [
        { width: 579, ...rowWhite },
        { width: 104, ...rowWhite },
        { width: 110, ...rowWhite },
        { width: 99, ...rowBlack }
    ]);

    var left = 849;
    var matchupColumns = [
        { width: 415, ...rowWhite },
        { width: 74, ...rowBlack },
        { width: 74, ...rowBlack },
        { width: 415, ...rowWhite }
    ];

    // Round 1
    dom.innerHTML += table('M2', 2, { left: left, top: 516}, 7, 66, matchupColumns);
    // Round 2
    dom.innerHTML += table('M6', 2, { left: left, top: 707}, 7, 66, matchupColumns);
    // Round 3
    dom.innerHTML += table('M10', 2, { left: left, top: 898}, 7, 66, matchupColumns);
}
