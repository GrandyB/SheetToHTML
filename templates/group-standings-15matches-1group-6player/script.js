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

    var alignLeft = { alignment: 'flex-center-left' };
    var alignCenter = { alignment: 'flex-center-center' };

    // Standings
    var h = 86;
    dom.innerHTML += table('C3', 6, { left: 155, top: 470}, 2, 95, [
        { width: 86,  height: h, image: true },
        { width: 440, height: h, class: 'padding', ...alignLeft, style: "color: #fff; font-size: 50px;" },
        { width: 120, height: h, class: 'padding', ...alignCenter, style: "color: #fff; font-size: 50px;" },
        { width: 116, height: h, class: 'padding', ...alignCenter, style: "color: #fff; font-size: 50px;" },
        { width: 81,  height: h, class: 'padding', ...alignCenter, style: "color: #000; font-size: 50px;" }
    ]);

    // Matches
    h = 51;
    dom.innerHTML += table('R3', 15, { left: 1103, top: 42}, 3, 67, [
        { width: 264, height: h, ...alignCenter, style: "color: #fff; font-size: 35px;" },
        { width: 52,  height: h, ...alignCenter, style: "color: #000; font-size: 35px;" },
        { width: 52,  height: h, ...alignCenter, style: "color: #000; font-size: 35px;" },
        { width: 264, height: h, ...alignCenter, style: "color: #fff; font-size: 35px;" },
    ]);
}
