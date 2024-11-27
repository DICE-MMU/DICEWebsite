function LERP(x, y, a) {
    return x * (1 - a) + y * a;
}

function applyGradient(element) {
    let progress = 0; 
    const interval = setInterval(() => {
        progress += 0.1; 
        if (progress >= 1) {
            progress = 1;
            clearInterval(interval);
        }
        const ColorControl = Math.floor(LERP(94, 3, progress));
        element.style.background = `linear-gradient(270deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) ${ColorControl}%, rgba(0,212,255,1) 100%)`;
    }, 16); 
}

function UnGradient(element) {
    let progress = 0; 
    const interval = setInterval(() => {
        progress += 0.1; 
        if (progress >= 1) {
            progress = 1;
            clearInterval(interval);
        }
        const ColorControl = Math.floor(LERP(3, 94, progress)); // Reverse gradient progression
        element.style.background = `linear-gradient(270deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) ${ColorControl}%, rgba(0,212,255,1) 100%)`;
    }, 16); 
}
