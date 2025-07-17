const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
scoreDisplay.style.fontFamily = "Arial";
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let lives = 3;
let gameOver = false;
let ammo = 20;

// Add Push Rush logo
const logo = document.createElement("img");
logo.src = "assets/push_rush.png";
logo.style.position = "absolute";
logo.style.top = "20px";
logo.style.left = "50%";
logo.style.transform = "translateX(-50%)";
logo.style.maxHeight = "100px";
logo.style.zIndex = "15";
gameArea.appendChild(logo);

// Display lives
const livesDisplay = document.createElement("div");
livesDisplay.id = "lives";
livesDisplay.style.position = "absolute";
livesDisplay.style.top = "0px";
livesDisplay.style.right = "0px";
livesDisplay.style.color = "white";
livesDisplay.style.fontSize = "1.5em";
livesDisplay.style.padding = "20px";
livesDisplay.style.color = "white";
livesDisplay.style.backgroundColor = "#ff3426";
livesDisplay.style.borderLeft = "1px solid white";
livesDisplay.style.borderBottom = "1px solid white";
livesDisplay.style.fontWeight = "600";
livesDisplay.style.fontSize = "3em";
livesDisplay.style.borderRadius = "0px 0px 0px 30px";
livesDisplay.style.fontFamily = "Arial";
livesDisplay.textContent = `Lives: ${lives}`;
gameArea.appendChild(livesDisplay);

// Display ammo beside notification preview
const ammoDisplay = document.createElement("div");
ammoDisplay.id = "ammo";
ammoDisplay.style.position = "absolute";
ammoDisplay.style.bottom = "20px";
ammoDisplay.style.left = "calc(50% + 140px)";
ammoDisplay.style.color = "white";
ammoDisplay.style.fontSize = "1.5em";
ammoDisplay.style.padding = "10px";
ammoDisplay.style.color = "white";
ammoDisplay.style.backgroundColor = "#ff3426";
ammoDisplay.style.borderTop = "1px solid white";
ammoDisplay.style.borderLeft = "1px solid white";
ammoDisplay.style.borderRight = "1px solid white";
ammoDisplay.style.fontWeight = "600";
ammoDisplay.style.fontSize = "2em";
ammoDisplay.style.borderRadius = "10px 10px 0px 0px";
ammoDisplay.style.fontFamily = "Arial";

ammoDisplay.textContent = `Ammo: ${ammo}`;
gameArea.appendChild(ammoDisplay);

// Setup next-notification preview
const nextNotification = document.createElement("div");
nextNotification.id = "next-notification";
nextNotification.style.position = "absolute";
nextNotification.style.bottom = "20px";
nextNotification.style.left = "50%";
nextNotification.style.transform = "translateX(-50%)";
nextNotification.style.width = "240px";
nextNotification.style.height = "192px";
nextNotification.style.backgroundSize = "cover";
nextNotification.style.zIndex = "5";
gameArea.appendChild(nextNotification);

// Choose first random image
let nextNotificationIndex = Math.floor(Math.random() * 3) + 1;
nextNotification.style.backgroundImage = `url('assets/monitor_notification_${nextNotificationIndex}.png')`;

// Add "No Ammo!" warning
const noAmmoWarning = document.createElement("div");
noAmmoWarning.id = "no-ammo-warning";
noAmmoWarning.style.position = "absolute";
noAmmoWarning.style.top = "50%";
noAmmoWarning.style.left = "50%";
noAmmoWarning.style.transform = "translate(-50%, -50%)";
noAmmoWarning.style.color = "red";
noAmmoWarning.style.fontSize = "5em";
noAmmoWarning.style.fontWeight = "bold";
noAmmoWarning.style.display = "none";
noAmmoWarning.style.zIndex = "100";
noAmmoWarning.style.fontFamily = "Arial";
noAmmoWarning.textContent = "No Ammo!";
gameArea.appendChild(noAmmoWarning);

