<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			:collapse="collapse"
			background-color="#324157"
			text-color="#bfcbd9"
			active-text-color="#20a0ff"
			unique-opened
			router
		>
			<template v-for="item in sidebarList">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template #title>
							<i :class="item.icon"></i>
							<span>{{ item.title }}</span>
						</template>
						<template v-for="subItem in item.subs">
							<el-submenu
								v-if="subItem.subs"
								:index="subItem.index"
								:key="subItem.index"
							>
								<template #title>{{ subItem.title }}</template>
								<el-menu-item
									v-for="(threeItem, i) in subItem.subs"
									:key="i"
									:index="threeItem.index"
									>{{ threeItem.title }}</el-menu-item
								>
							</el-submenu>
							<el-menu-item
								v-else
								:index="subItem.index"
								:key="subItem.index"
								>{{ subItem.title }}</el-menu-item
							>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index">
						<i :class="item.icon"></i>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const sidebarList = [
	{
		icon: 'el-icon-s-home',
		index: 'dashboard',
		title: '系统首页',
	},
	{
		icon: 'el-icon-s-order',
		index: 'table',
		title: '基础表格',
	},
	{
		icon: 'el-icon-document-copy',
		index: 'tabs',
		title: 'tab选项卡',
	},
	{
		icon: 'el-icon-document',
		index: '3',
		title: '表单相关',
		subs: [
			{
				index: 'form',
				title: '基本表单',
			},
			{
				index: 'upload',
				title: '文件上传',
			},
		],
	},
	{
		icon: 'el-icon-warning',
		index: '7',
		title: '错误处理',
		subs: [
			{
				index: 'permission',
				title: '权限测试',
			},
			{
				index: '404',
				title: '404页面',
			},
		],
	},
]

let onRoutes = computed(() => route.path.replace('/', ''))
let collapse = computed(() => store.state.collapse)
</script>

<style scoped>
.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
	width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}
.sidebar > ul {
	height: 100%;
}
</style>
