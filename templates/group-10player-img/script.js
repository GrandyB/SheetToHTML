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

    var rowAttributes = { height: 74, style: 'font-size: 35px; font-weight: 900;' };
    var rowName = { ...rowAttributes, class: 'padding', alignment: 'flex-center-center', style: rowAttributes.style + "color: #FFE707;"};
    var rowScore = { ...rowAttributes, class: 'padding', alignment: 'flex-center-center', style: rowAttributes.style + "color: #222;"};

    var standingsColumns = [
        { width: 77, image: true, class: 'image1',  ...rowAttributes },
        { width: 300, ...rowName },
        { width: 75, ...rowScore },
        { width: 75, ...rowScore },
        { width: 300, ...rowName },
        { width: 77, image: true, class: 'image2', ...rowAttributes }
    ];

    const cell = getURLParam("cell");
    dom.innerHTML += table(cell, 10, { left: 920, top: 71}, 7, 97, standingsColumns);
}
