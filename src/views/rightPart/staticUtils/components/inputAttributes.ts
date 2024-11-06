const inputAttributes =[
    {
        label: '前置标签',
        value: 'addonBefore',
        type: 'input'
    },
    {
        label: '后置标签',
        value: 'addonAfter',
        type: 'input'
    },
    {
        label: '允许清除',
        value: 'allowClear',
        type: 'switch'
    },
    {
        label: '是否禁用',
        value: 'disabled',
        type: 'switch'
    },
    {
        label: '展示字数',
        value: 'showCount',
        type: 'switch'
    },
    {
        label: '控件大小',
        value: 'size',
        type: 'select',
        options: [
            {
                value: 'large'
            },
            {
                value: 'middle'
            },
            {
                value: 'small'
            }
        ],
        defaultValue: 'middle'
    },
]
export {
    inputAttributes
}
