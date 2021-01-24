<template>
    <div class="m-header">
        <el-row :gutter="15">
            <el-col :span="6">
                <geo></geo>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Geo from "./geo.vue";
export default {
  components: {
    Geo
  }
};
</script>

