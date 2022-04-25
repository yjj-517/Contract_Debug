 <template>
  <div id="Upload">
    <h3>上传文件/文件夹至IPFS</h3>
    <el-divider></el-divider>
    <!-- 文件 -->
    <div class="Upload_box">
      <h3>上传文件:</h3>
      <el-button type="primary">
        <input
          class="Upload_box_input"
          ref="file"
          type="file"
          name="file"
          @change.stop="changesData"
      /></el-button>
      <!-- 按钮 -->
      <el-button
        size="medium"
        type="primary"
        @click="upIpfs"
        :disabled="disabled"
        >上传至IPFS</el-button
      >
    </div>
    <p class="ipfsNum" v-if="ipfs">
      <span
        >IPFS地址:
        <el-link :href="ipfs" target="_blank">{{ ipfs }}</el-link></span
      >
    </p>
    <el-divider></el-divider>
    <!-- 文件夹 -->
    <div class="Upload_box">
      <h3>上传文件夹:</h3>
      <el-divider></el-divider>
      <el-button type="primary">
        <input
          class="Upload_box_input"
          ref="file"
          type="file"
          name="file"
          webkitdirectory
          @change.stop="changesData1"
        />
      </el-button>
      <!-- 按钮 -->
      <el-button
        size="medium"
        type="primary"
        @click="upIpfs1"
        :disabled="disabled1"
        >上传至IPFS</el-button
      >
    </div>
    <p class="ipfsNum" v-if="ipfs1">
      <span
        >IPFS地址:
        <el-link :href="ipfs1" target="_blank">{{ ipfs1 }}</el-link></span
      >
    </p>
    <el-divider></el-divider>
  </div>
</template>

<script>
//ipfs上传
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
export default {
  name: "Home",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      ipfs: "", //上传文件夹成功返回的hash
      fileList: [], //上传文件
      disabled: false, //上传按钮
      ipfs1: "", //上传文件成功返回的hash
      fileList1: [], //上传文件
      disabled1: false, //上传按钮
    };
  },
  // 方法
  methods: {
    // 监听上传的文件
    changesData(e) {
      this.fileList = e.target.files;
    },
    //文件上传至ipfs
    async upIpfs() {
      if (this.fileList.length > 0) {
        this.disabled = true;
        this.ipfs = "";
        try {
          const client = new Web3Storage({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE5N2VEYTQ5QjQyRmVjRjI2QzBhNWM4OThmNUYzNzVGNDU1Y2U2MWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDU1ODEwMDQ4NjAsIm5hbWUiOiJkZXYyMjAyIn0.s9DZmDbB1VasuMmI50RzfFavxwIachm0XuELGz5RZY4",
          });
          // Pack files into a CAR and send to web3.storage
          const rootCid = await client.put(this.fileList, {
            name: "files",
            maxRetries: 3,
          });
          this.$message.success("上传成功!");
          this.disabled = false;
          let url = `https://ipfs.io/ipfs/${rootCid}`;
          console.log(url);
          this.ipfs = url;
        } catch (e) {
          this.$message.danger("上传失败,请检查网络!");
          this.disabled = false;
          this.ipfs = "上传失败,请检查网络后重新上传!";
        }
      } else {
        this.$message.warning("请选择上传文件!");
      }
    },
    // 监听上传的文件
    changesData1(e) {
      this.fileList1 = e.target.files;
    },
    // 文件夹上传至IPFS
    async upIpfs1() {
      if (this.fileList1.length > 0) {
        this.disabled1 = true;
        this.ipfs1 = "";
        try {
          const client = new Web3Storage({
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE5N2VEYTQ5QjQyRmVjRjI2QzBhNWM4OThmNUYzNzVGNDU1Y2U2MWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDU1ODEwMDQ4NjAsIm5hbWUiOiJkZXYyMjAyIn0.s9DZmDbB1VasuMmI50RzfFavxwIachm0XuELGz5RZY4",
          });
          // Pack files into a CAR and send to web3.storage
          const rootCid = await client.put(this.fileList1, {
            name: "files",
            maxRetries: 3,
          });
          this.$message.success("上传成功!");
          this.disabled1 = false;
          let url = `https://ipfs.io/ipfs/${rootCid}`;
          console.log(url);
          this.ipfs1 = url;
        } catch (e) {
          // console.log(e);
          this.$message.danger("上传失败,请检查网络!");
          this.disabled1 = false;
          this.ipfs1 = "上传失败,请检查网络后重新上传!";
        }
      } else {
        this.$message.warning("请选择上传文件!");
      }
    },
  },
  // 创建后
  created() {},
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
};
</script>

<style lang="less" scoped>
#Upload {
  .Upload_box {
    border: 2px dashed #409eff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 30rem;
    padding: 1rem;
    .el-button:nth-of-type(1) {
      width: 20rem;
      margin: 2rem 0;
    }
    .el-button:nth-of-type(2) {
      width: 10rem;
    }
  }
  .ipfsNum {
    display: inline-block;
    border: 2px solid #b3d8ff;
    border-radius: 10px;
    padding: 2rem;
  }
}
</style> 