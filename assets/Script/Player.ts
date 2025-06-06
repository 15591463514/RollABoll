import { _decorator, Collider, Component, ICollisionEvent, input, Input, KeyCode, RigidBody, Vec3 } from 'cc'
import { Rotate } from './Rotate'
const { ccclass, property } = _decorator

@ccclass('Player')
export class Player extends Component {
	/** 方向映射 */
	static DIR_MOVE_MAP = {
		[KeyCode.KEY_W]: new Vec3(0, 0, -1),
		[KeyCode.KEY_A]: new Vec3(-1, 0, 0),
		[KeyCode.KEY_S]: new Vec3(0, 0, 1),
		[KeyCode.KEY_D]: new Vec3(1, 0, 0),
	} as const
	/** 按下的按键 */
	private downingKeyMap = {
		[KeyCode.KEY_W]: false,
		[KeyCode.KEY_A]: false,
		[KeyCode.KEY_S]: false,
		[KeyCode.KEY_D]: false,
	}
	/** 移动缩放倍数 */
	@property
	public force: number = 5
	/** 自身的碰撞器 */
	protected collider: Collider = null

	start() {
		this.collider = this.node.getComponent(Collider)
		this.collider.on('onTriggerEnter', this.onTriggerEnter, this)
	}

	update(deltaTime: number) {
		this.move()
	}

	protected onLoad(): void {
		input.on(Input.EventType.KEY_DOWN, this.keyDown, this)
		input.on(Input.EventType.KEY_UP, this.keyUp, this)
	}

	protected onDestroy(): void {
		input.off(Input.EventType.KEY_DOWN, this.keyDown, this)
		input.off(Input.EventType.KEY_UP, this.keyUp, this)
		this.collider.off('onTriggerEnter', this.onTriggerEnter, this)
	}

	/** 按下的按键列表 */
	get getDowningKeys() {
		return Object.entries(this.downingKeyMap)
			.filter(([_, value]) => value)
			.map(([key]) => key)
	}

	/** 获取按下按键列表对应的向量和 */
	get getDirVecList() {
		const values = Object.entries(Player.DIR_MOVE_MAP)
			.filter(([key]) => this.getDowningKeys.includes(key))
			.map(([_, value]) => value)
		return values
	}

	get getDirVecAdd() {
		return this.getDirVecList.reduce((pre, cur) => cur.clone().add(pre), new Vec3(0, 0, 0))
	}

	changeDowningKeys(dir: 'down' | 'up', keyCode: KeyCode): void {
		if (!(keyCode in this.downingKeyMap)) return
		this.downingKeyMap[keyCode] = dir === 'down'
	}

	keyDown(event: any): void {
		this.changeDowningKeys('down', event.keyCode)
	}

	keyUp(event: any): void {
		this.changeDowningKeys('up', event.keyCode)
	}

	/** 碰撞食物 */
	onTriggerEnter(event: ICollisionEvent) {
		const food = event.otherCollider.getComponent(Rotate)
		if (food) {
			food.node.destroy()
		}
	}

	move() {
		const rigidBody = this.getComponent(RigidBody)
		rigidBody.applyForce(this.getDirVecAdd.multiplyScalar(this.force))
	}
}
