let width = window.innerWidth;
let height = window.innerHeight;
const svg = document.getElementById("base-svg");
svg.setAttribute("width", width);
svg.setAttribute("height", height);
svg.setAttribute("style", "background-color: black","background-position:top center;");


class Particle {
  constructor(xPos, yPos, radius) {
    this.initX = xPos
    this.initY = yPos
    this.x = xPos;
    this.y = yPos;
    this.r = radius;
    this.svgElement;
    this.animDuration = randomNum(3, 5);
    this.targetX = randomNum(0, width);
    this.color = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
    this.gravity = 0.06; // Add the gravity property with an initial value of 0.06
    this.velocityY = -2; // Add a vertical speed attribute with an initial value of -2
    this.timer = null
  }


  drawParticle() {
    this.svgElement = makeCircle(this.x, this.y, this.r);
    svg.appendChild(this.svgElement);
    this.svgElement.setAttribute("fill", this.color);
    this.addAnimateX();
    this.addAnimateY();
  }


  addAnimateX() {
    let animElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animElement.setAttribute('attributeName', 'cx');
    animElement.setAttribute('values', `${this.x}; ${this.targetX};`);
    animElement.setAttribute('dur', `${this.animDuration}`);
    animElement.setAttribute('repeatCount', 'indefinite');
    this.svgElement.appendChild(animElement);
  }


  addAnimateY() {
    this.timer = setInterval(() => {
      this.updateParticle()
    }, 20)
  }


  updateParticle() { // Update particle position and velocity
    this.velocityY += this.gravity; // Increase in speed due to gravity
    this.y += this.velocityY; // Speed makes position increase
    if (this.y > height - this.r) { // If the bottom is reached, the speed is reversed and reduced by a certain value to simulate a bounce
      this.y = height - this.r;
      this.velocityY = -this.velocityY * 0.2;
      if (this.velocityY > -0.1) {
        clearInterval(this.timer)
        svg.removeChild(this.svgElement)
        this.y = this.initY
        this.x = this.initX
        this.drawParticle()
      }
    }
    this.svgElement.setAttribute('cy', this.y); // Update particle position
  }
}


function createParticlesArray(num) {
  let particleInstances = [];
  for (let i = 0; i < num; i++) {
    let particleX = width/2;
    let particleY = height/4;
    let particleSize = randomNum(width * 0.001, width * 0.008);
    particleInstances.push(new Particle(particleX, particleY, particleSize));
  }
  return particleInstances;
}


function updateParticles() { // Update all particles
  for (let particle of particles) {
    particle.updateParticle();
  }
}



let particles = createParticlesArray(50);
for (let i = 0; i < particles.length; i ++) {
  setTimeout(() => {
    particles[i].drawParticle()
  }, i * 50)
}
