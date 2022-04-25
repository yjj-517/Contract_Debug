 <template>
  <div id="Contract">
    <h3>通过Metamask钱包部署合约:</h3>
    <el-divider></el-divider>
    <div class="Contract_box">
      <p>
        <span>合约bytecode:</span>
        <el-button type="primary">
          <input
            class="Upload_box_input"
            ref="file"
            type="file"
            name="file"
            @change.stop="changesData"
          />
          <div class="json_box">
            <p>(仅支持json格式上传)</p>
            <p>{ "bytecode" : "0x" }</p>
          </div>
        </el-button>
      </p>
      <el-divider></el-divider>
      <p>
        <el-button type="primary" @click="onContract">部署合约</el-button>
      </p>
    </div>
    <!-- 部署合约 -->
    <el-dialog
      class="dialog_box2"
      title="交易上链"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <!-- 步骤条 -->
      <el-steps :active="active" align-center>
        <el-step title="交易已上链" icon="el-icon-circle-check"></el-step>
        <el-step title="交易已完成" :icon="icons"></el-step>
      </el-steps>
      <p class="hash_p" v-if="active == 1">交易等待中</p>
      <p class="hash_p" v-if="active == 2">交易已完成</p>
      <div class="hash_box">
        <div v-if="transactionHash">
          <p>交易hash:</p>
          <p>{{ transactionHash }}</p>
        </div>
        <div v-if="contractAddress">
          <p>合约Address:</p>
          <p>{{ contractAddress }}</p>
        </div>
      </div>
      <div class="hash_but">
        <el-button
          type="primary"
          @click="dialogVisible = false"
          :disabled="disabled"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import abiContract from "@/abi/abi.js";
// 0xF2416Ee813e5F701e5A7f2540fF31Bb80A4270f3
export default {
  name: "Metamask",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      bytecode: "", //合约abi
      dialogVisible: false, //遮罩层
      active: 1, //进度条
      icons: "el-icon-loading", //交易完成icon图
      disabled: true, //关闭按钮
      queryStr: "", //查询到的参数
      transactionHash: "", //交易Hash
      contractAddress: "", //合约地址
    };
  },
  // 方法
  methods: {
    // 获取上传文件
    changesData(e) {
      this.abiData = {};
      const fileList = e.target.files[0];
      let reader = new FileReader();
      if (fileList.type == "application/json") {
        // 判断文件格式
        reader.readAsText(fileList);
        reader.onload = (e) => {
          // 获取bytecode
          let data = JSON.parse(e.target.result);
          const { bytecode } = data;
          if (bytecode) {
            this.bytecode = bytecode;
          } else {
            this.$message.error("上传文件错误!");
          }
        };
      } else {
        this.$message.warning("请上传JSON格式文件!");
      }
    },
    // 部署合约
    async onContract() {
      //重新构建abiContract引进函数
      const contract = await new abiContract();
      this.dialogVisible = false;
      this.transactionHash = "";
      this.contractAddress = "";
      this.active = 1;
      this.icons = "el-icon-loading";
      this.disabled = true;
      if (this.bytecode) {
        const transactionParameters = {
          from: ethereum.selectedAddress, // must match user's active address.
          data: this.bytecode, // Optional, but used for defining smart contract creation and interaction.
          // nonce: "0x00", // ignored by MetaMask
          // gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
          // gas: "0x2710", // customizable by user during MetaMask confirmation.
          // to: "0x0000000000000000000000000000000000000000", // Required except during contract publications.
          // value: "0x00", // Only required to send ether to the recipient from the initiating external account.
          // chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };
        await ethereum
          .request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
          .then(async (txHash) => {
            // 获取交易信息
            let res = await contract.provider.getTransaction(txHash);
            this.transactionHash = txHash;
            this.dialogVisible = true;
            // 等待上链
            let data = await res.wait();
            this.contractAddress = data.contractAddress;
            this.active = 2;
            this.icons = "el-icon-circle-check";
            this.disabled = false;
          })
          .catch((e) => {
            console.log(e);
            let err = e.message;
            this.$confirm(err, "错误提示", {
              type: "error",
            });
          });
      } else {
        this.$message.warning("请先上传Bytecode文件!");
      }
    },
  },
  // 创建后
  async created() {
    await new abiContract();
  },
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
};
</script>

<style lang="less" scoped>
#Contract {
  .Contract_box {
    margin: 0 0 0 1rem;
    p {
      display: flex;
      margin: 1rem 0;
      line-height: 3rem;
      span {
        width: 10rem;
        margin-right: 2rem;
      }
      .json_box {
        p {
          line-height: 1rem;
        }
      }
      .el-input {
        width: 30rem;
      }
    }
  }
  .dialog_box2 {
    .hash_p {
      line-height: 6rem;
      text-align: center;
      font-weight: bold;
      font-size: 1.5rem;
      color: #1a73e8;
    }
    .hash_box {
      margin: 0 3rem;
      border: 2px solid #1a73e8;
      border-radius: 10px;
      div {
        margin: 2rem;
        p {
          margin-top: 1.5rem;
          text-align: center;
          color: #409eff;
          &:nth-of-type(odd) {
            color: #1a73e8;
            font-weight: bold;
          }
        }
      }
    }
    .hash_but {
      margin: 2rem 0 0;
      text-align: center;
    }
  }
}
</style> 