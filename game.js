const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
let player = {
    x: 175,
    y: 480,
    width: 50,
    height: 80,
    speed: 7
};

// Enemy
let enemy = {
    x: Math.random() * 350,
    y: -100,
    width: 50,
    height: 80,
    speed: 4
};

let score = 0;
let gameOver = false;

// Control
document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
    if (e.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
    if (e.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw enemy
function drawEnemy() {
    ctx.fillStyle = "blue";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

// Collision
function isCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// Game loop
function updateGame() {
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", 100, 300);
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 140, 340);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemy();

    enemy.y += enemy.speed;

    if (enemy.y > canvas.height) {
        enemy.y = -100;
        enemy.x = Math.random() * 350;
        score++;
        enemy.speed += 0.2; // makin lama makin cepat
    }

    if (isCollision(player, enemy)) {
        gameOver = true;
    }

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.fillText("Score: " + score, 10, 20);

    requestAnimationFrame(updateGame);
}

updateGame();
