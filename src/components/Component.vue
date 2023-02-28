<!-- 左侧展示界面 -->
<template>
    <div class="components-box">
        <div class="header-logo">
            LOWCODE
        </div>
        <div class="container">
            <!-- 组件部分 -->
            <el-collapse>
                <el-collapse-item title="组件库" name="1">
                    <div 
                    class="comp-card" 
                    v-for="item in cList.filter(v => v.type === 'normal')" 
                    :key="item.name" 
                    draggable="true" 
                    @dragstart="(e) => handleDragStart(e,item) "
                    >
                        <div class="comp-img"
                            :style="{
                                width: '100%',
                                height: '100%',
                                background: `url(${item.imgSrc})`,
                                backgroundSize: '40%',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }"
                        >
                        </div>
                        <div class="comp-name">
                            {{ item.label }}
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>


<script >

import {reactive ,toRefs} from 'vue';

export default {  
    props: {},
    components:{},
    setup() {
        const data = reactive({
            cList: [
                {
                name: 'text',
                label: '文本框',
                type: 'normal',
                imgSrc: 'https://www.logosc.cn/oss/icons/2022/05/05/e7aedc633f05256d8de1bc9829d278d2.png',
                },
                {
                name: 'table',
                label: '表格',
                type: 'normal',
                imgSrc: 'https://www.logosc.cn/oss/icons/2022/04/01/3b28c2d6b57b746d62d6ace1fc5534cb.png',
                },
                {
                name: 'image',
                label: '图片',
                type: 'normal',
                imgSrc: 'https://www.logosc.cn/oss/icons/2022/07/03/e35782f317fbcbaa5479a455cde3b040.png',
                },
                {
                name: 'rect',
                label: '按钮',
                type: 'normal',
                imgSrc: 'https://www.logosc.cn/oss/icons/2022/04/13/0571e1e656651c968eed1984c9acdedc.png',
                },
                {
                name: 'url',
                label: '链接',
                type: 'normal',
                imgSrc: 'https://www.logosc.cn/oss/icons/2022/06/28/a098ee02975346f69c617c2dc55b901a.png',
                },
                {
                name: 'video',
                label: '视频',
                type: 'normal',
                imgSrc: 'https://www.logosc.cn/oss/icons/2022/08/09/01f7f7457b656a8f4eac8e7f4164d76d.png',
                },
                {
                name: 'bar',
                label: '柱状图',
                type: 'normal',
                imgSrc: 'https://static.thenounproject.com/png/23114-200.png',
                },
                {
                name: 'line',
                label: '折线图',
                type: 'normal',
                imgSrc: 'https://www.logosc.cn/oss/icons/2021/12/23/db9175ee65b583e686e95a6577bd0f77.png',
                },   
            ],
        });
        const handleDragStart = (e, data) => {
            /*DataTransfer对象专门用来存储拖放时要携带的数据，setData有两个参数：1.第一个参数为携带数据的数据种类的字符串，只能填入类 似“text/plain”或“textml”的表示 MIME类型的文字2.第二个参数为要携带的数据*/
            e.dataTransfer.setData('componentId', data.name);
        };
        return {...toRefs(data), handleDragStart};
    }
}


    
</script>

<style lang="less" scoped>
    .components-box {
        width: 355px;
        box-shadow : 4px 0px 6px 0 rgba(221, 221, 221, 0.726);
        .header-logo {
            padding: 20px;
            border-bottom: 1.5px solid #ebedf0;
        };
        .container {
            /deep/ .el-collapse-item_header {
                padding-left: 20px;
            };
            /deep/ .el-collapse-item__content {
                padding: 20px;
                display: flex !important;
                flex-wrap: wrap;
                
            };
            .drag {
                display: flex;
                flex-wrap: wrap;
            };

            .comp-card {
                width: 145px;
                height: 98px;
                display: flex;
                margin-right: 11px;
                margin-bottom: 20px;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                transition: 0.2s linear;
                cursor: pointer;
                overflow: hidden;
                box-shadow: 0 0 5px 0 #dcdade;
                border-radius: 4px;
                &:hover {
                    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 16%),
                    0 3px 6px 0 rgba(0, 0, 0, 12%),
                    0 5px 12px 4px rgba(0, 0, 0, 9%);
                    .card-img {
                        transform: scale(1.1);
                    };
                    .card-name {
                        transform: scale(1.1);
                    };

                }
                &:last-child {
                    margin-right: auto;
                }
                .comp-img {
                    font-size: 17px;
                    color: #000;
                    font-family:'Gill Sans', 'Gill Sans MT',
                    Calibri, 'Trebuchet MS', sans-serif;
                    transition: 0.2s linear;
                };
                .comp-name {
                    padding: 5px 0px;
                    color: #5c5c5c;
                }
            }
        }
    }
</style>