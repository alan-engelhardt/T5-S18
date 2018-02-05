"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const h1 = document.querySelector('h1');
const nav = document.querySelector("nav");

const all = document.querySelector("#all");
all.addEventListener('click', () => filterData("all"));

const catlink = "http://kea-alt-del.dk/t5/api/categories";
const plink = "http://kea-alt-del.dk/t5/api/productlist";
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"

fetch(catlink).then(e => e.json()).then(sort);

function sort(data) {
	data.forEach(cat => {
		const section = document.createElement("section");
		const h2 = document.createElement("h2");
		section.id = cat;
		h2.textContent = cat;
		section.appendChild(h2);
		main.appendChild(section);
		const a = document.createElement("a");
		a.href = "#";
		a.textContent = cat;
		a.addEventListener('click', () => filterData(cat));
		nav.appendChild(a);
	});
	getPlist(plink);
}

function getPlist(link) {
	fetch(plink).then(result => result.json()).then(data => show(data));
}

function show(data) {
	data.forEach(elem => {
		const section = document.querySelector("#" + elem.category);
		const clone = template.cloneNode(true);
		clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
		clone.querySelector("h2").textContent = elem.name;
		clone.querySelector("p").textContent = elem.category + ", " + elem.shortdescription;
		section.appendChild(clone);
	});
}

function filterData(myFilter) {
	document.querySelectorAll('main section').forEach(function (sec) {
		sec.classList.remove("hide");
		if (sec.id != myFilter && myFilter != "all") {
			sec.classList.add("hide");
		}
	});
}
