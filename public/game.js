const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const width = 400;
const height = 512;
canvas.width = width;
canvas.height = height;

let state = 'menu';
let bird;
let pipes;
let frame;
let score;
const gravity = 0.5;
const jump = -8;
const pipeWidth = 60;
const pipeGap = 120;

function reset() {
    bird = { x: 50, y: height / 2, width: 34, height: 24, velocity: 0 };
    pipes = [];
    frame = 0;
    score = 0;
}

function startGame() {
    reset();
    state = 'game';
}

function flap() {
    if (state === 'menu') {
        startGame();
    } else if (state === 'game') {
        bird.velocity = jump;
    } else if (state === 'gameover') {
        state = 'menu';
    }
}

document.addEventListener('keydown', e => {
    if (e.code === 'Space') flap();
});
canvas.addEventListener('click', flap);

function update() {
    if (state !== 'game') return;

    bird.velocity += gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height >= height || bird.y <= 0) {
        state = 'gameover';
    }

    if (frame % 90 === 0) {
        const gapY = Math.floor(Math.random() * (height - pipeGap - 40)) + 20;
        pipes.push({ x: width, top: gapY, bottom: gapY + pipeGap });
    }

    pipes.forEach(p => (p.x -= 2));
    if (pipes.length && pipes[0].x + pipeWidth < 0) {
        pipes.shift();
        score++;
    }

    pipes.forEach(p => {
        const collision =
            bird.x + bird.width > p.x &&
            bird.x < p.x + pipeWidth &&
            (bird.y < p.top || bird.y + bird.height > p.bottom);
        if (collision) {
            state = 'gameover';
        }
    });

    frame++;
}

function draw() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, width, height);

    if (state === 'menu') {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Flappy Bird', width / 2, height / 2 - 20);
        ctx.font = '16px sans-serif';
        ctx.fillText('Press Space or Click to Start', width / 2, height / 2 + 20);
        return;
    }

    ctx.fillStyle = '#ff0';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    ctx.fillStyle = '#0f0';
    pipes.forEach(p => {
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        ctx.fillRect(p.x, p.bottom, pipeWidth, height - p.bottom);
    });

    ctx.fillStyle = '#000';
    ctx.font = '20px sans-serif';
    ctx.fillText(score, 10, 25);

    if (state === 'gameover') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', width / 2, height / 2 - 20);
        ctx.font = '16px sans-serif';
        ctx.fillText('Score: ' + score, width / 2, height / 2 + 10);
        ctx.fillText('Press Space or Click to Menu', width / 2, height / 2 + 40);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
