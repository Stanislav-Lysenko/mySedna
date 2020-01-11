class Animate{
	constructor({elem, animateClass, startDistance = 500}){
		this.elem = elem;
		this.animateClass = animateClass;
		this.startDistance = startDistance;
		return this;
	}

	init(){
		this.bindAll();
		this.addEvents();
	}

	bindAll(){
		this.handler = this.handler.bind(this);
	}

	addEvents(){
		window.addEventListener('scroll', this.handler, false );
	}

	handler(e){
		if (this.isAnimated) return false;
		if (this.isApproachingToElement()){
			this.addAnimateClass();
		} else {
			return false;
		}
	}

	hasAnimateClass(){
		return this.elem.classList.contains(this.animateClass);
	}

	// is Element in zone for adiing animatedClass
	isApproachingToElement(){
		if ((this.elem.getBoundingClientRect().top - document.documentElement.clientHeight) < this.startDistance) {
			return true;
		}
		return false;
	}

	addAnimateClass(){
		this.elem.classList.add(this.animateClass);
	}
}

let devices = new Animate({
	elem: document.getElementsByClassName('devices')[0],
	animateClass: 'devices_animated',
	startDistance: 500
});

devices.init();
