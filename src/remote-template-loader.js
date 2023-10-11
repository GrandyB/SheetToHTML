function loadTemplate(name) {
	console.log(`Loading template: '${name}'`);
	var scriptElement = document.createElement("script");
	scriptElement.src = `https://cdn.jsdelivr.net/gh/GrandyB/SheetToHTML@latest/templates/${name}/script.js`;
	document.head.appendChild(scriptElement);
	scriptElement.onload = function () {
		load();
	};

	addStylesheet(`https://cdn.jsdelivr.net/gh/GrandyB/SheetToHTML@latest/templates/${name}/styles.css`);
}