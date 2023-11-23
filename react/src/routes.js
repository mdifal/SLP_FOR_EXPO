import React from 'react'
import { ProtectedRoute } from './componentSLP'
import Cookies from 'js-cookie'

const authToken = Cookies.get('jwt');

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// SLP
const HistoryPengajuanMahasiswa = React.lazy(() => import('./views/pages/historyPengajuanMahasiswa/historyPengajuan'))
const DetailPengajuanMahasiswa = React.lazy(() => import('./views/pages/historyPengajuanMahasiswa/crudPengajuan/detailPengajuan'))
const TabelPengajuanMahasiswa = React.lazy(() => import('./views/pages/historyPengajuanMahasiswa/crudPengajuan/tabelPengajuan'))
const UpdatePengajuanMahasiswa = React.lazy(() => import('./views/pages/historyPengajuanMahasiswa/crudPengajuan/updatePengajuan'))
const TambahMahasiswa = React.lazy(() => import('./views/pages/crudMahasiswa/tambahMahasiswa.js'))
const EditMahasiswa = React.lazy(() => import('./views/pages/crudMahasiswa/EditMahasiswa'))
const DetailMahasiswa = React.lazy(() => import('./views/pages/crudMahasiswa/DetailMahasiswa'))
const TabelMahasiswa = React.lazy(() => import('./views/pages/crudMahasiswa/tabelMahasiswa'))
const FormPengajuan = React.lazy(() => import('./views/pages/formPengajuan/FormPengajuan'))
const CrudDosen = React.lazy(() => import('./views/pages/crudDosen/tabelDosen'))
const DetailDosen= React.lazy(() => import('./views/pages/crudDosen/DetailDosen'))
const TambahDosen = React.lazy(() => import('./views/pages/crudDosen/tambahDosen'))
const TabelImport = React.lazy(() => import('./views/pages/crudDosen/TabelImport'))
// const TabelEkspor = React.lazy(() => import('./views/pages/crudDosen/TabelEkspor'))
// const ImporTabel = React.lazy(() => import('./views/pages/crudJadwal/imporTabel'))
// const EksporTabel = React.lazy(() => import('./views/pages/crudJadwal/eksporTabel'))
const EditDosen = React.lazy(() => import('./views/pages/crudDosen/editDosen'))
const VerifyPengajuan = React.lazy(() => import('./views/pages/verifyPengajuan/VerifyPengajuan'))
const TabelPengajuan = React.lazy(() => import('./views/pages/verifyPengajuan/tabelPengajuan'))
const CrudJadwal = React.lazy(() => import('./views/pages/crudJadwal/TabelCRUD'))
const TambahJadwal = React.lazy(() => import('./views/pages/crudJadwal/TambahData'))
const EditJadwal = React.lazy(() => import('./views/pages/crudJadwal/EditJadwal'))
const DetailJadwal = React.lazy(() => import('./views/pages/crudJadwal/detailJadwal'))
const CrudKelas = React.lazy(() => import('./views/pages/crudKelas/tabelKelas'))
const TambahKelas = React.lazy(() => import('./views/pages/crudKelas/tambahKelas'))
const EditKelas = React.lazy(() => import('./views/pages/crudKelas/editKelas'))
const DetailKelas = React.lazy(() => import('./views/pages/crudKelas/detailKelas'))

//dashboard
const DashboardMahasiswa = React.lazy(() => import('./views/pages/dashboard/dashboardSiswa/dashboard'))
const DashboardDosen = React.lazy(() => import('./views/pages/dashboard/dashboardDosen/profileDosen'))
const DashboardAdmin = React.lazy(() => import('./views/pages/dashboard/dashboardAdmin/dashboard'))

const DaftarMahasiswa = React.lazy(() => import('./views/pages/dashboard/dashboardDosen/daftarMahasiswa'))

//Rekap
const RekapPengajuan = React.lazy(() => import('./views/pages/RekapPengajuan/tabelRekap.js'))
const RekapPengajuanDetail = React.lazy(() => import('./views/pages/RekapPengajuan/tabelDetailRekap.js'))

//Profile
const ProfileMahasiswa = React.lazy(() => import('./views/pages/profile/mahasiswa/profileMahasiswa'))
const EditProfileMahasiswa = React.lazy(() => import('./views/pages/profile/mahasiswa/editProfile'))

const EditProfileDosen = React.lazy(() => import('./views/pages/dashboard/dashboardDosen/editProfile'))

