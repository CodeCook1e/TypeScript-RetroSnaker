// 定义表示记分牌的类
var ScorePanel = /** @class */ (function () {
    function ScorePanel(maxLevel, upScore) {
        if (maxLevel === void 0) { maxLevel = 10; }
        if (upScore === void 0) { upScore = 10; }
        // score 和 level 用来记录分数和等级
        this.score = 0;
        this.level = 1;
        this.scoreEle = document.getElementById("score");
        this.levelEle = document.getElementById("level");
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    // 设置一个加分的方法
    ScorePanel.prototype.addScore = function () {
        // 使分数自增
        this.score++;
        this.scoreEle.innerHTML = this.score + "";
        // 判断分数是多少，每 10 分升一级
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    };
    // 提升等级的方法
    ScorePanel.prototype.levelUp = function () {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level + "";
        }
    };
    return ScorePanel;
}());
// 测试代码
// const scorePanel = new ScorePanel();
// for (let i = 0; i < 100; i++) {
//   scorePanel.addScore();
// }
export default ScorePanel;
