var bannerboy = bannerboy || {};

/* Sprite class
================================================= */
// new_options required options:
// 	total_frames: # of frames (1 indexed, not 0 indexed).
//	backgroundSize: sprite width x sprite height = the full size of the sprite.
//	width / height: width / height of a single sprite frame.
//	backgroundImage: name of the sprite image asset.

// new_options optional options:
// offset: pixel offset if needed. defaults to 0.
// animation time: defaults to 24 frames / second depending on the frame #.
// callback: set the callback to be run at the end of the sprite animation timeline.


// Example usage:
// var sprite_container = bannerboy.createElement({id: "sprite-container", top: 174, left: 0, centerX: true, parent: banner});
	// var sprite = new Sprite({id: "sprite", total_frames: 30, backgroundSize: sprite_width + "px " + sprite_height + "px", width: sprite_frame_width, height: sprite_frame_height, left: 0, top: 0, backgroundImage: "bottle_spritesheet_half_res.png", retina: true, parent: sprite_container});
var Sprite = bannerboy.Sprite = function(_options) {
	this.options = bannerboy.combineObjects({id: "sprite", left: 0, top: 0, overflow: "hidden", frame: 1, centerX: true, offset: 0, transformOrigin: "center bottom"}, _options);
	this.body = bannerboy.createElement(this.options);
	this.body.set({css: {backgroundPosition: this.options.offset + "px 0"}});
	this.total_frames = this.options.total_frames;
	this.current_frame = {frame: 0};

	this.counter_tl;
}

Sprite.prototype.roundedFrame  = function() {
	return Math.round(this.current_frame.frame);
};

// Example timeline:
	// .to(bottle_first_frame, 0.3, {opacity: 0, ease: Power1.easeInOut})
	// .to(this.current_frame, 1, {frame: 29, ease: Power2.easeInOut})
	// .chain()
	// .to(bottle_last_frame, 0.1, {opacity: 1, ease: Power1.easeInOut})
	// .chain(-0.03)
	// .to(sprite.body, .1, {opacity: 0})
	// .timeScale(time_scale);
// Override this method to build a custom timeline. animating this.current_frame.frame is what changes the frames.
Sprite.prototype.createTimeline = function(_time, _callback) {
	var time = _time || (1 / 24) * this.options.total_frames;
	var callback = _callback || this.stopCounter.bind(this);

	return new BBTimeline({onComplete: callback})
	.to(this.current_frame, time, {frame: this.options.total_frames - 1, ease: Power2.easeInOut})
};

Sprite.prototype.prevFrame = function() {
	if (this.roundedFrame() <= 1) {
		this.body.set({frame: this.total_frames});
	} else {
		this.body.set({frame: this.roundedFrame() - 1});
	}
}

Sprite.prototype.nextFrame = function() {
	if (this.roundedFrame() >= this.total_frames) {
		this.body.set({frame: 1});
	} else {
		this.body.set({frame: this.roundedFrame() + 1});
	}
}

Sprite.prototype.getFramePosition = function() {
	return (this.roundedFrame()) * -(parseInt(this.body.get("width"))) + this.options.offset 
}

Sprite.prototype.startCounter = function(new_time) {
	var time = new_time || 4;

	this.counter_tl = this.createTimeline(this.options.animationTime, this.options.callback).play();
	TweenMax.ticker.addEventListener("tick", this.counterUpdate, this);
}

Sprite.prototype.stopCounter = function() {
	TweenMax.ticker.removeEventListener("tick", this.counterUpdate, this);
}

Sprite.prototype.resetCounter = function() {
	this.body.set({css: {backgroundPosition: 0 + "px 0"}}); 
}

Sprite.prototype.counterUpdate = function() {
	this.body.set({css: {backgroundPosition: this.getFramePosition() + "px 0"}}); 
}	