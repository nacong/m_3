export class Point {
    constructor(index, x, y, stageHeight) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.02;
        this.cur = index;
        this.max = Math.random() * (stageHeight / 20);      //바꾸려면 wave의 pointGapY도 바꿔야함
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    }
}