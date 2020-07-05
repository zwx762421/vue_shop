<template>
  <div class="register_container">
    <br>
    <h2 align="center" style="color: coral">用户注册</h2>
    <div class="register_box">
     <el-form ref="registerRef" :model="registerForm" :rules="registerRules" label-width="100px" class="register_form">
       <br><br><br>
        <el-form-item label="用户名：" prop="userId">
          <el-input v-model="registerForm.userId" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="passWord">
          <el-input v-model="registerForm.passWord" type="password" style="width: 200px"></el-input>
        </el-form-item>
       <el-form-item label="重复密码：" prop="rePassWord">
         <el-input v-model="registerForm.rePassWord" type="password" style="width: 200px"></el-input>
       </el-form-item>
       <el-form-item label="姓名：">
         <el-input v-model="registerForm.name" style="width: 200px"></el-input>
       </el-form-item>
       <el-form-item label="电话：" prop="tel">
         <el-input v-model="registerForm.tel" style="width: 200px"onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength="11"></el-input>
       </el-form-item>
       <el-form-item label="电子邮件：" prop="email">
         <el-input v-model="registerForm.email" style="width: 200px"></el-input>
       </el-form-item>
       <el-form-item label="性别：" prop="sex">
         <el-select v-model="registerForm.sex" placeholder="请选择性别">
           <el-option label="男" value="1"></el-option>
           <el-option label="女" value="2"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="用户类型：" prop="userType">
         <el-select v-model="registerForm.userType" placeholder="请选择用户类型">
           <el-option label="管理人员" value="1"></el-option>
           <el-option label="员工" value="2"></el-option>
         </el-select>
       </el-form-item>
       <el-form-item class="btns">
         <!-- 按钮区域 -->
         <el-button type="primary" @click="doSubmit">确定</el-button>
         <el-popconfirm
           title="确定放弃已填写信息并返回到主页面吗？"
         >
           <el-button slot="reference" type="info" @click="backStep" >返回</el-button>
         </el-popconfirm>
       </el-form-item>
         <!--</el-popconfirm>
         <el-button type="info" @click="backStep" >返回</el-button>
       </el-form-item>-->
      </el-form>
    </div>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        registerForm:{
          userId:"",
          passWord:"",
          rePassWord:"",
          tel:"",
          sex:"",
          email:"",
          name:"",
          userType:"",
        },
        // 表单验证规则对象
        registerRules:{
          userId: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          rePassWord: [
            { required: true, message: '请输入重复密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
            { like:"@", message: '电子邮箱格式错误', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          userType: [
            { required: true, message: '请选择用户类型', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      backStep(){
        this.$router.push('/Login');
      },
      doSubmit(){
        // 非空校验
        if(this.registerForm.userId.length == 0 || this.registerForm.userId == null){
          return this.$message.error("用户名不能为空！");
        }
        if(this.registerForm.passWord.length == 0 || this.registerForm.passWord == null){
          return this.$message.error("密码不能为空！");
        }
        if(this.registerForm.rePassWord.length == 0 || this.registerForm.rePassWord == null){
          return this.$message.error("重复密码不能为空！");
        }
        if(this.registerForm.tel == 0 || this.registerForm.tel == null){
          return this.$message.error("电话不能为空！");
        }
        if(this.registerForm.email == 0 || this.registerForm.email == null){
          return this.$message.error("电子邮件不能为空！");
        }
        if(this.registerForm.sex == 0 || this.registerForm.sex == null){
          return this.$message.error("性别不能为空！");
        }
        // 密码校验
        if(this.registerForm.passWord != this.registerForm.rePassWord){
          return this.$message.error("两次输入的密码不一样！");
        }
        // 邮箱校验
        if(this.registerForm.email.indexOf("@") == -1 || this.registerForm.email.indexOf(".") == -1){
          return this.$message.error("邮箱格式不对！");
        }
        // 发送接口
        this.$refs.registerRef.validate(async (valid) =>{
          if(!valid) return;
          const res = await this.$http.post('userinfo/userAdd',this.registerForm);
          console.log("返回报文：{}",res);
          if(res.data.status != "200"){
            return this.$message.error(res.data.msg);
          }
          this.$message.success("注册成功！");
          this.$router.push('/Login');
        });
      }
    }
  }
</script>

 <style lang="less" scoped>
   .register_container{
    height: 100%;
    background-color: aqua;
  }

  .register_box{
    height: 650px;
    width: 550px;
    background-color: white;
    border-radius: 3px;// 表示圆角
    position: absolute;// 绝对定位到左，到上50%
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);// 表示横轴纵轴各移动-50%
  }

  .register_form{
    position: center;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
   .btns{
     display: flex;
     justify-content: flex-end;
   }



</style>
