import React, { useEffect, useState } from 'react';
import { CCol, CRow, CButton } from '@coreui/react';
import axios from 'axios';
import '../../../../scss/styleProfile.css';

const ProfileDosen = () => {
  const [dataDosen, setDosen] = useState({});
  const [dataKelas, setDataKelas] = useState({});
  const [id, setIdDosen] = useState(sessionStorage.getItem('idDosen'));

  useEffect(() => {
    getAllDataDosenWali();
  }, []);

  const getAllDataDosenWali = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/data-dosen/getdosenclass/${id}`);
      const dataDosen = response.data.dataDosen;
      setDosen(dataDosen);

      const namaKelas = response.data.dataNamaKelas;
      setDataKelas(namaKelas);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  let kelas = null;
  let prodi = null;

  const combinedKelas = dataKelas;
  if (combinedKelas && combinedKelas.length >= 4) {
    kelas = combinedKelas.substring(0, 2);
    prodi = `${combinedKelas.substring(2)} Teknik Informatika`;
  }

  return (
    <div className="container-detail">
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3} className="img-container">
          <img
            className="img"
            src={require(`../../../../assets/ProfilPic/${dataDosen.Foto_Profil || 'blank.jpeg'}`)}
            alt={`Foto ${dataDosen.Nama_Dosen}`}
          />
          <div className="nama">{dataDosen.Nama_Dosen}</div>
        </CCol>
        <CRow>
          <CButton href={`/#/dosen/dashboard/edit`}className="btn-edit table-font">
            Edit Profile
          </CButton>
        </CRow>
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className="details">
            <div className="identitas">
              <h3>Profile Dosen</h3>
            </div>
            <div className="label-data">
              <div className="item">
                <div className="label">NIP</div>
                <div className="value">: {dataDosen.NIP}</div>
              </div>
              <div className="item">
                <div className="label">ID</div>
                <div className="value">: {dataDosen.InitialID}</div>
              </div>
              <div className="item">
                <div className="label">Nama</div>
                <div className="value">: {dataDosen.Nama_Dosen}</div>
              </div>
              <div className="item">
                <div className="label">Kode</div>
                <div className="value">: {dataDosen.Kode_Dosen}</div>
              </div>
              <div className="item">
                <div className="label">Email</div>
                <div className="value">: {dataDosen.Email_Dosen}</div>
              </div>
              <div className="item">
                <div className="label">Kelas</div>
                <div className="value">: {kelas}</div>
              </div>
              <div className="item">
                <div className="label">Prodi</div>
                <div className="value">: {prodi}</div>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default ProfileDosen;
