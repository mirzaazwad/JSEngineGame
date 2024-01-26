var robot = document.getElementsByClassName("robot")[0];
var step = 50;
var enterFound = false;
var backgroundAudio = document.getElementById('backgroundAudio');
var volumeButton = document.getElementById('volumeButton');
var volumeIcon = document.getElementById('volumeIcon');
var volumeRange = document.getElementById('volumeRange');

function max(a, b) {
    if (a > b) {
        return a;
    }
    return b;
}

function abs(a) {
    if (a < 0) {
        return -a;
    }
    return a;

}

volumeRange.addEventListener("change", function (e) {
    backgroundAudio.volume = volumeRange.value;
    if (volumeRange.value == 0) {
        switchAudio();
    } else if (volumeRange.value < 0.2) {
        volumeIcon.setAttribute('name', "volume-low");
    }
    else if (volumeRange.value < 0.7) {
        volumeIcon.setAttribute('name', "volume-medium");
    }
    else {
        volumeIcon.setAttribute('name', "volume-high");
    }
});

function switchAudio() {
    if (backgroundAudio.paused) {
        backgroundAudio.play();
        backgroundAudio.volume = 0.2;
        volumeRange.value = 0.2;
        volumeRange.style.display = "block";
        volumeIcon.setAttribute('name', "volume-medium");
    } else {
        backgroundAudio.pause();
        volumeRange.style.display = "none";
        volumeIcon.setAttribute('name', "volume-mute");
    }
}

volumeButton.addEventListener("click", async function (e) {
    switchAudio();
});


document.addEventListener("keydown", async function (e) {
    var vertical = 0;
    var horizontal = 0;

    switch (e.key) {
        case "Enter":
            var start = document.getElementsByClassName('start')[0];
            var typewriter = document.getElementsByClassName('typewriter')[0];
            start.style.opacity = "0";
            start.style.transition = "opacity 1s ease";
            typewriter.style.opacity = "0";
            typewriter.style.transition = "opacity 1s ease";
            var instructions = document.getElementById('instructions');
            instructions.style.opacity = "0";
            instructions.style.transition = "opacity 1s ease";
            enterFound = true;
            volumeRange.value = 0.2;
            volumeIcon.setAttribute('name', "volume-medium");
            backgroundAudio.volume = 0.2;
            volumeRange.style.display = "block";
            backgroundAudio.play();
            break;
        case "ArrowLeft":
            if (!enterFound) {
                return;
            }
            horizontal -= step;
            break;
        case "ArrowRight":
            if (!enterFound) {
                return;
            }
            horizontal += step;
            break;
        case "ArrowUp":
            if (!enterFound) {
                return;
            }
            vertical -= step;
            break;
        case "ArrowDown":
            if (!enterFound) {
                return;
            }
            vertical += step;
            break;
    }
    if (!enterFound) {
        return;
    }
    var notMovable = false;
    robot.childNodes.forEach(function (child) {
        if (child instanceof HTMLElement) {
            var left = parseFloat(getComputedStyle(child).left) + horizontal;
            var top = parseFloat(getComputedStyle(child).top) + vertical;
            var right = parseFloat(getComputedStyle(child).right) - horizontal;
            if (child.classList.contains('head')) {
                if (top < 0 || left < 0 || abs(right) > window.innerWidth) {
                    notMovable = true;
                    return;
                }
            }
        }
    });
    if (notMovable) {
        return;
    }
    robot.childNodes.forEach(function (child) {
        if (child instanceof HTMLElement) {
            var left = parseFloat(getComputedStyle(child).left) + horizontal;
            var right = parseFloat(getComputedStyle(child).right) - horizontal;
            var top = parseFloat(getComputedStyle(child).top) + vertical;
            var bottom = parseFloat(getComputedStyle(child).bottom) - vertical;
            child.style.left = left + "px";
            child.style.top = top + "px";
            child.style.right = right + "px";
            child.style.bottom = bottom + "px";
        }
    });
    await moveAndCenter();
});



async function moveAndCenter() {
    var headElement = document.getElementById('center');
    var headRect = headElement.getBoundingClientRect();
    var centerX = headRect.left + headRect.width / 2;
    var centerY = headRect.top + headRect.height / 2;

    window.scrollTo({
        top: centerY - window.innerHeight / 2,
        left: centerX - window.innerWidth / 2,
        behavior: "auto"
    });
}

var startX = null;
var startY = null;
document.addEventListener("touchstart", function (e) {
    var touch = e.touches[0];
    if (touch) {
        var start = document.getElementsByClassName('start')[0];
        var typewriter = document.getElementsByClassName('typewriter')[0];
        var instructions = document.getElementById('instructions');

        start.style.opacity = "0";
        start.style.transition = "opacity 1s ease";
        typewriter.style.opacity = "0";
        typewriter.style.transition = "opacity 1s ease";
        instructions.style.opacity = "0";
        instructions.style.transition = "opacity 1s ease";
        enterFound = true;
        startX = touch.clientX;
        startY = touch.clientY;
        volumeRange.value = 0.2;
        volumeRange.style.display = "block";
        volumeIcon.setAttribute('name', "volume-medium");
        backgroundAudio.volume = 0.2;
        backgroundAudio.play();
    }

    if (!enterFound) {
        return;
    }
});


document.addEventListener("touchmove", handleTouchMove);

async function handleTouchMove(e) {
    var moveX = e.touches[0].clientX - startX;
    var moveY = e.touches[0].clientY - startY;
    var vertical = 0;
    var horizontal = 0;
    horizontal += moveX * 0.01;
    vertical += moveY * 0.01;
    var notMovable = false;
    robot.childNodes.forEach(function (child) {
        if (child instanceof HTMLElement) {
            var left = parseFloat(getComputedStyle(child).left) + horizontal;
            var top = parseFloat(getComputedStyle(child).top) + vertical;
            var right = parseFloat(getComputedStyle(child).right) - horizontal;
            if (child.classList.contains('head')) {
                if (top < 0 || left < 0 || abs(right) > window.innerWidth) {
                    notMovable = true;
                    return;
                }
            }
        }
    });
    if (notMovable) {
        console.log("Comes Here");
        return;
    }
    robot.childNodes.forEach(function (child) {
        if (child instanceof HTMLElement) {
            var left = parseFloat(getComputedStyle(child).left) + horizontal;
            var right = parseFloat(getComputedStyle(child).right) - horizontal;
            var top = parseFloat(getComputedStyle(child).top) + vertical;
            var bottom = parseFloat(getComputedStyle(child).bottom) - vertical;
            child.style.left = left + "px";
            child.style.top = top + "px";
            child.style.right = right + "px";
            child.style.bottom = bottom + "px";
        }
    });
    if (notMovable) {
        return;
    }
    await moveAndCenter();
}
