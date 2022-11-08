interface RGBAColor {
    red: number
    green: number
    blue: number
    alpha: number
}

interface HeartPosition {
    x: number
    y: number
    rootX: number
    rootY: number
    a: number
    angle: number
    length: number
    maxLength: number
    velocity: number
}

type RandomVelocity = () => number