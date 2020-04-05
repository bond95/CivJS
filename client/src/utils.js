import PF from 'pathfinding'

export const CELLS_FOR_WIDTH = 20
export const CELLS_FOR_HEIGHT = 12
export const CELL_SIZE = 50

export const calculateRoute = (src, dist) => {
  let grid = new PF.Grid(CELLS_FOR_WIDTH, CELLS_FOR_HEIGHT)
  let finder = new PF.AStarFinder({
    allowDiagonal: false
  });
  return finder.findPath(src.x, src.y, dist.x, dist.y, grid);
}
