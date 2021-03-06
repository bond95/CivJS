import Unit, { NON_WARRIOR_TYPE } from './Unit'
import City from '../City'

export default class Settler extends Unit {
  constructor(position, activateCallback) {
    super(
      position,
      NON_WARRIOR_TYPE,
      './images/settler.png',
      2,
      [
        {
          title: 'Settle city',
          action: (cell, neighbourCells) => {
            const city = new City(cell, this.player)
            cell.setExtention(city)
            neighbourCells.forEach(v => city.addTerritory(v))
            this.player.removeUnit(this)
          },
          isEnabled: (cell) => {
            return cell.getExtention() === null && this.stepsLeft > 0
          },
        },
      ],
      activateCallback
    )
  }
}
