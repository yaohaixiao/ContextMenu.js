# ContextMenu

一个简单哈用的右键菜单控件

## Features

- 原生 JavaScript 开发 无任何依赖
- 界面简洁大方
- 支持多级菜单
- 支持自定义图标
- 调用简单

## Screen Shot

[![图片](https://github.com/yaohaixiao/ContextMenu.js/blob/main/img/screen-shot.png?raw=true "ContextMenu.js")](https://github.com/yaohaixiao/ContextMenu.js)

## Usage
```js
const MENUS = [
      {
        name: 'new',
        icon: 'file',
        label: '新建',
        children: [
          {
            name: 'file-word',
            icon: 'file-word-o',
            label: 'Word 文件',
            action: function (evt, menu) {
              console.log(evt, menu)
              console.log('新建 Word 文件')
            }
          },
          {
            name: 'file-excel',
            icon: 'file-excel-o',
            label: 'Excel 文件',
            action: function (evt, menu) {
              console.log(evt, menu)
              console.log('新建 Excel 文件')
            }
          },
          {
            name: 'file-ppt',
            icon: 'file-powerpoint-o',
            label: 'PowerPoint 文件',
            action: function (evt, menu) {
              console.log(evt, menu)
              console.log('新建 PowerPoint 文件')
            }
          }
        ]
      },
      {
        name: 'divider',
        isDivider: true
      },
      {
        name: 'copy',
        icon: 'copy',
        label: '复制',
        action: function (evt, menu) {
          console.log(evt, menu)
          console.log('复制')
        }
      },
      {
        name: 'paste',
        icon: 'paste',
        label: '粘贴',
        action: function (evt, menu) {
          console.log(evt, menu)
          console.log('粘贴')
        }
      },
      {
        name: 'cut',
        icon: 'cut',
        label: '剪切',
        action: function (evt, menu) {
          console.log(evt, menu)
          console.log('剪切')
        }
      },
      {
        name: 'divider',
        isDivider: true
      },
      {
        name: 'delete',
        icon: 'trash',
        label: '删除',
        action: function (evt, menu) {
          console.log(evt, menu)
          console.log('删除')
        }
      }
    ]

    const contextmenu = new ContextMenu({
      menus: MENUS
    })

    contextmenu.reload({
      menus: MENUS
    })
```

## License

Licensed under <a href="http://opensource.org/licenses/mit-license.html">MIT License</a>

