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

const tabName = getAndCheckURLParam("tab");
const spreadsheetId = getAndCheckURLParam("id");
const imgCell = getAndCheckURLParam("imgCell");
const template = getAndCheckURLParam("template");

const autoUpdate = hasURLParam("update");
const font = getURLParam("font");
const color = getURLParam("color");

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
