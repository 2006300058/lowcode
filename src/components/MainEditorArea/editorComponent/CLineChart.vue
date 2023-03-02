<template>
    <div
        class="linechart-box"
        :style="boxStyle"
    >
        <v-chart ref="chart" class="main"
        :option="chartOptions.getDataType === 'static' ? 
        BarChartOption : apiData "
        :autoresize="true"
        >
        </v-chart>
    </div>
</template>

<script>
import { reactive, toRefs, computed, watch, getCurrentInstance } from 'vue';

    export default {
        props: {      
                data: {
                    type: Object,
                    require: true,
                    default: null,
                }     
        },
        components: {

        },
        setup(props, context) {
            const { proxy } = getCurrentInstance();
            const data = reactive({
                apiData: {},
                normalOptions: ()=> props.data.data.componentData,
                chartOptions: ()=> props.data.data.componentData.dataOptions,
                BarChartOption: () => {
                    const { chartJsonData } = chartJsonData;
                    const res = data.initEchart(chartJsonData);
                    return res;
                },
                initEchart : (chartData) => {
                    const { title } = data.normalOptions;
                    const yData = chartData.reduce((pre, cur) => {
                        const yName = cur['类型'];
                        const isExist = pre.find((v) => v.name === yName);
                        if (!isExist) {
                            pre.push({
                                name: yName,
                                data: [cur['数据']],
                            })
                        }else {
                            isExist.data.push(cur['数据']);
                        }
                        return pre;
                    },[]);
                    const res = {
                        title: {
                            text: title,
                        },
                        tooltip: {},
                        xAxis: {
                            data: [...new Set(chartData.map((v) => v['名称']))],
                        },
                        yAxis: {},
                        series: yData.map((item) => ({
                            ...item, type: 'line',
                        })),
                    }
                    return res;
                },
                boxStyle : computed(()=> {
                    const { bgcolor } = props.data;
                    const { fourBorderRadius } = props.normalOptions;
                    const { left, right, top, bottom } = fourBorderRadius;
                    return {
                        backgroundColor : bgcolor,
                        borderRadius: `${top}px ${right}px ${bottom}px ${left}px`
                    };
                }),             
            });
            //获取方式要监听
            watch(()=> 'chartOptions.getDataType' , newValue=>{
                if(newValue === 'get') {
                    proxy.$axios.get(data.chartOptions.tableDataUrl).then((res) => {
                        const showRes = data.initEchart(res.data);
                        data.apiData = showRes;
                    })
                }
            });
            //改变网址也要监听
            watch(()=> 'chartOptions.tableDataUrl', newValue=> {
                if(newValue === 'get') {
                    proxy.$axios.get(data.chartOptions.tableDataUrl).then((res) => {
                        const showRes = data.initEchart(res.data);
                        data.apiData = showRes;
                    })
                }
            })
            return { ...toRefs(data)}
        }
    }
</script>

<style lang="less" scoped>
    .linechart-box {
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