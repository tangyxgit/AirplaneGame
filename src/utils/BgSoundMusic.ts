class BgSoundMusic {
	
	private mSoundChannel:egret.SoundChannel;

	public constructor() {
		
	}
	/**
	 * 开始播放音乐
	 */
	public playMusic(){
		var sound:egret.Sound = new egret.Sound();
		var url:string="resource/assets/gamemusic.mp3";
		sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
		sound.load(url);
	}
	private onLoadComplete(event:egret.Event):void {
		//获取加载到的 Sound 对象
		var sound:egret.Sound = <egret.Sound>event.target;
		//播放音乐
		this.mSoundChannel = sound.play(0,0);
    }
	/**
	 * 停止
	 */
	public stopMusic(){
		if(this.mSoundChannel){
			this.mSoundChannel.stop();
			this.mSoundChannel = null;
		}
	}
}