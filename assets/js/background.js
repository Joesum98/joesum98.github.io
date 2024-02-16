import { spline } from 'https://cdn.skypack.dev/@georgedoescode/spline@1.0.1';
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@2.4.0';

const colors = ['green', 'blue', 'orange', 'yellow'];

// our <path> element for each colored blob
const paths = [];
// How fast to update simplex noise
let noiseStep = 0.002

for (let color of colors){
    paths.push(document.getElementById(color));
}

// object to get simplex noise
const simplex = new SimplexNoise();

let maxStep = 40;

// Create a set of points to connect with a spline
function createPoints(){
    const points = [];
    const numPoints = 6;
    const dTheta = 2*Math.PI/numPoints;
    const rad = 75;

    for (let i=0; i <numPoints; i++){
        const theta = i * dTheta;

        const x = 100 + Math.cos(theta)*rad;
        const y = 100 + Math.sin(theta)*rad;
        
        //Store the points
        points.push({
            x:x,
            y:y,
            x0:x,
            y0:y,
            noiseOffsetX: Math.random()*1000,
            noiseOffsetY: Math.random()*1000,
        });
    }

    return points;
}

// Maps a number, n, from one range to another 
function map(n, start1, end1, start2, end2){
    let frac = (n-start1)/(end1-start1);
    let range = end2-start2;
    return start2+range*frac;
}

const shapes = [];
for (let color of colors){
    shapes.push(createPoints())
}

(function animate() {
    for (let i=0; i<colors.length; i++){
        let points = shapes[i]
        paths[i].setAttribute("d", spline(points, 1, true));
    
        // for every point...
        for (let i = 0; i < points.length; i++) {
        const point = points[i];
    
        // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
        const nX = simplex.noise2D(point.noiseOffsetX, point.noiseOffsetX);
        const nY = simplex.noise2D(point.noiseOffsetY, point.noiseOffsetY);
        // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
        const x = map(nX, -1, 1, point.x0 - maxStep, point.x0 + maxStep);
        const y = map(nY, -1, 1, point.y0 - maxStep, point.y0 + maxStep);
    
        // update the point's current coordinates
        point.x = x;
        point.y = y;
    
        // progress the point's x, y values through "time"
        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
        }
    }
    requestAnimationFrame(animate);
  })();

document.getElementById('logo').addEventListener('mouseover', () => {
    noiseStep = 0.01;
    let logo = document.getElementById('logo');
    logo.style.filter = 'drop-shadow(black 100px 100px 50px) brightness(150%)'
    logo.style.transform = 'translate(39vw, 34vh)';
    logo.style.transition = '1s'
});
    
document.getElementById('logo').addEventListener('mouseleave', () => {
    noiseStep = 0.003;
    logo.style.filter = 'drop-shadow(black 50px 50px 10px)';
    logo.style.opacity = '100%';
    logo.style.transform = 'translate(40vw, 35vh)';
});




  