const wrapComponent = (Component, isProtected, props) => {
  // Return a component that wraps the provided Component
  return () => {
    if (isProtected) {
      // Render the ProtectedRoute component if it's a protected route
      console.log('Props: ', props)
      return (
        <ProtectedRoute {...props}>
          <Component />
        </ProtectedRoute>
      );
    } else {
      // Render the Component without protection
      return <Component />;
    }
  };
};

const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  // { path: '/dosen/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/mahasiswa/formPengajuan', name: 'formPengajuan', element: FormPengajuan },
  { path: '/admin/dataDosen', name: 'TabelDosen', element: CrudDosen },
  { path: '/admin/detailDosen/:key', name: 'DetailDosen', element: DetailDosen },
  { path: '/admin/tambahDosen', name: 'TambahDosen', element: TambahDosen },
  { path: '/admin/TabelImport', name: 'TabelImport', element: TabelImport },
  // { path: '/admin/TabelEkspor', name: 'TabelEkspor', element: TabelEkspor },
  // { path: '/admin/ImporTabel', name: 'ImporTabel', element: ImporTabel },
  // { path: '/admin/EksporTabel', name: 'EksporTabel', element: EksporTabel },
  { path: '/admin/rekap', name: 'RekapPengajuan', element: RekapPengajuan },
  { path: '/admin/rekap/detail/:id', name: 'RekapPengajuanDetail', element: RekapPengajuanDetail },
  { path: '/admin/editDosen/:key', name: 'EditDosen', element: EditDosen },
  { path: '/admin/dataJadwal', name: 'TabelJadwal', element: CrudJadwal },
  { path: '/admin/tambahJadwal', name: 'TambahJadwal', element: TambahJadwal},
  { path: '/admin/editJadwal/:key', name: 'EditJadwal', element: EditJadwal},
  { path: '/admin/detailJadwal/:key', name: 'DetailJadwal', element: DetailJadwal},
  { path: '/admin/dataMahasiswa/', name: 'TabelMahasiswa', element: TabelMahasiswa},
  { path: '/admin/mahasiswa/edit/:id', name: 'EditMahasiswa', element: EditMahasiswa},
  { path: '/admin/mahasiswa/detail/:id', name: 'DetailMahasiswa', element: DetailMahasiswa},
  { path: '/admin/mahasiswa/tambah', name: 'TambahMahasiswa', element: TambahMahasiswa},
  { path: '/dosen/verifyPengajuan/:key', name: 'VerifyPengajuan', element: VerifyPengajuan },
  { path: '/dosen/tabelPengajuan', name: 'TabelPengajuan', element: TabelPengajuan },
  { path: '/dosen/dashboard', name: 'DashboardDosen', element: DashboardDosen },
  { path: '/mahasiswa/dashboard', name: 'DashboardMahasiswa', element: DashboardMahasiswa },
  { path: '/mahasiswa/historyPengajuan', name: 'HistoryPengajuanMahasiswa', element: HistoryPengajuanMahasiswa },
  { path: '/mahasiswa/Pengajuan/detail/:key', name: 'DetailPengajuanMahasiswa', element: DetailPengajuanMahasiswa },
  { path: '/mahasiswa/Pengajuan', name: 'TabelPengajuanMahasiswa', element: TabelPengajuanMahasiswa },
  { path: '/mahasiswa/Pengajuan/edit/:key', name: 'UpdatePengajuanMahasiswa', element: UpdatePengajuanMahasiswa },
  { path: '/admin/dataKelas', name: 'CrudKelas', element: CrudKelas },
  { path: '/admin/tambahKelas', name: 'TambahKelas', element: TambahKelas},
  { path: '/admin/editKelas/:key', name: 'EditKelas', element: EditKelas},
  { path: '/admin/detailKelas/:key', name: 'DetailKelas', element: DetailKelas},
  { path: '/admin/dashboard', name: 'DashboardAdmin', element: DashboardAdmin },
  { path: '/dosen/dashboard/daftarMahasiswa', name: 'DaftarMahasiswa', element: DaftarMahasiswa },
  { path: '/mahasiswa/profile', name: 'ProfileMahasiswa', element: ProfileMahasiswa },
  { path: '/mahasiswa/profile/edit', name: 'EditProfileMahasiswa', element: EditProfileMahasiswa },
  { path: '/dosen/dashboard/edit', name: 'EditProfileDosen', element: EditProfileDosen }

  // Untuk route yang di-proteksi, berikut definisinya:
  // { path: '/dosen/tabelPengajuan', name: 'TabelPengajuan', element: wrapComponent(TabelPengajuan, true, {token: authToken}) },
]

export default routes
