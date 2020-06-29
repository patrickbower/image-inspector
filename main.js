const settings = {
  zoomWidget: 'widget-zoom'
}

const createZoomEle = (zoomEle) => {
  // get image src from data attr in DOM element
  const zoomImageUrl = zoomEle.dataset.zoomImgSrc;
  // create background image on DOM widget element
  zoomEle.setAttribute('style',`background-image: url(${zoomImageUrl});`);
}

const hoverPosition = (event) => {
  console.log(event.target);
  // get coordinates
  const zoomImg = event.target.getBoundingClientRect();
  // x position within image as %
  const pointerX = event.clientX - zoomImg.left;
  const positionX = (pointerX / zoomImg.width) * 100;
  // y position within image as %
  const pointerY = event.clientY - zoomImg.top;  
  const positionY = (pointerY / zoomImg.height) * 100;
  // use css transform origin for position
  event.target.style.transformOrigin = `${positionX}% ${positionY}%`;
  // use css transform scale for size
  const scale = event.target.dataset.zoomImgScale;
  event.target.style.transform = `scale(${scale})`; 
}

// const resetPosition = (event) => {
//   event.target.style.transform = '';
//   event.target.style.transformOrigin = '';
// }

const addEvents = (zoomEle) => {
  zoomEle.addEventListener('mousemove', hoverPosition);
}

// Start when page has loaded
window.addEventListener("load", () => {
  // get widget instance (if multiple loop to initialize each instance)
  const zoomEle = document.querySelector(`.${settings.zoomWidget}`);
  // setup zoom image
  createZoomEle(zoomEle);
  // add events
  addEvents(zoomEle);
});