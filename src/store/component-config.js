//在画布显示的布局样式

import {
    TEXT_DATA,
    VIDEO_DATA,
    IMAGE_DATA,
    BAR_CHART_DATA,
    TABLE_DATA,
    LINE_CHART_DATA,
    RECT_DATA,
    URL_DATA
} from './component-data'

import {
    VIDEO_STYLE,
    IMAGE_STYLE,
    TEXT_STYLE,
    BAR_CHART_STYLE,
    TABLE_STYLE,
    LINE_CHART_STYLE,
    RECT_STYLE,
    URL_STYLE
} from './component-style'

export const TEXT = {
    name: '',
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    bgcolor: '',
    active: false,
    id: Math.random(),
    data: {
        type: 'text',
        componentData: TEXT_DATA,
        componentStyle: TEXT_STYLE,
    }
};

export const VIDEO = {
    name: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bgcolor: '',
    active: false,
    id: Math.random(),
    data: {
        type: 'video',
        componentData: VIDEO_DATA,
        componentStyle: VIDEO_STYLE,
    }
};

export const IMAGE = {
    name: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bgcolor: '',
    active: false,
    id: Math.random(),
    data: {
        type: 'image',
        componentData: IMAGE_DATA,
        componentStyle: IMAGE_STYLE,
    }
};

export const BAR_CHART = {
    name: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bgcolor: '',
    active: false,
    id: Math.random(),
    data: {
        type: 'bar_chart',
        componentData: BAR_CHART_DATA,
        componentStyle: BAR_CHART_STYLE,
    }
};

export const LINE_CHART = {
    name: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bgcolor: '',
    active: false,
    id: Math.random(),
    data: {
        type: 'line_chart',
        componentData: LINE_CHART_DATA,
        componentStyle: LINE_CHART_STYLE,
    }
};

export const TABLE = {
    name: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bgcolor: '',
    active: false,
    id: Math.random(),
    data: {
        type: 'table',
        componentData: TABLE_DATA,
        componentStyle: TABLE_STYLE,
    }
};

export const RECT = {
    name: '',
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    bgcolor: '',
    active: false,
    id: Math.random(),
    data: {
        type: 'rect',
        componentData: RECT_DATA,
        componentStyle: RECT_STYLE,
    }
};

export const URL = {
    name: '',
    x: 0,
    y: 0,
    width: 200,
    height: 100,
    bgcolor: '',
    active: false,
    id: Math.random(),
    data: {
        type: 'url',
        componentData: URL_DATA,
        componentStyle: URL_STYLE,
    }
};