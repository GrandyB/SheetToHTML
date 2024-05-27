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
    var rowImage = { ...rowAttributes, class: "image", alignment: 'flex-center-center', image: true};

    // Standings
    dom.innerHTML += table('M3', 4, { left: 939, top: 135}, 6, 66, [
        { width: 59, ...rowImage },
        { width: 514, ...rowWhite },
        { width: 104, ...rowWhite },
        { width: 110, ...rowWhite },
        { width: 99, ...rowWhite }
    ]);

    var left = 849;
    var matchupColumns = [
        { width: 59, ...rowImage },
        { width: 355, ...rowWhite },
        { width: 78, ...rowWhite },
        { width: 78, ...rowWhite },
        { width: 355, ...rowWhite },
        { width: 59, ...rowImage }
    ];

    // Round 1
    dom.innerHTML += table('C3', 2, { left: left, top: 516}, 3, 66, matchupColumns);
    // Round 2
    dom.innerHTML += table('C6', 1, { left: left, top: 707}, 3, 66, matchupColumns);
    // Round 3
    dom.innerHTML += table('C8', 1, { left: left, top: 836}, 3, 66, matchupColumns);
    // Round 4
    dom.innerHTML += table('C10', 1, { left: left, top: 964}, 3, 66, matchupColumns);
}
