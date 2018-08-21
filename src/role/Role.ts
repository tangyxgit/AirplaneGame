class Role extends egret.DisplayObjectContainer{
	/**
	 * 屏幕高宽
	 */
	private mStageW:number=0;
	private mStageH:number=0;
	/**
	 * 角色的血量
	 */
	private mBlood:number=0;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createAirplane,this);
	}
	/**
	 * 创建角色
	 */
	public createAirplane():void{
		this.mStageW = this.stage.stageWidth;
		this.mStageH = this.stage.stageHeight;
	}
	/**
	 * 检测敌机之间碰撞
	 */
	public checkCollosion(x:number,y:number,obj:egret.DisplayObjectContainer):boolean{
		return false;
	}
	/**
	 * 更新角色的血量
	 */
	public updateBlood():void{

	}
	public setBlood(blood:number){
		if(blood<=0){
			blood = 0;
		}
		this.mBlood = blood;
	}
	public getBlood():number{
		return this.mBlood
	}
	/**
	 * 获取屏幕高宽
	 */
	public getStageW() : number{
		return this.mStageW;
	}

	public getStageH() : number{
		return this.mStageH;
	}
	/**
	 * 获取角色位置
	 */
	public getX():number{
		return 0;
	}
	public getY():number{
		return 0;
	}
	/**
	 * 角色高宽
	 */
	public getWidth():number{
		return 0;
	}
	public getHeight():number{
		return 0;
	}
	
}