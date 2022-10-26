<template>
  <div>
    <div id="content">
      <h3>
        密码修改
        <span class="sp"><router-link to="/login">登陆</router-link></span>
      </h3>
      <form action="">
        <div class="content">
          <label>账户名:</label>
          <input type="text" placeholder="手机或者邮箱" />
        </div>
        <div class="content">
          <label> 密码:</label>
          <input type="text" placeholder="新密码" />
        </div>
        <div class="content">
          <label> 确定密码:</label>
          <input type="text" placeholder="确认密码" />
        </div>
        <div class="s-canvas content" style="display: inline">
          <label type="text">验证码：</label>
          <input id="verification" type="text" placeholder="验证码" />
          <canvas
            id="s-canvas"
            :width="contentWidth"
            :height="contentHeight"
          ></canvas>
        </div>
        <div class="btn">
          <button>确定更改</button>
        </div>
      </form>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
  props: {
    identifyCode: {
      // 默认注册码
      type: String,
      default: "1234",
    },
    fontSizeMin: {
      // 字体最小值
      type: Number,
      default: 25,
    },
    fontSizeMax: {
      // 字体最大值
      type: Number,
      default: 35,
    },
    backgroundColorMin: {
      // 验证码图片背景色最小值
      type: Number,
      default: 200,
    },
    backgroundColorMax: {
      // 验证码图片背景色最大值
      type: Number,
      default: 220,
    },
    dotColorMin: {
      // 背景干扰点最小值
      type: Number,
      default: 60,
    },
    dotColorMax: {
      // 背景干扰点最大值
      type: Number,
      default: 120,
    },
    contentWidth: {
      // 容器宽度
      type: Number,
      default: 117,
    },
    contentHeight: {
      // 容器高度
      type: Number,
      default: 32,
    },
  },
  methods: {
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    // 生成一个随机的颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },

    drawPic() {
      let canvas = document.getElementById("s-canvas");
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx.fillStyle = "#e6ecfd";
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i);
      }
      this.drawLine(ctx);
      this.drawDot(ctx);
    },

    drawText(ctx, txt, i) {
      ctx.fillStyle = this.randomColor(50, 160); // 随机生成字体颜色
      ctx.font =
        this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei"; // 随机生成字体大小
      let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
      let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
      var deg = this.randomNum(-30, 30);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    },

    drawLine(ctx) {
      // 绘制干扰线
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = this.randomColor(100, 200);
        ctx.beginPath();
        ctx.moveTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        );
        ctx.lineTo(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight)
        );
        ctx.stroke();
      }
    },

    drawDot(ctx) {
      // 绘制干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          this.randomNum(0, this.contentWidth),
          this.randomNum(0, this.contentHeight),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    },
  },
  watch: {
    identifyCode() {
      this.drawPic();
    },
  },
  mounted() {
    this.drawPic();
  },
};
</script>


<style lang="less" scoped>
#content {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;
  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;
    .sp {
      font-size: 14px;
      float: right;
    }
  }
  div:nth-of-type(1) {
    margin-top: 40px;
  }
  .content {
    position: relative;
    margin-left: 390px;
    margin-bottom: 18px;

    label {
      font-size: 14px;
      text-align: right;
      display: inline-block;
      width: 96px;
    }
    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }
  }
    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
    #verification{
      width: 145px;
      margin-right: 10px;
    }
    #s-canvas{
      position: relative;
      top: 10px;
    }
}
.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;

  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>

