function loadTemplate(name) {
	console.log(`Loading template: '${name}'`);
	var scriptElement = document.createElement("script");
	scriptElement.src = `../templates/${name}/script.js`;
	document.head.appendChild(scriptElement);
	scriptElement.onload = function () {
		load();
	};

	addStylesheet(`../templates/${name}/styles.css`);
}