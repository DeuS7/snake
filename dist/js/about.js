var aboutGameInfo = document.getElementById("aboutGameInfo");
var buttons = document.getElementsByClassName("showInfoButton");
var cls = document.getElementById("showInfoCloseButton");

for (var but of buttons) {
	but.onclick = function(e) {
		aboutGameInfo.classList.add("active");
		aboutGameInfo.querySelector("#aboutGameInfoTextContent").innerHTML = aboutInfo[this.dataset.info];
	}
}

cls.onclick = function(e) {
	aboutGameInfo.classList.remove("active");
}


