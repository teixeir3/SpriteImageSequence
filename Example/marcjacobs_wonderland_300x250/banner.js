var bannerboy = bannerboy || {};
bannerboy.main = function() {

	var width = 300;
	var height = 250;
	var banner = bannerboy.createElement({id: "banner", width: width, height: height, backgroundColor: "#fff", overflow: "hidden", cursor: "pointer", parent: document.body});

	var main_tl;

	var sprite_width = 3900;
	var sprite_height = 250;
	var sprite_offset = 0;
	var sprite_frame_width = 300;
	var sprite_frame_height = 250;

	var images = [

	"intro_spritesheet.jpg", 
	"title_spritesheet.png", 

	];



	bannerboy.preloadImages(images, function() {

		/* Create elements
		================================================= */

		var sprite_container_1 = bannerboy.createElement({id: "sprite-container", top: 0, left: 0, centerX: true, parent: banner});
	 		var sprite_1 = new Sprite({animationTime: 0.5, id: "sprite", total_frames: 13, backgroundSize: sprite_width + "px " + sprite_height + "px", width: sprite_frame_width, height: sprite_frame_height, left: 0, top: 0, backgroundImage: "intro_spritesheet.jpg", retina: true, parent: sprite_container_1});

	 	var sprite_container_2 = bannerboy.createElement({id: "sprite-container", top: 0, left: 0, centerX: true, parent: banner});
	 		var sprite_2 = new Sprite({animationTime: 0.5, id: "sprite", total_frames: 13, backgroundSize: sprite_width + "px " + sprite_height + "px", width: sprite_frame_width, height: sprite_frame_height, left: 0, top: 0, backgroundImage: "title_spritesheet.png", retina: true, parent: sprite_container_2});

		/* Initiate
		================================================= */
		animations();
		timeline();
		interaction();

		/* Animations
		================================================= */

		function timeline() {
			// create main_tl here

			
		}

		function animations() {
			// add animations that will go into main_tl here


			sprite_1.tl_in = new BBTimeline()
		        .call(function() {
		            sprite_1.startCounter();
	       		 })

		    
		   	sprite_2.tl_in = new BBTimeline()
		           .call(function() {
		 	          sprite_2.startCounter();
		        })
		}

		/* Interactions
		================================================= */
		function interaction() {
			// click logic goes here
			banner.onclick = function() {

			};
		}

		/* Helpers
		================================================= */

		/* Scrubber
		================================================= */
		function scrubber(tl) {
			if (window.location.origin == "file://") {
				bannerboy.include(["../bannerboy_scrubber.min.js"], function() {
					if (bannerboy.scrubberController) bannerboy.scrubberController.create({"main timeline": tl});
				});
			}
		}
	});
};