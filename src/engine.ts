import Heart from "./heart"

const SIZE: number = 720
const SCALE: number = innerWidth / innerHeight

class Engine {
    private canavs: HTMLCanvasElement = document.createElement('canvas')
    private ctx: CanvasRenderingContext2D | null = this.canavs.getContext('2d')

    private WIDTH: number = SIZE * SCALE
    private HEIGHT: number = SIZE
    
    private heartDrawLength: number = 1
    private heartSize: number = 10
    
    private isStop: boolean = false
    private rootX: number = (this.WIDTH / 2)
    private rootY: number = (this.HEIGHT / 2)

    private hearts: Heart[] = []

    constructor () {
        // Init canavs
        this.canavs.width = this.WIDTH
        this.canavs.height = this.HEIGHT
        this.canavs.style.backgroundColor = '#000'

        document.body.append(this.canavs)

        // Init hears
        let maxLength: number = 50

        this.drawHeart(this.heartSize, maxLength, this.degToRad(0.5), () => Math.random() * 0.1 + 1.2, true)
        this.drawHeart(this.heartSize - 0.5, maxLength, this.degToRad(0.5), () => Math.random() * 0.1 + 1.2)
        this.drawHeart(this.heartSize - 1, maxLength, this.degToRad(0.5), () => Math.random() * 0.1 + 1.2)
        this.drawHeart(this.heartSize - 1.5, maxLength, this.degToRad(0.5), () => Math.random() * 0.1 + 1.2)
        this.drawHeart(this.heartSize + 0.5, 120, this.degToRad(2), () => Math.random() * 1 + 1)

        // Start loop
        this.loop()
    }

    private update (): void {
        for (let i = 0; i < this.hearts.length; i ++) {
            this.hearts[i].Update()
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
        randomVelocity: RandomVelocity,
        isToggle: boolean = false
    ): void {
        const self: this = this
        
        let rad: number = 0

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

            self.hearts.push(new Heart(
                self.ctx,
                rad - (Math.PI / 2),
                x + self.rootX,
                y + self.rootY,
                maxLength,
                randomVelocity
            ))

            if (rad < Math.PI * 2 * self.heartDrawLength) {
                requestAnimationFrame(draw)
            }
            else {
                if (isToggle) {
                    for (let i = 0; i < self.hearts.length; i ++) {
                        self.hearts[i].Start()
                    }
                }
            }
        }

        draw()
    }
}

export default Engine