const svg = document.getElementById("svg-canvas");

window.addEventListener("resize", resizeSvg);

function resizeSvg(){
    let bbox = svg.getBoundingClientRect();
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);

    for(let calss of svg.children){
      calss.setAttribute('',  Math.min(bbox.width, bbox.height) * 0.1);
  }
}
}