
export default class Button {
  constructor(context, element, classname, text, offset) {
    this.context = context;
    this.element = element;
    this.classname = classname;
    this.text = text;
    this.offset = offset;
    this.width = this.width();
    this.height = this.height();
    this.element = this.creatElem();
    this.addDom = this.addDom();
    return this.addDom;
  }

  addDom() {
    const addedtodom = this.context.add.dom(this.width, this.height, this.element);
    return addedtodom;
  }

  creatElem() {
    const el = document.createElement(this.element);
    el.className = this.classname;
    el.textContent = this.text;

    return el;
  }

  width() {
    const { width } = this.context.scale;
    return width / 2;
  }

  height() {
    const { height } = this.context.scale;
    return height / 2 + this.offset;
  }
}
