"use strict"
const template = document.querySelector('template').content;
const main = document.querySelector('main');
const link = "http://kea-alt-del.dk/t5/api/productlist";
const imglink = "http://kea-alt-del.dk/t5/site/imgs/"

fetch(link).then(result=>result.json()).then(data=>show(data));

function show(data){
	data.forEach(elem=>{
    console.log(elem)
		const clone = template.cloneNode(true);
		clone.querySelector("img").src="http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
		clone.querySelector("h2").textContent=elem.name;
		clone.querySelector("p").textContent=elem.shortdescription;
    clone.querySelector(".price span").textContent=elem.price;
    if(elem.discount){
      const newPrice = Math.ceil(elem.price - elem.price * elem.discount / 100);
      clone.querySelector(".discountprice span").textContent=newPrice;
      clone.querySelector(".discountprice.hide").classList.remove("hide")
      clone.querySelector(".price").classList.add("strike");
    }
    if(elem.alcohol){//elem.alcohol could be 0;
      console.log("alcohol")
      const newImage = document.createElement("img");
      newImage.setAttribute("src", "gfx/alc.png");
      newImage.setAttribute("alt", "Contains alcohol " + elem.alcohol + "%");
      newImage.setAttribute("title", "Contains alcohol " + elem.alcohol + "%");
      clone.querySelector(".icons").appendChild(newImage);
    }
		main.appendChild(clone);
	})
}















