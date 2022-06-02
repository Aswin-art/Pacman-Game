const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Function for image
function createImage(src){
    const image = new Image()
    image.src = src
    return image
}

// Function draw map
function drawMap(){
    const map = [
        ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
        ['|', '', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
        ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
        ['|', '.', '.', '.', '.', '^', 'p', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
        ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
        ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
        ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
        ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
        ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
    ]
    
    return map
}

// Function for boundary
function drawBoundary(){
    const map = drawMap()
    const boundaries = []

    // Push in boundary
    map.forEach((row, rowIndex) => {
        row.forEach((symbol, colIndex) => {
            switch(symbol){
                case '-':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeHorizontal.png')
                    }))
                    break;
                case '|':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeVertical.png')
                    }))
                    break;
                case '1':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeCorner1.png')
                    }))
                    break;
                case '2':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeCorner2.png')
                    }))
                    break;
                case '3':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeCorner3.png')
                    }))
                    break;
                case '4':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeCorner4.png')
                    }))
                    break;
                case '5':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeConnectorTop.png')
                    }))
                    break;
                case '7':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeConnectorBottom.png')
                    }))
                    break;
                case 'b':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/block.png')
                    }))
                    break;
                case '[':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/capLeft.png')
                    }))
                    break;
                case ']':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/capRight.png')
                    }))
                    break;
                case '^':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/capTop.png')
                    }))
                    break;
                case '+':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/pipeCross.png')
                    }))
                    break;
                case '_':
                    boundaries.push(new Boundary({
                        position: {
                            x: Boundary.width * colIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('./assets/images/capBottom.png')
                    }))
                    break;
                default:
                    break;
            }
        })
    })

    return boundaries
}

// Function draw pellets
function drawPellet(){
    const map = drawMap()
    const pellets = []
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            switch (col) {
                case '.':
                    pellets.push(
                        new Pellet({
                            position: {
                                x: Boundary.width * colIndex + (Boundary.width / 2),
                                y: Boundary.height * rowIndex + (Boundary.height / 2)
                            }
                        })
                    )
                    break;
            
                default:
                    break;
            }
        })
    })

    return pellets
}

// Function draw PowerUp
function drawPowerUp(){
    const map = drawMap()
    const powerUp = []
    map.forEach((row, rowIndex) => {
        row.forEach((symbol, colIndex) => {
            switch(symbol){
                case 'p':
                powerUp.push(
                    new PowerUp({
                        position: {
                            x: Boundary.width * colIndex + (Boundary.width / 2),
                            y: Boundary.height * rowIndex + (Boundary.height / 2)
                        }
                    })
                )
            }
        })
    })

    return powerUp
}

// Function spawn ghost
function spawnGhost(game){
    const ghosts = []
    
    ghosts.push(
        new Ghost(game, {
            position: {
                x: Boundary.width * 6 + (Boundary.width / 2),
                y: Boundary.height + (Boundary.height / 2)
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            }
        })
    )

    ghosts.push(
        new Ghost(game, {
            position: {
                x: Boundary.width + (Boundary.width / 2),
                y: Boundary.height * 6 + (Boundary.height / 2)
            },
            velocity: {
                x: 0,
                y: -Ghost.speed
            },
            color: 'pink'
        })
    )

    ghosts.push(
        new Ghost(game, {
            position: {
                x: Boundary.width * 9 + (Boundary.width / 2),
                y: Boundary.height * 5 + (Boundary.height / 2)
            },
            velocity: {
                x: -Ghost.speed,
                y: 0
            },
            color: 'brown'
        })
    )

    ghosts.push(
        new Ghost(game, {
            position: {
                x: Boundary.width * 3 + (Boundary.width / 2),
                y: Boundary.height * 9 + (Boundary.height / 2)
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            },
            color: 'lightblue'
        })
    )

    ghosts.push(
        new Ghost(game, {
            position: {
                x: Boundary.width * 6 + (Boundary.width / 2),
                y: Boundary.height * 7 + (Boundary.height / 2)
            },
            velocity: {
                x: Ghost.speed,
                y: 0
            },
            color: 'lightgreen'
        })
    )

    return ghosts
}

// Function for detect collision with boundaries | FOR PACMAN
function circleCollidesWithRectanglePacman({circle, rectangle}){
    const padding = Boundary.width / 2 - circle.radius - 7
    return circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
    circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
    circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
}

