"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const nav = document.querySelector('nav');

const all = document.querySelector('nav a');
all.addEventListener("click", ()=>filter("all"));

const imglink = "http://kea-alt-del.dk/t5/site/imgs/"

const catLink = "http://kea-alt-del.dk/t5/api/categories";
const pListLink = "http://kea-alt-del.dk/t5/api/productlist";

fetch(catLink).then(result=>result.json()).then(data=>createCats(data));

function createCats(categories){
	categories.forEach(category=>{
		const section = document.createElement("section");
		const h2 = document.createElement("h2");
		section.id = category;
		h2.textContent = category;
		section.appendChild(h2);
		main.appendChild(section);
		const a = document.createElement("a");
		a.textContent = category;
		a.href = "#";
		a.addEventListener("click", ()=>filter(category));
		nav.appendChild(a);
	});
	fetch(pListLink).then(result=>result.json()).then(data=>show(data));
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

function filter(category){
	document.querySelectorAll("main section").forEach(section=>{
		if(section.id == category || category == "all"){
			section.classList.remove('hide');
		}else{
			section.classList.add('hide');
		}
	})
}
