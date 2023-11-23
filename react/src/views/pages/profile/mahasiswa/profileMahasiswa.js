import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  CCol,
  CRow,
} from '@coreui/react';
import '../../../../scss/styleProfile.css';
import axios from "axios";


const ProfileMahasiswa = () => {
  const navigate = useNavigate();
  const [id, setIdMahasiswa] = useState(sessionStorage.getItem('idMhs'));
  
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`http://localhost:3000/data-mahasiswa/students/1`).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  if (post.data.Foto_Profil != null){
    var imgSrc = `${post.data.Foto_Profil}`;
  }
  else{
    var imgSrc = `blank.jpeg`
  }
  return (
    <div className="container">
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3} className="img-container">
          <CRow>
            <img className="img" src={require(`../../../../assets/ProfilPic/${imgSrc}`)} alt={`Foto ${post.Nama}`} />
            <div className="nama">{post.Nama}</div>
          </CRow>
          <CRow>
            <CButton
              className="button-edit-profile"
              onClick={() => navigate('/mahasiswa/profile/edit')}
              style={{ backgroundColor: '#5A719D', borderColor: '#5A719D' }}
            >
              <span> Edit Profile </span>
            </CButton>
          </CRow>
        </CCol>
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className="details">
            <div className="identitas">
              <h3>Data Diri</h3>
            </div>
            <div className="label-data">
              <div className="item">
                <div className="label">NIM</div>
                <div className="value">: {post.data.NIM}</div>
              </div>
              <div className="item">
                <div className="label">Nama</div>
                <div className="value">: {post.data.Nama}</div>
              </div>
              <div className="item">
                <div className="label">Nomor Telepon</div>
                <div className="value">: {post.data.Nomor_Telp}</div>
              </div>
              <div className="item">
                <div className="label">Email</div>
                <div className="value">: {post.data.Email}</div>
              </div>
              <div className="item">
                <div className="label">Kelas</div>
                <div className="value">: {post.kelas.kelas}</div>
              </div>
              <div className="item">
                <div className="label">Jurusan</div>
                <div className="value">: Teknik Komputer dan Informatika</div>
              </div>
              <div className="item">
                <div className="label">No Telp Ortu</div>
                <div className="value">: {post.data.Nomor_Telp_Ortu}</div>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default ProfileMahasiswa;
