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