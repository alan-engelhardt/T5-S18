"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const h1 = document.querySelector('h1');
const all = document.querySelector('#all');
const starters = document.querySelector('#starter');
const mains = document.querySelector('#main');
const desserts = document.querySelector('#desert');
const link = "http://kea-alt-del.dk/t5/api/productlist";
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"
let productlist = [];

all.addEventListener('click', function(){
	h1.textContent="All products";
	show(productlist);
});

starters.addEventListener('click', ()=>filterData("starter"));
mains.addEventListener('click', ()=>filterData("main"));
desserts.addEventListener('click', ()=>filterData("dessert"));

fetch(link).then(result=>result.json()).then(data=>save(data));

function save(data){
	productlist = data;
	show(data);
}

function show(data){
	data.forEach(elem=>{
		const clone = template.cloneNode(true);
		clone.querySelector("img").src="http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
		clone.querySelector("h2").textContent=elem.name;
		clone.querySelector("p").textContent=elem.category + ", " + elem.shortdescription;
		main.appendChild(clone);
	});
}

function filterData(myFilter){
	h1.textContent=myFilter;
	main.textContent="";
	let filterList = productlist.filter(product=>product.category == myFilter);
	show(filterList);
}
