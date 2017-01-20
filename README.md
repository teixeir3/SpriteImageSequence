# SpriteImageSequence

A class that provides functionality for a JavaScript image sequence using Sprites.

# Sprite class

new_options required options:

total_frames: # of frames (1 indexed, not 0 indexed).
backgroundSize: sprite width x sprite height = the full size of the sprite.
width / height: width / height of a single sprite frame.
backgroundImage: name of the sprite image asset.

new_options optional options:
offset: pixel offset if needed. defaults to 0.

Example usage:
var sprite_container = bannerboy.createElement({id: "sprite-container", top: 174, left: 0, centerX: true, parent: banner});

var sprite = new Sprite({id: "sprite", total_frames: 30, backgroundSize: sprite_width + "px " + sprite_height + "px", width: sprite_frame_width, height: sprite_frame_height, left: 0, top: 0, backgroundImage: "bottle_spritesheet_half_res.png", retina: true, parent: sprite_container});
