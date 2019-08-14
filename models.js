class Kikele {

    constructor(x, y, dx, dy, radius, ) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius
    }

    drawPlayer( color) {
        brush.beginPath();
        brush.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        brush.fillStyle = color
        brush.fill();
        this.y = this.y + this.dy;
        this.x = this.x + this.dx;
        if (this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
            this.dx = -this.dx
        }
        if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
            this.dy = -this.dy
        }
        limit(this.dx)
        limit(this.dy)
        frictionX(this)
        frictionY(this)
    }
    move() {
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 65:
                    player.moveLeft();
                    // draw()
                    break;
                case 87:
                    player.moveUp();
                    // draw()
                    break;
                case 68:
                    player.moveRight();
                    // draw()
                    break;
                case 83:
                    player.moveDown();
                    // draw()
                    break;
                case 27:
                    stopAnimate = true
                    break;
            }
        };
    }

    moveUp() {
        this.dy -= 1
    }

    moveDown() {
        this.dy += 1
    }

    moveRight() {
        this.dx += 1
    }

    moveLeft() {
        this.dx -= 1
    }
    attack(){
        if(this.x < player.x) this.dx++
        else this.dx--
        if(this.y < player.y) this.dy++
        else this.dy--
        if (this.dx > 2) this.dx = 2;
        if (this.dx < -2) this.dx = -2;
        if (this.dy > 2) this.dy = 2;
        if (this.dy < -2) this.dy = -2
    }

}


