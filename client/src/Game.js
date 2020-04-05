import { Container, Text, Shape } from '@createjs/easeljs'
import Cell, { GRASS_TEXTURE } from './Cell'
import Player from './Player'
import Settler from './Units/Settler'
import { CELLS_FOR_WIDTH, CELLS_FOR_HEIGHT, CELL_SIZE } from './utils'

const createButton = (text, callback) => {
  let background = new Shape()
  background.name = 'background'
  background.graphics.beginFill('red').drawRoundRect(0, 0, 100, 40, 10)
  background.cursor = 'pointer';

  let label = new Text(text, 'bold 12px Arial', '#FFFFFF')
  label.name = 'label'
  label.textAlign = 'center'
  label.textBaseline = 'middle'
  label.x = 100/2
  label.y = 40/2

  let button = new Container()
  button.name = 'button'
  button.addChild(background, label)
  button.cursor = 'pointer';
  button.addEventListener('click', callback)
  return button
}

export default class Game {
  start = (stage) => {
    this.map = []
    this.stage = stage
    this.menu = new Container();
    this.menu.x = 800
    this.menu.y = 400
    for (let i = 0; i < CELLS_FOR_HEIGHT; i++) {
      for (let j = 0; j < CELLS_FOR_WIDTH; j++) {
        const cell = new Cell(stage, GRASS_TEXTURE, () => this.unitStep(j, i))
        cell.setPositionToRender({ x: j * 50, y: i * 50 })
        this.map.push(cell)
        this.stage.addChild(cell.getRenderObject())
      }
    }
    const settler = new Settler({ x: 0, y: 0 }, this.setActive)
    this.stage.addChild(settler.getRenderObject())
    this.player = new Player(stage, [settler])
    this.activeObject = null
    this.prevActiveObject = null

    this.stage.addChild(this.menu)
  }
  nextStep = () => {
    this.player.nextStep()
  }
  unitStep = (x, y) => {
    if (this.activeObject !== null) {
      this.activeObject.setDesctination({ x, y })
    }
  }
  renderMenu = () => {
    if (this.activeObject !== null && this.activeObject !== this.prevActiveObject) {
      this.menu.removeAllChildren()
      const { x: objX, y: objY } = this.activeObject.getPosition()
      let numberOfButtons = 1
      const cell = this.map[objY * CELLS_FOR_WIDTH + objX]
      const buttonNextStep = createButton('Next step', this.nextStep)
      this.menu.addChild(buttonNextStep)
      for (let action of this.activeObject.getActions()) {
        if (action.isEnabled(cell)) {
          const button = createButton(action.title, () => action.action(cell))
          button.y = numberOfButtons * 50
          numberOfButtons++
          this.menu.addChild(button)
        }
      }
      this.prevActiveObject = this.activeObject
    }
  }
  setActive = (activeObj) => {
    this.prevActiveObject = this.activeObject
    this.activeObject = activeObj
  }
  render = () => {
    this.renderMenu()
    this.stage.update()
  }
}