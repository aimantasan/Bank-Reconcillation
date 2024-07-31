export default [
  
  {
    "header": "",
    "description": "",
    "child": [
      // {
      //   "title": "Dashboard",
      //   "path": "/dashboard",
      //   "icon": "material-symbols:dashboard",
      //   "child": [],
      //   "meta": {}
      // },
      {
        "title": "Uploader",
        "path": "/user/uploader",
        "icon": "material-symbols:upload-file-outline",
        "child": [],
        "meta": {}
      },
    ]
  },
  {
    "header": "Credit Management",
    "description": "Oversee the IN Cashflow",
    "child": [
      {
        "title": "Credit Data",
        "path": "",
        "icon": "material-symbols:step-into",
        "child": [
          {
            "title": "Unrefined Data",
            "path": "",
            "icon": "",
            "child": [
              {
                "title": "Bank Statement (BS)",
                "path": "/user/credit/unrefined/bank-statement",
                "icon": "ph:circle-duotone",
                "child": [],
                "meta": {}
              },
              {
                "title": "MyPay (MP)",
                "path": "/user/credit/unrefined/mypay",
                "icon": "ph:circle-duotone",
                "child": [],
                "meta": {}
              },
              {
                "title": "toyyibPay (TP)",
                "path": "/user/credit/unrefined/toyyibpay",
                "icon": "ph:circle-duotone",
                "child": [],
                "meta": {}
              },

            ],
            "meta": {}
          },
          {
            "title": "Refined Data",
            "path": "",
            "icon": "",
            "child": [
              {
                "title": "BS & MP",
                "path": "/user/credit/refined/bs-mp",
                "icon": "mdi:numeric-1-box",
                "child": [],
                "meta": {}
              },
              {
                "title": "MP & TP",
                "path": "/user/credit/refined/mp-tyP",
                "icon": "mdi:numeric-1-box",
                "child": [],
                "meta": {}
              },
              {
                "title": "Full Refined Data",
                "path": "/user/credit/refined/full-refined",
                "icon": "mdi:numeric-2-box",
                "child": [],
                "meta": {}
              },
            ],
            "meta": {}
          },
        ],
        "meta": {}
      },
    ]
  },
  {
    "header": "Debit Management",
    "description": "Oversee the OUT Cashflow",
    "child": [
      {
        "title": "Debit Data",
        "path": "",
        "icon": "material-symbols:step-out",
        "child": [
          {
            "title": "Unrefined Data",
            "path": "",
            "icon": "",
            "child": [
              {
                "title": "Bank Statement Debit(BSD)",
                "path": "/user/debit/unrefined/bank-statement-debit",
                "icon": "ph:circle-duotone",
                "child": [],
                "meta": {}
              },
              {
                "title": "Settlement Data (ST)",
                "path": "/user/debit/unrefined/settlement",
                "icon": "ph:circle-duotone",
                "child": [],
                "meta": {}
              },
              {
                "title": "Reconcilled Credit Data (RD)",
                "path": "/user/debit/unrefined/reconcilled-credit",
                "icon": "ph:circle-duotone",
                "child": [],
                "meta": {}
              },
            ],
            "meta": {}
          },
          {
            "title": "Refined Data",
            "path": "",
            "icon": "",
            "child": [
              {
                "title": "BSD & ST",
                "path": "/user/debit/refined/bs-st",
                "icon": "mdi:numeric-1-box",
                "child": [],
                "meta": {}
              },
              {
                "title": "ST & RD",
                "path": "/user/debit/refined/st-rd",
                "icon": "mdi:numeric-1-box",
                "child": [],
                "meta": {}
              },
              {
                "title": "Full Refined Data",
                "path": "/user/debit/refined/full-refined",
                "icon": "mdi:numeric-2-box",
                "child": [],
                "meta": {}
              },
              
            ],
            "meta": {}
          },
        ],
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