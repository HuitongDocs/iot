module.exports = {
    title: '云雀物联网平台',
    base: '/iot/',
    locales: {
      '/': {
        lang: 'zh-CN',
        title: '云雀物联网平台'
      }
    },
    head: [
      ['meta', { name: 'keywords', content: 'huitong handbook' }],
      ['link', { rel: 'shortcut icon', href: '/images/logo.png' }],
    ],
    themeConfig: {
      logo: '/images/logo.png',
      repoLabel: '项目仓库',
      repo: 'https://github.com/HuitongDocs/iot',
      docsDir: 'docs',
      editLinks: true,
      editLinkText: '在 GitHub 上编辑此页面',
      sideBar: 'auto',
      sidebarDepth: 3,
      smoothScroll: true,
      lastUpdated: '上次更新',
      locales: {
        '/': {
          selectText: '选择语言',
          label: '简体中文',
          serviceWorker: {
            updatePopup: {
              message: "发现新内容可用.",
              buttonText: "刷新"
            }
          },
          nav: [
            { text: '开始探索', link: '/company/' }
          ],
          sidebar: {
            '/': genSidebarConfig(),
          }
        }
      }
    },
    serviceWorker: true,
    evergreen: true
  }
  
  function genSidebarConfig() {
    return [
      {
        title: '目录',
        path: 'SUMMARY'
      },
      {
        title: '文档控制',
        collapsable: false,
        path: '/edit/',
        children: [
          'edit/editLog',
        ]
      },
      {
        title: '平台相关概念',
        collapsable: false,
        path: '/terms/',
        children: [
          'terms/termExplanation',
        ]
      },
      {
        title: '平台登录',
        collapsable: false,
        path: '/login/',
        children: [
            'login/register',
            'login/login',
        ]
      },
      {
        title: '产品管理',
        collapsable: false,
        path: '/product/',
        children: [
          'product/create',
          'product/productManage',
        ]
      },
      {
        title: '设备管理',
        collapsable: false,
        path: '/device/',
        children: [
            'device/deviceManage',
          'device/deviceDetail',

        ]
      },
      {
        title: '分组管理',
        collapsable: false,
        path: '/group/',
        children: [
            'group/groupManage',
          'group/groupDetail',

        ]
      },
      {
        title: '个人信息',
        collapsable: false,
        path: '/user/',
        children: [
          'user/userInfo',
        ]
      },
      {
        title: '规则引擎',
        collapsable: false,
        path: '/rule/',
        children: [
          'rule/instanceList',
          'rule/instanceDetail',
        ]
      },
      {
        title: '开发指南',
        collapsable: false,
        path: '/develop/',
        children: [
          'develop/deviceRegistration',
          'develop/deviceLink',
          'develop/ObjectModel',
          'develop/NodeType',
          'develop/deviceLog',
          'develop/ReturnCode',
        ]
      },

      {
        title: '最佳示例',
        collapsable: false,
        path: '/example/',
        children: [
          'example/exampleMQTT.fx',
          'example/examplePython'
        ]
      },

      {
        title: '平台接入协议',
        collapsable: false,
        path: '/protocol/',
        children: [
          'protocol/protocol',
        ]
      }
 
    ]
  }
  