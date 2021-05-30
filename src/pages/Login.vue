<template>
	<div class="login-wrap">
		<img
			class="login-wrap-icon"
			src="../assets/img/login-wrap-icon.png"
			draggable="false"
		/>
		<div class="ms-login">
			<div class="ms-title">Vite Element Plus System</div>
			<el-form
				:model="userInfo"
				:rules="rules"
				ref="login"
				label-width="0px"
				class="ms-content"
			>
				<el-form-item prop="username">
					<el-input v-model="userInfo.username" placeholder="请输入用户名">
						<template #prepend>
							<el-button icon="el-icon-user"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						type="password"
						placeholder="请输入密码"
						v-model="userInfo.password"
						@keyup.enter="submitForm()"
					>
						<template #prepend>
							<el-button icon="el-icon-lock"></el-button>
						</template>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm()">登录</el-button>
				</div>
				<p class="login-tips">初始账号密码为admin</p>
			</el-form>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElLoading, ElMessage } from 'element-plus'

const router = useRouter()
const login = ref(null)
const store = useStore()

const userInfo = reactive({
	username: 'admin',
	password: 'admin',
})

const rules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

onMounted(() => {
	store.commit('clearTags')
})

const submitForm = () => {
	login.value.validate(valid => {
		if (valid) {
			const loading = ElLoading.service({
				lock: true,
				text: '登录中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.2)',
			})
			setTimeout(() => {
				ElMessage.success('登录成功')
				localStorage.setItem('ms_username', userInfo.username)
				router.push('/')
				loading.close()
			}, 1000)
		} else {
			ElMessage.error('请输入账号和密码')
			loading.close()
			return false
		}
	})
}
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: linear-gradient(
		to right top,
		#6d327c,
		#485da6,
		#00a1ba,
		#00bf98,
		#36c486
	);
	background-size: 100%;
}
.login-wrap-icon {
	position: absolute;
	right: 40px;
	bottom: 0;
}
.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #dadada;
	border-bottom: 1px solid #000;
}
.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 15px;
	background-color: #292929;
	overflow: hidden;
}
.ms-content {
	padding: 30px 30px;
}
.login-btn {
	text-align: center;
}
.login-btn button {
	width: 100%;
	height: 36px;
	margin-bottom: 10px;
	background-color: #36c486;
	border-color: #36c486;
}
.login-tips {
	font-size: 12px;
	line-height: 30px;
	color: #fff;
}
</style>
