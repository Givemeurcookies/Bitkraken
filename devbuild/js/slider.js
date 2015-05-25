var slider;
(function() {
	var slide = 0,
		slideImgs = [
			'img/art.jpg',
			'img/autumnabyss.jpg',
			'img/dragon.jpg'
		];

	var slideDoc = document.getElementsByClassName("slides")[0];

	function init(){
		var imgCont = document.createElement("img");
		imgCont.src = slideImgs[0];
		slideDoc.appendChild(imgCont);

		slideDoc.getElementsByTagName("img")[0].className = "show";	
	}

	function nextSlide(){
		slide += 1;
		if (slide >= slideImgs.length){
			slide = 0;
		}
		setSlide();
	}
	function prevSlide(){
		slide -= 1;
		if (slide <= 0){
			slide = slides.length -	1;
		}
		setSlide();
	}

	function setSlide(){
		slideDoc.src = slideImgs[slide];
	}

	slider = {
		init : init,
		next : nextSlide,
		prev : prevSlide,
		set  : setSlide
	};

})();
slider.init();