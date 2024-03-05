import { spline } from 'https://cdn.skypack.dev/@georgedoescode/spline@1.0.1';
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@2.4.0';

var logo = document.getElementById("logo");
var blur = document.getElementById("blur");
var splash = document.getElementsByClassName("splash")[0];
var nav = document.getElementsByClassName("nav")[0];
var hero = document.getElementsByClassName("hero")[0];
var about = document.getElementsByClassName("about")[0];
var skills = document.getElementsByClassName("skills-section")[0];

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
const colors = ['green', 'blue', 'orange', 'yellow'];
const numOfPoints = [4, 5, 6, 7];
let logoClicked = false;

// our <path> element for each colored blob
const paths = [];
// How fast to update simplex noise
var noiseStep = 0.003;

for (let color of colors) {
    paths.push(document.getElementById(color));
}

// object to get simplex noise
const simplex = new SimplexNoise();

let maxStep = 40;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Create a set of points to connect with a spline
function createPoints(numPoints) {
    const points = [];
    const dTheta = 2 * Math.PI / numPoints;
    const rad = 120;

    for (let i = 0; i < numPoints; i++) {
        const theta = i * dTheta;

        const x = 100 + Math.cos(theta) * rad;
        const y = 100 + Math.sin(theta) * rad;

        //Store the points
        points.push({
            x: x,
            y: y,
            x0: x,
            y0: y,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
        });
    }

    return points;
}

// Maps a number, n, from one range to another 
function map(n, start1, end1, start2, end2) {
    let frac = (n - start1) / (end1 - start1);
    let range = end2 - start2;
    return start2 + range * frac;
}

function storeLogo() {
    logoClicked = true;
    noiseStep = 0.003;
    logo.style.scale = '.46';
    logo.style.top = '-65px'
    logo.style.left = '47px'
    logo.style.transform = 'translate(0vw, 0vh)';
    logo.style.opacity = '0';
    logo.style.transition = '5s';
    document.body.style.overflow = "scroll";
    setTimeout(function () {
        logo.style.pointerEvents = "auto"
        noiseStep = 0;
        splash.style.display = 'none';
    }, 5000);
    nav.style.display = 'flex';
    hero.style.display = 'flex';
    about.style.display = 'grid';
    skills.style.display = 'flex';
}

function unstoreLogo() {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    logo.style.filter = 'drop-shadow(black 30px 30px 10px)';
    logo.style.scale = '1';
    logo.style.transform = 'translate(42vw, 36vh)';
    logo.style.padding = '0px';
    logo.style.transition = '4s';
    noiseStep = 0.003;
    logoClicked = false;
    setTimeout(function () {
        logo.style.pointerEvents = "auto"
        noiseStep = 0.003;
    }, 5000);
}

function deconstruct() {
    blur.style.width = '100vw';
    blur.style.height = "0vh";
    blur.style.backgroundColor = '#d9d9d920';
    blur.style.transition = '5s';
    for (let i = 0; i < colors.length; i++) {
        let blob = document.getElementById(colors[i]);
        blob.style.transform = 'translate(10vw, 8vh)  scale(0.05)';
        blob.style.opacity = '0';
        blob.style.transition = '5s';
    }
}

function construct() {
    blur.style.transform = 'translate(0%, 0%)';
    blur.style.width = '100vw';
    blur.style.height = "100vh";
    blur.style.backgroundColor = '#d9d9d900';
    blur.style.transition = '5s';
    document.getElementById("green").style.transform = "translate(35%, 40%) scale(1)";
    document.getElementById("blue").style.transform = "translate(-35%, 50%) scale(1)";
    document.getElementById("yellow").style.transform = "translate(-35%, -50%) scale(1)";
    document.getElementById("orange").style.transform = "translate(35%, -40%) scale(1)";
    noiseStep = 0.002;

}

const shapes = [];
for (let i = 0; i < colors.length; i++) {
    shapes.push(createPoints(numOfPoints[i]))
}

(function animate() {
    for (let i = 0; i < colors.length; i++) {
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

logo.addEventListener('mouseover', () => {
    if (!logoClicked) {
        noiseStep = 0.008;
        logo.style.filter = 'drop-shadow(black 60px 60px 40px) brightness(150%)'
        logo.style.transform = 'translate(41vw, 35vh)';
        logo.style.transition = '1s'
    }
    else {
        // logo.style.filter = 'drop-shadow(black 60px 60px 40px) brightness(150%)'
        logo.style.transform = 'translate(-1vw, -1vh)';
        logo.style.transition = '1s'
    }
});

logo.addEventListener('mouseleave', () => {
    if (!logoClicked) {
        noiseStep = 0.003;
        logo.style.filter = 'drop-shadow(black 30px 30px 10px)';
        logo.style.transform = 'translate(42vw, 36vh)';
        logo.style.transition = '1s'
    }
    else {
        logo.style.filter = 'none';
        logo.style.transform = 'translate(0vw, 0vh)';
        logo.style.transition = '1s'
    }
});

logo.onclick = function () {
    logo.style.pointerEvents = "none"
    if (!logoClicked) {
        // alert("This site is still a work in progress. Check back later.\nFor now, send me an email!");
        // open("mailto:joesum98@gmail.com");
        storeLogo();
        deconstruct();
    }
    else {
        unstoreLogo();
        construct();
    }

}