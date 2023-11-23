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

const ForgotPassword = () => {
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

    setFormErrors(errors);

    return errors;
  };

  // Fungsi untuk menangani proses login
  async function handleForgotPassword(e) {
    e.preventDefault();
    const errors = validateForm();
    console.log("Submission is being requested!")
    if (Object.keys(errors).length === 0) {
      console.log("Object.keys(errors) = 0 is false!")
      try {
        // Jika input adalah alamat email
        if (isEmail(username)) {
          console.log('It is an email')
          console.log(username)

          // Lakukan request login untuk data dosen wali
          axios
            .patch('http://localhost:3000/data-dosen-wali/forgot-password', {
              Email_Dosen: username
            })
            .then(async () => {
              console.log('Username confirmed. Sending email...')
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('Email or password is invalid');
            });
        } else if (isNIM(username)) {
          // Jika input adalah NIM, lakukan request login untuk data mahasiswa
          axios
            .patch('http://localhost:3000/data-mahasiswa/forgot-password', {
              NIM: username
            })
            .then(async () => {
              console.log('Username confirmed. Sending email...')
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
        console.error(error);
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
              <CForm onSubmit={handleForgotPassword}>
                <h1>Welcome</h1>
                <p style={{ fontFamily: 'inherit' }} className="text-medium-emphasis">
                  Enter your username/email to restore password
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
                <CRow className="pt-4">
                  <CButton
                    className="button-login"
                    type="submit"
                  >
                    <span> Send Me an Email </span>
                  </CButton>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
        <CRow style={{ paddingRight: '20px', paddingTop: '10px' }}>
          <CButton
            className="button-forgot"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </CButton>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgotPassword;
