<template>
    <div
        
    >
    </div>
</template>

<script>
//右侧选项
import { mapGetters } from 'vuex';
import { codemirror } from 'vue-codemirror'
import vueJsonEditor from 'vue-json-editor'
import CustomComponent from './CustomComponent';
import 'codemirror/lib/codemirror.css'
import { reactive, watch, toRefs } from 'vue';
    export default {
        props: {},
        components: { codemirror, vueJsonEditor, ...CustomComponent },
        setup(props,context) {
            const data = reactive({
                curTableData : '',
                computed: {
                    ...mapGetters(['editorLayout','selectComponent']),
                    options() {
                        return this.selectComponent ? this.selectComponent.data.componentData : null;
                    },
                    componentOptions () {
                        return this.selectComponent ? this.selectComponent.data.componentStyle : null;
                    }
                },

            });
            watch(()=>'data.options',newVal=>{
                if (newVal && newVal.tableData) {
                    data.curTableData = JSON.stringify(newVal.tableData || '', null, 2);
                }
            });
        }
    }
</script>

<style lang="less" scoped>
    
</style>