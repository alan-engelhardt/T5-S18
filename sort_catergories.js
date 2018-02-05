"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"


const catLink = "http://kea-alt-del.dk/t5/api/categories";

fetch(catLink).then(result=>result.json()).then(data=>sort(data));

function sort(data){
	data.forEach(cat=>{
		console.log(cat);
		const section = document.createElement("section");
		const h2 = document.createElement("h2");
		section.id = cat;
		h2.textContent = cat;
		section.appendChild(h2);
		main.appendChild(section);
	});
	getPlist(pListLink);
}

const pListLink = "http://kea-alt-del.dk/t5/api/productlist";

function getPlist(link){
	fetch(link).then(result=>result.json()).then(data=>show(data));
}

function show(data){
	data.forEach(elem=>{
		const section = document.querySelector("#"+elem.category);
		const clone = template.cloneNode(true);
		clone.querySelector("img").src=imglink+"small/"+elem.image+"-sm.jpg";
		clone.querySelector("h2").textContent=elem.name;
		clone.querySelector("p").textContent=elem.shortdescription;
		section.appendChild(clone);
	})
}


