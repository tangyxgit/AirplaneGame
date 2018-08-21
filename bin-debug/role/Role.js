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
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        /**
         * 屏幕高宽
         */
        _this.mStageW = 0;
        _this.mStageH = 0;
        /**
         * 角色的血量
         */
        _this.mBlood = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createAirplane, _this);
        return _this;
    }
    /**
     * 创建角色
     */
    Role.prototype.createAirplane = function () {
        this.mStageW = this.stage.stageWidth;
        this.mStageH = this.stage.stageHeight;
    };
    /**
     * 检测敌机之间碰撞
     */
    Role.prototype.checkCollosion = function (x, y, obj) {
        return false;
    };
    /**
     * 更新角色的血量
     */
    Role.prototype.updateBlood = function () {
    };
    Role.prototype.setBlood = function (blood) {
        if (blood <= 0) {
            blood = 0;
        }
        this.mBlood = blood;
    };
    Role.prototype.getBlood = function () {
        return this.mBlood;
    };
    /**
     * 获取屏幕高宽
     */
    Role.prototype.getStageW = function () {
        return this.mStageW;
    };
    Role.prototype.getStageH = function () {
        return this.mStageH;
    };
    /**
     * 获取角色位置
     */
    Role.prototype.getX = function () {
        return 0;
    };
    Role.prototype.getY = function () {
        return 0;
    };
    /**
     * 角色高宽
     */
    Role.prototype.getWidth = function () {
        return 0;
    };
    Role.prototype.getHeight = function () {
        return 0;
    };
    return Role;
}(egret.DisplayObjectContainer));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map