import React from 'react'
import { cilCursor, cilHistory, cibHackhands, cilBarChart , cilFolderOpen} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: cilBarChart,
  },
  {
    component: CNavItem,
    name: 'Data Kelas',
    to: '/admin/dataKelas/',
    icon: cilFolderOpen,
  },
  {
    component: CNavItem,
    name: 'Data Mahasiswa',
    to: '/admin/dataMahasiswa/',
    icon: cilFolderOpen,
  },
  {
    component: CNavItem,
    name: 'Data Dosen',
    to: '/admin/dataDosen',
    icon: cilFolderOpen,
  },
  {
    component: CNavItem,
    name: 'Data Jadwal',
    to: '/admin/dataJadwal',
    icon: cilFolderOpen,
  },
  {
    component: CNavItem,
    name: 'Rekap Pengajuan',
    to: '/admin/rekap',
    icon: cilFolderOpen,
  },
  // {
  //   component: CNavItem,
  //   name: 'History Pengajuan',
  //   to: '/dashboard',
  //   icon: cilBarChart,
  // },
]

export default _nav
