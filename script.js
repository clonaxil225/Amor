// Relationship start date - Using a fixed date for persistence
const relationshipStart = new Date('2025-08-03T04:14:27'); // Example: August 3, 2025, 04:14:27 (3 days, 19 hours, 45 minutes, 33 seconds before 8/6/2025 00:00:00)

// Lyrics with timestamps
const lyrics = [
    { time: 3, text: "Eyes don't lie" },
    { time: 7, text: "Eyes don't lie" },
    { time: 9, text: "Say you're mine, eyes don't lie" },
    { time: 18, text: "Can't lie to you, baby, wanna feel your body close" },
    { time: 25, text: "You say that you hate me" },
    { time: 27, text: "But tell me s*** nobody knows" },
    { time: 33, text: "Yeah, you're beautiful, don't have to try" },
    { time: 37, text: "Darlin', you look divine" },
    { time: 41, text: "Eyes don't lie, eyes don't lie" },
    { time: 48, text: "Say you're mine, eyes don't lie" },
    { time: 56, text: "You tell me your secrets" },
    { time: 58, text: "You keep your life between your lips" },
    { time: 64, text: "You know you're my weakness" },
    { time: 66, text: "Tell stories with your fingertips" },
    { time: 72, text: "Yeah, you're beautiful, don't have to try" },
    { time: 76, text: "Darlin', you look divine" },
    { time: 79, text: "Eyes don't lie, eyes don't lie" },
    { time: 87, text: "Say you're mine, eyes don't lie" },
    { time: 95, text: "I swear friends don't get this close" },
    { time: 99, text: "Pull you in, exchanging souls" },
    { time: 103, text: "Trace my skin, losing control" },
    { time: 110, text: "Eyes don't lie, eyes don't lie" },
    { time: 117, text: "Say you're mine, eyes don't lie" },
    { time: 125, text: "Eyes don't lie, eyes don't lie" },
    { time: 133, text: "Say you're mine, eyes don't lie" },
];

// Hello Kitty rain animation
function createHelloKittyItem() {
    const helloKittyImages = [
        // 'images/hello_kitty_1.png',
        // 'images/hello_kitty_2.png',
        // 'images/hello_kitty_3.png',
        // 'images/hello_kitty_4.png',
        // 'images/hello_kitty_5.png',
        // 'images/hello_kitty_6.png',
        // 'images/hello_kitty_7.png',
        // 'images/hello_kitty_8.png'
    ];
    
    const hearts = ['💖', '💕', '💗', '💓', '💝'];
    
    const item = document.createElement('div');
    item.className = 'hello-kitty-item';
    
    if (Math.random() > 0.5 && helloKittyImages.length > 0) {
        // Create Hello Kitty image
        const img = document.createElement('img');
        img.src = helloKittyImages[Math.floor(Math.random() * helloKittyImages.length)];
        img.style.width = (Math.random() * 30 + 20) + 'px';
        img.style.height = 'auto';
        item.appendChild(img);
    } else {
        // Create heart
        item.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        item.style.fontSize = (Math.random() * 15 + 15) + 'px';
    }
    
    item.style.left = Math.random() * 100 + 'vw';
    item.style.animationDuration = (Math.random() * 3 + 4) + 's';
    item.style.opacity = Math.random() * 0.7 + 0.3;
    
    document.getElementById('helloKittyRain').appendChild(item);
    
    setTimeout(() => {
        item.remove();
    }, 7000);
}

// Create Hello Kitty items continuously
setInterval(createHelloKittyItem, 500);

// Relationship counter
function updateCounter() {
    const now = new Date();
    const diff = now - relationshipStart;
    
    const totalSeconds = Math.floor(diff / 1000);
    const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
    const months = Math.floor((totalSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60));
    const days = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    // Update values
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Show/hide years and months based on their values
    const yearsElement = document.getElementById('years').parentElement;
    const monthsElement = document.getElementById('months').parentElement;
    
    if (years > 0) {
        yearsElement.style.display = 'block';
    } else {
        yearsElement.style.display = 'none';
    }
    
    if (months > 0) {
        monthsElement.style.display = 'block';
    } else {
        monthsElement.style.display = 'none';
    }
}

// Update counter every second
setInterval(updateCounter, 1000);
updateCounter();

// Music player functionality
const playButton = document.getElementById('playButton');
const playIcon = document.getElementById('playIcon');
const albumArt = document.querySelector('.album-art');
const progressBar = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.querySelector('.time-info span:last-child');
const currentLyricDisplay = document.getElementById('currentLyric');
const audio = new Audio('music/eyes_dont_lie.mp3');
let isPlaying = false;

// Set audio properties
audio.loop = true;
audio.volume = 0.7;

// Update lyrics synchronization
function updateLyrics(currentTime) {
    let activeLyric = null;
    for (let i = 0; i < lyrics.length; i++) {
        const lyric = lyrics[i];
        const nextLyric = lyrics[i + 1];

        if (currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time)) {
            activeLyric = lyric;
            break;
        }
    }

    if (activeLyric) {
        if (currentLyricDisplay.textContent !== activeLyric.text) {
            currentLyricDisplay.classList.remove('active');
            void currentLyricDisplay.offsetWidth; // Trigger reflow
            currentLyricDisplay.textContent = activeLyric.text;
            currentLyricDisplay.classList.add('active');
        }
    } else {
        currentLyricDisplay.classList.remove('active');
        currentLyricDisplay.textContent = '';
    }
}

// Play/Pause functionality
playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        albumArt.classList.remove('playing');
    } else {
        audio.play().catch(e => {
            console.error('Erro ao tentar tocar a música:', e);
            // Adiciona um listener para tentar tocar a música após a interação do usuário
            document.addEventListener('click', () => {
                audio.play().catch(err => console.error('Erro persistente:', err));
            }, { once: true });
        });
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        albumArt.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
    
    // Update current time
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Update lyrics
    updateLyrics(audio.currentTime);
});

audio.addEventListener('loadedmetadata', () => {
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    totalTimeSpan.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
});

// Progress bar click to seek
progressBar.parentElement.addEventListener('click', (e) => {
    const rect = progressBar.parentElement.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * audio.duration;
    audio.currentTime = seekTime;
});

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.message-card, .photo-frame, .counter-item, .music-dedication').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Add click effect to photos
document.querySelectorAll('.photo-frame').forEach(frame => {
    frame.addEventListener('click', () => {
        frame.style.transform = frame.style.transform.replace('scale(1)', 'scale(1.05)');
        setTimeout(() => {
            frame.style.transform = frame.style.transform.replace('scale(1.05)', 'scale(1)');
        }, 200);
    });
});

// Add floating animation to heart symbol
const heartSymbol = document.querySelector('.heart-symbol');
if (heartSymbol) {
    setInterval(() => {
        heartSymbol.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => {
            heartSymbol.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }, 2000);
}

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#ff69b4';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes borderRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);


