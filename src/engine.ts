import Heart from "./heart"

const SIZE: number = 720
const SCALE: number = innerWidth / innerHeight

class Engine {
    private canvas: HTMLCanvasElement = document.createElement('canvas')
    private ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d')

    private WIDTH: number = SIZE * SCALE
    private HEIGHT: number = SIZE
    
    private heartDrawLength: number = 1
    private heartSize: number = 10
    
    private isStop: boolean = false
    private rootX: number = (this.WIDTH / 2)
    private rootY: number = (this.HEIGHT / 2)

    private hearts: Heart[][] = []

    constructor () {
        // Init canavs
        this.canvas.width = this.WIDTH
        this.canvas.height = this.HEIGHT
        // this.canavs.style.backgroundColor = '#000'
        this.canvas.style.background = 'radial-gradient(#2e0912, #000000)'

        document.body.append(this.canvas)

        // Init hears
        let maxLength: number = 30

        this.drawHeart(this.heartSize, maxLength, this.degToRad(2), () => Math.random() * 5, () => Math.random() * 0.8 + 0.2)
        this.drawHeart(this.heartSize, maxLength, this.degToRad(0.5), () => Math.random() * 25, () => Math.random())
        this.drawHeart(this.heartSize, maxLength, this.degToRad(1), () => Math.random() * 50, () => Math.random())
        this.drawHeart(this.heartSize, maxLength, this.degToRad(1), () => Math.random() * 100, () => Math.random())
        this.drawHeart(this.heartSize, maxLength, this.degToRad(2), () => Math.random() * 150, () => Math.random())
        this.drawHeart(this.heartSize, maxLength, this.degToRad(1.5), () => Math.random() * 30, () => Math.random() * 0.5 + 0.1, 350)
        this.drawHeart(this.heartSize, maxLength, this.degToRad(1.5), () => Math.random() * -30, () => Math.random() * 0.5 + 0.1, 350)

        // Start loop
        this.loop()
    }

    private update (): void {
        for (let i = 0; i < this.hearts.length; i ++) {
            for (let j = 0; j < this.hearts[i].length; j ++) {
                this.hearts[i][j].Update()
            }
        }
    }

    private loop (): void {
        if (this.isStop) return

        // Clear
        this.ctx?.clearRect(0, 0, this.WIDTH, this.HEIGHT)

        // Update
        this.update()

        // Loop
        requestAnimationFrame(() => {
            this.loop()
        })
    }

    private degToRad (deg: number): number {
        return deg * Math.PI / 180
    }

    // https://blogs.lcps.org/academiesonline/2021/02/13/the-equation-of-the-heart/
    private drawHeart (
        size: number,
        maxLength: number,
        radAdd: number,
        randomPosition: RandomNumber,
        randomAlpha: RandomNumber,
        delay: number = 0
    ): void {
        const self: this = this
        
        let rad: number = 0

        let hearts: Heart[] = []
        this.hearts.push(hearts)

        // x = size * 16sin(t)^3
        function getX (t: number): number {
            return size * (16 * Math.pow(Math.sin(t), 3))
        }

        // y = -size * (13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t))
        function getY (t: number): number {
            return -size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
        }

        function draw (): void {
            let x: number = getX(rad)
            let y: number = getY(rad)

            rad += radAdd

            let angle: number = rad - (Math.PI / 2)
            let hX: number = randomPosition() * Math.cos(angle)
            let hY: number = randomPosition() * Math.sin(angle)
            
            let rootX: number = x + self.rootX - hX
            let rootY: number = y + self.rootY - hY

            if ((x > 0 && x <= hX) || (x < 0 && x >= hX)) {
                rootX = x + self.rootX
            }

            hearts.push(new Heart(
                self.ctx,
                angle,
                rootX,
                rootY,
                maxLength,
                randomAlpha
            ))

            if (rad < Math.PI * 2 * self.heartDrawLength) {
                draw()
            }
            else {
                for (let i = 0; i < hearts.length; i ++) {
                    hearts[i].Start(delay)
                }
            }
        }

        draw()
    }
}

export default Engine