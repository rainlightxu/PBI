import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    //redirect
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    // /
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: '/dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: 'PBI Home', icon: 'home' }
        }, ]
    },
    //dashboard
    {
        path: '/dashboard',
        component: Layout,
        name: 'Dashboard',
        children: [{
            path: 'offtakeplatform',
            name: 'Offtakeplatform',
            component: () =>
                import ('@/views/offtakeplatform/index'),
            meta: { title: 'offtakeplatform', icon: 'UserManagement' },

            hidden: true
        }, ]
    },
    //PBI result
    {
        path: '/result',
        component: Layout,
        redirect: '/result/table',
        name: 'Result',
        meta: { title: 'PBI Refresh/Result', icon: 'example' },
        children: [{
                path: 'table',
                name: 'Table',
                component: () =>
                    import ('@/views/table/index'),
                meta: { title: 'Table', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },
    //form
    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'SourceData Inquiry', icon: 'data' }
        }]
    },
    // nested
    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'SourceData Download',
            icon: 'download'
        },
        children: [{
                path: 'menu1',
                component: () =>
                    import ('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [{
                        path: 'menu1-1',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [{
                                path: 'menu1-2-1',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () =>
                    import ('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },
    // user management
    {
        path: '/userManagement',
        component: Layout,
        children: [{
            path: 'index',
            name: 'userManagement',
            component: () =>
                import ('@/views/userManagement/index'),
            meta: { title: 'User Management', icon: 'UserManagement' }
        }]
    },
    //file management
    {
        path: '/fileManagement',
        component: Layout,
        children: [{
            path: 'index',
            name: 'fileManagement',
            component: () =>
                import ('@/views/fileManagement/index'),
            meta: { title: 'File Management', icon: 'file-package' }
        }]
    },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    //permission
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/page',
        alwaysShow: true, // will always show the root menu
        name: 'Permission',
        meta: {
            title: 'Permission',
            icon: 'lock',
            roles: ['admin', 'editor', 'visitor'] // you can set roles in root nav
        },
        children: [{
                path: 'page',
                component: () =>
                    import ('@/views/permission/page'),
                name: 'PagePermission',
                meta: {
                    title: 'Page Permission',
                    roles: ['admin'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'directive',
                component: () =>
                    import ('@/views/permission/directive'),
                name: 'DirectivePermission',
                meta: {
                    title: 'Directive Permission'
                        // if do not set roles, means: this page does not require permission
                }
            },
            {
                path: 'role',
                component: () =>
                    import ('@/views/permission/role'),
                name: 'RolePermission',
                meta: {
                    title: 'Role Permission',
                    roles: ['admin']
                }
            }
        ]
    },
    //icon
    {
        path: '/icon',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/icons/index'),
            name: 'Icons',
            meta: { title: 'Icons', icon: 'icon', noCache: true, roles: ['admin'] }
        }],
        hidden: true
    },

    /** when your routing map is too long, you can split it into small modules **/
    //componentsRouter,
    //chartsRouter,
    // nestedRouter,
    // tableRouter,
    //example
    {
        path: '/example',
        component: Layout,
        redirect: '/example/list',
        name: 'Example',
        meta: {
            title: 'Example',
            icon: 'example'
        },
        children: [{
                path: 'create',
                component: () =>
                    import ('@/views/example/create'),
                name: 'CreateArticle',
                meta: { title: 'Create Article', icon: 'edit' }
            },
            {
                path: 'edit/:id(\\d+)',
                component: () =>
                    import ('@/views/example/edit'),
                name: 'EditArticle',
                meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
                hidden: true
            },
            {
                path: 'list',
                component: () =>
                    import ('@/views/example/list'),
                name: 'ArticleList',
                meta: { title: 'Article List', icon: 'list' }
            }
        ]
    },
    //tab
    {
        path: '/tab',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/tab/index'),
            name: 'Tab',
            meta: { title: 'Tab', icon: 'tab' }
        }],
        hidden: true
    },
    //error
    {
        path: '/error',
        component: Layout,
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
            title: 'Error Pages',
            icon: '404'
        },
        children: [{
                path: '401',
                component: () =>
                    import ('@/views/error-page/401'),
                name: 'Page401',
                meta: { title: '401', noCache: true }
            },
            {
                path: '404',
                component: () =>
                    import ('@/views/error-page/404'),
                name: 'Page404',
                meta: { title: '404', noCache: true }
            }
        ],
        hidden: true
    },
    //log
    {
        path: '/error-log',
        component: Layout,
        children: [{
            path: 'log',
            component: () =>
                import ('@/views/error-log/index'),
            name: 'ErrorLog',
            meta: { title: 'Error Log', icon: 'bug' }
        }],
        hidden: true
    },
    //excel
    {
        path: '/excel',
        component: Layout,
        redirect: '/excel/export-excel',
        name: 'Excel',
        meta: {
            title: 'Excel',
            icon: 'excel'
        },
        children: [{
                path: 'export-excel',
                component: () =>
                    import ('@/views/excel/export-excel'),
                name: 'ExportExcel',
                meta: { title: 'Export Excel' }
            },
            {
                path: 'export-selected-excel',
                component: () =>
                    import ('@/views/excel/select-excel'),
                name: 'SelectExcel',
                meta: { title: 'Export Selected' }
            },
            {
                path: 'export-merge-header',
                component: () =>
                    import ('@/views/excel/merge-header'),
                name: 'MergeHeader',
                meta: { title: 'Merge Header' }
            },
            {
                path: 'upload-excel',
                component: () =>
                    import ('@/views/excel/upload-excel'),
                name: 'UploadExcel',
                meta: { title: 'Upload Excel' }
            }
        ],
        hidden: true
    },
    //zip
    {
        path: '/zip',
        component: Layout,
        redirect: '/zip/download',
        alwaysShow: true,
        name: 'Zip',
        meta: { title: 'Zip', icon: 'zip' },
        children: [{
            path: 'download',
            component: () =>
                import ('@/views/zip/index'),
            name: 'ExportZip',
            meta: { title: 'Export Zip' }
        }],
        hidden: true
    },
    //pdf
    {
        path: '/pdf',
        component: Layout,
        redirect: '/pdf/index',
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/pdf/index'),
            name: 'PDF',
            meta: { title: 'PDF', icon: 'pdf' }
        }],
        hidden: true
    },
    {
        path: '/pdf/download',
        component: () =>
            import ('@/views/pdf/download'),
        hidden: true
    },
    //theme
    {
        path: '/theme',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/theme/index'),
            name: 'Theme',
            meta: { title: 'Theme', icon: 'theme' }
        }],
        hidden: true
    },
    //clipboard
    {
        path: '/clipboard',
        component: Layout,
        children: [{
            path: 'index',
            component: () =>
                import ('@/views/clipboard/index'),
            name: 'ClipboardDemo',
            meta: { title: 'Clipboard', icon: 'clipboard' }
        }],
        hidden: true
    },
    //external link
    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://github.com/PanJiaChen/vue-element-admin',
            meta: { title: 'External Link', icon: 'link' }
        }],
        hidden: true
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router