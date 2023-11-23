import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CCol, CRow } from '@coreui/react';
import './Detail.css';
import axios from 'axios';

const DetailDosen = () => {
  const { key } = useParams();
  const [data, setDosen] = useState();
  const [dataKelas, setDataKelas] = useState({});
  const [dataDosenWali, setDataDosenWali] = useState([]);

  useEffect(() => {
    getAllDataDosenWali();
  }, []);


  useEffect(() => {
    const hasRefreshed = localStorage.getItem('hasRefreshed');
  
    if (hasRefreshed === 'false') {
      window.location.reload();
      localStorage.setItem('hasRefreshed', 'true');
    }
  
    console.log('nih', hasRefreshed);
  }, []);

  const getAllDataDosenWali = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-dosen-wali');
      setDataDosenWali(response.data.data);
      console.log('Data Dosen Wali:', response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const apiUrl = `http://localhost:3000/data-dosen/getformatted/${key}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setDosen(data.data);
        setDataKelas(data.dataKelas);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiUrl]);

  if (!data || dataDosenWali.length === 0) {
    return <div>Loading...</div>;
  }

  // Logika pengecekan Dosen Wali
  const isDosenWali = dataDosenWali.some((dosenWali) => dosenWali.ID_Dosen.toString() === key);

  const kelasData = dataKelas.find((kelas) => kelas.ID_Dosen_Wali !== null && kelas.ID_Dosen_Wali.toString() === key);
  let kelas = '-';
  let prodi = '-';

  if (kelasData) {
    const combinedKelas = kelasData.Nama_Kelas; // Ambil Nama_Kelas
    if (combinedKelas.length >= 4) {
      // Pastikan panjang string cukup untuk dibagi
      kelas = combinedKelas.substring(0, 2); // Ambil 2 karakter pertama untuk kelas
      prodi = `${combinedKelas.substring(2)} Teknik Informatika`; // Ambil 2 karakter berikutnya dan tambahkan "Teknik Informatika"
    }
  }
  
  return (
    <div className="container-detail">
      <CRow>
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className="details">
            <div className="identitas">
              <h3>Identitas Dosen</h3>
            </div>
            <div className="label-data">
              <div className="item">
                <div className="label">NIP</div>
                <div className="value">: {data.NIP}</div>
              </div>
              <div className="item">
                <div className="label">ID</div>
                <div className="value">: {data.InitialID}</div>
              </div>
              <div className="item">
                <div className="label">Nama</div>
                <div className="value">: {data.Nama_Dosen}</div>
              </div>
              <div className="item">
                <div className="label">Kode</div>
                <div className="value">: {data.Kode_Dosen}</div>
              </div>
              <div className="item">
                <div className="label">Email</div>
                <div className="value">: {data.Email_Dosen}</div>
              </div>
              <div className="item">
                <div className="label">Status</div>
                <div className="value">: {isDosenWali ? 'Dosen Wali' : 'Bukan Dosen Wali'}</div>
              </div>
              {isDosenWali && (
                <>
                  <div className="item">
                    <div className="label">Kelas</div>
                    <div className="value">: {kelas}</div>
                  </div>
                  <div className="item">
                    <div className="label">Prodi</div>
                    <div className="value">: {prodi}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default DetailDosen;
