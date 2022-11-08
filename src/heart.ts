class Heart {
    private ctx: CanvasRenderingContext2D | null

    private width: number = 10
    private height: number = 10

    private color: RGBAColor = {
        red: 255,
        green: 0,
        blue: 0,
        alpha: Math.random() * 0.5 + 0.1
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
    private randomVelocity: RandomVelocity = () => 0

    constructor (
        ctx: CanvasRenderingContext2D | null,
        angle: number,
        rootX: number,
        rootY: number,
        maxLength: number,
        randomVelocity: RandomVelocity
    ) {
        this.ctx = ctx
        this.position.rootX = rootX
        this.position.rootY = rootY
        this.position.angle = angle
        this.position.maxLength = maxLength
        this.randomVelocity = randomVelocity
    }

    public Update (): void {
        if (this.isRuning) {
            if (this.position.length <= 0) {
                this.currentVelocity = this.randomVelocity()
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

    public Start (): void {
        this.isRuning = true
    }

    // private drawHeart() {
    //     if (!this.ctx) return

    //     // https://stackoverflow.com/questions/58333678/draw-heart-using-javascript-in-any-postionx-y
    //     let topCurveHeight = this.height * 0.3
      
    //     this.ctx.save()
    //     this.ctx.beginPath()
        
    //     this.ctx.moveTo(this.position.x, this.position.y + topCurveHeight)

    //     // top left curve
    //     this.ctx.bezierCurveTo(
    //         this.position.x,
    //         this.position.y, 
    //         this.position.x - this.width / 2, this.position.y, 
    //         this.position.x - this.width / 2, this.position.y + topCurveHeight
    //     )
      
    //     // bottom left curve
    //     this.ctx.bezierCurveTo(
    //       this.position.x - this.width / 2, this.position.y + (this.height + topCurveHeight) / 2, 
    //       this.position.x, this.position.y + (this.height + topCurveHeight) / 2, 
    //       this.position.x, this.position.y + this.height
    //     )
      
    //     // bottom right curve
    //     this.ctx.bezierCurveTo(
    //         this.position.x, this.position.y + (this.height + topCurveHeight) / 2, 
    //         this.position.x + this.width / 2, this.position.y + (this.height + topCurveHeight) / 2, 
    //         this.position.x + this.width / 2, this.position.y + topCurveHeight
    //     )
      
    //     // top right curve
    //     this.ctx.bezierCurveTo(
    //         this.position.x + this.width / 2, this.position.y, 
    //         this.position.x, this.position.y, 
    //         this.position.x, this.position.y + topCurveHeight
    //     )
      
    //     this.ctx.closePath()
    //     this.ctx.fillStyle = this.convertRGBAColorToString()
    //     this.ctx.fill()
    //     this.ctx.restore()
    // }

    private drawHeart () {
        if (!this.ctx) return

        this.ctx.beginPath()
        this.ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
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