"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
let catergorySections = [];
const h1 = document.querySelector('h1');
const nav = document.querySelector("nav");
const all = document.querySelector("#all");
all.addEventListener('click', ()=>filterData("all"));

const catlink = "http://kea-alt-del.dk/t5/api/categories";
const plink = "http://kea-alt-del.dk/t5/api/productlist";
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"

fetch(catlink).then(e=>e.json()).then(buildFilters);

function buildFilters(data){
	//data.unshift("all");
	data.forEach(cat=>{
		const section = document.createElement("section");
		section.id=cat;
		section.setAttribute("class", "category");
		const h2 = document.createElement("h2");
		h2.textContent=cat;
		const a = document.createElement("a");
		a.href="#";
		a.textContent = cat;
		a.addEventListener('click', ()=>filterData(cat));
		nav.appendChild(a);
		section.appendChild(h2);
		main.append(section);
		catergorySections.push(section);
	});
	getPlist(plink);
}

function getPlist(link){
	fetch(plink).then(result=>result.json()).then(data=>show(data));
}

function show(data){
	data.forEach(elem=>{
		const section = document.querySelector("#"+elem.category);
		const clone = template.cloneNode(true);
		clone.querySelector("img").src="http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
		clone.querySelector("h2").textContent=elem.name;
		clone.querySelector("p").textContent=elem.category + ", " + elem.shortdescription;
		section.appendChild(clone);
	});
}

function filterData(myFilter){
	catergorySections.forEach(function(sec){
		sec.classList.remove("hide");
		if(sec.id != myFilter && myFilter != "all"){
			sec.classList.add("hide");
		}
	});
}
