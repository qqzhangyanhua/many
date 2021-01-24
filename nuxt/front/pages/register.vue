<template>
    <div class="register-contain">
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item label="用户名" prop="name">
                <el-input type="name" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="victyCode">
                <div class="button">
                    <img :src="code" alt="图形验证码" @click="changeImg">
                </div>
                <el-input v-model.number="ruleForm.victyCode"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import md5 from 'md5'
export default {
  layout: 'login',
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    return {
      ruleForm: {
        pass: '',
        name: '',
        victyCode: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        name: [{ validator: checkName, trigger: 'blur' }],
        victyCode: [{ validator: checkAge, trigger: 'blur' }]
      },
      code: 'api/usercaptcha'
    }
  },
  mounted() {},
  methods: {
    changeImg() {
      this.code = 'api/usercaptcha?t=' + new Date().getTime()
    },
    submitForm(formName) {
      console.log(this.ruleForm.victyCode)
      let obj = {
        captcha: this.ruleForm.victyCode,
        name: md5(this.ruleForm.pass)
      }
      let ret = this.$http.post('/userregister', obj)
      console.log('1111ss', ret)

      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       alert('submit!')
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //   })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.register-contain {
  height: 500px;
  width: 400px;
  margin: 0 auto;
  margin-top: 200px;
}
</style>
