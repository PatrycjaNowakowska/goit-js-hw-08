// import Player from '@vimeo/player';
import _throttle from '../../node_modules/lodash.throttle';

let iframe = document.querySelector('iframe');
let player = new Vimeo.Player(iframe);

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});


let saveTime = function(data) {
    //console.log(data);
    localStorage.setItem("videoplayer-current-time", data.seconds);
}
const throttleCallback = throttle(saveTime, 1000);

player.on('timeupdate', throttleCallback);

const savedTime = localStorage.getItem("videoplayer-current-time");

player.setCurrentTime(savedTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});


