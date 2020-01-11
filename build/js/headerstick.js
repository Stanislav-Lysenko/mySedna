'use strict';

class HeaderStick{
	constructor({header, baseCssClass, newCssClass}){
		this.header = header;
		this.baseCssClass = baseCssClass;
		this.newCssClass =  newCssClass;
		return this;
	}

	init(){
		this.bindAll();
		this.addEvents();
		this.handler();
	}

	addEvents(){
		window.addEventListener('scroll', this.handler, false);
	}

	bindAll(){
		this.handler = this.handler.bind(this);
	}

	calcHeight(){
		return this.header.offsetHeight;
	}

	handler(e){
		if ((this.getCoordBottom() - 0.5*this.calcHeight())  < window.pageYOffset){
			this.header.classList.add(this.newCssClass);
		} else {
			this.header.classList.remove(this.newCssClass);
		}
	}

	getCoordBottom(){
		return this.header.getBoundingClientRect().bottom;
	}
}

let header = new HeaderStick({
	header: document.getElementsByClassName('header')[0],
	baseCssClass: 'header',
	newCssClass: 'header_sticked',
})

header.init();