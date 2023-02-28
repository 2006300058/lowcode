<template>
<!-- 获取数据的父组件 -->
    <div>
        <el-row class="option-row">
        <!-- 获取数据 -->
            <el-col :span="6" class="option-item-label">
                {{typeOptions.getDataType.label }}:
            </el-col>
            <el-col :span="18">
                <CSelectGroup
                    v-model="typeValue"
                    :="typeOptions.getDataType.componentAttr"
                />             
            </el-col>           
        </el-row>
        <el-row v-if="typeValue === 'static' " :span="6" class="option-row">
        <!-- 内容 -->
            <el-col :span="6" class="option-item-label">
                {{typeOptions.chartJsonData.label }}:
            </el-col> 
            <el-col :span="18" >
                <vue-json-editor
                    v-model="curValue"
                    :expandedOnStart="false"
                    mode="mode"
                    :show-btns="true"
                    @json-save="onJsonChange"
                />
            </el-col>
        </el-row>
        <el-row v-else class="option-row">
        <!-- 数据接口 -->
            <el-col :span="6" class="option-item-label">
                {{ typeOptions.tableDataUrl.label }}:
            </el-col>
            <el-col>
                <el-input
                    v-model="curUrl"
                    :="typeOptions.tableDataUrl.componentAttr"
                    @blur="handleGetDataByUrl"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>

import { reactive, toRefs, getCurrentInstance, watch, onMounted} from 'vue';

import vueJsonEditor from 'vue-json-editor';
import CSelectGroup from './CSelectGroup.vue';


export default {
    
    components: {
    vueJsonEditor,
    CSelectGroup,
    
},
    props: {
        value: {
            type: Object,
            require: true,
            default: null,
        },
        typeOptions: {
            type: Object,
            default: null,
            require: false,
        }
    },
    setup(props,context){
       // const {proxy} = getCurrentInstance()
        const data = reactive({
            typeValue: props.value.getDataType,
            curValue: props.value.chartJsonData,
            curUrl: props.value.tableDataUrl,

            onJsonChange: function(val){
                context.emit('input',{
                    ...props.value,
                    chartJsonData: val,
                })
            },

            handleGetDataByUrl: function() {
                context.emit('input',{
                    ...props.value,
                    tableDataUrl: data.curUrl
                })
            }
           
        });
        watch(()=>data.typeValue, newValue => {
            context.emit('input', {
                ...props.value,
                getDataType: newValue,
                
            })
        });
        onMounted(()=>{
            
        });
        return {...toRefs(data),props}
    }
}
</script>

<style lang="less" scoped>
 .option-row {
    margin-bottom: 10px;
 }
</style>