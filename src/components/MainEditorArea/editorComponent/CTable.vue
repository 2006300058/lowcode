<template>
    <div
        class="table-box"
        :style="boxStyle"
    >
        <el-table :data="tableRes.resData">
            <el-table-column
                v-for="item in tableRes.resColumn" :key="item"
                :label="item" :prop="item"
            >
            </el-table-column>
        </el-table>
    </div>    
</template>

<script>
import { reactive, computed, toRefs, onMounted } from 'vue';

    export default {
        props: {
            data: {
                type: Object,
                default: null,
                require: true
            }         
        },
        components: {},
        
        setup(props, context) {
            
            const data = reactive({
                bgColor : () => { 
                    const { bgcolor } = props.data ; 
                    return bgcolor ;
                },
                options: computed(()=> props.data.data.componentData),
                boxStyle: computed(()=> {
                    const { fourBorderRadius } = data.options;
                    const { left, right, top, bottom } = fourBorderRadius;
                    return {
                        backgroundRadius : `${top}px ${right}px ${bottom}px ${left}px `,
                        backgroundColor: data.bgColor,
                    }
                }),
                tableRes : computed(() => {
                    if(true) {
                        return {
                            resData: data.options.tableData,
                            resColumn: Object.keys(data.options.tableData[0])
                            };
                    }
                        return [];
                }),
                
               
            });
            onMounted(()=>{});
            return {...toRefs(data)}
        }
    }
</script>
<style lang="less" scoped>
    .table-box {
        width: 100%;
        height: 100%;
        caret-color: transparent;
        overflow: auto;
    }
</style>