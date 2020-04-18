import { Bitmap } from '@createjs/easeljs'

export default class City {
  constructor(cell, player) {
    this.position = cell.getPosition()
    this.player = player
    this.obj = new Bitmap('/images/castle.png')
    this.obj.x = cell.getRenderObject().x
    this.obj.y = cell.getRenderObject().y
    this.territory = [cell]
    cell.setOwner(this.player)
  }
  addTerritory = (cell) => {
    this.territory.push(cell)
    cell.setOwner(this.player)
  }
  getRenderObject = () => {
    return this.obj
  }
}
