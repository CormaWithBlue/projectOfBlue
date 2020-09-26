<template>
  <div class="public_header">
    <div class="header_top">
      <div class="xbgt">
        <img src="../../assets/logo_header.png" height="50px" />
      </div>

      <div class="signIn" id="signIn">
        <!-- el-icon-s-custom -->
        <el-button type="primary" size="medium" round @click="dialogFormVisibleLogin = true">
          登录
          <i class="el-icon-user-solid el-icon--right"></i>
        </el-button>
        <a>|</a>
        <!-- <el-link icon="el-icon-coordinate" class="elLinkSignIn">注册</el-link> -->
        <el-button
          icon="el-icon-s-claim"
          size="medium"
          round
          @click="dialogFormVisibleRegister = true"
        >注册</el-button>
        <a></a>
      </div>

      <div
        class="singInSuccess"
        id="singInSuccess"
        ref="singInSuccess"
        style="display:none;font-size:16px;font-family:'幼圆';font-weight:bold"
      >
        <br />
        <a>欢迎您：</a>
        {{loginNickName}}
        <a>&nbsp;&nbsp;&nbsp;&nbsp;</a>
      </div>
    </div>

    <div class="header_buttom">
      <div class="welcome">
        <img src="../../assets/welcome.gif" height="100px" width="400px" />
      </div>
    </div>

    <div>
      <!-- 登录弹窗 -->
      <el-dialog title="登录" :visible.sync="dialogFormVisibleLogin" width="30%">
        <el-form :model="form" name="loginUser">
          <el-form-item>
            <el-input
              v-model="loginUserName"
              autocomplete="off"
              placeholder="请输入用户名"
              maxlength="16"
              show-word-limit
              prefix-icon="el-icon-user"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="loginPassword"
              autocomplete="off"
              placeholder="请输入密码"
              maxlength="16"
              show-word-limit
              prefix-icon="el-icon-warning-outline"
              clearable
              show-password
            ></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelLogin()">取 消</el-button>
          <el-button type="primary" @click="loginUser()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <!-- 注册弹窗 -->
      <el-dialog title="注册用户" :visible.sync="dialogFormVisibleRegister" width="40%">
        <el-form :model="form" name="registerUser">
          <el-form-item label="用户名:" :label-width="formLabelWidth">
            <el-input
              v-model="registerUserName"
              autocomplete="off"
              placeholder="请设置用户名，可用于登录"
              maxlength="16"
              show-word-limit
              prefix-icon="el-icon-user"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="密码:" :label-width="formLabelWidth">
            <el-input
              v-model="registerPassword"
              autocomplete="off"
              placeholder="请设置登录密码"
              maxlength="16"
              show-word-limit
              prefix-icon="el-icon-warning-outline"
              clearable
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码:" :label-width="formLabelWidth">
            <el-input
              v-model="registerPasswordConfirm"
              autocomplete="off"
              placeholder="请再次输入密码"
              maxlength="16"
              show-word-limit
              prefix-icon="el-icon-warning-outline"
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item label="用户昵称:" :label-width="formLabelWidth">
            <el-input
              v-model="registerNickName"
              autocomplete="off"
              placeholder="请设置用户昵称"
              maxlength="16"
              show-word-limit
              prefix-icon="el-icon-s-custom"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelRegister()">取 消</el-button>
          <el-button type="primary" @click="registerUser()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Vue from "Vue";
export default {
  name: "inspiration",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      dialogFormVisibleLogin: false,
      dialogFormVisibleRegister: false,
      form: {},
      formLabelWidth: "120px",
      input: "",
      loginUserName: "",
      loginPassword: "",
      loginNickName: "",
      registerNickName: "",
      registerUserName: "",
      registerPassword: "",
      registerPasswordConfirm: "",
      urlXb: "http://localhost:8888",
      loginUserURL: "/userLogin",
      registerUserURL: "/addUser",
    };
  },
  created: function () {
    this.$emit("public_header", false);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    cancelLogin: function () {
      this.dialogFormVisibleLogin = false;
      this.loginUserName = "";
      this.loginPassword = "";
    },

    loginUser: function (res) {
      // this.$refs.upload.submit();
      let self = this;
      this.$axios
        .request({
          url: self.urlXb + self.loginUserURL,
          method: "post",
          data: {
            userName: self.loginUserName,
            password: self.loginPassword,
          },
          params: {},
        })
        .then(function (response) {
          console.log("登录成功");
          self.loginNickName = response.data.localtoken[0].nickname;
          console.log("self.loginNickName:   " + self.loginNickName);
          self.$notify({
            title: "成功",
            message: "登录成功",
            type: "success",
          });
        })
        .catch((err) => {
          console.log("catch" + err);
          self.$notify.error({
            title: "错误",
            message: "登录失败，请检查用户名和密码",
          });
        });
      self.loginSucess();
    },

    loginSucess: function () {
      this.dialogFormVisibleLogin = false;
      document.getElementById("signIn").style.display = "none";
      // document.getElementById("singInSuccess").style.visibility = "visible";
      singInSuccess.style.display = "block";
      singInSuccess.style.float = "right";
      this.loginUserName = "";
      this.loginPassword = "";
    },

    registerUser: function () {
      this.dialogFormVisibleRegister = false;
      this.registerNickName = "";
      this.registerUserName = "";
      this.registerPassword = "";
    },
    cancelRegister: function () {
      this.dialogFormVisibleRegister = false;
      this.registerNickName = "";
      this.registerUserName = "";
      this.registerPassword = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.public_header {
  display: block;
  width: 100%;
  height: 170px;
}
.header_top {
  background-color: rgb(243, 243, 243);
  /* width: 100%; */
  height: 50px;
}
.header_buttom {
  width: 100%;
  height: 120px;
  display: block;
  /* vertical-align: middle; */
  /* text-align: center; */
  /* text-align: center; */
  /* background-color: rgb(240, 243, 244); */
}
.xbgt {
  width: 20%;
  height: 50px;
  float: left;
  display: table-cell;
  vertical-align: middle;
}
.welcome {
  width: 25%;
  height: 120px;
  /* float: left; */
  /* display: block; */
  /* vertical-align: middle; */
  /* text-align: center; */
  display: table-cell;
  vertical-align: middle;
}
/* .navMenu_header {
  width: 60%;
  height: 120px;
  float: right;
  display: table-cell;
  vertical-align: buttom;
} */

/* .el-menu-demo {
  width: 60%;
  height: 120px;
  display: table-cell;
  vertical-align: bottom;
  background-color: rgb(240, 243, 244);
} */

.signIn {
  width: 250px;
  /* height: 150px; */
  float: right;
  font-size: 20px;
  font-weight: bold;
  height: 30px;
  margin: 8px auto;
}
.signInSuccess {
  width: 250px;
  /* height: 150px; */
  float: right;
  font-size: 20px;
  font-weight: bold;
  height: 30px;
  margin: 8px auto;
  font-size: 12px;
  font-family: "微软雅黑";
}
</style>
