const formAttribute = [
    {
        label: '设置组件标题',
        value: 'caption',
        type: 'input'
    },
    {
        label: '设置表单组件禁用',
        value: 'disabled',
        type: 'switch'
    },
    {
        label: '文本对齐方式',
        value: 'labelAlign',
        type: 'select',
        options: [
            {
                value: 'left'
            },
            {
                value: 'right'
            }
        ],
        defaultValue: 'right'
    },
    {
        label: '设置字段组件的尺寸',
        value: 'size',
        type: 'select',
        options: [
            {
                value: 'large'
            },
            {
                value: 'small'
            },
            {
                value: 'middle'
            }
        ],
        defaultValue: 'middle'
    },
    {
        label: '标题显示冒号',
        value: 'colon',
        type: 'switch'
    }

]

export {
    formAttribute
}
