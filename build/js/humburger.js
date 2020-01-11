'use strict';

/*
*
*/
class Humburger{
	constructor({humburger, humActiveClass, nav, navOpenClass}){
		this.humburger = humburger;
		this.humActiveClass = humActiveClass;
		this.nav = nav;
		this.navOpenClass = navOpenClass;
		return this;
	}

	init(){
		this.bindAll();
		this.findNavItems();
		this.addEvents();
	}

	addEvents(){
		this.humburger.addEventListener('click', this.handler, false);
		Array.prototype.forEach.call( this.findNavItems(), item => item.addEventListener('click', this.handler, false))
	}

	bindAll(){
		this.handler = this.handler.bind(this);
	}

	handler(e){
		this.humburger.classList.toggle(this.humActiveClass);
		this.nav.classList.toggle(this.navOpenClass)
	}

	findNavItems(){
		return  this.nav.getElementsByTagName('A');
	}
}

let humburger = new Humburger({
	humburger: document.getElementsByClassName('humburger__toggle')[0],
	humActiveClass: 'is-active',
	nav: document.getElementsByClassName('nav')[0],
	navOpenClass: 'open',
})
humburger.init();