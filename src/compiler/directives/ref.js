/* @flow */

import { addHook } from '../helpers'

export function ref (el: ASTElement, dir: ASTDirective) {
  // go up and check if this node is inside a v-for
  let isFor = false
  let parent = el
  while (parent) {
    if (parent.for !== undefined) {
      isFor = true
    }
    parent = parent.parent
  }
  // registerRef: _r(name, ref, vFor?, remove?)
  const code = `_r("${dir.arg}",n1.child||n1.elm,${isFor ? 'true' : 'false'}`
  addHook(el, 'insert', `${code},false)`)
  addHook(el, 'destroy', `${code},true)`)
}