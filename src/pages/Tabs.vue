<template>
	<div class="">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item
					><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item
				>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-tabs v-model="message">
				<el-tab-pane :label="`未读消息(${unread.length})`" name="first">
					<el-table :data="unread" :show-header="false" style="width: 100%">
						<el-table-column>
							<template #default="scope">
								<span class="message-title">{{ scope.row.title }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="date" width="180"></el-table-column>
						<el-table-column width="120">
							<template #default="scope">
								<el-button size="small" @click="handleRead(scope.$index)"
									>标为已读</el-button
								>
							</template>
						</el-table-column>
					</el-table>
					<div class="handle-row">
						<el-button type="primary">全部标为已读</el-button>
					</div>
				</el-tab-pane>
				<el-tab-pane :label="`已读消息(${read.length})`" name="second">
					<template v-if="message === 'second'">
						<el-table :data="read" :show-header="false" style="width: 100%">
							<el-table-column>
								<template #default="scope">
									<span class="message-title">{{ scope.row.title }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="date" width="150"></el-table-column>
							<el-table-column width="120">
								<template #default="scope">
									<el-button type="danger" @click="handleDel(scope.$index)"
										>删除</el-button
									>
								</template>
							</el-table-column>
						</el-table>
						<div class="handle-row">
							<el-button type="danger">删除全部</el-button>
						</div>
					</template>
				</el-tab-pane>
				<el-tab-pane :label="`回收站(${recycle.length})`" name="third">
					<template v-if="message === 'third'">
						<el-table :data="recycle" :show-header="false" style="width: 100%">
							<el-table-column>
								<template #default="scope">
									<span class="message-title">{{ scope.row.title }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="date" width="150"></el-table-column>
							<el-table-column width="120">
								<template #default="scope">
									<el-button @click="handleRestore(scope.$index)"
										>还原</el-button
									>
								</template>
							</el-table-column>
						</el-table>
						<div class="handle-row">
							<el-button type="danger">清空回收站</el-button>
						</div>
					</template>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
let message = ref('first')
let unread = reactive([
	{
		date: '2021-6-3 20:00:00',
		title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
	},
	{
		date: '2021-6-3 21:00:00',
		title: '今晚12点整发大红包，先到先得',
	},
])
let read = reactive([
	{
		date: '2021-6-3 20:00:00',
		title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
	},
])
let recycle = reactive([
	{
		date: '2021-6-3 20:00:00',
		title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
	},
])

const handleRead = index => {
	const item = unread.splice(index, 1)
	console.log(item)
	read.unshift(...item)
  console.log(read);
}

const handleDel = index => {
	const item = read.splice(index, 1)
	recycle.unshift(...item)
}

const handleRestore = index => {
	const item = recycle.splice(index, 1)
	read.unshift(...item)
}

const unreadNum = computed(() => unread.length)
</script>

<style>
.message-title {
	cursor: pointer;
}
.handle-row {
	margin-top: 30px;
}
</style>
