<template>
    <div
        v-if="editorLayout.length && selectComponent && selectComponent.id"
        :key="selectComponent.id"
        class="option-editor"
    >
        <h2>组件设置</h2>
        <div class="option-list">
            <el-row  :gutter="20" class="option-row" >
                <el-col :span="6" class="option-item-label">组件名称:
                </el-col>
                <el-col :span="18">
                    <el-input v-model.number="selectComponent.name
                    " size="mini"/>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="option-row">
                <el-col :span="6" class="option-item-label">背景颜色:
                </el-col>
                <el-col :span="18">
                    <c-color-picker v-model.number="selectComponent.bgcolor">
                    </c-color-picker>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="option-row">
                <el-col :span="6" class="option-item-label">组件位置:
                </el-col>
                <el-col :span="9" >
                    <el-input v-model.number="selectComponent.x" size="mini">
                        <template v-slot="prepend">x</template>
                    </el-input>
                </el-col>
                <el-col :span="9">
                    <el-input v-model.number="selectComponent.y" size="mini">
                        <template v-slot="prepend">y</template>
                    </el-input>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="option-row">
                <el-col :span="6" class="option-item-label">组件大小:
                </el-col>
                <el-col :span="9">
                    <el-input>
                        <template v-slot="prepend">w</template>
                    </el-input>
                </el-col >
                <el-col :span='9'>
                    <el-input>
                        <!-- 嵌入内容 -->
                        <template v-slot="prepend">h</template>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 拿出没有子组件的组件 -->
            <el-row v-for="item in componentOptions.filter((v) => !v.childComponent)"
                :key="item.style_id"
                class="option-row"
            >
                <el-col
                    :span="6"
                    class="option-item-label"
                >
                    {{ `${item.style_label}:` }}
                </el-col>
                <el-col :span="18" >
                <!-- is将item.component的组件渲染 -->
                    <component
                        :is="item.component"
                        v-model="options[item.style_id]"
                        :="item.compoenntAttr"
                    />
                </el-col>
            </el-row>

            <el-row v-for="item in componentOptions.filter((v) => v.childComponent)"
                :key="item.style_id"
                class="option-row"
            >
                <el-col :span="24">
                    <component
                        :is="item.component"
                        v-model="options[item.style_id]"
                        :typeOptions="item.childComponent"
                    />
                </el-col>
            </el-row>
        </div>
    </div>

    <div v-else class="option-editor" >
        未选中组件
    </div>
</template>

<script>
//右侧选项
import { mapGetters, useStore } from 'vuex';
import { codemirror } from 'vue-codemirror'
import vueJsonEditor from 'vue-json-editor'
import CustomComponent from './CustomComponent';
import 'codemirror/lib/codemirror.css'
import { reactive, watch, toRefs, computed } from 'vue';
    export default {
        props: {},
        components: { codemirror, vueJsonEditor, ...CustomComponent },
        setup(props,context) {
            const store = useStore();
            const data = reactive({
                curTableData : '',
                editorLayout: computed(()=> store.getters.editorLayout),
                selectComponent: computed(() => store.getters.selectComponent),
                //...mapGetters(['editorLayout','selectComponent']),
                options: computed(() =>
                    data.selectComponent ? data.selectComponent.data.componentData : null
                ),
                componentOptions: computed(() => 
                        data.selectComponent ? data.selectComponent.data.componentStyle : null
                ),
                
                handleSetTableData: function() {
                    this.computed.options = JSON.parse(data.curTableData);
                },
                handleGetData: async function() {
                    this.computed.options.tableData = [{
                        a: '你好',
                    }, {   a: '这就是一个测试',
                    }]
                },
                onJsonChange(e) {
                    data.computed.options.chartOption.chartData = e;
                }

            });
            watch(()=>'data.options',newVal=>{
                if (newVal && newVal.tableData) {
                    data.curTableData = JSON.stringify(newVal.tableData || '', null, 2);
                }
            });
            return {...toRefs(data)}
        }
    }
</script>

<style lang="less" scoped>
    .option-editor {
        width: 360px;
        box-shadow: -4px 0px 6px rgba(211, 211, 211, 0.445);
        padding: 20px;
        .option-list {
            .option-item-label {
                text-align: left;
                white-space: nowrap;
            }
            .option-row {
                margin-bottom: 10px;
            }
        }
    }
</style>