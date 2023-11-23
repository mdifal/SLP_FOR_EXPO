import React from 'react'
import { cilCursor, cilHistory, cibHackhands, cilBarChart, cilClipboard, cilFolderOpen } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dosen/dashboard',
    icon: cilBarChart,
  },
  {
    component: CNavItem,
    name: 'Data Pengajuan',
    to: '/dosen/tabelPengajuan',
    icon: cilClipboard,
  }
  // {
  //   component: CNavItem,
  //   name: 'Data Siswa',
  //   to: '/theme/typography',
  //   icon: cilHistory,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Data Pengajuan',
  //   to: '/tabelPengajuan',
  //   icon: cibHackhands,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Pengajuan Baru',
  //       to: '/tabelPengajuan',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'History Pengajuan',
  //       to: '/buttons/button-groups',
  //     },
  //   ],
  // },
]

export default _nav
