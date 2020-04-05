import { Bitmap } from '@createjs/easeljs'

export const GRASS_TEXTURE = '/images/grass.jpg'

export default class Cell {
  constructor(stage, texture, callback) {
    this.stage = stage
    this.texture = texture
    this.extention = null
    this.obj = new Bitmap(texture)
    this.obj.addEventListener('click', callback)
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
  setPositionToRender = ({ x, y }) => {
    this.obj.x = x
    this.obj.y = y
  }
}