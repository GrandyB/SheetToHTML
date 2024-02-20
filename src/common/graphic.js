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

var urlParams = new URLSearchParams(window.location.search);
function addError(err) {
	var e = document.createElement("p");
	e.className = "err";
	e.innerHTML = err;
	document.getElementById("errors").appendChild(e);
}
function addStylesheet(href) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	linkElement.href = href;
	document.head.appendChild(linkElement);
	console.log(`Stylesheet linked: '${href}'`);
}
function getURLParam(param) {
	var p = urlParams.get(param);
	console.log(`getURLParam('${param}'): '${p}'`);
	return p;
}
function hasURLParam(param) {
	var p = urlParams.has(param);
	console.log(`hasURLParam('${param}'): ${p}`);
	return p;
}
function getAndCheckURLParam(param) {
	var p = getURLParam(param);
	if (!p || p === "") {
		addError(`<b>Missing URL param:</b> ${param}`);
	}
	return p;
}
function buildFontCSS(param) {
	var cssRule = `* { font-family: '${decodeURIComponent(font)}'; ${colorCss}}`;
	styleTag.appendChild(document.createTextNode(cssRule));
}
function loadScript(url) {
	var scriptElement = document.createElement("script");
	scriptElement.src = url;
	document.head.appendChild(scriptElement);
	return scriptElement;
}

const tabName = getAndCheckURLParam("tab");
const spreadsheetId = getAndCheckURLParam("id");
const imgCell = getURLParam("imgCell");
const template = getAndCheckURLParam("template");

const autoUpdate = hasURLParam("update");
const font = getURLParam("font");
const color = getURLParam("color");
const fadeIn = hasURLParam("fadeIn");

var customCss = [];
if (font) {
	console.log(`Adding font from param: '{font}'`);
	addStylesheet(`https://fonts.googleapis.com/css?family=${font}`);
	var split = font.split(":");
	if (split.length > 1) {
		// Font includes a weight component, e.g. Rajdhani:700
		customCss.push(`font-weight: ${decodeURIComponent(split[1])};`);
	}
	customCss.push(`font-family: ${decodeURIComponent(split[0])};`);
}
if (color) {
	customCss.push(`color: #${color};`);
}

if (customCss.length !== 0) document.getElementById("customStyles").appendChild(document.createTextNode(`* { ${customCss.join(" ")} }`));

if (imgCell && imgCell.trim() !== "") {
	document.getElementById("bg").id = imgCell;
} else {
	document.getElementById("bg").src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';
}

if (tabName && spreadsheetId && template) {

	var sheets = new GoogleSheetToJS(
		Config.getApiKey(),
		spreadsheetId,
		tabName,
		5000
	);

	if (fadeIn) {
		document.getElementById('main').classList.add("hidden");
	}

	loadTemplate(template).then(() => {
		if (autoUpdate) {
			console.log(
				'Automatic data updating enabled (remove "update" from URL to turn off)'
			);
			sheets.updateLoop();
		} else {
			console.log('Data will not auto-update (add "update" to URL to turn on)');
			sheets.update();
		}
		if (fadeIn) {
			setTimeout(() => document.getElementById('main').classList.remove("hidden"), 1000);
		}
	}).catch(error => {
        console.error('Failed to load template:', error);
    });
}
