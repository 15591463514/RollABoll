import { _decorator, Component, Node, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Rotate')
export class Rotate extends Component {
	@property
	rotateSpeedX: number = 0
	@property
	rotateSpeedY: number = 0
	@property
	rotateSpeedZ: number = 0

	start() {}

	update(deltaTime: number) {
		this.rotate(
			deltaTime * this.rotateSpeedX,
			deltaTime * this.rotateSpeedY,
			deltaTime * this.rotateSpeedZ,
		)
	}

	rotate(angleX, angleY, angleZ) {
		this.node.eulerAngles = new Vec3(
			this.node.eulerAngles.x + angleX,
			this.node.eulerAngles.y + angleY,
			this.node.eulerAngles.z + angleZ,
		)
	}
}
