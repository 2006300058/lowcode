<template>
    <!-- 右键菜单 -->
    <div
        v-if="rightContextConfig.showRightContextId"
        class="rightBar"
        :style="rightContextStyle"
    >
        <div class="bar-item" @click="handleDeleteComponent">
            <i class="el-icon-delete"></i>
            删除
        </div> 
        <div class="bar-item" @click="handleCopyComponent">
            <i class="el-icon-copy-document"></i>
            复制
        </div> 
        <div class="bar-item" @click="handleTopComponent">
            <i class="el-icon-top"></i>
            置顶
        </div> 
        <div class="bar-item" @click="handleBottomComponent">
            <i class="el-icon-bottom"></i>
            置底
        </div> 
    </div>
</template>

<script>


    export default {
        props: {
                rightContextConfig: {
                    type: Object,
                    require: true,
                    default: null,
                },
                rightContextStyle: {
                    type: Object,
                    require: true,
                    default: null,
                },
            },
        setup() {
            function handleDeleteComponent(){
                this.$emit('handleDeleteComponent')
            }
            function handleCopyComponent(){
                this.$emit('handleCopyComponent')
            }
            function handleTopComponent(){
                this.$emit('handleTopComponent')
            }
            function handleBottomComponent(){
                this.$emit('handleBottomComponent')
            }
            return {handleDeleteComponent,handleCopyComponent,handleTopComponent,handleBottomComponent}
        },
        
    }
</script>

<style lang="less" scoped>
    .rightBar {
        width: 120px;
        padding: 10px 0px;
        background-color: #fff;
        border: 1px solid #a09c9c;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.01);
        position: absolute;
        .bar-item {
            transition: 0.2s linear;
            padding: 10px 15px;
            font-size: 13px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
            &:last-child {
                transition: 0.2s linear;
                padding: 10px 15px;
                font-size: 13px;
            }
            &:hover {
                cursor: pointer;
                color: #409eff;
                background-color: #ecf5ff;
            }
        }
        
        
    }
</style>