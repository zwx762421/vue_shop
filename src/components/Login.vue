<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/login.png" alt="">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="userId">
          <el-input  v-model="loginForm.userId" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passWord">
          <el-input  v-model="loginForm.passWord" prefix-icon="el-icon-s-goods" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <!-- 按钮区域 -->
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
          <el-button type="warning" @click="registerUser">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      // 这是登陆表单的数据绑定对象
      loginForm: {
        userId: '',
        passWord: '',
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        userId:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        //验证密码是否合法
        passWord:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    // 点击重置用户名、密码
    reset(){
      this.$refs.loginFormRef.resetFields();//重置
    },
    login(){
      this.$refs.loginFormRef.validate(async (valid) =>{//调用之后返回是否成功
        if(!valid) return;
        const res = await this.$http.post('userinfo/userLogin',this.loginForm);
        console.log("返回报文：{}",res);
        if(res.data.status != "200"){
          return this.$message.error(res.data.msg);
        }
        this.$message.success("登陆成功！");
        console.log(res.data.data.token);// 打印token
        // 把token和userId保存到sessionStorage中
        window.sessionStorage.setItem('token',res.data.data.token);
        window.sessionStorage.setItem('userId',res.data.data.userId);
        this.$router.push('/Home');
      });
    },
    registerUser(){
      this.$router.push('/Register');
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}

.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;// 表示圆角
  position: absolute;// 绝对定位到左，到上50%
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);// 表示横轴纵轴各移动-50%

  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {// 充满box
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}



</style>
