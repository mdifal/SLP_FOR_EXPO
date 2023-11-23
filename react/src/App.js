import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const LayoutSLP = React.lazy(() => import('./layout/LayoutSLP'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
// const FormPengajuan = React.lazy(() => import('./views/pages/formPengajuan/FormPengajuan'))
const LandingPage = React.lazy(()=> import('./views/pages/landingPage/LandingPage'))
const ForgotPassword = React.lazy(() => import('./views/pages/login/ForgotPassword'))
//CRUD Mahasiswa (TU)



//CRUD Dosen (TU)
// const CrudDosen = React.lazy(() => import('./views/pages/crudDosen/tabelDosen'))
// const DetailDosen = React.lazy(() => import('./views/pages/crudDosen/DetailDosen'))
// const TambahDosen = React.lazy(()=> import('./views/pages/crudDosen/tambahDosen'));
// const EditDosen = React.lazy(() => import('./views/pages/crudDosen/editDosen'));
// const VerifyPengajuan = React.lazy(() => import('./views/pages/verifyPengajuan/VerifyPengajuan'));
// const TabelPengajuan = React.lazy(() => import('./views/pages/verifyPengajuan/tabelPengajuan'));

//CRUD Jadwal (TU)
// const CrudJadwal = React.lazy(() => import('./views/pages/crudJadwal/TabelCRUD'))
// const TambahJadwal = React.lazy(() => import('./views/pages/crudJadwal/TambahData'))
// const DetailJadwal = React.lazy(() => import('./views/pages/crudJadwal/detailJadwal'))
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/forgot-password" name="Forgot Password Page" element={<ForgotPassword />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route index name="landing page" element={<LandingPage />} />
            <Route path="*" name="Home" element={<LayoutSLP />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
