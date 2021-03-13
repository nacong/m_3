import { Point } from "./point.js";

export class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.endX = Math.min(this.stageWidth, this.stageHeight);
        this.startY = Math.max(this.stageHeight - (0.3 * (this.stageHeight * this.stageWidth) / this.endX), 0);

        this.pointGapX = (this.endX) / (this.totalPoints - 1);
        this.pointGapY = (this.stageHeight - this.startY) / (this.totalPoints - 1);

        this.init();
    }

    init() {
        this.point = [];

        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + i,
                this.pointGapX * i,
                this.startY + this.pointGapY * i,
                this.stageHeight
            );
            this.points[i] = point;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;

            // ctx.arc(prevX, prevY, 30, 0, 2 * Math.PI);
            // ctx.fill();
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}