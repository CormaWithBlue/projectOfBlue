<template>
  <div class="photoWall">
    <!-- <context-menu
      class="right-menu"
      :target="contextMenuTarget"
      :show="contextMenuVisible"
      @update:show="(show) => contextMenuVisible = show"
    >-->
    <!-- <a href="javascript:;" @click="copyMsg">复制</a> -->
    <!-- <a href="javascript:;" @click="quoteMsg">引用</a> -->
    <!-- <a href="javascript:;" @click="deletePicture()">删除</a>
    </context-menu>-->
    <div>
      <el-button type="primary" @click="dialogFormVisible = true" size="middle">上传</el-button>
      <el-button type="warning" @click="batchManage()" size="middle">批量管理</el-button>
    </div>
    <div>
      <el-dialog title="上传" :visible.sync="dialogFormVisible">
        <el-form :model="form" name="upload">
          <el-form-item label="上传图片/视频:" :label-width="formLabelWidth"></el-form-item>
          <el-form-item>
            <el-upload
              :action="urlXb + '/uploadPicture?uploadParams=' + inputData"
              multiple
              drag
              :limit="5"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
              :auto-upload="false"
              ref="upload"
              name="upload"
            >
              <div slot="tip" class="el-upload__tip">只能上传图片或视频，图片大小不超过3MB，视频大小不超过45MB</div>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <el-button size="middle" type="primary" name="upload">点击上传</el-button>
              </div>
            </el-upload>
          </el-form-item>
          <!-- 获取到图片说明并存入库里 -->
          <el-form-item label="说明:" :label-width="formLabelWidth">
            <el-input
              v-model="inputData"
              autocomplete="off"
              placeholder="请输入说明,最长60个字"
              maxlength="60"
              class="pictureText"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelUpload()">取 消</el-button>
          <el-button type="primary" @click="submitUpload()">确 定</el-button>
          <!-- @click="dialogFormVisible = false" -->
        </div>
      </el-dialog>
    </div>
    <br />
    <br />
    <br />
    <br />

    <!-- //上传功能 -->
    <!-- <el-upload
      :action="urlXb + '/upload?test=123'"
      multiple
      :limit="5"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload"
      :auto-upload="false"
      ref="upload"
      :data="uploadParams"
    >
    </el-upload>-->
    <!-- <el-button size="middle" type="primary">点击上传</el-button> -->
    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3MB</div> -->

    <!-- <el-button type="primary" @click="upload()">上传照片</el-button> -->

    <div v-for="(fileList, i) in photoList" class="multimediaShow">
      <el-tooltip class="itemToolTip" effect="light" :content="photoList[i]" placement="top">
        <viewer :images="photoList">
          <!-- <img
        class="photoShow"
        alt="photo of ball"
        v-for="(fileList, i) in photoList"
        :src="urlXb + '/photo' + photoList[i]"
        :id="'img_' + i"
          />-->
          <!-- v-if ="!photoList[i].match(".mp4")" -->
          <img
            alt="photo of ball"
            v-if="getFileType(photoList[i])==1"
            :src="urlXb + '/' + photoList[i]"
            :id="'img_' + i"
            style="cursor:pointer"
          />
        </viewer>
        <video
          v-if="getFileType(photoList[i])==2"
          alt="photo of ball"
          controls="controls"
          :src="urlXb + '/' + photoList[i]"
          :id="'img_' + i"
          style="cursor:pointer"
        ></video>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import Viewer from "v-viewer";
// import "@/assets/css/viewer.min.css";

