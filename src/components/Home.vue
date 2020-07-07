<template>

  <el-container class="home-container">
    <!-- 头部区域-->
    <el-header>
      <div>
        <img src="../assets/header.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <div>
        <el-popover
          placement="bottom"
          title="个人信息"
          width="250"
          trigger="click">
          <el-button slot="reference" type="warning" @click="getbyId">个人信息</el-button>
          <div>
            用户Id：{{userFind.userId}}<br>
            姓名：{{userFind.name}}<br>
            电子邮件：{{userFind.email}}<br>
            电话：{{userFind.tel}}<br>
            用户类型：{{userFind.userType}}<br>
            <el-button slot="reference" type="success">更改信息</el-button>
          </div>
        </el-popover>
        <el-button type="info" @click="logout"> 退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside width="200px">
        <!--侧边栏菜单区-->
        <el-menu
          background-color="#0094de"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- 一级菜单-->
          <el-submenu index="1">
            <!--一级菜单模板区域-->
            <template slot="title">
              <!-- 图标-->
              <i class="el-icon-location"></i>
              <!-- 文本-->
              <span>导航一</span>
            </template>
            <!--二级菜单-->
            <el-menu-item index="1-4-1">
              <!--二级菜单模板区域-->
              <template slot="title">
                <!-- 图标-->
                <i class="el-icon-location"></i>
                <!-- 文本-->
                <span>导航一</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data(){
      return{
        // 用户信息查询的绑定数据
        userFind: {
          userId: "",
          name: "",
          email: "",
          tel: "",
          userType: "",
        },

        // 用户Id
        userId:{
          userId: "",
        }
      }
    },
    methods:{
      logout(){
        window.sessionStorage.clear();
        this.$router.push("/login")
      },
      async getbyId(){
        this.userId.userId = window.sessionStorage.getItem("userId");
        const res = await this.$http.post('userinfo/getById',this.userId);
        if(res.data.status != 200) return this.$message.error("网络出问题了哦！");
        this.userFind.userId = res.data.data.userId;
        this.userFind.name = res.data.data.name;
        this.userFind.email = res.data.data.email;
        this.userFind.tel = res.data.data.tel;
        if(res.data.data.userType == "1"){
          this.userFind.userType = "一级领导";
        }else if(res.data.data.userType == "2"){
          this.userFind.userType = "部门领导";
        }else if(res.data.data.userType == "3"){
          this.userFind.userType = "员工";
        }
        console.log(this.userFind.userId+","+this.userFind.email+","+this.userFind.tel+","+this.userFind.userType+","+this.userFind.name);

      }
    }
  }
</script>

<style lang="less"scoped>
.el-header{
  background-color: #00a1f1;
  display: flex;
  justify-content: space-between;// 元素之间的距离相等
  padding-left: 0;
  align-items: center;// 按钮在整个区域居中
  color: white;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}

  .el-aside{
    background-color: #0094de;
  }

  .el-main{
    background-color: #eaedf1;
  }

  .home-container{
    height: 100%;
  }
</style>
