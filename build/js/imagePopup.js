/**
* create Popup for images wrapped in link
* @param { string } className of the links
*/

class ImagePopup{
	constructor(linkClassName){
		this.linkClassName = linkClassName;
	}

	init(){
		this.bindAll();
		this.getImages();
		this.addEvents();
	}

	bindAll(){
		this.handler = this.handler.bind(this);
		this.destroyPopup = this.destroyPopup.bind(this);
	}

	getImages(){
		this.images = document.getElementsByClassName( this.linkClassName);
	}

	addEvents(){
		Array.prototype.forEach.call( this.images, link => link.addEventListener('click', this.handler, false));
	}

	handler(e){
		e.preventDefault();
		this.createPopup(e.currentTarget);
	}
	//<img id='popup__current-img' src='${target.href}' class='popup__img'>
	createPopup(target){
		let adjecentHtmlElement = `
		<div class='popup__container'>
		<div class='popup__content'>
		<button class='popup__btn-close'></button>
		</div>
		</div>
		`;
		document.body.insertAdjacentHTML('afterbegin', adjecentHtmlElement);
		document.getElementsByClassName('popup__content')[0].prepend(this.preloadImage(target));
		this.calcSize();
		this.addPopupEvents();
		this.disabbleScroll();
	}

	preloadImage(target){
		let img = document.createElement('IMG');
		img.src = target.href;
		img.className = 'popup__img';
		return img;
	}

	calcSize(){
		let popupContent = document.getElementsByClassName('popup__content')[0];
		let popupImg = document.getElementsByClassName('popup__img')[0];
		popupContent.style.width = popupImg.offsetWidth + 'px';
		popupContent.style.height = popupImg.offsetHeight + 'px';
	}

	destroyPopup(){
		document.getElementsByClassName('popup__container')[0].remove();
		this.enableScroll();
	}

	disabbleScroll(){
		document.body.style.overflow = 'hidden';
	}

	enableScroll() {
		document.body.style.overflow = '';
	}

	addPopupEvents(){
		document.getElementsByClassName('popup__img')[0].onclick = e => e.stopPropagation();
		document.getElementsByClassName('popup__container')[0].onclick = this.destroyPopup;
	}

}

let popupsImg = new ImagePopup('news__img-link');
popupsImg.init();