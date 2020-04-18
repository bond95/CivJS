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
    this.menu = new Container()
    this.menu.x = 800
    this.menu.y = 400

    this.initMap()

    for (let i = 0; i < CELLS_FOR_HEIGHT; i++) {
      for (let j = 0; j < CELLS_FOR_WIDTH; j++) {
        const cell = new Cell(this.mapContainer, GRASS_TEXTURE, { x: j, y: i }, () => this.unitStep(j, i))
        this.map.push(cell)
        this.mapContainer.addChild(cell.getRenderObject())
      }
    }
    const settler = new Settler({ x: 0, y: 0 }, this.setActive)
    this.mapContainer.addChild(settler.getRenderObject())
    this.player = new Player(this.mapContainer, [settler])
    this.activeObject = null
    this.prevActiveObject = null
    this.renderMenu()

    this.stage.addChild(this.mapContainer)
    this.stage.addChild(this.menu)
  }

  initMap = () => {
    this.mapOffsetX = 0
    this.mapOffsetY = 0
    this.mapContainer = new Container()
    // Save mouse start position
    this.mapContainer.on('mousedown', (evt) => {
      this.mapOffsetX = evt.stageX - this.mapContainer.x;
      this.mapOffsetY = evt.stageY - this.mapContainer.y;
    });

    this.mapContainer.on('pressmove', (evt) => {
      this.mapContainer.x = evt.stageX - this.mapOffsetX;
      this.mapContainer.y = evt.stageY - this.mapOffsetY;
    });

  }

  nextStep = () => {
    this.player.nextStep()
    this.renderMenu()
  }
  unitStep = (x, y) => {
    if (this.activeObject !== null) {
      this.activeObject.setDesctination({ x, y })
      this.renderMenu()
    }
  }
  renderMenu = () => {
    this.menu.removeAllChildren()

    const buttonNextStep = createButton('Next step', this.nextStep)
    this.menu.addChild(buttonNextStep)

    this.prevActiveObject = this.activeObject
    // Adding actions of active object
    if (this.activeObject !== null) {
      let numberOfButtons = 1
      const { x: objX, y: objY } = this.activeObject.getPosition()
      const cell = this.map[objY * CELLS_FOR_WIDTH + objX]

      // Calculating of neighbour cells
      const neighbourCells = this.map.filter((v, i) => {
        const nX = i % CELLS_FOR_WIDTH
        const nY = Math.floor(i / CELLS_FOR_WIDTH)
        const absX = Math.abs(nX - objX)
        const absY = Math.abs(nY - objY)
        return (absX <= 1 && absY <= 1) && !(absX === 0 && absY === 0)
      })

      // Creating buttons for action
      for (let action of this.activeObject.getActions()) {
        if (action.isEnabled(cell)) {
          const button = createButton(action.title, () => {
            action.action(cell, neighbourCells)
            this.activeObject = null
          })
          button.y = numberOfButtons * 50
          numberOfButtons++
          this.menu.addChild(button)
        }
      }
    }
  }
  setActive = (activeObj) => {
    this.prevActiveObject = this.activeObject
    this.activeObject = activeObj
  }
  render = () => {
    if (this.activeObject !== this.prevActiveObject) {
      this.renderMenu()
    }
    this.stage.update()
  }
}