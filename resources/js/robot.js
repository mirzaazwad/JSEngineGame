var robot = document.getElementsByClassName("robot")[0];
var step = 50;

function max(a,b){
    if(a>b){
        return a;
    }
    return b;
}

function abs(a){
    if(a<0){
        return -a;
    }
    return a;

}

document.addEventListener("keydown",async function (e) {
    var vertical = 0;
    var horizontal = 0;

    switch (e.key) {
        case "Enter":
            var start = document.getElementsByClassName('start')[0];
            var typewriter=document.getElementsByClassName('typewriter')[0];
            start.style.opacity = "0";
            start.style.transition="opacity 1s ease";
            typewriter.style.opacity = "0";
            typewriter.style.transition="opacity 1s ease";
            break;
        case "ArrowLeft":
            horizontal -= step;
            var instructions = document.getElementById('instructions');
            instructions.style.opacity = "0";
            instructions.style.transition="opacity 1s ease";
            break;
        case "ArrowRight":
            horizontal += step;
            var instructions = document.getElementById('instructions');
            instructions.style.opacity = "0";
            instructions.style.transition="opacity 1s ease";
            break;
        case "ArrowUp":
            vertical -= step;
            var instructions = document.getElementById('instructions');
            instructions.style.opacity = "0";
            instructions.style.transition="opacity 1s ease";
            break;
        case "ArrowDown":
            vertical += step;
            var instructions = document.getElementById('instructions');
            instructions.style.opacity = "0";
            instructions.style.transition="opacity 1s ease";
            break;
    }


    var notMovable=false;
    robot.childNodes.forEach(function (child) {
        if (child instanceof HTMLElement) {
            var left = parseFloat(getComputedStyle(child).left) + horizontal;
            var top = parseFloat(getComputedStyle(child).top) + vertical;
            var right = parseFloat(getComputedStyle(child).right) - horizontal;
            if(child.classList.contains('head')){
                console.log(window.innerWidth);
                console.log(right);
                if(top<0 || left<0 || abs(right)>window.innerWidth){
                    notMovable=true;
                    return;
                }
            }
        }
    });
    if(notMovable){
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