// Draw a square on screen.
import { Stage, Shape, Ticker } from '@createjs/easeljs'
import Game from './Game'

let stage = new Stage('myCanvas')
stage.enableMouseOver(20)
stage.mouseChildren = true;
const game = new Game()
game.start(stage)
Ticker.on('tick', tick);
function tick(event) {
	game.render()
}
