var Snake = /** @class */ (function () {
    function Snake() {
        this.element = document.getElementById("snake");
        this.head = document.querySelector("#snake > div");
        this.bodies = this.element.getElementsByTagName("div");
    }
    Object.defineProperty(Snake.prototype, "X", {
        // 获取蛇的 X 坐标（蛇头坐标）
        get: function () {
            return this.head.offsetLeft;
        },
        // 设置蛇的 X 坐标（蛇头坐标）
        set: function (value) {
            // 如果新值和旧值相同，则直接返回不再修改
            if (this.X === value) {
                return;
            }
            // X 的值的合法范围 0 - 290之间
            if (value < 0 || value > 290) {
                // 进入判断说明蛇撞墙了，抛出一个异常
                throw new Error("蛇撞墙了!");
            }
            // 修改 x 时，实在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
            if (this.bodies[1] &&
                this.bodies[1].offsetLeft === value) {
                // 如果发生了掉头，让蛇反方向继续移动
                if (value > this.X) {
                    // 如果新值 value 大于旧值 X ，则说明蛇向右走，此时发生掉头，应该使蛇向左走
                    value = this.X - 10;
                }
                else {
                    value = this.X + 10;
                }
            }
            // 移动身体
            this.moveBody();
            this.head.style.left = value + "px";
            // 检查有没有撞到自己
            this.checkHeadBody();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "Y", {
        // 获取蛇的 Y 坐标（蛇头坐标）
        get: function () {
            return this.head.offsetTop;
        },
        // 设置蛇的 Y 坐标（蛇头坐标）
        set: function (value) {
            // 如果新值和旧值相同，则直接返回不再修改
            if (this.Y === value) {
                return;
            }
            // X 的值的合法范围 0 - 290之间
            if (value < 0 || value > 290) {
                // 进入判断说明蛇撞墙了，抛出一个异常
                throw new Error("蛇撞墙了!");
            }
            if (this.bodies[1] && this.bodies[1].offsetTop === value) {
                if (value > this.Y) {
                    value = this.Y - 10;
                }
                else {
                    value = this.Y + 10;
                }
            }
            // 移动身体
            this.moveBody();
            this.head.style.top = value + "px";
            // 检查有没有撞到自己
            this.checkHeadBody();
        },
        enumerable: false,
        configurable: true
    });
    // 蛇增加身体的方法
    Snake.prototype.addBody = function () {
        // 向 element 中添加一个 div
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    };
    // 添加一个蛇身体移动的方法
    Snake.prototype.moveBody = function () {
        /*
            将后边的身体设置为前边身体的位置
              举例子：
                第 4 节 = 第 3 节的位置
                第 3 节 = 第 2 节的位置
                第 2 节 = 蛇头的位置
        */
        // 遍历获取所有的身体
        for (var i = this.bodies.length - 1; i > 0; i--) {
            // 获取前边身体的位置
            var X = this.bodies[i - 1].offsetLeft;
            var Y = this.bodies[i - 1].offsetTop;
            // 将值设置到当前身体上
            this.bodies[i].style.left = X + "px";
            this.bodies[i].style.top = Y + "px";
        }
    };
    // 蛇头是否撞到自己
    Snake.prototype.checkHeadBody = function () {
        // 获取所有的身体，检查是否和蛇头的坐标发生重叠
        for (var i = 1; i < this.bodies.length; i++) {
            var bd = this.bodies[i];
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                // 进入判断 说明蛇头撞到身体，游戏结束
                throw new Error("撞到自己了！");
            }
        }
    };
    return Snake;
}());
export default Snake;
