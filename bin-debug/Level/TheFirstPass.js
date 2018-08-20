var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TheFirstPass = (function (_super) {
    __extends(TheFirstPass, _super);
    function TheFirstPass(layour) {
        return _super.call(this, layour) || this;
    }
    TheFirstPass.prototype.startGame = function () {
        _super.prototype.startGame.call(this);
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
        this.mGameTextMessage.textAlign = "center";
        this.mGameTextMessage.x = 0;
        //重新开始
        this.mGameRestart = new egret.TextField();
        this.mGameRestart.textColor = 0xfffffff;
        this.mGameRestart.size = 40;
        this.mGameRestart.textAlign = egret.HorizontalAlign.CENTER;
        this.mGameRestart.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.mGameRestart.backgroundColor = 0x000000;
        this.mGameRestart.text = "再来一次";
        this.mGameRestart.touchEnabled = true;
        this.mGameRestart.stroke = 1;
        this.mGameRestart.strokeColor = 0xffffff;
    };
    /**
     * 游戏结束
     */
    TheFirstPass.prototype.endGame = function () {
        _super.prototype.endGame.call(this);
        this.mBgSoundMusic.stopMusic();
        this.addChild(this.mBgGame);
        this.mBgGame.loadBackground();
        this.mGameTextMessage.text = "游戏结束，你输了！";
        this.addChild(this.mGameTextMessage);
        this.addChild(this.mGameRestart);
        this.mGameRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
    };
    TheFirstPass.prototype.restartGame = function () {
        this.mGameRestart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.restartGame, this);
        _super.prototype.endGame.call(this);
        this.startGame();
    };
    return TheFirstPass;
}(Level));
__reflect(TheFirstPass.prototype, "TheFirstPass");
//# sourceMappingURL=TheFirstPass.js.map