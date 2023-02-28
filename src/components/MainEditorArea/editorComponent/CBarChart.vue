<template>
    <div
        class="barchart-box"
        :style="boxStyle"
    >
        <v-chart ref="chart" class="main"
            :option="chartOptions.getDataType === 'static' ? 
            BarChartOption : apiData"
            :autoresize="true"
        >
        </v-chart>
    </div>
</template>

<script>
import {watch,getCurrentInstance,computed,reactive, toRefs} from 'vue'
 export default {
   
    props: {
        data: {
            type: Object,
            require: false,
            default: null,
        }
    },
    components:{},
    setup(props,context) {
        const {proxy} = getCurrentInstance();
        const data = reactive({
            apiData: {},
            normalOptions : computed(()=> {
                return props.data.data.componentData;
            }),
            chartOptions : computed(()=> {
                return props.data.data.componentData.dataOptions;
            }),
            BarChartOption : computed(()=> {
                const { chartJsonData } = data.chartOptions;
                const res = context.initEchart(chartJsonData);
                return res;
            }),
            boxStyle : computed(() => {
                const { bgcolor } = props.data;
                const {
                    fourBorderRadius,
                } = data.normalOptions;
                const {
                    left,right,top,bottom
                } = fourBorderRadius;
                return {
                    backgroundColor: bgcolor,
                    borderRadius: `${top}px ${right}px ${bottom}px ${left}px`
                }
            }),
            
            initEchart : function(chartdata) {
                const { title } = data.normalOptions;
                const yData = chartdata.reduce((pre, cur) => {
                    const yName = cur['类型'];
                    const isExist = pre.find((v) => v.name === yName);
                    if (!isExist) {
                        pre.push({
                            name: yName,
                            data: [cur['数据']],
                        });
                    } else {
                        isExist.data.push(cur['数据']);
                    }
                    return pre;
                }, []);
                const res = {
                    title: {
                        text: title,
                    },
                    tooltip: {},
                    xAxis: {
                        data: [...new Set(chartdata.map((v) => v['名称']))],
                    },
                    yAxis: {},
                    series: yData.map((item) => ({
                        ...item,
                        type: 'bar',
                    }))
                }
                return res;
            }
        });
        watch(()=>'chartOptions.getDataType',newValue =>{
            if(newValue === 'get') {
                proxy.$axios.get(proxy.chartOptions.tableDataUrl).then((res)=> {
                    const showRes = proxy.initEchart(res.data);
                    data.apiData = showRes;
                })
            }
        });
        watch(()=>'chartOptions.tableDataUrl',newValue =>{
            if(newValue === 'get') {
                proxy.$axios.get(proxy.chartOptions.getDataType).then((res)=> {
                    const showRes = proxy.initEchart(res.data);
                    data.apiData = showRes;
                })
            }
        });
        
        return { ...toRefs(data)}
    }
 }
</script>

<style lang="less" scoped>
    .barchart-box {
        caret-color: transparent;
        overflow: auto;
        height: 100%;
        width: 100%;
        .main {
            height: 100%;
            width: 100%;
        }
    }
</style>
