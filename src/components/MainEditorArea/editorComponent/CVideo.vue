<template>
    <div
        class="video-box"
        :style="boxStyle"
    >
        <video-player
            ref="videoPlayer"
            class="video-player vjs-big-play-centered vjs-custom-skin"
            :playsinline="true"
            :options="playOptions"
        >
        </video-player>
    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue';

export default {
    props: {
        data: {
            type: Object,
            default: null,
            require: true
        }
    },
    components: {},
    setup(props,context) {
        const data = reactive({
            options: computed(()=> props.data.data.componentData),
            boxStyle: computed(() => {
                const { fourBorderRadius } = data.options;
                const {left,right,top,bottom} = fourBorderRadius;
                return { 
                    borderRadius: `${top}px ${right}px ${bottom}px ${left}px`
                }
            }),
            playOptions : computed(()=> {
                return {
                    playbackRates: [0.5, 0.75, 1.0, 1.5, 1.75, 2.0],
                    autoplay: false,
                    mtued: false,  //设置默认播放音频：true/false
                    loop: false, //是否循环播放:true/false
                    preload: 'auto', //建议浏览器是否在加载<video>元素时开始下载视频数据。(预加载)auto:立即加载视频（如果浏览器支持它）
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    fluid: true, //是否自适应布局,播放器将会有流体体积。换句话说，它将缩放以适应容器。
                    poster: 'https://pic1.zhimg.com/ v2-df081aadcb6c5b35b7ae28253875d5a8_b.png', //视频封面
                    notSupportedMessage: '无法播', //是否允许重写默认的消息显示出来时，video.js无法播放媒体源                   
                    sources: [{
                        type: 'video/mp4',
                        src: `${data.options.videoUrl}`?`${data.options.videoUrl}`:'http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8',

                    }],
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: false,
                    }
                }
            })
        });
        return {...toRefs(data)}
    }
}
</script>

<style lang="less" scoped>
    .video-box {
        overflow: auto;
        height: 100%;
        width: 100%;
        display: flex;
    }
</style>