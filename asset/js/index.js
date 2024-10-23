// window.onscroll = function () { scrollFunction() };

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         document.getElementById("nav").style.top = "0";
//     } else {
//         document.getElementById("nav").style.top = "-60px";
//     }
// }


const retroCd = document.querySelector('.retro_cd');
const retroPin = document.querySelector('.retro_pin');
const audio = document.getElementById('audio');
let isPlaying = false;
let rotationInterval; // Variable to hold the rotation interval

retroCd.addEventListener('click', () => {
    if (!isPlaying) {
        // Move CD to the right by 20px
        retroCd.style.transform = 'translateX(20px)';

        // Reset audio to start and play at 50% volume
        audio.currentTime = 0; // Start from 00:00
        audio.volume = 0.3;
        audio.play();
        isPlaying = true;

        // Start rotating the CD
        let angle = 0; // Initial angle
        rotationInterval = setInterval(() => {
            angle += 1; // Increase angle

            if (window.innerWidth <= 375) {
                retroCd.style.transform = `translateX(105px) rotate(${angle}deg)`;
            } if (window.innerWidth <= 550) {
                retroCd.style.transform = `translateX(130px) rotate(${angle}deg)`;
            } else {
                retroCd.style.transform = `translateX(210px) rotate(${angle}deg)`; // Rotate while maintaining the translation
            }
        }, 16); // Approximately 60 frames per second

        // Tilt retro_pin after 1 second
        setTimeout(() => {
            if (isPlaying) {
                if (window.innerWidth <= 375) {
                    retroPin.style.transform = 'translateX(-10px) rotate(12deg)'; // สำหรับหน้าจอที่กว้างไม่เกิน 375px
                } if (window.innerWidth <= 550) {
                    retroPin.style.transform = 'translateX(-10px) rotate(12deg)'; // สำหรับหน้าจอที่กว้างไม่เกิน 550px
                } else {
                    retroPin.style.transform = 'translateX(-20px)rotate(12deg)'; // Tilt retro_pin by 10 degrees
                }
            }
        }, 350); // Delay for 1 second before tilting retro_pin
    } else {
        // Move CD back to original position
        retroCd.style.transform = 'translateX(0) rotate(0deg)';

        // Pause the audio
        audio.pause();
        isPlaying = false;

        // Stop the rotation
        clearInterval(rotationInterval);

        // Reset retro pin to its original position
        retroPin.style.transform = 'rotate(0deg)';
    }
});

// Event listener for when the audio ends
audio.addEventListener('ended', () => {
    // Move CD back to original position
    retroCd.style.transform = 'translateX(0) rotate(0deg)';

    // Reset the audio state
    audio.pause();
    audio.currentTime = 0; // Reset audio to the beginning
    isPlaying = false;

    // Stop the rotation
    clearInterval(rotationInterval);

    // Reset retro pin to its original position
    retroPin.style.transform = 'rotate(0deg)';
});
