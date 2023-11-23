import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCursor, cilHistory, cibHackhands, cilBarChart } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Form Pengajuan',
    to: '/buttons',
    icon: <CIcon icon={cibHackhands} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Izin',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Sakit',
        to: '/buttons/button-groups',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'History Pengajuan',
    to: '/theme/typography',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
]

export default _nav
