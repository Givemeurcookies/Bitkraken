var slider;
(function() {
	var slide = 0,
		slideImgs = [
			'img/autumnabyss.jpg',
			'img/dragon.jpg'
		];

	var slideDoc = document.getElementsByClassName("slides")[0].getElementsByTagName("figure")[0];

	function init(){
		for(imgUrl in slideImgs){
			var imgCont = document.createElement("img");
			imgCont.src = slideImgs[imgUrl];
			slideDoc.appendChild(imgCont);

			slideDoc.getElementsByTagName("img")[0].className = "show";
		}
		console.log("Hello!");
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