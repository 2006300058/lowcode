import CBarChart from "./CBarChart.vue";
import CImg from "./CImg.vue";
import CLineChart from "./CLineChart.vue"
import CRect from "./CRect.vue"
import CTable from "./CTable.vue"
import CText from "./CText.vue"
import CUrl from "./CUrl.vue"
import CVideo from "./CVideo.vue"

//统一暴露
export default {
    CTable,
    CText,
    CImage: CImg,
    CBar: CBarChart,
    CLine: CLineChart,
    CRect,
    CVideo,
    CUrl
}