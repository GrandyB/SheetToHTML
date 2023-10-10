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
function loadTemplate(name) {
	console.log(`Loading template: '${name}'`);
	var scriptElement = document.createElement("script");
	scriptElement.src = `./${name}/script.js`;
	document.head.appendChild(scriptElement);
	scriptElement.onload = function () {
		load();
	};

	addStylesheet(`./${name}/styles.css`);
}

const tabName = getAndCheckURLParam("tab");
const spreadsheetId = getAndCheckURLParam("id");
const imgCell = getAndCheckURLParam("imgCell");
const template = getAndCheckURLParam("template");

const autoUpdate = hasURLParam("update");
const font = getURLParam("font");
const color = getURLParam("color");

if (font) {
	console.log(`Adding font: '{font}'`);
	addStylesheet(`https://fonts.googleapis.com/css?family=${font}`);
	var styleTag = document.getElementById("customStyles");
	var colorCss = color ? `color: #${color};` : "";
	var cssRule = `* { font-family: '${decodeURIComponent(font)}'; ${colorCss}}`;
	styleTag.appendChild(document.createTextNode(cssRule));
}

if (tabName && spreadsheetId && imgCell && template) {
	document.getElementById("bg").id = imgCell;
	loadTemplate(template);

	var sheets = new GoogleSheetToJS(
		Config.getApiKey(),
		spreadsheetId,
		tabName,
		5000
	);
	if (autoUpdate) {
		console.log(
			'Automatic data updating enabled (remove "update" from URL to turn off)'
		);
		sheets.updateLoop();
	} else {
		console.log('Data will not auto-update (add "update" to URL to turn on)');
		sheets.update();
	}
}
