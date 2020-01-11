'use strict';

/**
* animation scroll anchor likns
* @param {object} options
* @param {thmlElement} options.container - html element, often root
* @param {number} options.duration - the animation's duration
* @param {number} options.margin - the distance to goalElement
*/

class AnchorLinks {
	constructor({container = document, duration = 1600, margin = 110} = {}){
		this.container = container;
		this.duration = duration;
		this.margin = margin;
		this.regexp = /^#.+/;
		this.flag = false;

		return this;
	}

	init(){
		this.bindAll();
		this.addEvents();
	}

	addEvents(){
		this.container.addEventListener('click', this.containerHandler, false);
	}

	bindAll(){
		this.containerHandler = this.containerHandler.bind(this);
		this.scrollingTo = this.scrollingTo.bind(this);
	}

	//check a-link so it has got href attribute and it is expected to be #nameId
	checkLink(link){
		if (link.getAttribute('href')) {
			if (link.getAttribute('href').search(this.regexp) == 0) {
				return this.checkGoalElement(link);
			}
		} return false;
	}


	//check goal element existence
	checkGoalElement(link){
		if(this.getGoalElement(link)) {
			return true;
		}
		throw new Error(`Element with this ID doesn't exist`);
		return false;
	}

	getGoalElement(link){
		let goalElement = document.getElementById(link.hash.slice(1));
		return goalElement;
	}

	containerHandler(e){
		let target = e.target;
		while(target != this.container){
			if (target.tagName == 'A'){
				if(this.checkLink(target)){
					this.handler(e, target);
					return;
				}
			}
			target = target.parentNode;
		}
	}

	handler(e, link){
		e.preventDefault();
		this.scrollingTo(this.getCoordTop(this.getGoalElement(link)));
	}

	getCoordTop(elem){
		let box = elem.getBoundingClientRect();
		return box.top + window.pageYOffset - this.margin;
	}

	scrollingTo(pageY){
		if (this.flag) {
			clearInterval(this.timerId);
		}
		this.flag = true;
		let startScrollTop = window.pageYOffset;
		let wayLength = pageY - startScrollTop;
		let startTime = new Date;
		this.timerId = setInterval(()=>{
			let progress = (new Date - startTime)/this.duration;
			if (progress > 1) {
				progress = 1;
			}
			let currentScroll = startScrollTop + wayLength * progress;
			window.scrollTo(0, currentScroll);
			if (progress == 1) {
				clearInterval(this.timerId);
				this.flag = false;
			}
		}, 10);
	}
}

let anchor = new AnchorLinks();
anchor.init();