// Game Over screen
function showGameOver() {
  const overlay = document.createElement("div");
  overlay.id = "game-over";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.8)";
  overlay.style.color = "white";
  overlay.style.fontSize = "2em";
  overlay.style.fontFamily = "arial";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  noAmmoWarning.style.fontFamily = "Arial";
  overlay.innerHTML = `
    <div><b style="font-size:3em;">Game Over!</b></div>
    <div id="final-score" style="margin-top: 10px;">Final Score: ${score}</div>
    <div id="high-score" style="margin-top: 5px;">High Score: ${highScore}</div>
    <button id="restart-btn" style="margin-top: 20px; font-size: 1em; padding: 10px 20px;">Restart</button>
  `;
  OneSignal.addTag("high-score", highScore);
  OneSignal.addTag("latest-score", score);
  OneSignal.addTag("last-game-over", Date.now());
  gameArea.appendChild(overlay);
  document
    .getElementById("restart-btn")
    .addEventListener("click", () => location.reload());
}

// OneSignal refill logo
function spawnRefillLogo() {
  const logo = document.createElement("img");
  logo.src = "assets/onesignal_logo.png";
  logo.id = "refill-logo";
  logo.style.position = "absolute";
  logo.style.width = "80px";
  logo.style.height = "80px";
  logo.style.zIndex = 20;
  gameArea.appendChild(logo);
  let x = Math.random() * (window.innerWidth - 100);
  let y = Math.random() * (window.innerHeight - 100);
  let dx = 0.98 + Math.random() * 0.98;
  let dy = 0.98 + Math.random() * 0.98;
  function moveLogo() {
    if (!document.body.contains(logo)) return;
    x += dx;
    y += dy;
    if (x <= 0 || x >= window.innerWidth - 80) dx = -dx;
    if (y <= 0 || y >= window.innerHeight - 80) dy = -dy;
    logo.style.left = `${x}px`;
    logo.style.top = `${y}px`;
    requestAnimationFrame(moveLogo);
  }
  logo.addEventListener("click", () => {
    ammo += 20;
    ammoDisplay.textContent = `Ammo: ${ammo}`;
    logo.remove();
  });
  moveLogo();
}

