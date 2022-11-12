class Heart {
    private ctx: CanvasRenderingContext2D | null

    private width: number = 10
    private height: number = 10

    private color: RGBAColor = {
        red: 248,
        green: 107,
        blue: 142,
        alpha: Math.random() * 0.9 + 0.1
    }

    private position: HeartPosition = {
        x: 0,
        y: 0,
        rootX: 0,
        rootY: 0,
        a: 0,
        angle: 0,
        length: 0,
        maxLength: 100,
        velocity: 0
    }

    private isRuning: boolean = false
    private currentVelocity: number = 0
    private rootVelocity: number = 1.5
    private dotSize: number = Math.random() * 2.5 + 0.5

    constructor (
        ctx: CanvasRenderingContext2D | null,
        angle: number,
        rootX: number,
        rootY: number,
        maxLength: number,
        randomAlpha: RandomNumber
    ) {
        this.ctx = ctx
        this.position.rootX = rootX
        this.position.rootY = rootY
        this.position.angle = angle
        this.position.maxLength = maxLength
        this.color.alpha = randomAlpha()
    }

    public Update (): void {
        if (this.isRuning) {
            if (this.position.length <= 0) {
                this.currentVelocity = this.rootVelocity
                this.position.velocity = this.currentVelocity
            }
            else if (this.position.length > this.position.maxLength) {
                this.position.velocity = -this.currentVelocity
            }
        }

        // Update position
        this.position.velocity += this.position.a
        this.position.length += this.position.velocity
        this.position.x = this.position.rootX + (Math.cos(this.position.angle) * this.position.length)
        this.position.y = this.position.rootY + (Math.sin(this.position.angle) * this.position.length)

        // Draw
        this.drawHeart()
    }

    public Start (delay: number): void {
        if (delay === 0) {
            this.isRuning = true
            return
        }

        setTimeout(() => {
            this.isRuning = true
        }, delay)
    }

    private drawHeart () {
        if (!this.ctx) return

        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, this.dotSize, 0, Math.PI * 2)
        this.ctx.fillStyle = this.convertRGBAColorToString()
        this.ctx.fill()
    }

    private convertRGBAColorToString (): string {
        let result = [
            'rgba(',
            this.color.red,
            ',',
            this.color.green,
            ',',
            this.color.blue,
            ',',
            this.color.alpha,
            ')'
        ].join('')

        return result
    }
}

export default Heart