document.addEventListener("DOMContentLoaded", function () {

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // this function runs when the DOM is ready, i.e. when the document has been parsed
    const codeText = document.querySelector(".code-text");
    const bubbles = document.getElementsByClassName("code-bubble");
    const skillsText = document.querySelector(".skill-text");
    const rectangles = document.getElementsByClassName("skill-rectangle");
    codeText.addEventListener("mouseover", async e => {

        for (let i = 0; i < bubbles.length; i++) {
            theta = 2 * Math.PI / bubbles.length * i;
            dtheta = Math.PI / 6 * (Math.random() - 1);
            dy = 300 * Math.sin(theta + dtheta);
            dx = 300 * Math.cos(theta + dtheta);
            console.log()
            bubbles[i].style.opacity = "100%"
            bubbles[i].style.transform = `translate(${dx}%, ${dy}%)`;
            bubbles[i].style.transition = "2.5s";
            bubbles[i].style.transitionTimingFunction = `cubic-bezier(0,1,.75,1)`;
            await sleep(100);
        }

    });
    codeText.addEventListener("mouseleave", async e => {
        for (let bubble of bubbles) {
            bubble.style.transform = "translate(0%)";
            bubble.style.transition = "2s";
            bubble.style.transitionTimingFunction = `cubic-bezier(0,.3,.5,1)`
            await sleep(100);
            bubble.style.opacity = "0%"
        }

    });
    skillsText.addEventListener("mouseover", async e => {
        for (let i = 0; i < rectangles.length; i++) {
            theta = 2 * Math.PI / rectangles.length * i - 3 * Math.PI / 4;
            dtheta = Math.PI / 6 * (Math.random() - 1);
            dy = 200 * Math.sin(theta + dtheta);
            dx = 200 * Math.cos(theta + dtheta);
            console.log()
            rectangles[i].style.opacity = "100%"
            rectangles[i].style.transform = `translate(${dx}%, ${dy}%)`;
            rectangles[i].style.transition = "1s";
            rectangles[i].style.transitionTimingFunction = `cubic-bezier(0,1,.75,1)`;
            await sleep(100);
        }

    });
    skillsText.addEventListener("mouseleave", async e => {
        for (let rect of rectangles) {
            rect.style.transform = "translate(0%)";
            rect.style.transition = "2s";
            rect.style.transitionTimingFunction = `cubic-bezier(0,1,.5,1)`
            await sleep(100);
            rect.style.opacity = "0%"
        }

    });
});
