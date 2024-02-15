// document.addEventListener("DOMContentLoaded", function(){
//     const numBlobs = 4;
//     const container = document.querySelector(".background")
//     const min_size = 0.1*Math.max(document.body.clientHeight, document.body.clientWidth)
//     const max_size = 0.5*Math.max(document.body.clientHeight, document.body.clientWidth)
//     const colors = {green: '#39512a', blue: '#33596b', orange: '#d1603d', yellow: '#fba456'}
//     // const dark = "#343434";
//     // const light: "#d9d9d9";

//     for(let i = 0; i < numBlobs; i++){
//         const blob = document.createElement('div');
//         blob.classList.add('blob');
//         container.appendChild(blob);
//         const w_size = min_size + Math.random()*(max_size-min_size);
//         console.log(w_size)
//         const h_size = min_size + Math.random()*(max_size-min_size);
//         const x = Math.random() * 70;
//         const y = Math.random() * 70;

//         blob.style.width = w_size + 'px';
//         blob.style.height = h_size + 'px';
//         blob.style.top = x + 'vh';
//         blob.style.left = y + 'vw';
//         blob.style.backgroundColor = Object.values(colors)[i];
//     }

//     function moveBlobs(){
//         const blobs = document.querySelectorAll('.blobs');
//         blobs.forEach(blob => {
//             const xOffset = (Math.random() - 0.5) * 10;
//             const yOffset = (Math.random() - 0.5) * 10;
//             blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
//             // blob.style.transform = `scale(${Math.random() * 2})`;
//         });

//         requestAnimationFrame(moveBlobs);
//     }

//     moveBlobs();
// })