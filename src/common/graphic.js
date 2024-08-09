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

if (tabName && spreadsheetId && template) {
	document.getElementById("bg").id = imgCell ? imgCell : "";

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
		createCountdowns();

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
			setTimeout(() => document.getElementById('main').classList.remove("hidden"), 1200);
		}

		startCountdownListeners();
	}).catch(error => {
        console.error('Failed to load template:', error);
    });
}

function createCountdowns() {
	// Gather up all timer attributes
	const timerElements = document.querySelectorAll("[timer-id]");
	console.info(`Found ${timerElements.length} timers`);

	// Loop through each element that has the 'timer' attribute
	timerElements.forEach(element => {
		// Get the cell reference from the 'timer' attribute
		const cellReference = element.getAttribute('timer-id');

		// Create a new span element with the required attributes
		const newSpan = document.createElement('span');
		newSpan.id = cellReference;
		newSpan.className = 'timer';
		newSpan.style.display = 'none';
		newSpan.setAttribute("timer-src", cellReference);

		// Append the new span to the innerHTML of the body or a specific container
		document.body.innerHTML += newSpan.outerHTML;
	});
}

function startCountdownListeners() {
	setInterval(() => {
		const outputElements = document.querySelectorAll("[timer-id]"); // provided by user
		const inputElements = document.querySelectorAll("[timer-src]"); // added via script above in response

		const elementMap = new Map();
		inputElements.forEach(element => {
			elementMap.set(element.getAttribute('timer-src'), element);
		});

		outputElements.forEach(outputElement => {
			const inputElement = elementMap.get(outputElement.getAttribute('timer-id'));
			const timestamp = parseInt(inputElement.innerHTML);
			console.info(`Timestamp: ${timestamp}`);
			// Check if innerHTML is not empty and is a valid Unix timestamp
			if (inputElement.innerHTML.trim() !== "" && !isNaN(timestamp) && timestamp > 0) {
				const now = Math.floor(Date.now() / 1000); // Current Unix timestamp
				const timeDifference = timestamp - now;
				if (timeDifference <= 0) {
					outputElement.innerHTML = "00:00";
				} else {
					const minutes = Math.floor(timeDifference / 60);
					const seconds = timeDifference % 60;
					outputElement.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
				}
			} else {
				outputElement.innerHTML = "";
			}
		});
	}, 1000); // Update every second
}