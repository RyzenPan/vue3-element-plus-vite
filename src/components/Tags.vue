<template>
	<div class="tags" v-if="showTags">
		<ul>
			<li
				class="tags-li"
				v-for="(item, index) in tagsList"
				:class="{ active: isActive(item.path) }"
				:key="index"
			>
				<router-link :to="item.path" class="tags-li-title">{{
					item.title
				}}</router-link>
				<span class="tags-li-icon" @click="closeTags(index)">
					<i class="el-icon-close"></i>
				</span>
			</li>
		</ul>
		<div class="tags-close-box">
			<el-dropdown @command="handleTags">
				<el-button size="mini" type="primary">
					标签操作
					<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu size="small">
						<el-dropdown-item command="other">关闭其他</el-dropdown-item>
						<el-dropdown-item command="all">关闭所有</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()

let tagsList = computed(() => store.state.tagsList)
let showTags = computed(() => tagsList.value.length > 0)

const isActive = path => {
	return path === route.fullPath
}

// 关闭单个标签
const closeTags = index => {
	const delItem = tagsList.value[index]
	store.commit('delTagsItem', { index })
	const item = tagsList.value[index] ? tagsList.value[index] : tagsList.value[index - 1]
	if (item) {
		delItem.path === route.fullPath && router.push(item.path)
	} else {
		router.push('/')
	}
}

// 关闭全部标签
const closeAll = () => {
	store.commit('clearTags')
	router.push('/')
}

// 关闭其他标签
const closeOther = () => {
	const curItem = tagsList.value.filter(item => item.path === route.fullPath)
	store.commit('closeTagsOther', curItem)
}

// 设置标签
const setTags = route => {
	const isExist = tagsList.value.some(item => item.path === route.fullPath)
	if (!isExist) {
		if (tagsList.value.length >= 8) {
			store.commit('delTagsItem', { index: 0 })
		}
		store.commit('setTagsItem', {
			name: route.name,
			title: route.meta.title,
			path: route.fullPath,
		})
	}
}
const handleTags = command => {
	command === 'other' ? closeOther() : closeAll()
}

onMounted(() => {
	setTags(route)
})

watch(
	() => route.path,
	(newValue, oldValue) => {
		setTags(route)
	}
)
</script>

<style>
.tags {
	position: relative;
	height: 40px;
	overflow: hidden;
	background: #fff;
	padding-right: 120px;
	box-shadow: 0 5px 10px #ddd;
}

.tags ul {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}

.tags-li {
	float: left;
	margin: 7px 0 0 7px;
	border-radius: 3px;
	font-size: 12px;
	overflow: hidden;
	cursor: pointer;
	height: 23px;
	line-height: 23px;
	border: 1px solid #e9eaec;
	background: #fff;
	padding: 0 5px 0 12px;
	vertical-align: middle;
	color: #666;
	-webkit-transition: all 0.3s ease-in;
	-moz-transition: all 0.3s ease-in;
	transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
	background: #f8f8f8;
}

.tags-li.active {
	color: #fff;
}

.tags-li-title {
	float: left;
	max-width: 80px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-right: 5px;
	color: #666;
}

.tags-li.active .tags-li-title {
	color: #fff;
}

.tags-close-box {
	position: absolute;
	right: 3px;
	top: 0;
	box-sizing: border-box;
	padding-top: 7px;
	text-align: center;
	width: 110px;
	height: 23px;
	background: #fff;
	z-index: 10;
}
</style>
