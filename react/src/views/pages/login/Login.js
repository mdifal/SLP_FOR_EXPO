import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import '../../../scss/_variables.scss'
import './style.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

let idMhs = '';
let idDosen = '';
let idAdmin = '';

export let idMahasiswa = '';
export let idDosenWali = '';
export let idTataUsaha = '';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Fungsi untuk memeriksa apakah input adalah alamat email dengan pola tertentu
  const isEmail = (username) => {
    // emailnya harus polban
    const emailPattern = /^[a-zA-Z0-9._-]+@polban.ac.id$/;

    return emailPattern.test(username);
  };

  // Fungsi untuk memeriksa apakah input adalah NIM dengan panjang maksimal 10 digit
  const isNIM = (username) => {
    // NIM adalah angka dengan panjang maksimal 10 digit
    const nimPattern = /^[0-9]{1,10}$/;

    return nimPattern.test(username);
  };

  // setiap role berubah, navigasikan ke halaman dengan role yang baru setelah 800ms
  useEffect(() => {
    if (role) {
      setTimeout(() => {
        navigate(`/${role}/dashboard`);
      }, 800);
    }
  }, [role, navigate]);

  // Jika idDosen ada, tetapkan idDosenWali ke nilai idDosen
  useEffect(() => {
    if (idDosen) {
      idDosenWali = idDosen;
    }
  });

  // Jika idMhs ada, tetapkan idMahasiswa ke nilai idMhs
  useEffect(() => {
    if (idMhs) {
      idMahasiswa = idMhs;
    }
  });

  // Jika idAdmin ada, tetapkan idMahasiswa ke nilai idMhs
  useEffect(() => {
    if (idAdmin) {
      idTataUsaha = idAdmin;
    }
  });

  // Fungsi untuk validasi form login
  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = 'Fill your username';
    }

    if (!password) {
      errors.password = 'Fill your password';
    }

    setFormErrors(errors);

    return errors;
  };

  // Fungsi untuk menangani proses login
  async function handleLogin(e) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        // Jika input adalah alamat email
        if (isEmail(username)) {
          console.log(username)

          // Lakukan request login untuk data dosen wali
          axios
            .post('http://localhost:3000/data-dosen-wali/login', {
              Email_Dosen: username,
              Password: password,
            })
            .then(async () => {
              //mengambil token
              const token = Cookies.get('jwt');

              if (token !== 'undefined') {
                // Ambil data dosen berdasarkan email
                try {
                  const apiURL = `http://localhost:3000/data-dosen-wali/get/id/${username}`;
                  const response = await axios.get(apiURL);
                  const data = response.data.data;

                  //set id dosen
                  idDosen = data.id;
                  console.log('iddosennnnnn', idDosen);
                  setSearchParams({ idDosen });

                  sessionStorage.setItem('idDosen', idDosen);
                  setRole('dosen');
                } catch (error) {
                  console.error('Error fetching data:', error);
                  alert('Failed to fetch data');
                }
              } else {
                alert('Coba lagi');
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('Email or password is invalid');
            });
        } else if (username === 'adminD3' && password === 'adminD3') {
          // Jika username adalah 'admin', set role ke 'admin'
          setRole('admin');

          //set idAdmin
          idAdmin = 1;
          setSearchParams({ idAdmin });

          sessionStorage.setItem('idAdmin', idAdmin);

        } else if (username === 'adminD4' && password === 'adminD4') {
          // Jika username adalah 'admin', set role ke 'admin'
          setRole('admin');

          //set idAdmin
          idAdmin = 2;
          setSearchParams({ idAdmin });

          sessionStorage.setItem('idAdmin', idAdmin);

        }else if (isNIM(username)) {
          // Jika input adalah NIM, lakukan request login untuk data mahasiswa
          axios
            .post('http://localhost:3000/data-mahasiswa/login', {
              NIM: username,
              Password: password,
            })
            .then(async () => {
              // ambil token
              const token = Cookies.get('jwt');

              if (token !== 'undefined') {
                // Ambil data mahasiswa berdasarkan NIM
                try {
                  const apiURL = `http://localhost:3000/data-mahasiswa/students/getId/${username}`;
                  const response = await axios.get(apiURL);
                  const data = response.data.data;

                  idMhs = data.id;
                  setSearchParams({ idMhs });

                  sessionStorage.setItem('idMhs', idMhs)
                  console.log(idMhs);
                  setRole('mahasiswa');
                } catch (error) {
                  console.error('Error fetching data:', error);
                  alert('Failed to fetch data');
                }
              } else {
                alert('Coba lagi');
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('NIM or password is invalid');
            });
        } else {
          // Jika input tidak sesuai dengan format yang diharapkan
          alert('Invalid Username');
        }
        console.log("ID ID ID ID (idMhs): " + idMhs + ", ID ID ID ID (idDosen): " + idDosen);
      } catch (error){
        alert('Error1234211332');
      }
    }
}


  return (
    <div className="page">
      <CContainer style={{ width: '100%', maxWidth: '500px' }}>
        <CCardGroup>
          <CCard>
            <CCardBody style={{ textAlign: 'center' }}>
              <CForm onSubmit={handleLogin}>
                <h1>Welcome</h1>
                <p style={{ fontFamily: 'inherit' }} className="text-medium-emphasis">
                  Enter your credentials to access your account
                </p>
                <CInputGroup className="mb-2" style={{ width: '90%', margin: '0 auto' }}>
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    name="username"
                    placeholder="Username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </CInputGroup>
                {formErrors.username && <div className="text-danger">{formErrors.username}</div>}
                <CInputGroup style={{ width: '90%', margin: '0 auto' }}>
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </CInputGroup>
                {formErrors.password && <div className="text-danger" >{formErrors.password}</div>}
                <CRow className="pt-4">
                  <CButton
                    className="button-login"
                    type="submit"
                  >
                    <span> Login </span>
                  </CButton>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
        <CRow style={{ paddingRight: '20px', paddingTop: '10px' }}>
          <CButton
            className="button-forgot"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </CButton>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
