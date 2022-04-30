const player = document.querySelector('.player');
const progress = player.querySelector('.progress');
const progressFilled = progress.querySelector('.progress__filled')
const toggleBtn = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const video = player.querySelector('.viewer');
const volumeBar = player.querySelectorAll('.player__slider');

function handlePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    const icon = video.paused ? '►' : '❚ ❚';
    toggleBtn.textContent = icon
}

function skip(e){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleVolume(){
    video[this.name] = this.value
    console.log(this.value)
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressFilled.style.flexBasis = `${percent}%`
    
}

function scrub(e){
    const setProgress = (e.offsetX/progress.offsetWidth) * video.duration
    video.currentTime = setProgress
}

video.addEventListener('click', handlePlay)
toggleBtn.addEventListener('click', handlePlay)
progress.addEventListener('click', scrub)
skipButtons.forEach(button => button.addEventListener('click', skip))
volumeBar.forEach(bar => bar.addEventListener('change', handleVolume))
volumeBar.forEach(bar => bar.addEventListener('mousemove', handleVolume))
video.addEventListener('timeupdate', handleProgress)

let mousedown = false
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)