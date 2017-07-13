/*
	MAIN.JS
	Author: Cindy Trieu
	Copyright 2017
*/

function modify(el, mod){
	var counter = el.parentNode.getElementsByClassName("counterVal")[0];
	var val = Number.parseInt(counter.innerText);
	val = val + mod;
	counter.innerHTML = val;
}

function setVal(el) {
	var val = Number.parseInt(prompt("Enter a new value", "0"));
	if(val == null || isNaN(val) ) {
		val = el.innerHTML;
	}
	el.innerHTML = val;
}

function changeName(el) {
	var name = prompt("Enter new name", "name");
	if(name.length == 0) {
		name = el.innerHTML;
	}
	el.innerHTML = name;
}

function createCounter(container, el) {
	var clone = container.firstElementChild.cloneNode(true);
	container.insertBefore(clone, el);
}