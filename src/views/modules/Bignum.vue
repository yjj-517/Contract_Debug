 <template>
  <div id="Bignum">
    <h3>数字与BigNumber之间的转换:</h3>
    <el-divider></el-divider>
    <div class="Bignum_box">
      <p>
        <span>数字转换为大数:</span>
        <el-input
          v-model="number"
          clearable
          placeholder="请输入需要转换的数字"
        ></el-input>
      </p>
      <p>
        <span>需要转换的位数:</span>
        <el-input
          v-model="digit"
          clearable
          placeholder="请输入需要转换的位数"
          style="margin: 0px"
        ></el-input>
      </p>
      <p>
        <span></span>
        <el-button type="primary" plain
          >(可以输入以下位数:数字/wei/kwei/mwei/gwei/szabo/finney/ether)</el-button
        >
      </p>
      <el-divider></el-divider>
      <p>
        <span>
          <el-button type="primary" @click="onTrans">点击转换</el-button>
        </span>
        <el-input
          v-model="bigNumber"
          placeholder="转换后的大数(0x)"
          :disabled="true"
        ></el-input>
      </p>
      <el-divider></el-divider>
      <p>
        <span>大数转换为数字:</span>
        <el-input
          v-model="numBig"
          clearable
          placeholder="请输入需要转换的大数(0x)"
        ></el-input>
      </p>
      <p>
        <span>需要转换的位数:</span>
        <el-input
          v-model="digitBig"
          clearable
          placeholder="请输入需要转换的位数"
          style="margin: 0px"
        ></el-input>
      </p>
      <p>
        <span></span>
        <el-button type="primary" plain
          >(可以输入以下位数:数字/wei/kwei/mwei/gwei/szabo/finney/ether)</el-button
        >
      </p>
      <el-divider></el-divider>
      <p>
        <span>
          <el-button type="primary" @click="onNum">点击转换</el-button>
        </span>
        <el-input
          v-model="numBer"
          placeholder="转换后的数字"
          :disabled="true"
        ></el-input>
      </p>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers"; //引入ethers.js
export default {
  name: "Bignum",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      number: "", //需要转换的数字
      digit: "0", //位数
      bigNumber: "", //转换成功的大数
      numBig: "", //需要转换的大数
      digitBig: "0", //位数
      numBer: "", //转换成功的数字
    };
  },
  // 方法
  methods: {
    // 数字转为大数
    onTrans() {
      this.bigNum = "";
      if (this.number && this.digit) {
        let num = ethers.utils.parseUnits(this.number, this.digit);
        this.bigNumber = num._hex;
      } else {
        this.$message.warning("请输入需要转换的数字/位数!");
      }
    },
    // 大数转为数字
    onNum() {
      this.numBer = "";
      if (this.numBig && this.digitBig) {
        this.numBer = ethers.utils.formatUnits(this.numBig, this.digitBig);
      } else {
        this.$message.warning("请输入需要转换的大数/位数!");
      }
    },
  },
  // 创建后
  async created() {},
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
};
</script>

<style lang="less" scoped>
#Bignum {
  .Bignum_box {
    margin: 0 0 0 1rem;
    p {
      display: flex;
      margin: 1rem 0;
      line-height: 3rem;
      span {
        width: 10rem;
        margin-right: 2rem;
      }
      .el-input {
        width: 40rem;
      }
    }
  }
}
</style> 