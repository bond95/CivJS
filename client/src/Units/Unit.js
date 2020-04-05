import { Bitmap } from '@createjs/easeljs'
import { calculateRoute } from '../utils'
export const NON_WARRIOR_TYPE = 1
export const WARRIOR_TYPE = 2

export default class Unit {
  constructor(position, type, sprite, steps, actions, activateCallback) {
    this.position = position
    this.type = type
    this.steps = steps
    this.stepsLeft = steps
    this.actions = actions
    this.path = null
    this.obj = new Bitmap(sprite)
    this.obj.x = position.x * 50
    this.obj.y = position.y * 50
    this.obj.addEventListener('click', () => activateCallback(this))
  }
  getActions = () => {
    return this.actions
  }
  getPosition = () => {
    return this.position
  }
  getRenderObject = () => {
    return this.obj
  }
  setPlayer = (player) => {
    this.player = player
  }
  setDesctination = (destination) => {
    this.path = calculateRoute(this.position, destination)
    this.path.shift()
    this.move()
  }
  rechargeSteps = () => {
    this.stepsLeft = this.steps
  }
  move = () => {
    if (this.path) {
      for (; this.stepsLeft >= 0; this.stepsLeft--) {
        if (this.path.length === 0) {
          this.path = null
          break
        }
        const [posX, posY] = this.path.shift()
        this.position.x = posX
        this.position.y = posY
        this.obj.x = this.position.x * 50
        this.obj.y = this.position.y * 50
      }
    }
  }
}
