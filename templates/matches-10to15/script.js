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
    
    const leftRef = getAndCheckURLParam("left");
    const rightRef = getAndCheckURLParam("right");


    var h = 68;
    var alignCenter = { alignment: 'flex-center-center', height: h, class: 'padding' };
    var image = { width: 71, height: h, image: true };

    var cols = [
        image,
        { width: 277, ...alignCenter, style: "color: #fff; font-size: 40px;" },
        { width: 70, ...alignCenter, style: "color: #000; font-size: 40px;" },
        { width: 69, ...alignCenter, style: "color: #000; font-size: 40px;" },
        { width: 275,  ...alignCenter, style: "color: #fff; font-size: 40px;" },
        image
    ];

    // Left
    var left = table(leftRef, 5, { left: 72, top: 576}, 6, 90, cols);
    dom.innerHTML += `<div requires-non-empty="${Helpers.relativeColumn(leftRef, 1)}">${left}</div>`;

    // Right
    dom.innerHTML += table(rightRef, 10, { left: 992, top: 126}, 6, 90, cols);
}