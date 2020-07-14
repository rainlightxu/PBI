<template>
  <div class="app-container">
    <!-- 面包屑导航区域 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文件管理</el-breadcrumb-item>
      <el-breadcrumb-item>文件管理</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col :span="16">
          <h3>上传列表</h3>
        </el-col>
        <el-col class="btns" :span="8">
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
          <el-button type="success" icon="el-icon-plus">新建</el-button>
          <el-button type="info" icon="el-icon-rank">移动</el-button>
          <el-button type="primary" icon="el-icon-upload">上传</el-button>
        </el-col>
      </el-row>
      <div class="directory">
        <span>当前目录：</span>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">D:</el-breadcrumb-item>
          <el-breadcrumb-item to="#" @click.prevent="handleBreadcrumbClicked">Mike</el-breadcrumb-item>
          <el-breadcrumb-item to="#">UL-QA</el-breadcrumb-item>
          <el-breadcrumb-item to="#">My-COA</el-breadcrumb-item>
          <el-breadcrumb-item to="#">U_QC</el-breadcrumb-item>
          <el-breadcrumb-item>dist</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-card>
    <!-- fileList -->
    <el-card>
      <el-table
        :data="list"
        style="width: 100%;cursor:default;"
        @row-dblclick="handleRowDBClicked"
        v-loading="listLoading"
        element-loading-text="Loading"
        fit
        highlight-current-row
      >
        <el-table-column align="center" type="selection"></el-table-column>

        <el-table-column label="名称" align="left" width="300">
          <template slot-scope="scope">
            <i v-if="scope.row.type === ' '" :class="iconMap(scope.row.type)" class="iconType"></i>
            <svg-icon v-else :icon-class="iconMap(scope.row.type)" class="iconType"></svg-icon>
            <a>{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="修改日期" width="300">
          <template slot-scope="scope">
            <span>{{scope.row.created_time}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型" width="300">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="大小">
          <template slot-scope="scope">
            <span>{{scope.row.size}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="fetchData"
      />-->
    </el-card>
  </div>
</template>
<script>
/* eslint-disable */
import { getFileList } from "@/api/fileList";
import Pagination from "@/components/Pagination";
export default {
  name: "fileManagement",
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        id: "",
        name: "",
        type: "",
        created: "",
        size: "",
        page: 1,
        limit: 10,
        sort: ""
      },
      listLoading: false,
      tableData: [
        {
          created_time: "",
          name: "...",
          type: "",
          size: ""
        },
        {
          created_time: "2016-05-02",
          name: "Program Files",
          type: "文件夹",
          size: "100KB"
        },
        {
          created_time: "2016-05-04",
          name: "Program Files",
          type: "文件夹",
          size: "100KB"
        },
        {
          created_time: "2016-05-01",
          name: "Program Files",
          type: "文件夹",
          size: "100KB"
        },
        {
          created_time: "2016-05-03",
          name: "Program Files",
          type: "文件夹",
          size: "100KB"
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getFileList(this.listQuery).then(res => {
        this.list = res.data.items;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.fetchData();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.fetchData();
      // console.log(`当前页: ${val}`);
    },
    iconMap(type) {
      if (type === "文件夹") {
        return "folder";
      } else if (type === "文本文档") {
        return "txt";
      } else if (type === "应用程序") {
        return "exe";
      } else if (type === "WinRAR 压缩文件") {
        return "rar";
      } else if (type === "WinRAR ZIP 压缩文件") {
        return "zip";
      } else if (type === "Microsoft Excel 工作表") {
        return "excel";
      } else if (type === "Microsoft PowerPoint 演示文稿") {
        return "powerpoint";
      } else if (type === "Microsoft Word 文档") {
        return "word";
      } else if (type === "PNG 文件") {
        return "el-icon-picture";
      } else if (type === "JavaScript 文件") {
        return "el-icon-receiving";
      } else {
        return "";
      }
    },
    handleRowDBClicked(row, column, event) {
      if (row.type === "文件夹") {
        console.log(row);
        this.list = this.tableData;
      } else if (row.name === "...") {
        this.fetchData();
      } else {
        this.$message.success("打开了文件！");
      }
    },
    handleBreadcrumbClicked() {
      console.log("OK");
    }
  }
};
</script>
<style lang="scss" scoped>
.directory {
  background-color: #eee;
  padding: 10px;
  font-size: 16px;
  // font-family: Geneva;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.btns {
  margin-top: 9px;
}
.iconType {
  font-size: 25px;
}
.breadcrumb {
  font-size: 16px;
  .el-breadcrumb-item {
    &:last-child {
      font-weight: bold;
    }
  }
}
</style>