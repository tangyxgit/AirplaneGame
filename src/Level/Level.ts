class Level {
	/**
	 * 容器
	 */
	private layour:eui.UILayer;
	/**
	 * 游戏状态
	 */
	public static GAME_READY:number = 1;
	public static GAME_ING:number = 2;
	public static GAME_PAUSE:number = 3;
	public static GAME_END:number = 4;
	public static GAME_STATE : number;

	public constructor(layour:eui.UILayer) {
		this.layour = layour;
		Level.GAME_STATE = Level.GAME_READY;
	}
	/**
	 * 游戏开始
	 */
	public startGame(){
		Level.GAME_STATE = Level.GAME_ING;
	}
	/**
	 * 游戏暂停
	 */
	public pauseGame(){
		Level.GAME_STATE = Level.GAME_PAUSE;
	}
	/**
	 * 重新开始
	 */
	public restartGame(){

	}
	/**
	 * 游戏结束
	 */
	public endGame(){
		Level.GAME_STATE = Level.GAME_END;
		this.layour.removeChildren();
	}
	/**
	 * 添加元素
	 */
	public addChild(child:egret.DisplayObject){
		this.layour.addChild(child);
	}
	public addChildAt(child:egret.DisplayObject,index:number){
		this.layour.addChildAt(child,index);
	}
	/**
	 * 容器全局变量
	 */
	public getContext():eui.UILayer{
		return this.layour;
	}
}