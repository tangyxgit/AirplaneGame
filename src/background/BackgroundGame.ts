class BackgroundGame extends egret.DisplayObjectContainer{

	/**
	 * 地图上半部分（隐藏）
	 */
	private mBackgroundTop:egret.Bitmap;
	/**
	 * 地图显示部分
	 */
	private mBackgroundBottom:egret.Bitmap;
	/**
	 * 屏幕的高度
	 */
	private stageH:number;
	/**
	 * 地图滚动速度，越小滚动越快。毫秒
	 */
	private mBgSpeed = 4000;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.loadBackground,this);
	}

	public loadBackground() : void{
		//游戏背景上半部分资源加载
		this.mBackgroundTop = ImageResUtils.createBitmapByName("background_jpg");
        this.addChild(this.mBackgroundTop);
        let stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.mBackgroundTop.width = stageW;
        this.mBackgroundTop.height = this.stageH;
		this.mBackgroundTop.y = -this.stageH;
		/**
		 * 游戏背景下半部分资源
		 */
		this.mBackgroundBottom = ImageResUtils.createBitmapByName("background_jpg");
		this.mBackgroundBottom.width = stageW;
        this.mBackgroundBottom.height = this.stageH;
 		this.addChild(this.mBackgroundBottom);
	}
	/**
	 * 游戏背景动画开始
	 */
	public startAnimationBg(){
		egret.Tween.get(this.mBackgroundTop,{loop:true}).to({y:0},this.mBgSpeed);
		egret.Tween.get(this.mBackgroundBottom,{loop: true}).to({y:this.stageH},this.mBgSpeed);
	}
}