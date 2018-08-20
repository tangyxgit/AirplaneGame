var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BgSoundMusic = (function () {
    function BgSoundMusic() {
    }
    /**
     * 开始播放音乐
     */
    BgSoundMusic.prototype.playMusic = function () {
        var sound = new egret.Sound();
        var url = "resource/assets/gamemusic.mp3";
        sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        sound.load(url);
    };
    BgSoundMusic.prototype.onLoadComplete = function (event) {
        //获取加载到的 Sound 对象
        var sound = event.target;
        //播放音乐
        this.mSoundChannel = sound.play(0, 0);
    };
    /**
     * 停止
     */
    BgSoundMusic.prototype.stopMusic = function () {
        if (this.mSoundChannel) {
            this.mSoundChannel.stop();
            this.mSoundChannel = null;
        }
    };
    return BgSoundMusic;
}());
__reflect(BgSoundMusic.prototype, "BgSoundMusic");
//# sourceMappingURL=BgSoundMusic.js.map