// Function for detect collision with boundaries | FOR GHOST
function circleCollidesWithRectangleGhost({circle, rectangle}){
    const padding = Boundary.width / 2 - circle.radius - 2
    return circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height + padding &&
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y - padding &&
    circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x - padding &&
    circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width + padding
}

// Function for detect collision with pellets
function circleCollidesWithPellet({circle, pellet}){
    return circle.position.y - circle.radius <= pellet.position.y + pellet.radius &&
    circle.position.y + circle.radius >= pellet.position.y &&
    circle.position.x + circle.radius >= pellet.position.x &&
    circle.position.x - circle.radius <= pellet.position.x + pellet.radius
}

// Function for detect collision with powerUp
function circleCollidesWithPowerUp({circle, powerUp}){
    return circle.position.y - circle.radius <= powerUp.position.y + powerUp.radius &&
    circle.position.y + circle.radius >= powerUp.position.y &&
    circle.position.x + circle.radius >= powerUp.position.x &&
    circle.position.x - circle.radius <= powerUp.position.x + powerUp.radius
}

// Function for detect collision with ghost
function circleCollidesWithGhost({circle, ghost}){
    return circle.position.y - circle.radius <= ghost.position.y + ghost.radius &&
    circle.position.y + circle.radius >= ghost.position.y - ghost.radius &&
    circle.position.x + circle.radius >= ghost.position.x - ghost.radius &&
    circle.position.x - circle.radius <= ghost.position.x + ghost.radius
}

// Function for eat ghost
function eatable(ghosts){
    ghosts.forEach(ghost => {
        ghost.canEat = true
    })
}

// Function for disable eat ghost
function eatdisable(game, ghosts){
    game.time = 0
    ghosts.forEach(ghost => {
        ghost.canEat = false
    })
}

// Boundary class
class Boundary{
    static width = 40
    static height = 40
    constructor({position, image}){
        this.position = position
        this.image = image
        this.width = 40
        this.height = 40
    }

    draw(ctx){
        // ctx.fillStyle = 'blue'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){

    }
}


// Pacman Class
class Pacman{
    constructor(game, {position, velocity}){
        this.game = game
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.speed = 3
        this.radians = 0.75
        this.openRate = 0.12
        this.rotation = 0
    }

    move(){
        if(keyPressed.w && lastKey == 'w'){
            for(let i = 0; i < game.boundaries.length; ++i){
                const boundary = game.boundaries[i]
                if(circleCollidesWithRectanglePacman({circle: {...this, velocity:{x: 0, y: -3}}, rectangle: boundary})){
                    this.velocity.y = 0
                    break;
                }else{
                    this.velocity.y = -this.speed
                }
            }
        }else if(keyPressed.s && lastKey == 's'){
            for(let i = 0; i < game.boundaries.length; ++i){
                const boundary = game.boundaries[i]
                if(circleCollidesWithRectanglePacman({circle: {...this, velocity:{x: 0, y: 3}}, rectangle: boundary})){
                    this.velocity.y = 0
                    break;
                }else{
                    this.velocity.y = this.speed
                }
            }
        }else if(keyPressed.a && lastKey == 'a'){
            for(let i = 0; i < game.boundaries.length; ++i){
                const boundary = game.boundaries[i]
                if(circleCollidesWithRectanglePacman({circle: {...this, velocity:{x: -3, y: 0}}, rectangle: boundary})){
                    this.velocity.x = 0
                    break;
                }else{
                    this.velocity.x = -this.speed
                }
            }
        }else if(keyPressed.d && lastKey == 'd'){
            for(let i = 0; i < game.boundaries.length; ++i){
                const boundary = game.boundaries[i]
                if(circleCollidesWithRectanglePacman({circle: {...this, velocity:{x: 3, y: 0}}, rectangle: boundary})){
                    this.velocity.x = 0
                    break;
                }else{
                    this.velocity.x = this.speed
                }
            }
        }
    }

    stop(){
        this.velocity.x = 0
        this.velocity.y = 0
    }

