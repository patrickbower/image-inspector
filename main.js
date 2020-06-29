const settings = {
  widgetElement: undefined,
  zoomWidget: 'widget',
  zoomImg: 'widget__zoom-img'
}

const createZoomImgEle = (zoomImgEle) => {
  // get image src from data attr in DOM element
  const zoomImageUrl = zoomImgEle.dataset.zoomImg;
  // create an image element in memory
  const img = new Image();
  // set image src to load image element in memory
  img.src = zoomImageUrl;
  // get original width from element in memory
  const zoomImageWidth = img.width;
  // get original height from element in memory
  const zoomImageHeight = img.height;
  // create background image on DOM widget element
  zoomImgEle.setAttribute('style',` 
    background-image: url(${zoomImageUrl}); 
    background-size: ${zoomImageWidth}px ${zoomImageHeight}px; 
    background-position: 0 0;
    `);
}

const hoverPosition = (event) => {
  const zoomImg = event.target.getBoundingClientRect();
  // x position within image
  const pointerX = event.clientX - zoomImg.left;
  // y position within image
  const pointerY = event.clientY - zoomImg.top;  

  const positionX = Math.floor((pointerX / zoomImg.width) * 100);
  const positionY = Math.floor((pointerY / zoomImg.height) * 100);

  event.target.style.backgroundPosition = `${positionX}% ${positionY}%`;
}

const addEvents = (zoomImgEle) => {
  zoomImgEle.addEventListener('mousemove', hoverPosition);
}

// Start when page has loaded
window.addEventListener("load", () => {
  // get widget instance (if multiple loop to initialize each instance)
  const zoomImgEle = document.querySelector(`.${settings.zoomImg}`);
  // setup zoom image
  createZoomImgEle(zoomImgEle);
  // add events
  addEvents(zoomImgEle);
});