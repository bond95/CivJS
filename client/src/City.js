import { Bitmap } from '@createjs/easeljs'

export default class City {
  constructor(position) {
    this.position = position
    this.obj = new Bitmap('/images/castle.png')
    this.obj.x = position.x * 50
    this.obj.y = position.y * 50
  }
  getRenderObject = () => {
    return this.obj
  }
}