    draw(ctx){
        ctx.save()
        ctx.translate(this.position.x, this.position.x)
        ctx.rotate(this.rotation)
        ctx.translate(-this.position.x, -this.position.x)
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, this.radians, Math.PI * 2 - this.radians)
        ctx.lineTo(this.position.x, this.position.y)
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }

    update(){
        // Detect Colliding
        game.boundaries.forEach(boundary => {
            if(circleCollidesWithRectanglePacman({circle: this, rectangle: boundary})){
                this.velocity.x = 0
                this.velocity.y = 0
            }
        })

        // Chomp Animation
        if(this.radians < 0 || this.radians > .75){
            this.openRate = -this.openRate
        }

        this.radians += this.openRate

        // Movement
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


// Pellet Class
class Pellet{
    constructor({position}){
        this.position = position
        this.radius = 3
        this.color = 'white'
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    update(){

    }
}


// PowerUp Class
class PowerUp{
    constructor({position}){
        this.position = position
        this.radius = 9
        this.color = 'white'
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    update(){

    }
}


// Ghost Class
class Ghost{
    static speed = 2
    constructor(game, {position, velocity, color = 'red'}){
        this.game = game
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.speed = 2
        this.color = color
        this.prevCollision = []
        this.canEat = false
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        if(this.canEat){
            ctx.fillStyle = 'blue'
        }else{
            ctx.fillStyle = this.color
        }
        ctx.fill()
        ctx.closePath()
    }

    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


// Track last and press key
let lastKey = ''
let keyPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
}

// Event Class
class EventHandler{
    constructor(game){
        document.addEventListener('keydown', (event) => {
            switch(event.key){
                case 'w':
                    keyPressed.w = true
                    lastKey = 'w'
                    game.pacman.move()
                    break;
                case 'a':
                    keyPressed.a = true
                    lastKey = 'a'
                    game.pacman.move()
                    break;
                case 's':
                    keyPressed.s = true
                    lastKey = 's'
                    game.pacman.move()
                    break;
                case 'd':
                    keyPressed.d = true
                    lastKey = 'd'
                    game.pacman.move()
                    break;
                case 'Enter':
                    restart(game)
                    break;
                case 'Escape':
                    if(game.state != state.PAUSE){
                        game.state = state.PAUSE
                    }else{
                        game.state = state.RUNNING
                    }
                    break;
                default:
                    break;
            }
        })

        document.addEventListener('keyup', (event) => {
            switch(event.key){
                case 'w':
                    keyPressed.w = false
                    if(game.pacman.velocity.y < 0){
                        game.pacman.stop()
                    }
                    break;
                case 'a':
                    keyPressed.a = false
                    if(game.pacman.velocity.x < 0){
                        game.pacman.stop()
                    }
                    break;
                case 's':
                    keyPressed.s = false
                    if(game.pacman.velocity.y > 0){
                        game.pacman.stop()
                    }
                    break;
                case 'd':
                    keyPressed.d = false
                    if(game.pacman.velocity.x > 0){
                        game.pacman.stop()
                    }
                    break;
                default:
                    break;
            }
        })
    }
}


// Game State
const state = {
    GAMEOVER: 0,
    WIN: 1,
    PAUSE: 3,
    RUNNING: 4
}


// Game Class
class Game{
    constructor(){
        this.boundaries = []
        this.ghosts = []
        this.pellets = []
        this.powerUps = []
        this.state = state.RUNNING
        this.reset()
    }

    reset(){
        // Declarate time for eat ghost
        this.time = 0

        //Declare score
        this.score = 0

        // Declarate boundaries
        this.boundaries = drawBoundary()

        // Declarate pellets
        this.pellets = drawPellet()

        // Declarate powerUp
        this.powerUps = drawPowerUp()

        // Declarate ghost
        this.ghosts = spawnGhost(this)

        // Declarate pacman
        this.pacman = new Pacman(this, {
            position: {
                x: Boundary.width + (Boundary.width / 2),
                y: Boundary.height + (Boundary.height / 2)
            },
            velocity: {
                x: 0,
                y: 0
            }
        })

        new EventHandler(this)
    }

    draw(ctx){
        if(this.state == state.RUNNING){
            document.querySelector('.pause-screen').style.opacity = 0;
            [...this.boundaries, ...this.pellets, ...this.ghosts, ...this.powerUps, this.pacman].forEach(object => object.draw(ctx))
        }

        if(this.state == state.PAUSE){
            document.querySelector('.pause-screen').style.opacity = 1
        }
    }

    update(){

        [...this.boundaries, ...this.pellets, ...this.ghosts, ...this.powerUps, this.pacman].forEach(object => object.update(ctx))
        
        // Detect collision with pallet
        this.pellets.forEach((pellet, index) => {
            if(circleCollidesWithPellet({
                circle: this.pacman,
                pellet: pellet
            })){
                const sound = new Audio('./assets/sound/pacman_chomp.wav')
                sound.play()
                this.pellets.splice(index, 1)
                this.score += 10
            }
        })

        // Detect collision with powerUp
        this.powerUps.forEach((power, index) => {
            if(circleCollidesWithPowerUp({
                circle: this.pacman,
                powerUp: power
            })){
                const sound = new Audio('./assets/sound/pacman_intermission.wav')
                sound.play()
                eatable(this.ghosts)
                this.powerUps.splice(index, 1)
                this.time += 5000
                setTimeout(() => {
                    eatdisable(this, this.ghosts)
                }, this.time)
            }
        })

        // Win condition
        if(this.pellets.length === 0){
            document.querySelector('.win-screen').style.opacity = 1
            playAnimate = false
        }
        
        // Detect collision with ghost
        this.ghosts.forEach((ghost, index) => {
            if(circleCollidesWithGhost({
                circle: this.pacman,
                ghost: ghost
            })){
                if(ghost.canEat){
                    const sound = new Audio('./assets/sound/pacman_eatghost.wav')
                    sound.play()
                    this.ghosts.splice(index, 1)
                    this.score += 50
                }else{
                    const sound = new Audio('./assets/sound/pacman_death.wav')
                    sound.play()
                    document.querySelector('.gameover-screen').style.opacity = 1
                    playAnimate = false
                }
            }
        })

        // Movement for ghost
        this.ghosts.forEach(ghost => {
            const collisions = []
            this.boundaries.forEach(boundary => {
                if(!collisions.includes('right') && circleCollidesWithRectangleGhost({
                    circle: {
                        ...ghost,
                        velocity: {
                            x: ghost.speed,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
                ){
                    collisions.push('right')
                }

                if(!collisions.includes('left') && circleCollidesWithRectangleGhost({circle: {...ghost, velocity:{x: -ghost.speed, y: 0}}, rectangle: boundary})){
                    collisions.push('left')
                }

                if(!collisions.includes('up') && circleCollidesWithRectangleGhost({circle: {...ghost, velocity:{x: 0, y: -ghost.speed}}, rectangle: boundary})){
                    collisions.push('up')
                }

                if(!collisions.includes('down') && circleCollidesWithRectangleGhost({circle: {...ghost, velocity:{x: 0, y: ghost.speed}}, rectangle: boundary})){
                    collisions.push('down')
                }
            })
            
            if(collisions.length > ghost.prevCollision.length){
                ghost.prevCollision = collisions
            }

            if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollision)){
                if(ghost.velocity.x > 0){
                    ghost.prevCollision.push('right')
                }else if(ghost.velocity.x < 0){
                    ghost.prevCollision.push('left')
                }else if(ghost.velocity.y < 0){
                    ghost.prevCollision.push('up')
                }else if(ghost.velocity.y > 0){
                    ghost.prevCollision.push('down')
                }

                const pathways = ghost.prevCollision.filter(collision => {
                    return !collisions.includes(collision)
                })

                const direction = pathways[Math.floor(Math.random() * pathways.length)]

                switch(direction){
                    case 'down':
                        ghost.velocity.y = ghost.speed
                        ghost.velocity.x = 0
                        break;
                    case 'up':
                        ghost.velocity.y = -ghost.speed
                        ghost.velocity.x = 0
                        break;
                    case 'left':
                        ghost.velocity.x = -ghost.speed
                        ghost.velocity.y = 0
                        break;
                    case 'right':
                        ghost.velocity.x = ghost.speed
                        ghost.velocity.y = 0
                        break;
                    default:
                        break;
                }
                
                ghost.prevCollision = []
            }
        })
    }
}

const game = new Game()

let score = document.getElementById('score')
const player = document.getElementById('input')
const menu = document.getElementById('menu-screen')
const button = document.getElementById('btn')
let playAnimate = true

function restart(game){
    document.querySelector('.win-screen').style.opacity = 0
    document.querySelector('.gameover-screen').style.opacity = 0
    playAnimate = true
    game.reset()
}

function animate(){
    if(playAnimate){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update()
        game.draw(ctx)
        score.innerHTML = game.score
        requestAnimationFrame(animate)
    }
}

function startPlaying(){
    if(player.value !== ''){
        localStorage.setItem('name', player.value)
        menu.style.opacity = 0
        requestAnimationFrame(animate)
    }
}

button.addEventListener('click', startPlaying)