// Enemy spawn logic
function spawnEnemy() {
  if (gameOver) return;
  const enemy = document.createElement("img");
  const enemyIndex = Math.floor(Math.random() * 4) + 1;
  enemy.dataset.spriteIndex = enemyIndex;
  enemy.classList.add("enemy");
  const direction = Math.random() < 0.5 ? "left" : "right";
  let posX = direction === "left" ? -60 : window.innerWidth + 60;
  let speed = direction === "left" ? 0.8 : -0.8;
  enemy.src = `assets/enemy_${direction}_${enemyIndex}.gif`;
  const posY = Math.floor(
    Math.random() * (window.innerHeight - 300 - 140) + 140
  );
  enemy.style.width = `60px`;
  enemy.style.position = "absolute";
  enemy.style.left = `${posX}px`;
  enemy.style.top = `${posY}px`;
  enemy.style.zIndex = 10;
  gameArea.appendChild(enemy);
  function animate() {
    if (gameOver) {
      enemy.remove();
      return;
    }
    posX += speed;
    enemy.style.left = `${posX}px`;
    enemy.style.top = `${posY}px`;
    if (
      ((direction === "left" && posX > window.innerWidth + 60) ||
        (direction === "right" && posX < -60)) &&
      !enemy.classList.contains("converted")
    ) {
      enemy.remove();
      lives--;
      livesDisplay.textContent = `Lives: ${lives}`;
      if (lives <= 0) {
        gameOver = true;
        showGameOver();
      }
      return;
    }
    if (document.body.contains(enemy)) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// Shooting logic
function shoot(x, y) {
  if (gameOver) return;

  if (ammo <= 0) {
    noAmmoWarning.style.display = "block";
    setTimeout(() => {
      noAmmoWarning.style.display = "none";
    }, 600);
    return;
  }

  ammo--;
  ammoDisplay.textContent = `Ammo: ${ammo}`;
  if (ammo <= 3 && !document.getElementById("refill-logo")) spawnRefillLogo();

  const projectileIndex = nextNotificationIndex;
  nextNotificationIndex = Math.floor(Math.random() * 3) + 1;
  nextNotification.style.backgroundImage = `url('assets/monitor_notification_${nextNotificationIndex}.png')`;

  const projectile = document.createElement("div");
  projectile.classList.add("projectile");
  projectile.style.backgroundImage = `url('assets/notification_${projectileIndex}.png')`;
  projectile.style.backgroundSize = "cover";
  projectile.style.left = `${x}px`;
  projectile.style.top = `${y}px`;
  projectile.style.width = `200px`;
  projectile.style.height = `160px`;
  gameArea.appendChild(projectile);
  let scale = 1.0;
  const move = setInterval(() => {
    let top = parseInt(projectile.style.top);
    if (top < 0 || scale <= 0.2) {
      clearInterval(move);
      projectile.remove();
    } else {
      top -= 30;
      scale -= 0.025;
      projectile.style.top = `${top}px`;
      projectile.style.transform = `scale(${scale})`;
      document.querySelectorAll(".enemy").forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();
        const projRect = projectile.getBoundingClientRect();
        if (
          projRect.left < enemyRect.right &&
          projRect.right > enemyRect.left &&
          projRect.top < enemyRect.bottom &&
          projRect.bottom > enemyRect.top &&
          !enemy.classList.contains("converted")
        ) {
          clearInterval(move);
          projectile.remove();
          enemy.src = `assets/converted_enemy_${enemy.dataset.spriteIndex}.gif`;
          enemy.classList.add("converted");
          score++;
          scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`;
          if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
          }
          if (window.OneSignal) {
            OneSignal.sendOutcome("enemy_converted");
          }
        }
      });
    }
  }, 40);
}

gameArea.addEventListener("click", (e) =>
  shoot(e.clientX, window.innerHeight - 50)
);
gameArea.addEventListener("mousemove", (e) => {
  nextNotification.style.left = `${e.clientX}px`;
  ammoDisplay.style.left = `calc(${e.clientX}px + 140px)`;
});

// Difficulty scaling
let enemySpawnInterval = 1000;
let spawnTimer;
function updateDifficulty() {
  if (enemySpawnInterval > 600) {
    enemySpawnInterval -= 100;
  }
  clearInterval(spawnTimer);
  spawnTimer = setInterval(spawnEnemy, enemySpawnInterval);
}

function startGame() {
  OneSignal.addTag("last_game_started", Date.now());
  OneSignal.sendOutcome("New Game Started");
  spawnTimer = setInterval(spawnEnemy, enemySpawnInterval);
  setInterval(updateDifficulty, 5000);
}

// Show rules modal on page load
const startModal = document.createElement("div");
startModal.id = "start-modal";
startModal.style.position = "absolute";
startModal.style.top = "0";
startModal.style.left = "0";
startModal.style.width = "100%";
startModal.style.height = "100%";
startModal.style.background = "rgba(0, 0, 0, 0.85)";
startModal.style.color = "white";
startModal.style.display = "flex";
startModal.style.flexDirection = "column";
startModal.style.justifyContent = "center";
startModal.style.alignItems = "center";
startModal.style.fontSize = "1.5em";
startModal.style.zIndex = "100";
startModal.innerHTML = `
  <div style="max-width: 800px; text-align: center; margin: 20px; font-family: arial;font-size:0.7em;">
    <p><b style="font-size:1.5em;">Welcome to</b></p>
    <img src="assets/push_rush.png" style="height:100px;"/>
    <p>You've just joined the marketing team at Push Rush Inc. and your role is to get as many of your users engaged as possible.</p>
    <p> Luckily you have <a href="https://onesignal.com" target="_blank" style="color:#ff3426;">OneSignal</a> <img src="assets/onesignal_logo.png" style="height:20px;"/> to help!</p>
    <p>Use your OneSignal account to fire push notifications directly at users:</p>
    <img src="assets/enemy_left_1.gif" />
    <img src="assets/enemy_left_3.gif" />
    <img src="assets/enemy_left_4.gif" />
    <img src="assets/enemy_left_2.gif" />
    <p>Engaged users will receive the push on their phone and be thrilled of course!</p>
    <img src="assets/converted_enemy_1.gif" />
    <img src="assets/converted_enemy_3.gif" />
    <img src="assets/converted_enemy_4.gif" />
    <img src="assets/converted_enemy_2.gif" />
    <p>Allowing users to walk past without becoming engaged will cost lives. When your life count hits 0, it's game over 😢</p>
    <p>Keep an eye on your ammo! Clicking on the floating OneSignal logos will replenish your ammo:</p>
    <img src="assets/onesignal_logo.png" style="height:40px;"/>
    <p>Try to beat your high score and see if you can master Push Notifications!</p>
    <button id="start-btn" style="color:white;font-size: 3em; padding: 10px 20px 10px 25px; margin-top: 20px; border:2px solid white; border-radius: 20px; background-color:#ff3426;">▶</button>
  </div>
`;
document.body.appendChild(startModal);
document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-modal").remove();
  startGame();
});
