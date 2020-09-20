<template>
  <div class="photoWall">
    <div>
      <el-button
        type="primary"
        v-show="multipleManageBtn"
        @click="dialogFormVisible = true"
        size="middle"
      >上传</el-button>
      <el-button
        type="warning"
        @click="multipleManage()"
        v-show="multipleManageBtn"
        size="middle"
      >批量管理</el-button>
      <el-button type="danger" v-show="multipleManageDel" @click="deletePhotos()" size="middle">删除</el-button>
      <el-button type="primary" v-show="multipleManageDel" @click="cancelDelPic()" size="middle">取消</el-button>
    </div>

    <div>
      <!-- 上传图片/视频 -->
      <el-dialog title="上传" :visible.sync="dialogFormVisible">
        <el-form :model="form" name="upload">
          <el-form-item label="上传图片/视频:" :label-width="formLabelWidth"></el-form-item>
          <el-form-item>
            <el-upload
              :action="urlXb + '/uploadPicture?uploadParams=' + inputData"
              multiple
              drag
              :limit="uploadLimits"
              :on-success="uploadSuccess"
              :before-upload="beforeUpload"
              :auto-upload="false"
              :on-exceed="handleExceed"
              ref="upload"
              name="upload"
            >
              <div slot="tip" class="el-upload__tip">只能上传图片或视频，图片大小不超过3MB，视频大小不超过45MB,且每次不超过5个</div>
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
      <!-- 上传图片/视频结束 -->
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

    <div v-if="photoList.length" v-for="(file_,i) in photoList" class="multimediaShow">
      <el-tooltip
        class="itemToolTip"
        effect="dark"
        :content="photoList[i].date?photoList[i].date:''"
        placement="top"
      >
        <br />
        <!-- <div class="pictureShow" :src="urlXb  +'/'+ photoList[i].path" :id="'img_' + i">
          <el-checkbox v-model="checked" v-show="multipleManageDel"></el-checkbox>
        </div>-->
        <viewer>
          <!-- <input type="checkbox" id="bike" value="Bike" v-show="multipleManageDel" /> -->
          <!-- <el-checkbox v-model="checked" v-show="multipleManageDel"></el-checkbox> -->

          <img
            class="pictureShow"
            alt="photo of ball"
            v-if="getFileType(photoList[i].path?photoList[i].path:'')==1"
            :src="urlXb  +'/'+ photoList[i].path"
            :id="'img_' + i"
            style="cursor:pointer"
          />

          <input
            type="checkbox"
            id="myCheck"
            name="myCheck"
            :v-model="deletePicId"
            v-show="multipleManageDel"
            style="zoom:280% right:0;float:left;width:20px;height:20px;"
            :checked="checked"
          />
          <!-- <el-checkbox v-model="photoList[i].id" v-show="multipleManageDel"></el-checkbox> -->
        </viewer>

        <!-- <div>
        <el-checkbox v-model="checked" v-show="multipleManageDel"></el-checkbox>-->
        <div class="pictureShow" v-if="getFileType(photoList[i].path?photoList[i].path:'')==2">
          <video
            class="pictureShow"
            v-if="getFileType(photoList[i].path?photoList[i].path:'')==2"
            alt="photo of ball"
            controls="controls"
            :src="urlXb  +'/'+ photoList[i].path"
            :id="'img_' + i"
            style="cursor:pointer"
          ></video>

          <input
            type="checkbox"
            id="myCheck"
            name="myCheck"
            :v-model="deletePicId"
            v-show="multipleManageDel"
            style="zoom:280% right:0;float:left;width:20px;height:20px;"
            :checked="checked"
          />
        </div>

        <!-- </div> -->
      </el-tooltip>

      <!-- <el-tooltip
        class="itemToolTip"
        effect="light"
        :content="photoList[i].text"
        placement="bottom"
      >
        <div class="picText">
          <br />
          <a>{{photoList[i].text}}</a>
        </div>
      </el-tooltip>-->
      <div class="popover1">
        <el-popover
          class="elPopver"
          v-if="photoList[i].text"
          placement="bottom"
          width="150"
          trigger="click"
          :content="photoList[i].text"
        >
          <div class="picText" slot="reference">
            <br />
            <a>{{photoList[i].text}}</a>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import Viewer from "v-viewer";
