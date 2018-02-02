"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const h1 = document.querySelector('h1');

const link = "http://kea-alt-del.dk/t5/api/productlist";
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"
let productlist = [];

fetch(link).then(result=>result.json()).then(data=>save(data));
fetch("http://kea-alt-del.dk/t5/api/categories").then(e=>e.json()).then(buildFilters);

function buildFilters(data){
    data.unshift("all");
    data.forEach(cat=>{
        const a = document.createElement("a");
        a.dataset.filter = cat;
        a.href="#";
        a.textContent = cat[0].toUpperCase() + cat.substring(1)
        document.querySelector("nav").appendChild(a);
    });
    let filterLinks = document.querySelectorAll("nav a");
    filterLinks.forEach(link=>{
        link.addEventListener('click', ()=>filterData(link));
    });
}
function save(data){
	productlist = data;
	show(data);
}

function show(data){
	data.forEach(elem=>{
        console.log(elem.category)
		const clone = template.cloneNode(true);
		clone.querySelector("img").src="http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
		clone.querySelector("h2").textContent=elem.name;
		clone.querySelector("p").textContent=elem.category + ", " + elem.shortdescription;
		main.appendChild(clone);
	});
}

function filterData(myFilter){
	h1.textContent=myFilter.textContent;
    main.textContent="";
    let filterList=productlist;
    if(myFilter.dataset.filter!="all"){
        filterList = productlist.filter(product=>product.category == myFilter.dataset.filter);
    }
	show(filterList);
}