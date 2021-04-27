class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound')
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound')
        this.playBtn = document.querySelector('.play');
        this.index = 0;
        this.bpm = 140;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtn = document.querySelectorAll('.mute');
        this.tempo = document.querySelector('.tempo');
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach((bar) => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play()
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play()
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play()
                }
            }
        });
        this.index++;
    }
    activePad() {
        this.classList.toggle('active');
    }

    start() {
        const interval = 60 / this.bpm * 1000;
        if (this.isPlaying) {
            clearInterval(this.isPlaying)
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() => {
                this.repeat() // to keep this in drumkit class context and not window
                //isPlaying is an id returned by thr setInterval function
            }, interval)
        }


    }
    updateBtn() {
        if (this.isPlaying) {
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(event) {
        const name = event.target.name;
        const sound = event.target.value;

        switch (name) {
            case 'kick-select':
                this.kickAudio.src = sound
                break;

            case 'snare-select':
                this.snareAudio.src = sound
                break;

            case 'hihat-select':
                this.hihatAudio.src = sound
                break;

            default:
                break;
        }
    }
    mute(event) {
        const muteIndex = event.target.getAttribute('data-track');
        event.target.classList.toggle('active');
        if (event.target.classList.contains('active')) {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 0;
                    break;
                case '1':
                    this.snareAudio.volume = 0;
                    break;
                case '2':
                    this.hihatAudio.volume = 0;
                    break;

                default:
                    break;
            }
        } else {
            switch (muteIndex) {
                case '0':
                    this.kickAudio.volume = 1;
                    break;
                case '1':
                    this.snareAudio.volume = 1;
                    break;
                case '2':
                    this.hihatAudio.volume = 1;
                    break;

                default:
                    break;
            }
        }
    }
    changeTempo(event) {
        const tempoText = document.querySelector('.tempo-nr')
        tempoText.innerText = event.target.value;
    }
    updateTempo(event) {
        this.bpm = event.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if (this.playBtn.classList.contains('active')) {
            this.start();
        }

    }
}

const drumkit = new DrumKit();

drumkit.pads.forEach((pad) => {
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});

drumkit.playBtn.addEventListener('click', () => {
    drumkit.start();
    drumkit.updateBtn();
})


drumkit.selects.forEach((select) => {
    select.addEventListener('change', function (event) {
        drumkit.changeSound(event);
    })
})

drumkit.muteBtn.forEach((btn) => {
    btn.addEventListener('click', function (event) {
        drumkit.mute(event);
    })
})
drumkit.tempo.addEventListener('input', function (event) {
    drumkit.changeTempo(event);
})
drumkit.tempo.addEventListener('change', function (event) {
    drumkit.updateTempo(event);
})