import { Bitmap, ColorFilter } from '@createjs/easeljs'

export const GRASS_TEXTURE = '/images/grass.jpg'

export default class Cell {
  constructor(stage, texture, position, callback) {
    this.stage = stage
    this.texture = texture
    this.extention = null
    this.owner = null
    this.position = position
    this.obj = new Bitmap(texture)
    this.obj.addEventListener('click', callback)
    this.obj.x = position.x * 50
    this.obj.y = position.y * 50
  }
  getTexture = () => {
    return this.texture
  }
  getRenderObject = () => {
    return this.obj
  }
  setExtention = (extention) => {
    this.extention = extention
    this.stage.addChild(this.extention.getRenderObject())
  }
  getExtention = () => {
    return this.extention
  }
  getPosition = () => this.position
  setOwner = (owner) => {
    this.owner = owner

    // Adding owner color to cell
    const filter = new ColorFilter(1, 1, 1, 1, owner.getColor()[0], owner.getColor()[1], owner.getColor()[2]);
    this.obj.filters = [filter];
    this.obj.cache(0, 0, this.obj.getBounds().width, this.obj.getBounds().height)
  }
}