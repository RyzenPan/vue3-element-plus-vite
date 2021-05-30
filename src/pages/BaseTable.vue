<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 基础表格
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button
					type="primary"
					icon="el-icon-delete"
					class="handle-del mr10"
					@click="delAllSelection"
					>批量删除</el-button
				>
				<el-select
					v-model="query.address"
					placeholder="地址"
					class="handle-select mr10"
				>
					<el-option key="1" label="广东省" value="广东省"></el-option>
					<el-option key="2" label="湖南省" value="湖南省"></el-option>
				</el-select>
				<el-input
					v-model="query.name"
					placeholder="用户名"
					class="handle-input mr10"
				></el-input>
				<el-button type="primary" icon="el-icon-search" @click="handleSearch"
					>搜索</el-button
				>
			</div>
			<el-table
				:data="tableData"
				border
				class="table"
				ref="multipleTable"
				header-cell-class-name="table-header"
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					type="selection"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column
					prop="id"
					label="ID"
					width="55"
					align="center"
				></el-table-column>
				<el-table-column prop="name" label="用户名"></el-table-column>
				<el-table-column label="账户余额">
					<template #default="scope">￥{{ scope.row.money }}</template>
				</el-table-column>
				<el-table-column label="头像(查看大图)" align="center">
					<template #default="scope">
						<el-image
							class="table-td-thumb"
							:src="scope.row.thumb"
							:preview-src-list="[scope.row.thumb]"
						></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="address" label="地址"></el-table-column>
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<el-tag
							:type="
								scope.row.state === '成功'
									? 'success'
									: scope.row.state === '失败'
									? 'danger'
									: ''
							"
							>{{ scope.row.state }}</el-tag
						>
					</template>
				</el-table-column>

				<el-table-column prop="date" label="注册时间"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template #default="scope">
						<el-button
							type="text"
							icon="el-icon-edit"
							@click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-button
							type="text"
							icon="el-icon-delete"
							class="red"
							@click="handleDelete(scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form ref="form" :model="editFormData" label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="editFormData.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="editFormData.address"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { fetchData } from '../api/index'
import { ref, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

let query = ref({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10,
})

let tableData = ref([])
let multipleSelection = []
let delList = []
let editVisible = ref(false)
let pageTotal = ref(0)
let editFormData = ref({
  name: '',
  address: ''
})
let idx = -1

onMounted(() => {
	getData()
})

// 获取 easy-mock 的模拟数据
const getData = () => {
	fetchData(query).then(res => {
		tableData.value = res.list
		pageTotal.value = res.pageTotal || 50
	})
}

// 触发搜索按钮
const handleSearch = () => {
	query.pageIndex = 1
	getData()
}

// 删除操作
const handleDelete = (row) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning',
	})
		.then(() => {
			ElMessage.success('删除成功')
      tableData.value = tableData.value.filter(i => i.id !== row.id)
		})
		.catch(() => {})
}

// 多选操作
const handleSelectionChange = val => {
  console.log(val);
	multipleSelection = val
}

// 删除多选的
const delAllSelection = () => {
	const length = multipleSelection.length
	let str = ''
	delList = delList.concat(multipleSelection)
	for (let i = 0; i < length; i++) {
		str += multipleSelection[i].name + ' '
    tableData.value = tableData.value.filter(j => j.id !== multipleSelection[i].id)
	}
	ElMessage.error(`删除了${str}`)
	multipleSelection = []
}

// 编辑操作
const handleEdit = (index, row) => {
	idx = index
	editFormData.value = row
	editVisible.value = true
}

// 保存编辑
const saveEdit = () => {
	editVisible.value = false
	ElMessage.success(`修改第 ${idx + 1} 行成功`)
	tableData[idx] = editFormData
}

// 分页导航
const handlePageChange = val => {
	query.pageIndex = val
	getData()
}
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
	display: inline-block;
}
.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #ff0000;
}
.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
