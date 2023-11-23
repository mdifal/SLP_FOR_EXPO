import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CCol, CRow } from '@coreui/react';
import './Detail.css';


const DetailJadwal = () => {
  const { key } = useParams();
  const [jadwal, setJadwal] = useState({
    id: 0,
    ID_Kelas: '',
    Hari_Jadwal: '',
    ID_Jam_Pelajaran_Start: '',
    ID_Jam_Pelajaran_End: '',
    ID_Matkul: '',
    ID_Dosen: ''
  });
  const [kelas, setKelas] = useState({});
  const [matkul, setMatkul] = useState({});
  const [jamStart, setJamStart] = useState({});
  const [jamEnd, setJamEnd] = useState({});
  const [dosen, setDosen] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/jadwal-kelas/get/${key}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setJadwal(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/data-kelas/get/${jadwal.ID_Kelas}`)
      .then((response) => response.json())
      .then((data) => {
        setKelas(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));

    fetch(`http://localhost:3000/data-jam-pelajaran/get/${jadwal.ID_Jam_Pelajaran_Start}`)
      .then((response) => response.json())
      .then((data) => {
        setJamStart(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));

    fetch(`http://localhost:3000/data-jam-pelajaran/get/${jadwal.ID_Jam_Pelajaran_End}`)
      .then((response) => response.json())
      .then((data) => {
        setJamEnd(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));

    fetch(`http://localhost:3000/data-mata-kuliah/get/${jadwal.ID_Matkul}`)
      .then((response) => response.json())
      .then((data) => {
        setMatkul(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
      
    fetch(`http://localhost:3000/data-dosen/get/${jadwal.ID_Dosen}`)
    .then((response) => response.json())
    .then((data) => {
      setDosen(data.data);
    })
    .catch((error) => console.error('Error fetching data:', error));
  }, [jadwal]);

  function tambahIntervalWaktu(time, intervalMenit) {
    if (!time) {
      return ""; // Handle the case where 'time' is undefined
    }
  
    const [jam, menit, detik] = time.split(':').map(Number);
  
    if (isNaN(jam) || isNaN(menit)) {
      return ""; // Handle the case where the time string is not in the expected format
    }
  
    const totalMenit = (jam * 60) + menit;
  
    const totalMenitBaru = totalMenit + intervalMenit;
  
    const jamBaru = Math.floor(totalMenitBaru / 60);
    const sisaMenit = totalMenitBaru % 60;
  
    // Format hasil baru as a time data type (HH:MM:SS)
    const waktuBaru = `${jamBaru.toString().padStart(2, '0')}:${sisaMenit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
  
    return waktuBaru;
  }
  

  if (!jadwal || !kelas || !jadwal || !jamStart || !jamEnd || !matkul || !dosen) {

    return <div>Loading...</div>; // Tampilkan pesan loading selama data diambil
  } else {
    const formatted =
      {
        Kelas: kelas.Nama_Kelas,
        Hari: jadwal.Hari_Jadwal,
        WaktuMulai: jamStart.Waktu_Mulai,
        WaktuSelesai: tambahIntervalWaktu(jamEnd.Waktu_Mulai, 50),
        Matkul: matkul.Nama_Mata_Kuliah,
        Dosen: dosen.Nama_Dosen,
      };
    console.log(formatted);
    return (
      <div className="container-detail">
        <CRow>
          <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
            <div className="details">
              <div className="identitas">
                <h3>Keterangan Mata Kuliah</h3>
              </div>
              <div className="label-data">
                <div className="item">
                  <div className="label">Kelas</div>
                  <div className="value">: {formatted.Kelas}</div>
                </div>
                <div className="item">
                  <div className="label">Hari</div>
                  <div className="value">: {formatted.Hari}</div>
                </div>
                <div className="item">
                  <div className="label">Waktu Mulai</div>
                  <div className="value">: {formatted.WaktuMulai}</div>
                </div>
                <div className="item">
                  <div className="label">Waktu Selesai</div>
                  <div className="value">: {formatted.WaktuSelesai}</div>
                </div>
                <div className="item">
                  <div className="label">Mata Kuliah</div>
                  <div className="value">: {formatted.Matkul}</div>
                </div>
                <div className="item">
                  <div className="label">Nama Dosen</div>
                  <div className="value">: {formatted.Dosen}</div>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </div>
    );
  }  
};

export default DetailJadwal;