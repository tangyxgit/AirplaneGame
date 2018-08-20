class TheFirstPass extends Level{

	private mBgGame:BackgroundGame;
	private mBgSoundMusic:BgSoundMusic;
	private mGameTextMessage:egret.TextField;
	private mGameRestart:egret.TextField;
	
	public constructor(layour:eui.UILayer) {
		super(layour);	
	}

	public startGame(){
		super.startGame();
		//加载背景
        this.mBgGame = new BackgroundGame();
        this.addChild(this.mBgGame);
		this.mBgGame.startAnimationBg();
		//加载游戏音乐
		this.mBgSoundMusic = new BgSoundMusic();
		this.mBgSoundMusic.playMusic();
		//游戏结束提示
		this.mGameTextMessage = new egret.TextField();
		this.mGameTextMessage.textColor = 0xfffffff;
		this.mGameTextMessage.size = 40;
		this.mGameTextMessage.textAlign = "center"
		this.mGameTextMessage.x = 0;
		//重新开始
		this.mGameRestart = new egret.TextField();
		this.mGameRestart.textColor = 0xfffffff;
		this.mGameRestart.size = 40;
		this.mGameRestart.textAlign = egret.HorizontalAlign.CENTER;
		this.mGameRestart.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.mGameRestart.backgroundColor = 0x000000; 
		this.mGameRestart.text = "再来一次"
		this.mGameRestart.touchEnabled = true;
		this.mGameRestart.stroke = 1;
        this.mGameRestart.strokeColor = 0xffffff;
	}
	/**
	 * 游戏结束
	 */
	public endGame(){
		super.endGame();
		this.mBgSoundMusic.stopMusic();
		this.addChild(this.mBgGame);
		this.mBgGame.loadBackground();
		this.mGameTextMessage.text="游戏结束，你输了！";
		this.addChild(this.mGameTextMessage);
		this.addChild(this.mGameRestart);
		this.mGameRestart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.restartGame,this);
	}
	public restartGame(){
		this.mGameRestart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.restartGame,this);
		super.endGame();
		this.startGame();
	}
}