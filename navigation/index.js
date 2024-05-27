export default [
  {
    "header": "Settlement",
    "description": "Modules for Settlement",
    "child": [
      {
        "title": "Extractor",
        "path": "/user/extractor",
        "icon": "mdi:code-tags-check",
        "child": [],
        "meta": {}
      },
      {
        "title": "Date Changer",
        "path": "/user/datechanger",
        "icon": "material-symbols:calendar-month-outline",
        "child": [],
        "meta": {}
      },
      {
        "title": "DN Santai Duplicate",
        "path": "/user/dnsantaiduplicate",
        "icon": "uil:money-bill",
        "child": [],
        "meta": {}
      },
    ]
  },
  {
    "header": "Administration",
    "description": "Manage your application",
    "child": [
      {
        "title": "Configuration",
        "icon": "ic:outline-settings",
        "child": [
          {
            "title": "Environment",
            "path": "/devtool/config/environment"
          }
        ]
      },
      {
        "title": "Menu Editor",
        "icon": "ci:menu-alt-03",
        "path": "/devtool/menu-editor",
        "child": []
      },
      {
        "title": "Manage Users",
        "path": "/devtool/user-management",
        "icon": "ph:user-circle-gear",
        "child": [
          {
            "title": "User List",
            "path": "/devtool/user-management/user-list",
            "icon": "",
            "child": []
          },
          {
            "title": "Role List",
            "path": "/devtool/user-management/role-list",
            "icon": "",
            "child": []
          }
        ]
      },
      {
        "title": "Content",
        "icon": "mdi:pencil-ruler",
        "child": [
          {
            "title": "Editor",
            "path": "/devtool/content-editor"
          },
          {
            "title": "Template",
            "path": "/devtool/content-editor/template"
          }
        ]
      },
      {
        "title": "API Editor",
        "path": "/devtool/api-editor",
        "icon": "material-symbols:api-rounded",
        "child": []
      },
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  },
  {
    "header": "Help",
    "description": "Help and documentation",
    "child": [
      {
        "title": "Documentation",
        "icon": "solar:book-bookmark-minimalistic-bold",
        "path": "https://mawar-cms-docs.vercel.app",
        "child": []
      },
      {
        "title": "UI Components",
        "icon": "material-symbols:settings-input-component-outline-rounded",
        "path": "https://roseui-nuxt.vercel.app"
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  }
]