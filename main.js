const selector = {
  zoomWidget: 'widget-zoom',
  zoomImage: 'widget-zoom-img',
  zoomEnabled: 'js-enabled-widget-zoom',
  zoomMin: 'data-zoom-img-scale-min',
  zoomMax: 'data-zoom-img-scale-max',
  zoomAmount: 'data-zoom-amount',
  imgTags: 'widget-zoom-img-tag-group',
  imgTagLevel: 'data-zoom-level'
}

class Zoom {
  constructor(component){
    this.getElements(component);
    this.setUpZoom();
    this.bindEvents();
  }
  
  getElements(component){
    this.component = component;
    this.zoomImg = component.querySelector(`.${selector.zoomImage}`);
  }

  setUpZoom(){
    this.getSizes();
    this.setupZoomImageStyles();
    this.setupZoomImageElement();
  }

  getSizes(){
    this.zoomImgSize = this.zoomImg.getBoundingClientRect();
    this.scales = this.getScales();
  }

  setupZoomImageStyles() {
    this.component.classList.add(`${selector.zoomEnabled}`);
  }

  setupZoomImageElement() {
    this.imgTags = this.zoomImg.querySelectorAll(`.${selector.imgTags}`);
    this.setScale(this.scales.current);
    // setupZoomImageElement - add src to element?
  }

  turnToPercentage(x, ofY) {
    return (x / ofY) * 100;
  }

  // horizontal coordinate - left position relative to the viewport
  // convert into percentage from left
  getHorizontalPosition(event){
    const pointerX = event.clientX - this.zoomImgSize.left;
    return this.turnToPercentage(pointerX, this.zoomImgSize.width);
  }

  getVerticalPosition(event){
    const pointerY = event.clientY - this.zoomImgSize.top;
    return this.turnToPercentage(pointerY, this.zoomImgSize.height); 
  }

  // set inline css transform x% and y% position
  changePosition(x, y) {
    this.zoomImg.style.transformOrigin = `${x}% ${y}%`;
  }

  getZoomImgDataInt(dataAttr){
    return parseInt(this.component.getAttribute(dataAttr));
  }

  getScales(){
    const min = this.getZoomImgDataInt(selector.zoomMin);
    const max = this.getZoomImgDataInt(selector.zoomMax);
    const current = this.getZoomImgDataInt(selector.zoomAmount);
    return ({min, max, current});
  }

  setScale(scale){
    this.zoomImg.style.transform = `scale(${scale})`;
    this.component.dataset.zoomAmount = `x${scale}`;
    this.displayImgTags();
  }

  filterImgTags(scale){
    return Array.from(this.imgTags).filter((node) => {
      const tagLevel = parseInt(node.getAttribute(selector.imgTagLevel));
      return tagLevel <= scale;
    });
  }

  displayImgTags(){
    this.imgTags.forEach(node => node.classList.remove('display'));
    const filterTags = this.filterImgTags(this.scales.current);
    filterTags.forEach(node => node.classList.add('display'));
  }

  zoomImageOnHover(event){
    const positionX = this.getHorizontalPosition(event);
    const positionY = this.getVerticalPosition(event);
    this.changePosition(positionX, positionY);
  }

  zoomImageOnClick() {
    // zoom back to default if max reached
    if (this.scales.current === this.scales.max) {
      this.scales.current = this.scales.min;
    } else {
      this.scales.current++;
    }
    this.setScale(this.scales.current);
  }

  bindEvents() {
    this.zoomImg.addEventListener('mousemove', this.zoomImageOnHover.bind(this));
    this.zoomImg.addEventListener('click', this.zoomImageOnClick.bind(this));
  }
}

// find widgets setup each instance
window.addEventListener("load", () => {
  const zoomImageElement = document.querySelectorAll(`.${selector.zoomWidget}`);
  zoomImageElement.forEach((component) => {
    new Zoom(component);
  });
});