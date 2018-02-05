"use strict"
const body = document.querySelector("body");
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
console.log(svg);

function makeBubbles(){
	svg.innerHTML = "";
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	console.log((Math.floor(vw*vh/10000)));
	const area = Math.floor(vw*vh/10000);
	for(let i=0; i<5*area; i++){
		let randX = Math.floor(Math.random()*vw);
		let randY = Math.floor(Math.random()*vh);
		let randR = Math.floor(Math.random()*30+10);
		const bubble = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		bubble.setAttribute('cx', randX);
		bubble.setAttribute('cy', randY);
		bubble.setAttribute('r', randR);
		bubble.setAttribute('fill', "red");
		bubble.addEventListener('mouseover', fill);
		svg.appendChild(bubble);
	}
	body.appendChild(svg);
}

function fill(){
	let randNumber = Math.floor(Math.random()*256);
	this.setAttribute('style', 'fill: hsl('+randNumber+', 30%, 50%)');
}

makeBubbles();
window.addEventListener("resize", makeBubbles);