import Vue from "Vue";
// import "@/assets/css/viewer.min.css";

export default {
  name: "PhotoWall",
  data: function () {
    return {
      msg: "Welcome to Your Vue.js App",
      getFileList: [],
      photoList: [],
      // urlXb: "http://192.168.31.109",
      // urlXb: "http://104.168.170.62:8888",
      // urlXb: "http://192.168.31.109:8888", //小服务器
      urlXb: "http://localhost:8888",
      pathXb: "/GetFileList",
      // pathXb: "/upload",
      errorImg: null,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      addPicPath: "/uploadPicture",
      findPicPath: "/GetFileList",
      updatePicPath: "/UpdatePicture",
      deletePicPath: "/DeletePicture",
      contextMenuTarget: document.body, //绑定的dom
      contextMenuVisible: false,
      inputData: "",
      arr: { id: "", startDate: "", endDate: "", text: "" },
      // uploadParams: "?uploadParams=" + this.inputData,
      dialogVisible: false,
      // deletePicVisible: true,
      multipleManageBtn: true,
      multipleManageDel: false,
      //批量删除选中的图片ID↓:
      deletePicId: [],
      checked: false,
      uploadLimits: 5,
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
          params: {},
          data: {},
        })
        //.then参数为函数，是promise为成功时要做的事，then返回一个promise对象
        // 注册promise状态变为成功后要做的事（等promise成功后，就会自动执行该方法）
        // response代表promise成功的结果，由nodejs异步操作上面的get后，自动作为参数传入then中的function
        .then(function (response) {
          console.log(
            "getPicture.response.data:" + JSON.stringify(response.data)
          );

          self.getFileList = response.data.localtoken;
          // "id":87,"date":"2020-08-27 22:09:33","text":"13","path":"IMG_0066.JPG"
          self.photoList = [];
          for (
            var i = 0;
            i < (self.getFileList.length > 8 ? 8 : self.getFileList.length);
            i++
          ) {
            self.getFileList[i].text = self.getFileList[i].text
              ? self.getFileList[i].text
              : "";
            self.photoList.push(self.getFileList[i]);
          }
          // debugger;
          if (self.photoList.length) {
            Vue.set(self.photoList, 0, self.photoList[0]);
          } else {
            self.photoList = [];
          }
        })
        .catch((err) => {
          console.log("error!!!!!!!!!!!!!!!!!!");
          console.log("catch" + err);
          self.getPicture();
        });
      return 0;

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
      // this.getPicture();
    },

    //取消上传图片，点击按钮取消
    cancelUpload: function () {
      this.$refs.upload.clearFiles();
      this.dialogFormVisible = false;
      this.inputData = "";
    },

    //上下滚动页面查看全部图片
    handleScroll: function () {
      console.log("handleScroll in111??");
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
      console.log(
        "handleScroll_this.getFileList.length:" + this.getFileList.length
      );
      let offSetTop = document.getElementById(
        "img_" + (this.photoList.length - 1)
      ).offsetTop;
      console.log("scrollTop:" + scrollTop + "&&offSetTop:" + offSetTop);
      if (
        scrollTop > offSetTop - 400 &&
        this.photoList.length < this.getFileList.length
      ) {
        console.log("handleScroll in??");
        this.photoList.push(this.getFileList[this.photoList.length]);
      }
    },
    // uploadSuccess(response, file, fileList) {
    //   alert("上传成功");
    // },

    //图片上传成功后，更新数据库
    uploadSuccess(res, file) {
      console.log("上传成功咯~");
      this.$notify.success({
        title: "成功",
        message: `文件上传成功`,
      });
      //axios
      let self = this;
      //let date = getDate();
      console.log("date:" + self.getDate());
      console.log("path:" + file.name);
      this.$axios
        .request({
          url: self.urlXb + ":3000" + self.addPicPath,
          method: "post",
          data: {
            date: self.getDate(),
            text: self.inputData,
            path: file.name,
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
      this.getPicture();
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
      // if (file.length > 5) {
      //   this.$message.error("上传文件数量不能超过5个！！");
      // }

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

    // 文件超出个数限制时的钩子
    handleExceed(file, fileList) {
      const self = this;
      self.$message.error("上传文件数量不能超过5个！！");
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

    // selectPicture: function (arr) {
    //   let self = this;
    //   this.$axios
    //     .request({
    //       url: "http://192.168.31.109:3000" + self.findPicPath,
    //       method: "get",
    //       data: {},
    //       params: {},
    //     })
    //     .then(function (response) {
    //       console.log("查询成功");
    //       // self.upload();
    //     })
    //     .catch((err) => {
    //       console.log("catch" + err);
    //     });
    // },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    //点击批量管理按钮
    multipleManage: function () {
      this.multipleManageBtn = false;
      this.multipleManageDel = true;
    },

    changeCheckedStatus: function () {
      var x = document.getElementsByName("myCheck");
      for (var i = 0; i < x.length; i++) {
        x[i].checked = false;
      }
    },

    //批量删除图片
    deletePhotos: function () {
      let self = this;
      // promise.then(dosomething());
      if (confirm("确认要删除？")) {
        var x = document.getElementsByName("myCheck");
        for (var i = 0; i < x.length; i++) {
          if (x[i].checked) {
            self.deletePicId.push(self.photoList[i].id);
          }
        }
        if (self.deletePicId.length == 0) {
          self.$message.error("没有选中文件!!");
          self.multipleManageBtn = true;
          self.multipleManageDel = false;
          // self.checked = false;
        } else {
          //删除图片的接口  /DeletePicture
          this.$axios
            .request({
              url: self.urlXb + "/DeletePicture",
              method: "post",
              params: {},
              // headers: {
              //   Connection: "keep-alive",
              // },
              data: {
                id: self.deletePicId,
              },
            })
            .then(function (response) {
              console.log("删除图片的接口：");
              console.log("Success：" + response.status);
              // console.log("Time：" + (new Date().getTime() - time1) / 1000 + "s");
              console.log("----------------------");
              self.$notify.success({
                title: "成功",
                message: "文件删除成功",
              });
              // location.reload();
              // debugger;

              self.getPicture();
              self.changeCheckedStatus();
              self.multipleManageBtn = true;
              self.multipleManageDel = false;

              // Vue.set(self.photoList, 0, self.photoList[0]);
            })
            .catch((err) => {
              console.log("删除图片的接口：");
              console.log("fail:" + err);
              console.log("----------------------");

              self.$notify.error({
                title: "失败",
                message: "文件删除失败",
              });
              // location.reload();
              self.changeCheckedStatus();
              self.multipleManageBtn = true;
              self.multipleManageDel = false;
            });
        }
      } else {
        this.cancelDelPic();
        // self.checked = false;
        return;
      }
    },

    //取消批量删除图片
    cancelDelPic: function () {
      this.multipleManageBtn = true;
      this.multipleManageDel = false;
      this.$message.warning("取消删除文件");
      this.changeCheckedStatus();
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
}

.dialogBox {
  width: 100%;
  height: 500px;
}

.thumbnailShow {
  width: 60px;
  height: auto;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  position: relative;
}

.diaFooter {
  display: inline-block;
  height: 00px;
}

.pictureShow {
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

.picText {
  width: 100%;
  float: left;
  align-content: center;
  font-family: "STXingkai";
  font-size: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.el-upload .el-upload-dragger {
  width: 550px;
  height: 350px;
}
.itemToolTip {
  margin: 4px;
}
</style> 
 <style lang="css">
/* .el-dialog {
  width: 100%;
  height: 380px;
  
} */
/* .el-dialog .el.dialog-body {
  height: 300px;
  width: auto;
} */
/* .el.diaFooter {
  width: 100%;
  height: 300px;
} */
/* .el-upload .el-upload-dragger {
  width: 550px;
  height: 350px;
} */
</style>