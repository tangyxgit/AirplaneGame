var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Level = (function () {
    function Level(layour) {
        this.layour = layour;
        Level.GAME_STATE = Level.GAME_READY;
    }
    /**
     * 游戏开始
     */
    Level.prototype.startGame = function () {
        Level.GAME_STATE = Level.GAME_ING;
    };
    /**
     * 游戏暂停
     */
    Level.prototype.pauseGame = function () {
        Level.GAME_STATE = Level.GAME_PAUSE;
    };
    /**
     * 重新开始
     */
    Level.prototype.restartGame = function () {
    };
    /**
     * 游戏结束
     */
    Level.prototype.endGame = function () {
        Level.GAME_STATE = Level.GAME_END;
        this.layour.removeChildren();
    };
    /**
     * 添加元素
     */
    Level.prototype.addChild = function (child) {
        this.layour.addChild(child);
    };
    Level.prototype.addChildAt = function (child, index) {
        this.layour.addChildAt(child, index);
    };
    /**
     * 容器全局变量
     */
    Level.prototype.getContext = function () {
        return this.layour;
    };
    /**
     * 游戏状态
     */
    Level.GAME_READY = 1;
    Level.GAME_ING = 2;
    Level.GAME_PAUSE = 3;
    Level.GAME_END = 4;
    return Level;
}());
__reflect(Level.prototype, "Level");
//# sourceMappingURL=Level.js.map