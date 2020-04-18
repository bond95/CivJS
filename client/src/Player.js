const colors = [
  [0, 60, 0],
  [60, 0, 0],
  [0, 0, 60],
  [60, 0, 60],
  [60, 60, 0],
]

export default class Player {
  constructor(stage, units) {
    this.stage = stage
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.units = [...units]
    for (let unit of this.units) {
      unit.setPlayer(this)
    }
  }
  removeUnit = (unit) => {
    this.units.splice(this.units.indexOf(unit), 1)
    this.stage.removeChild(unit.getRenderObject())
  }
  getColor = () => this.color
  nextStep = () => {
    for (let unit of this.units) {
      unit.move()
      unit.rechargeSteps()
    }
  }
}