<template>
  <div class="photoWall">
    <div>
      <el-upload
        :action="urlXb+'/upload'"
        multiple
        :limit="5"
        :on-success="uploadSuccess"
        :before-upload="beforeUpload"
        ref="upload"
      >
        <el-button size="middle" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3MB</div>
      </el-upload>
    </div>
    <br />
    <br />
    <br />
    <br />
    <!-- <el-button type="primary" @click="upload()">上传照片</el-button> -->
    <viewer :images="photoList">
      <img
        class="photoShow"
        alt="photo of ball"
        v-for="(fileList,i) in photoList"
        :src="urlXb+'/photo'+photoList[i]"
        :id="'img_'+i"
      />
    </viewer>
    <!-- src="../assets/loading.gif" -->
    <!-- @click="clickPhoto()" -->
  </div>
</template>

<script>
// import Viewer from "v-viewer";
// import "@/assets/css/viewer.min.css";
export default {
  name: "PhotoWall",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      getFileList: [],
      photoList: [],
      urlXb: "http://139.180.174.248",
      // urlXb: "http://192.168.31.182",
      // urlXb: "",
      pathXb: "/GetFileList",
      errorImg: null
    };
  },
  mounted() {
    this.upload();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    upload: function() {
      let self = this;
      this.$axios
        .request({
          url: self.urlXb + self.pathXb, //通知网卡去链接进行请求
          method: "get",
          params: {
            // 请求的参数
            // search: "biu",
            // ball: 123
          },
          data: {
            // 使用post时，请求的body代表请求的主体内容
            // haha: "balabala"
          }
        })
        //.then参数为函数，是promise为成功时要做的事，then返回一个promise对象
        // 注册promise状态变为成功后要做的事（等promise成功后，就会自动执行该方法）
        // response代表promise成功的结果，由nodejs异步操作上面的get后，自动作为参数传入then中的function
        .then(function(response) {
          //将this.getFileList赋值（为：this.$axios.get方法的返回值的then方法的返回值）
          self.getFileList = response.data.FileList;

          self.photoList.push(self.getFileList[self.photoList.length]);
          self.photoList.push(self.getFileList[self.photoList.length]);
          self.photoList.push(self.getFileList[self.photoList.length]);
          self.photoList.push(self.getFileList[self.photoList.length]);
          self.photoList.push(self.getFileList[self.photoList.length]);
          self.photoList.push(self.getFileList[self.photoList.length]);
          self.photoList.push(self.getFileList[self.photoList.length]);
          // self.photoList.push(self.getFileList[self.photoList.length]);
          console.log("getFileList:" + self.getFileList);
          console.log("num " + self.getFileList.length);
          console.log("getFileList1:" + self.getFileList[0]);
          // document.getElementById("img");
        })
        .catch(err => {
          console.log("catch" + err);
        });

      // var promise1 = this.$axios.get("http://192.168.31.182:8899/GetFileList");

      // var promiseThen = promise1.then(function(resopnse) {
      //   self.getFileList = resopnse.data.FileList;
      //   console.log("getFileList:" + self.getFileList);
      //   console.log("num " + self.getFileList.length);
      // });

      // promiseThen.catch(err => {
      //   console.log("catch" + err);
      // });
    },
    handleScroll: function() {
      // let pageYOffset = window.pageYOffset;
      // // console.log("pageYoffset: " + window.pageYOffset);
      // let scrollTop = document.documentElement.scrollTop;
      // // console.log("scrollTop: " + scrollTop);
      // let scrollTopBody = document.body.scrollTop;
      // // console.log("scrollTopBody: " + scrollTopBody);
      if (this.getFileList.length < 2) {
        return;
      }
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offSetTop = document.getElementById(
        "img_" + (this.photoList.length - 7)
      ).offsetTop;
      // console.log("scrollTop: " + scrollTop);
      // console.log("offsetTop: " + offSetTop);
      // console.log("length-1:" + (this.photoList.length - 1));
      if (
        scrollTop > offSetTop &&
        this.photoList.length < this.getFileList.length
      ) {
        this.photoList.push(this.getFileList[this.photoList.length]);
        // this.photoList.push(this.getFileList[this.photoList.length]);
        // this.photoList.push(this.getFileList[this.photoList.length]);
        // this.photoList.push(this.getFileList[this.photoList.length]);
      }
    },
    // uploadSuccess(response, file, fileList) {
    //   alert("上传成功");
    // },
    uploadSuccess(res, file, fileList) {
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`
      });
      this.$refs.upload.clearFiles();
    },
    beforeUpload(file) {
      const isJPG = (file.type === "image/jpeg") | (file.type === "image/png");
      const isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt3M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      if (!(isJPG && isLt3M)) {
        return false;
      }

      return true;
    }
    // clickPhoto: function() {
    //   var self = this;
    //   var viewer = Viewer(
    //     document.getElementById("img_" + (self.photoList.length - 1)),
    //     {
    //       url: self.urlXb + self.photoList[self.photoList.length - 1]
    //     }
    //   );
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photoWall {
  background-image: url("../../static/background_pubilc.jpg");
  /* background-size: 100% 100%; */
  /* width: 100%; */
  background-size: 100% auto;
  background-repeat: repeat-y;
  /* padding-top: 100px; */
  /* text-align: center; */
}
.photoShow {
  width: 20%;
  height: auto;
  margin-bottom: 100px;
  margin-right: 100px;

  border: 15px solid rgb(185, 167, 127);
  /* border-radius: 30px; */
  box-shadow: 10px 10px 15px #888888;
  border-image: url(../assets/border_img.png) 30 30 round;
  border-image-width: 40px;
  border-image-outset: 15px;
  /* display: block; */

  /* text-align: center; */
}
</style>