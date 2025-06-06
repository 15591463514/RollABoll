import { _decorator, Component, Node, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('FollowTarget')
export class FollowTarget extends Component {
	/** 目标 */
	@property(Node)
	public target: Node

	protected offset: Vec3 = null

	start() {
		const pos_camera = this.node.position
		const pos_target = this.target.position
		this.offset = pos_camera.clone().subtract(pos_target)
	}

	update(deltaTime: number) {
		// this.node.position = this.target.position.clone().add(this.offset)
	}

	protected lateUpdate(dt: number): void {
		// 将视野跟随设置到帧数更新后
		this.node.position = this.target.position.clone().add(this.offset)
	}
}
