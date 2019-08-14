
const brush = canvas.getContext("2d")

const player = new Kikele(300, 300, 0, 0, 20)

const enemies = [
    new Kikele(50, 100, 0, 0, 20),
    new Kikele(1300, 500, 0, 0, 20),
    new Kikele(1100, 50, 0, 0, 20),
    new Kikele(50, 500, 0, 0, 20),
    new Kikele(800, 400, 0, 0, 20)
]

let stopAnimate = false

const mouse = {
    x: undefined,
    y: undefined
}

const weapon = {
    x: undefined,
    y: undefined,
    counter: 0
}

let counter = 0

function animate() {
    if (stopAnimate) return
    brush.clearRect(0, 0, window.innerWidth, window.innerHeight)
    requestAnimationFrame(animate)
    player.drawPlayer("navy")
    enemies.forEach(enemy => enemy.drawPlayer("darkgreen"))
    player.move()
    enemies.forEach(function (enemy, i) {
        if (Math.abs(player.x - enemy.x) < 20 && Math.abs(player.y - enemy.y) < 20) {
            alert("you lose")
            stopAnimate = true
        }
        setTimeout(function () {
            enemies.forEach(enemy => enemy.attack())
        }, 1000);
    })
    shoot(player)
    if (!enemies[0]) {
        alert("you win") 
        stopAnimate = true
    }
}


document.onkeydown = function (e) {
    if (e.keyCode === 13) {
        animate()

    }
}

canvas.onkeydown = function (e) {
    if (e.keyCode === 27) {
        console.log("esc")
        stopAnimate = true

    }
}


function frictionX(circle) {
    if (circle.dx === 0) return
    else if (circle.dx < 0) circle.dx += (-circle.dx / 100)
    else circle.dx -= (circle.dx / 100)
}

function frictionY(circle) {
    if (circle.dy === 0) return
    else if (circle.dy < 0) circle.dy += (-circle.dy / 100)
    else circle.dy -= (circle.dy / 100)
}

function limit(val) {
    if (val > 5) val = 5;
    if (val < -5) val = -5
}

function shoot(player) {
    canvas.onclick = function (e) {
        mouse.x = e.x
        mouse.y = e.y
        weapon.x = player.x
        weapon.y = player.y
        weapon.counter = 0
        enemies.forEach(function (enemy, i) {
            if (Math.abs(mouse.x - enemy.x) < 18 && Math.abs(mouse.y - enemy.y) < 18) {
                enemies.splice(i, 1)
            }
        })
    }
    line()
    weapon.counter++
}

function line() {
    if (weapon.counter < 10) {
        let lineX = 0;
        let lineY = 0
        if (weapon.counter > 0) {
            if (mouse.x > weapon.x) weapon.x += (mouse.x - weapon.x) / 5
            else weapon.x -= (weapon.x - mouse.x) / 5
            if (mouse.y > weapon.y) weapon.y += (mouse.y - weapon.y) / 5
            else weapon.y -= (weapon.y - mouse.y) / 5
        }
        brush.beginPath()
        brush.moveTo(weapon.x, weapon.y);
        brush.lineTo(mouse.x, mouse.y)
        brush.lineWidth = 3;
        brush.strokeStyle = "red"
        brush.stroke()
    }
}

// const playerBounderies = player.getBoundingClientRect();
// console.log(playerBounderies)