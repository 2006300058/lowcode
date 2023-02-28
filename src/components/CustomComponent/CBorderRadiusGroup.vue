<template>
    <div>
        <el-row :gutter="20" class="option-row">
            <el-col :span="12">
                <el-input v-model.number="props.value.top" size="mini">
                    <template  v-slot="prepend">
                        <icon-font code="&#xeb03;" :size="16"/>
                    </template>
                </el-input>
                
            </el-col>
            <el-col>
                <el-input v-model.number="props.value.right" size="mini">
                    <template  v-slot="prepend">
                        <icon-font code="&#xeb06;" :size="16"/>
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="option-row">
            <el-col>
                <el-input v-model.number="props.value.left" size="mini">
                    <template  v-slot="prepend">
                        <icon-font code="&#xeb04;" :size="16"/>
                    </template>
                </el-input>
            </el-col>
            <el-col>
                <el-input v-model.number="props.value.bottom" size="mini">
                    <template  v-slot="prepend">
                        <icon-font code="&#xeb05;" :size="16"/>
                    </template>
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { reactive,toRefs } from 'vue';

//边框选择样式
  export default {
    props: {
        value: {
            type: Object,
            require: true,
            default: null,
                        
        }
    },
    setup(props){
        const data = reactive({

        })
        return {...toRefs(data), props}
    }
  }
</script>

<style lang="less" scoped>
 .option-row {
    margin-bottom: 10px;
 }
    
</style>