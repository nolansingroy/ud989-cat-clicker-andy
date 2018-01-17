/**
var cats = $(".cat");
var buttons = $("button");

function hideAllCats(){
	for (var i=0; i<cats.length; i++){
		$(cats[i]).hide();
	}
}

function bindButtonToCat(idNumber){
	$("#button"+idNumber).click(function(){
		hideAllCats();
		$("#cat"+idNumber).show();
	})
}

function bindCounterToCat(idNumber){
	var cat = "#cat"+idNumber
	$(cat).click(function(){
		var count = $(cat+" > .counter").text();
		count = parseInt(count) + 1;
		$(cat+" > .counter").text(count);
	})
}

for (var i=1; i<=buttons.length; i++){
	bindButtonToCat(i);
}

for (var i=1; i<=cats.length; i++){
	bindCounterToCat(i);
}

hideAllCats();
$("#cat1").show();*/

/*===== Model ======*/
// Any code for the back end server || database
// within model we set currentCat to null then declare our cats within an array with a click count variable set to 0
 var model = {
	 currentCat:null,
	 cats:[
		 {
			 clickCount:0,
			 name : 'large cat',
			 imgSrc : 'img/cat_picture1.jpg',
		 },
		 {
			 clickCount: 0,
			 name : 'small cat',
			 imgSrc : 'img/cat_picture2.jpg'
		 },
		 {
			 clickCount: 0,
			 name: 'medium cat',
			 imgSrc: 'img/cat_picture3.jpg'
		 }
	 ]
 };


/* == octopus == */
// functionality code that connects model to views
var octopus = {
 // must always have an init function
	init: function() {
		//setting current cat to the first cat in array
		model.currentCat = model.cats[0];

		//tell our views to initialize
		catListView.init();
		catView.init();
	},
	{
		getCurrentCat: function() {
			return model.currentCat;
		}
	},
	{
		getCats: function() {
			return model.cats;
		}
	},
	//set the currently selsected cat to the object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},
	//increments the counter for the currently selected cat
	incrementCounter: function() {
		model.currentCat.clickCount++;
		catView.render()
	}

}


/* ==== View ===== */
// this is the front end code ..user interface
var catView = {
	init: function() {
		//store pointers to our DOM elements for easy access later
		// here we are using the id's declared in index.html
		this.catElem = document.getElementById('cat');
	  this.catNameElem = document.getElementById('cat_name');
		this.catImageElem = document.getElementById('cat_img');
		this.countElem = document.getElementById('cat_count');

	  //event listener for the onclick, to increment the cat's count variable
		this.catImageElem.addEventListener('click', function(){
			octopus.incrementCounter();
		});

		//render this view(update the DOM elemens with the right values)
	  this.render();

	},

	render:function () {
 //update the DOM ELements with values from the current Cat
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.imgSrc;
	}
};

var catListView = {

	init: function () {
		//store the DOm Elemet for easy access later
		this.catListElem = document.getElementById('cat_list');

		//render this view (update the DOM elements with the right values)
		this.render();

	},
	render: function() {
		var cat, elem, i;
		//get the cats we will be rendering fromt he octopus
		var cats = octopus.getCats();

		//empty the cat list
		this.catListElem.innerHTML = '';

		//loop over the cats
		for (i = 0; i < cats.length; i++) {
			//this is the cat we are currently looping over
			cat = cats[i];

			//make a new cat list item and set its textt
			elem = document.createElement('li');
			elem.textContent = cat.name;

			//onclick, setCurrentCat and render the catView
			// (this uses our closure-in-loop trick to connect the value
			// of the cat variable to the click event function)
			elem.addEventListener('click', (function(catCopy) {
				return function() {
					octopus.setCurrentCat(catCopy);
					catView.render();
				}
			})(cat));

			//add the element to the list
			this.catListElem.appendChild(elem);
		}
	}
};

//make it go
octopus.init();
