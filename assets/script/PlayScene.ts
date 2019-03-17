/*
 * @Author: saber2pr
 * @Date: 2019-03-17 19:00:58
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-17 19:38:21
 */
import { Snake, Front } from './Snake'

const { ccclass, property } = cc._decorator

@ccclass
export default class NewClass extends cc.Component {
  @property({
    type: [cc.Node],
    displayName: '蛇身体',
    tooltip: '按序号顺序排列'
  })
  nodes: cc.Node[] = []

  snake: Snake

  currentFood: cc.Node

  front: Front = 'up'

  @property({
    type: cc.Prefab,
    displayName: '食物预制体'
  })
  foodPreFab: cc.Prefab = null

  @property({
    type: cc.Node,
    displayName: '容器'
  })
  base: cc.Node = null

  @property({
    type: cc.Label,
    displayName: '分数显示'
  })
  score: cc.Label = null

  onLoad() {
    this.snake = new Snake(...this.nodes)
    this.addKeyListener()
    this.createFood()
  }

  start() {
    this.schedule(() => {
      if (this.snake.move(this.front).meet(this.currentFood.getPosition())) {
        this.snake.eat(this.currentFood)
        this.score.string = String(this.snake.length)
        this.createFood()
      }
    }, 1)
  }

  private addKeyListener() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, event => {
      switch (event.keyCode) {
        case cc.macro.KEY.a:
        case cc.macro.KEY.left:
          this.front = 'left'
          break
        case cc.macro.KEY.d:
        case cc.macro.KEY.right:
          this.front = 'right'
          break
        case cc.macro.KEY.w:
        case cc.macro.KEY.up:
          this.front = 'up'
          break
        case cc.macro.KEY.s:
        case cc.macro.KEY.down:
          this.front = 'down'
          break
      }
    })
  }

  getRandPos() {
    const step = 50
    const width = 700
    const height = 400
    const stepX = parseInt(String(this.getRandValue(0, width / step)))
    const stepY = parseInt(String(this.getRandValue(0, height / step)))
    return cc.v2(-width / 2 + step * stepX, -height / 2 + step * stepY)
  }

  getRandValue(min: number, max: number) {
    return min + (max - min) * Math.random()
  }

  getRandColor() {
    const sand = this.getRandValue(0, 10)
    return sand > 8
      ? cc.Color.CYAN
      : sand > 6
      ? cc.Color.GREEN
      : sand > 4
      ? cc.Color.RED
      : sand > 2
      ? cc.Color.BLUE
      : cc.Color.YELLOW
  }

  createFood() {
    this.currentFood = cc.instantiate(this.foodPreFab)
    this.currentFood.setPosition(this.getRandPos())
    this.currentFood.color = this.getRandColor()
    this.currentFood.setParent(this.base)
  }
}
