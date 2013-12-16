MM.Command.Help = Object.create(MM.Command, {
	label: {value: "Show/hide help"},
	keys: {value: [{charCode: "?".charCodeAt(0)}]}
});

MM.Command.Help.init = function() {
	this._node = document.createElement("div"),
	this._node.id = "help";
	document.body.appendChild(this._node);
	
	this._map = {
		13: "Enter",
		32: "Spacebar",
		36: "Home",
		37: "←",
		38: "↑",
		39: "→",
		40: "↓",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10"
	};
}

MM.Command.Help.execute = function() {
	if (!this._node.firstChild) { this._build(); }
	this._node.classList.toggle("visible");
}

MM.Command.Help._build = function() {
	var table = document.createElement("table");

	MM.Command.ALL.forEach(function(name) {
		var c = MM.Command[name];
		if (!c.label) { return; }
		this._buildRow(c, table);
	}, this);

	this._node.appendChild(table);
}

MM.Command.Help._buildRow = function(command, table) {
	var row = table.insertRow(-1);

	var keys = command.keys.map(this._formatKey, this);
	row.insertCell().innerHTML = command.label;
	row.insertCell().innerHTML = keys.join("/");
}

MM.Command.Help._formatKey = function(key) {
	var str = "";
	if (key.ctrlKey) { str += "Ctrl+"; }
	if (key.altKey) { str += "Alt+"; }
	if (key.charCode) { str += String.fromCharCode(key.charCode).toUpperCase(); }
	if (key.keyCode) { str += this._map[key.keyCode] || key.keyCode; }
	return str;
}
