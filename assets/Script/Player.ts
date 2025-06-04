import { _decorator, Component, input, Input, KeyCode, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Player')
export class Player extends Component {
	/** 按下的按键 */
	private downingKeyMap = {
		[KeyCode.KEY_W]: false,
		[KeyCode.KEY_A]: false,
		[KeyCode.KEY_S]: false,
		[KeyCode.KEY_D]: false,
	}

	start() {}

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

	move() {
		for (const keyCode in this.downingKeyMap) {
			if (this.downingKeyMap[keyCode]) {
				// 移动
				console.log(keyCode)
			}
		}
	}
}
