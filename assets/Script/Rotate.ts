import { _decorator, Component, Node, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Rotate')
export class Rotate extends Component {
    start() {}

    update(deltaTime: number) {
        console.log('this.node.eulerAngles', this.node.eulerAngles)
    }
}
