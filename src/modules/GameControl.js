// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
// 游戏控制器，控制其他的所有类
var GameControl = /** @class */ (function () {
    function GameControl() {
        // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
        this.direction = "";
        // 创建一个属性用来记录游戏是否结束
        this.isLive = true;
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.init();
    }
    // 游戏初始化方法，调用后游戏即开始
    GameControl.prototype.init = function () {
        // 绑定键盘按键按下的事件
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        // 调用 run 方法，使蛇移动
        this.run();
    };
    // 创建一个键盘按下的响应函数
    GameControl.prototype.keydownHandler = function (event) {
        // 需要检查 event.key 的值是否合法（用户是否按了正确的按键）
        // 修改 direction 属性
        this.direction = event.key;
    };
    // 创建一个控制蛇移动的方法
    GameControl.prototype.run = function () {
        /*
            根据方向（this.direction）来使蛇的位置改变
              向上 top 减少
              向下 top 增加
              向左 left 减少
              向右 left 增加
        */
        // 获取蛇现在的坐标
        var X = this.snake.X;
        var Y = this.snake.Y;
        // 根据按键方向来修改 X 值和 Y 值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                // 向上移动 top 减少
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                // 向下移动 top 增加
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                // 向左移动 left 减少
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右移动 left 增加
                X += 10;
                break;
        }
        // 检查蛇是否吃到了食物
        this.checkEat(X, Y);
        // 修改蛇的 X 和 Y 值
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        }
        catch (e) {
            // 进入到 catch，说明出现了异常，游戏结束，提出一个提升信息
            alert(e.message + " GAME OVER");
            // 将 isLive 设置为 false
            this.isLive = false;
        }
        // 开启一个定时调用
        this.isLive &&
            setTimeout(this.run.bind(this), 200 - (this.scorePanel.level - 1) * 30);
    };
    // 定义一个方法，用来检查蛇是否吃到食物
    GameControl.prototype.checkEat = function (X, Y) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置要进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    };
    return GameControl;
}());
export default GameControl;
