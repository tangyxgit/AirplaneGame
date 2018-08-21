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
var Lead = (function (_super) {
    __extends(Lead, _super);
    function Lead(tweenComplete, level) {
        var _this = _super.call(this) || this;
        _this.mScoreNumber = 0;
        _this.mTouchStatus = false;
        _this.mDistance = new egret.Point();
        _this.mTweenComplete = tweenComplete;
        _this.mLevel = level;
        return _this;
    }
    Lead.prototype.createAirplane = function () {
        var _this = this;
        _super.prototype.createAirplane.call(this);
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
        this.mLead.y = stageH + this.mLead.height * 2;
        //尾部火焰
        this.mPlayblow = ImageResUtils.createBitmapByName("playblow_png");
        this.addChildAt(this.mPlayblow, 0);
        this.mPlayblowH = 65;
        this.mPlayblow.width = 68;
        this.mPlayblow.height = this.mPlayblowH;
        this.mPlayblow.x = this.mLead.x;
        this.mPlayblow.y = this.mLead.y + this.mLead.height / 1.5;
        var timer = new egret.Timer(5, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.startBlowAnimation, this);
        timer.start();
        //手指触摸位置控制器
        this.mCollect = ImageResUtils.createBitmapByName("playerunmatched_png");
        this.addChild(this.mCollect);
        this.mCollect.width = 68;
        this.mCollect.height = 68;
        this.mCollect.anchorOffsetX = this.mCollect.width / 2;
        this.mCollect.anchorOffsetY = this.mCollect.height / 2;
        this.mCollect.x = this.mLead.x + this.mCollect.width / 2;
        this.mCollect.y = this.mPlayblow.y + this.mPlayblow.height * 1.2;
        this.addEventListener(egret.Event.ENTER_FRAME, function (evt) {
            _this.mCollect.rotation += 10;
        }, this);
        //进场动画
        var leadY = stageH - this.mLead.height * 3;
        egret.Tween.get(this.mLead).to({ y: leadY }, 2500, egret.Ease.backInOut).call(this.mTweenComplete, this.mLevel);
        var playblowY = leadY + this.mLead.height / 1.5;
        egret.Tween.get(this.mPlayblow).to({ y: playblowY }, 2500, egret.Ease.backInOut);
        egret.Tween.get(this.mCollect).to({ y: playblowY + this.mPlayblow.height * 1.2 }, 2500, egret.Ease.backInOut);
        //移动主角
        this.mCollect.touchEnabled = true;
        this.mCollect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.mCollect.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
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
    };
    /**
     * 刷新主角血量
     */
    Lead.prototype.updateBlood = function () {
        this.mBloodShape.graphics.clear();
        var blood = this.getBlood();
        if (blood == 0) {
            Level.GAME_STATE = Level.GAME_END;
        }
        if (blood > 100) {
            blood = 100;
        }
        if (blood <= 20) {
            this.mBloodShape.graphics.beginFill(0xdc143c);
        }
        else {
            this.mBloodShape.graphics.beginFill(0xfffffff);
        }
        this.mBloodShape.graphics.drawRect(240, 40, blood * 4, 10);
        this.mBloodShape.graphics.endFill();
    };
    /**
     * 刷新分数
     */
    Lead.prototype.updateScore = function () {
        this.mScore.text = this.mScoreNumber.toString();
    };
    /**
     * 按下
     */
    Lead.prototype.mouseDown = function (event) {
        this.mTouchStatus = true;
        this.mDistance.x = event.stageX - this.mLead.x;
        this.mDistance.y = event.stageY - this.mLead.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    ;
    /**
     * 移动
     */
    Lead.prototype.mouseMove = function (event) {
        if (this.mTouchStatus && this.getBlood() > 0) {
            var leadX = event.stageX - this.mDistance.x;
            var leadY = event.stageY - this.mDistance.y;
            leadX = leadX < 0 ? 0 : leadX;
            leadX = leadX > this.getStageW() - this.mLead.width ? this.getStageW() - this.mLead.width : leadX;
            leadY = leadY < 0 ? 0 : leadY;
            leadY = leadY > this.getStageH() - this.mLead.height - this.mCollect.height ? this.getStageH() - this.mLead.height - this.mCollect.height : leadY;
            this.mLead.x = leadX;
            this.mLead.y = leadY;
            //尾气火焰移动
            this.mPlayblow.x = this.mLead.x;
            this.mPlayblow.y = this.mLead.y + this.mLead.height / 1.5;
            //控制器
            this.mCollect.x = this.mLead.x + this.mCollect.width / 2;
            this.mCollect.y = this.mPlayblow.y + this.mPlayblow.height * 1.2;
            this.mCollect.alpha = 0;
        }
    };
    /**
     * 松开
     */
    Lead.prototype.mouseUp = function (event) {
        this.mTouchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        this.mCollect.alpha = 1;
    };
    /**
     * 火焰喷射动画
     */
    Lead.prototype.startBlowAnimation = function () {
        this.mPlayblowH += this.mSpeedAngle;
        if (this.mPlayblowH >= 75 || this.mPlayblowH < 55) {
            this.mSpeedAngle = -this.mSpeedAngle;
        }
        this.mPlayblow.height = this.mPlayblowH;
    };
    Lead.prototype.getX = function () {
        return this.mLead.x;
    };
    Lead.prototype.getY = function () {
        return this.mLead.y;
    };
    Lead.prototype.getWidth = function () {
        return this.mLead.width;
    };
    Lead.prototype.getHeight = function () {
        return this.mLead.height;
    };
    return Lead;
}(Role));
__reflect(Lead.prototype, "Lead");
//# sourceMappingURL=Lead.js.map