# snake-cocoscreator

> use Singly linked list, language typescript, based on cocos-creator

> 需要键盘控制（wasd）.

[view>>](https://saber2pr.github.io/MyWeb/build/snake/build/web-mobile/)

```ts
export type Front = 'left' | 'right' | 'up' | 'down'

export class Snake {
  constructor(...nodes: cc.Node[]) {
    this.foot = nodes.reduce(
      (pre, node) => new List(node).set('pre')(pre),
      null as List
    )
    this.step = this.foot.instance.getContentSize().width
  }
  private get head(): List {
    let current = this.foot
    while (current.pre) {
      current = current.pre
    }
    return current
  }
  private foot: List
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
    this.head.pre = new List(food)
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
```

## Author

> Saber2pr
