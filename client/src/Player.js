export default class Player {
  constructor(stage, units) {
    this.stage = stage
    this.units = [...units]
    for (let unit of this.units) {
      unit.setPlayer(this)
    }
  }
  removeUnit = (unit) => {
    this.units.splice(this.units.indexOf(unit), 1)
    this.stage.removeChild(unit.getRenderObject())
  }
  nextStep = () => {
    for (let unit of this.units) {
      unit.move()
      unit.rechargeSteps()
    }
  }
}