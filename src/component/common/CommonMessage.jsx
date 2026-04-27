import { notification } from 'antd';
/**
 * 通用提示组件
 * @param {string} message - 提示消息
 * @param {string} description - 提示描述
 * @param {string} type - 提示类型，可选值为 'success', 'info', 'warning', 'error'
 * @param {number} duration - 提示显示时间，单位秒，默认值为 4.5
 * @param {string} placement - 提示显示位置，可选值为 'topRight', 'topLeft', 'bottomRight', 'bottomLeft'，默认值为 'topRight'
 */
const CommonMessage = (message, description, type,duration=4.5,placement='topRight') => {
    notification[type]({
        title: message,
        description: description,
        duration: duration,
        placement: placement,
    });
};

export default CommonMessage;