export default {
  name: "PhotoWall",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      getFileList: [],
      photoList: [],
      // urlXb: "http://192.168.31.109",
      // urlXb: "http://192.168.31.116:3000",
      // urlXb: "http://192.168.31.109:3000",//小服务器
      urlXb: "http://localhost:3000",
      pathXb: "/GetFileList",
      // pathXb: "/upload",
      errorImg: null,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      addPicPath: "/uploadPicture",
      findPicPath: "/FindPicture",
      updatePicPath: "/UpdatePicture",
      deletePicPath: "/DeletePicture",
      contextMenuTarget: document.body, //绑定的dom
      contextMenuVisible: false,
      inputData: "",
      arr: { id: "", startDate: "", endDate: "", text: "" },
      // uploadParams: "?uploadParams=" + this.inputData,
    };
  },
  mounted() {
    this.getPicture();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    //日期时间格式处理
    conver: function (s) {
      return s < 10 ? "0" + s : s;
    },

    //获取当前时间
    getDate: function () {
      var myDate = new Date();
      //获取当前年
      var year = myDate.getFullYear();
      //获取当前月
      var month = myDate.getMonth() + 1;
      //获取当前日
      var date = myDate.getDate();
      //获取当前时分秒
      var hour = myDate.getHours(); //获取当前小时数(0-23)
      var minute = myDate.getMinutes(); //获取当前分钟数(0-59)
      var second = myDate.getSeconds();

      //获取当前时间
      var now =
        year +
        "-" +
        this.conver(month) +
        "-" +
        this.conver(date) +
        " " +
        this.conver(hour) +
        ":" +
        this.conver(minute) +
        ":" +
        this.conver(second);
      return now;
    },

    //获取图片列表
    getPicture: function () {
      let self = this;
      this.$axios
        .request({
          url: self.urlXb + self.pathXb, //通知网卡去链接进行请求
          method: "get",
          params: {
            // 请求的参数
            // search: "biu",
          },
          data: {
            // 使用post时，请求的body代表请求的主体内容
            // haha: "balabala"
          },
        })
        //.then参数为函数，是promise为成功时要做的事，then返回一个promise对象
        // 注册promise状态变为成功后要做的事（等promise成功后，就会自动执行该方法）
        // response代表promise成功的结果，由nodejs异步操作上面的get后，自动作为参数传入then中的function
        .then(function (response) {
          //将this.getFileList赋值（为：this.$axios.get方法的返回值的then方法的返回值）
          // console.log("getFile1:" + JSON.stringify(response.data));
          self.getFileList = response.data;
          // self.uploadParams = "?uploadParams=123123";
          // + self.inputData;

          for (var i = 0; i < self.getFileList.length; i++) {
            self.photoList.push(self.getFileList[i]);
          }
          //查询图片列表函数
          // self.handleScroll();
          // self.photoList.push(self.getFileList[self.photoList.length]);
          // self.photoList.push(self.getFileList[self.photoList.length]);
          // self.photoList.push(self.getFileList[self.photoList.length]);
          // self.photoList.push(self.getFileList[self.photoList.length]);
          // self.photoList.push(self.getFileList[self.photoList.length]);
          // self.photoList.push(self.getFileList[self.photoList.length]);
          // self.photoList.push(self.getFileList[self.photoList.length]);
          // self.photoList.push(self.getFileList[self.photoList.length]);
          console.log("getFileList:" + self.getFileList);
          console.log("num " + self.getFileList.length);
          console.log("getFileList1:" + self.getFileList[0]);
          // document.getElementById("img");
        })
        .catch((err) => {
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

    //上传图片，点击按钮再上传
    submitUpload: function () {
      this.$refs.upload.submit();
      this.dialogFormVisible = false;
      this.inputData = "";
    },

    //取消上传图片，点击按钮取消
    cancelUpload: function () {
      this.$refs.upload.clearFiles();
      this.dialogFormVisible = false;
      this.inputData = "";
    },

    //上下滚动页面查看全部图片
    handleScroll: function () {
      // let pageYOffset = window.pageYOffset;
      // // console.log("pageYoffset: " + window.pageYOffset);
      // let scrollTop = document.documentElement.scrollTop;
      // // console.log("scrollTop: " + scrollTop);
      // let scrollTopBody = document.body.scrollTop;
      // // console.log("scrollTopBody: " + scrollTopBody);
      // console.log(getFileList);
      if (this.getFileList.length < 2) {
        return;
      }
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offSetTop = document.getElementById(
        "img_" + (this.photoList.length - 1)
      ).offsetTop;
      // document.getElementById("video_" + (this.photoList.length - 1)).offsetTop
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

    //图片上传成功后，更新数据库
    uploadSuccess(res, file, fileList) {
      console.log("上传成功咯~");
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`,
      });
      //axios
      let self = this;
      //let date = getDate();
      console.log("date:" + self.getDate());
      console.log("path:" + self.pathXb + "/" + file.name);
      this.$axios
        .request({
          url: self.urlXb + ":3000" + self.addPicPath,
          // url: "http://192.168.31.109:3000" + self.addPicPath,
          method: "post",
          data: {
            date: self.getDate(),
            text: self.inputData,
            path: self.pathXb + "/" + file.name,
          },
          params: {},
        })
        .then(function (response) {
          console.log("存数据库成功");

          // self.upload();
        })
        .catch((err) => {
          console.log("catch" + err);
        });
      this.$refs.upload.clearFiles();
    },

    // //判断文件类型是图片还是视频
    // //1.传参：文件的名称:fileName
    // //2.返回值：0--既不是图片也不是视频  1--图片  2--视频
    getFileType: function (fileName) {
      if (
        fileName.search(/jpg/i) > 0 ||
        fileName.search(/png/i) > 0 ||
        fileName.search(/jpeg/i) > 0 ||
        fileName.search(/bmp/i) > 0 ||
        fileName.search(/gif/i) > 0
      ) {
        return 1;
      } else if (fileName.search(/mp4/i) > 0) {
        return 2;
      } else {
        return 0;
      }
    },

    //上传前对图片和视频的格式和大小判断
    beforeUpload(file) {
      console.log("文件名：" + file.name + "  文件类型：" + file.type);
      const fileType = this.getFileType(file.name);

      const isLt3M = file.size / 1024 / 1024 < 3;
      const isLt45M = file.size / 1024 / 1024 < 45;

      // this.uploadParams = "?uploadParams=" + this.inputData;
      // console.log("upload:" + this.uploadParams);

      if (fileType == 0) {
        this.$message.error(
          "上传图片只能是 JPEG/PNG/JPG/BMP/GIF 格式,视频只能是 MP4 格式！！"
        );
      }
      if (!isLt3M && fileType == 1) {
        this.$message.error("上传图片大小不能超过 3 MB!");
      }
      if (!isLt45M && fileType == 2) {
        this.$message.error("上传视频大小不能超过 45 MB!");
      }
      if ((fileType == 1 && isLt3M) || (fileType == 2 && isLt45M)) {
        return true;
      }

      return false;
    },
    // clickPhoto: function() {
    //   var self = this;
    //   var viewer = Viewer(
    //     document.getElementById("img_" + (self.photoList.length - 1)),
    //     {
    //       url: self.urlXb + self.photoList[self.photoList.length - 1]
    //     }
    //   );
    // }

    selectPicture: function (arr) {
      let self = this;
      this.$axios
        .request({
          url: "http://192.168.31.109:3000" + self.findPicPath,
          method: "get",
          data: {},
          params: {},
        })
        .then(function (response) {
          console.log("查询成功");
          // self.upload();
        })
        .catch((err) => {
          console.log("catch" + err);
        });
    },

    //批量管理图片
    batchManage: function () {
      //1.页面中的图片变成方形缩略图形式，原本图片隐藏，每张图片左上角/左下角增加复选框
      //2.1 页面上方增加按钮，增加‘批量修改照片时间’，‘批量修改照片信息’，‘批量删除照片’和‘完成管理’按钮
      //2.2 页面隐藏上传和批量管理的按钮
      //3.批量修改照片时间：修改用户选中的照片的上传时间
      //4.批量修改照片信息：修改用户选中的照片的说明
      //5.批量删除照片：弹出二次确认弹窗，确认后删除用户选中的图片
      //6.完成管理：页面中图片去掉复选框，收起页面增加的按钮，将“上传”和“批量管理”按钮进行显示
    },
  },
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
  width: 100%;
  height: auto;
  float: left;
  /* padding-top: 100px; */
  /* text-align: center; */
}
.multimediaShow {
  width: 16%;
  height: auto;
  float: left;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-right: 50px;
  margin-left: 50px;
  border: 2px solid rgb(185, 167, 127);
  border-radius: 20px;
  box-shadow: 5px 5px 15px #888888;
  border-image: url(../assets/border_img.png) 30 30 round;
  border-image-width: 30px;
  border-image-outset: 15px;
}

img {
  width: 100%;
  height: auto;
  float: left;
}

video {
  width: 100%;
  height: 100%;
  float: left;

  /* display: inline-block; */
}

.el-upload .el-upload-dragger {
  width: 550px;
  height: 350px;
}
.itemToolTip {
  margin: 4px;
}
</style> 
