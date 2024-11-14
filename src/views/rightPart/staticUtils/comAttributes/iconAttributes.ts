const iconAttribute = [
    {
        label: '组件标题',
        value: 'caption',
        type: 'input'
    },
    {
        label: '旋转角度',
        value: 'rotate',
        type: 'number'
    },
    {
        label: '旋转动画',
        value: 'spin',
        type: 'switch'
    },
    // 新增弹窗类型， modalType是弹窗的类型（确定是哪个弹窗）
    {
        label: '选择图标',
        value: 'type',
        type: 'modal',
        modalType: 'IconSelect'
    }
]
export {
    iconAttribute
}
