function addLoadEvent(func) {
	var oldload = window.onload;
	if (typeof window.onload != "function") {
		window.onload = func();
	} else {
		window.onload = function () {
			oldload();
			func();
		}
	}
}

function insertAfter(newElement,targetElemnet) {
	var parent = targetElemnet.parentNode;
	if (targetElemnet == parent.lastChild) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElemnet.nextSibling);
	}
}

function preparePlaceholder() {
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.jpg");
	placeholder.setAttribute("alt","myPic");
	var description = document.createElement("p");
	var txt = document.createTextNode("choose an image");
	description.setAttribute("id","description");
	description.appendChild(txt);
	var gallery = document.getElementById("imageGallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}

function prepareGallery() {
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imageGallery")) return false;
	var gallery = document.getElementById("imageGallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return showPic(this)?false:true;
		}
	}
}

function showPic(whichpic) {
	if (!document.getElementById("placeholder")) return false;
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	if (placeholder.nodeName != "IMG") return false;
	placeholder.setAttribute("src",source);
	if (document.getElementById("description")) {
		var text = whichpic.getAttribute("title")?whichpic.getAttribute("title"):"";
		var description = document.getElementById("description");
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text;
			// alert(description.childNodes[0].nodeValue);
		}
	}
	return true;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);