/*
 * @Author: saber2pr
 * @Date: 2019-03-17 19:00:50
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-03-17 19:00:50
 */
export class ListNode {
  constructor(public instance: cc.Node) {}
  public pre: ListNode
  set = <T extends keyof this>(key: T) => (value: this[T]) => {
    this[key] = value
    return this
  }
}
