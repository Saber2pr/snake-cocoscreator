/*
 * @Author: saber2pr
 * @Date: 2019-03-17 18:59:46
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-17 19:32:55
 */
import { ListNode } from './List'

export type Front = 'left' | 'right' | 'up' | 'down'

export class Snake {
  constructor(...nodes: cc.Node[]) {
    this.foot = nodes.reduce(
      (pre, node) => new ListNode(node).set('pre')(pre),
      null as ListNode
    )
    this.step = this.foot.instance.getContentSize().width
  }
  private get head(): ListNode {
    let current = this.foot
    while (current.pre) {
      current = current.pre
    }
    return current
  }
  private foot: ListNode
  private step: number
  get length(): number {
    let index = 1
    let current = this.foot
    while (current.pre) {
      current = current.pre
      index++
    }
    return index
  }
  move(front: Front) {
    let current = this.foot
    while (current.pre) {
      const prePos = current.pre.instance.getPosition()
      current.instance.setPosition(prePos)
      current = current.pre
    }
    current.instance.setPosition(this.getNextPos(front))
    return this
  }
  eat(food: cc.Node) {
    this.head.pre = new ListNode(food)
  }
  private getNextPos(front: Front) {
    const p = this.head.instance.getPosition()
    switch (front) {
      case 'down':
        return cc.v2(p.x, p.y - this.step)
      case 'left':
        return cc.v2(p.x - this.step, p.y)
      case 'right':
        return cc.v2(p.x + this.step, p.y)
      case 'up':
        return cc.v2(p.x, p.y + this.step)
    }
  }
  meet(target: cc.Vec2) {
    const snakePos = this.head.instance.getPosition()
    return snakePos.equals(target)
  }
}
