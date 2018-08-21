class Lead extends Role{
	/**
	 * 角色
	 */
	private mLead: egret.Bitmap; 
	/**
	 * 血量，主角血量默认为100
	 */
	private mBloodShape:egret.Shape;
	/**
	 * 主角分数
	 */
	private mScore:egret.TextField;
	private mScoreNumber:number=0;
	/**
	 * 主角控制器
	 */
	private mCollect: egret.Bitmap;
	private mTouchStatus: boolean = false;
	private mDistance:egret.Point = new egret.Point();
	/**
	 * 尾部喷气
	 */
	private mPlayblow : egret.Bitmap;
	private mPlayblowH : number;
	private mSpeedAngle : number;
	/**
	 * 主角出场完成
	 */
	private mTweenComplete: Function;
	private mLevel:Level;

	public constructor(tweenComplete:Function,level:Level) {
		super();
		this.mTweenComplete = tweenComplete;
		this.mLevel = level;
	}
	public createAirplane():void{
		super.createAirplane();
		this.setBlood(100);
		this.mSpeedAngle = 5;
		var stageW = this.getStageW();
		var stageH = this.getStageH();
		//主角
		this.mLead = ImageResUtils.createBitmapByName("lead_png");
        this.addChild(this.mLead);
        this.mLead.width = 68;
        this.mLead.height = 68;
		this.mLead.x = (stageW) / 2;
		this.mLead.y = stageH+this.mLead.height*2;
		//尾部火焰
		this.mPlayblow = ImageResUtils.createBitmapByName("playblow_png");
		this.addChildAt(this.mPlayblow,0);
		this.mPlayblowH = 65;
		this.mPlayblow.width = 68;
		this.mPlayblow.height =this.mPlayblowH;
		this.mPlayblow.x = this.mLead.x;
		this.mPlayblow.y = this.mLead.y + this.mLead.height / 1.5;
		var timer = new egret.Timer(5,0);
		timer.addEventListener(egret.TimerEvent.TIMER,this.startBlowAnimation,this);
		timer.start();
		//手指触摸位置控制器
		this.mCollect = ImageResUtils.createBitmapByName("playerunmatched_png");
		this.addChild(this.mCollect);
		this.mCollect.width = 68;
		this.mCollect.height = 68;
		this.mCollect.anchorOffsetX = this.mCollect.width / 2;
		this.mCollect.anchorOffsetY = this.mCollect.height / 2
		this.mCollect.x = this.mLead.x + this.mCollect.width/2;
		this.mCollect.y = this.mPlayblow.y+this.mPlayblow.height * 1.2;
		this.addEventListener(egret.Event.ENTER_FRAME,(evt:egret.Event)=>{
			this.mCollect.rotation+=10;
		},this);
		//进场动画
		var leadY = stageH - this.mLead.height * 3;
		egret.Tween.get(this.mLead).to({y:leadY},2500,egret.Ease.backInOut).call(this.mTweenComplete,this.mLevel);
		var playblowY = leadY + this.mLead.height / 1.5;
		egret.Tween.get(this.mPlayblow).to({y:playblowY},2500,egret.Ease.backInOut);
		egret.Tween.get(this.mCollect).to({y:playblowY+this.mPlayblow.height * 1.2},2500,egret.Ease.backInOut);
		//移动主角
		this.mCollect.touchEnabled = true;
		this.mCollect.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseDown,this);
		this.mCollect.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseUp,this);
		//初始化血量
		this.mBloodShape = new egret.Shape();
		this.addChild(this.mBloodShape);
		this.updateBlood();
		//分数
		this.mScore = new egret.TextField();
		this.mScore.textColor = 0xfffffff;
		this.mScore.width = 200;
		this.mScore.height = 100;
		this.mScore.textAlign = "center";
		this.mScore.x = 0;
		this.mScore.y = 30;
		this.addChild(this.mScore);
		this.updateScore();
	}
	/**
	 * 刷新主角血量
	 */
	public updateBlood():void{
		this.mBloodShape.graphics.clear();
		var blood:number = this.getBlood();
		if(blood==0){
			Level.GAME_STATE = Level.GAME_END;
		}
		if(blood>100){
			blood=100;
		}
		if(blood<=20){
			this.mBloodShape.graphics.beginFill(0xdc143c);
		}else{
			this.mBloodShape.graphics.beginFill(0xfffffff);
		}
		this.mBloodShape.graphics.drawRect(240,40,blood * 4,10);
		this.mBloodShape.graphics.endFill();
	}
	/**
	 * 刷新分数
	 */
	private updateScore():void{
		this.mScore.text = this.mScoreNumber.toString();
	}
	/**
	 * 按下
	 */
	private mouseDown(event: egret.TouchEvent) : void{
		this.mTouchStatus = true;
		this.mDistance.x = event.stageX - this.mLead.x;
		this.mDistance.y = event.stageY - this.mLead.y;
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
	};
	/**
	 * 移动
	 */
	private mouseMove(event: egret.TouchEvent) : void{
		if(this.mTouchStatus && this.getBlood()>0){
			var leadX:number = event.stageX - this.mDistance.x;
			var leadY:number = event.stageY - this.mDistance.y;
			leadX = leadX<0?0:leadX;
			leadX = leadX>this.getStageW()-this.mLead.width?this.getStageW()-this.mLead.width:leadX;
			leadY = leadY<0?0:leadY;
			leadY = leadY>this.getStageH()-this.mLead.height-this.mCollect.height?this.getStageH()-this.mLead.height-this.mCollect.height:leadY;
			this.mLead.x = leadX;
			this.mLead.y = leadY;
			//尾气火焰移动
			this.mPlayblow.x = this.mLead.x;
			this.mPlayblow.y = this.mLead.y + this.mLead.height / 1.5;
			//控制器
			this.mCollect.x = this.mLead.x + this.mCollect.width/2;
			this.mCollect.y = this.mPlayblow.y+this.mPlayblow.height * 1.2;
			this.mCollect.alpha = 0;
		}
	}
	/**
	 * 松开
	 */
	private mouseUp(event: egret.TouchEvent){
		this.mTouchStatus = false;
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.mouseMove,this);
		this.mCollect.alpha = 1;
	}
	/**
	 * 火焰喷射动画
	 */
	private startBlowAnimation() : void{
		this.mPlayblowH += this.mSpeedAngle;
		if(this.mPlayblowH>=75 || this.mPlayblowH<55){
			this.mSpeedAngle = -this.mSpeedAngle;
		}
		this.mPlayblow.height = this.mPlayblowH; 
	}
	public getX():number{
		return this.mLead.x;
	}
	public getY():number{
		return this.mLead.y;
	}
	public getWidth():number{
		return this.mLead.width;
	}
	public getHeight():number{
		return this.mLead.height;
	}
}