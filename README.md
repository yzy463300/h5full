# Usage
manually download and link anime.min.js in your HTML:
<script src="H5.js"></script>
Then start animating:
var H5 = new H5(elements,{
  audio:'http://img.cntapp.com/h5/wangchuang/assets/bgm.mp3',
	img:'http://img.cntapp.com/h5/dragon/assets/music.png',
	useArrow: true,
	loop:true
})


Usage

$ npm install animejs
# OR
$ bower install animejs
import anime from 'animejs'
Or manually download and link anime.min.js in your HTML:

<script src="anime.min.js"></script>
Then start animating:

anime({
  targets: 'div',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 }
  ],
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 2000,
  loop: true
});
