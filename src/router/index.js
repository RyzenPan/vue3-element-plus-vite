import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
	{
		path: '/',
		redirect: '/dashboard',
	},
	{
		path: '/',
		name: 'Home',
		component: Home,
		children: [
			{
				path: '/dashboard',
				name: 'dashboard',
				meta: {
					title: '系统首页',
				},
				component: () =>
					import(
						/* webpackChunkName: "dashboard" */
						'../pages/Dashboard.vue'
					),
			},
			{
				path: '/table',
				name: 'basetable',
				meta: {
					title: '表格',
				},
				component: () =>
					import(
						/* webpackChunkName: "table" */
						'../pages/BaseTable.vue'
					),
			},
			{
				path: '/form',
				name: 'baseform',
				meta: {
					title: '表单',
				},
				component: () =>
					import(
						/* webpackChunkName: "form" */
						'../pages/BaseForm.vue'
					),
			},
			{
				path: '/tabs',
				name: 'tabs',
				meta: {
					title: 'tab标签',
				},
				component: () =>
					import(
						/* webpackChunkName: "tabs" */
						'../pages/Tabs.vue'
					),
			},
			{
				path: '/permission',
				name: 'permission',
				meta: {
					title: '权限管理',
					permission: true,
				},
				component: () =>
					import(
						/* webpackChunkName: "permission" */
						'../pages/Permission.vue'
					),
			},
			{
				path: '/upload',
				name: 'upload',
				meta: {
					title: '上传插件',
				},
				component: () =>
					import(
						/* webpackChunkName: "upload" */
						'../pages/Upload.vue'
					),
			},
			{
				path: '/404',
				name: '404',
				meta: {
					title: '找不到页面',
				},
				component: () =>
					import(/* webpackChunkName: "404" */ '../pages/404.vue'),
			},
			{
				path: '/403',
				name: '403',
				meta: {
					title: '没有权限',
				},
				component: () =>
					import(/* webpackChunkName: "403" */ '../pages/403.vue'),
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		meta: {
			title: '登录',
		},
		component: () =>
			import(
				/* webpackChunkName: "login" */
				'../pages/Login.vue'
			),
	},
]

const router = createRouter({
	history: createWebHistory(''),
	routes,
})

router.beforeEach((to, from, next) => {
	document.title = `${to.meta.title} | vue-manage-system`
	const role = localStorage.getItem('ms_username')
	if (!role && to.path !== '/login') {
		next('/login')
	} else if (to.meta.permission) {
		// 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
		role === 'admin' ? next() : next('/403')
	} else {
		next()
	}
})

export default router
