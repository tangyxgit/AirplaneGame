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
var BackgroundGame = (function (_super) {
    __extends(BackgroundGame, _super);
    function BackgroundGame() {
        var _this = _super.call(this) || this;
        /**
         * 地图滚动速度，越小滚动越快。毫秒
         */
        _this.mBgSpeed = 4000;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.loadBackground, _this);
        return _this;
    }
    BackgroundGame.prototype.loadBackground = function () {
        //游戏背景上半部分资源加载
        this.mBackgroundTop = ImageResUtils.createBitmapByName("background_jpg");
        this.addChild(this.mBackgroundTop);
        var stageW = this.stage.stageWidth;
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
    };
    /**
     * 游戏背景动画开始
     */
    BackgroundGame.prototype.startAnimationBg = function () {
        egret.Tween.get(this.mBackgroundTop, { loop: true }).to({ y: 0 }, this.mBgSpeed);
        egret.Tween.get(this.mBackgroundBottom, { loop: true }).to({ y: this.stageH }, this.mBgSpeed);
    };
    return BackgroundGame;
}(egret.DisplayObjectContainer));
__reflect(BackgroundGame.prototype, "BackgroundGame");
//# sourceMappingURL=BackgroundGame.js.map