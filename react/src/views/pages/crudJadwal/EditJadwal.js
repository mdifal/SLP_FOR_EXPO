import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import {
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CCard,
  CContainer,
  CButton,
  CImage,
} from '@coreui/react';
import './style.css';

const EditJadwal = () => {
  const [formData, setFormData] = useState({
    ID_Jam_Pelajaran_Start: '',
    ID_Jam_Pelajaran_End: '',
    ID_Kelas: '',
    Hari_Jadwal: '',
    ID_Dosen: '',
    ID_Matkul: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const { key } = useParams();
  const [isEditing, setIsEditing] = useState(false); // Menandakan apakah sedang dalam mode edit
  const [done, setDone] = useState();
  const [dataKelas, setDataKelas] = useState([]);
  const [dataMatkul, setDataMatkul] = useState([]);
  const [dataDosen, setDataDosen] = useState([]);
  const [dataJamPelajaran, setDataJamPelajaran] = useState([]);
  const navigate = useNavigate();

  const pilihanData = {
    kelas: getNamaKelas(),
    mataKuliah: getNamaMatkul(),
    hari: [
      { value: 'Senin', label: 'Senin' },
      { value: 'Selasa', label: 'Selasa' },
      { value: 'Rabu', label: 'Rabu' },
      { value: 'Kamis', label: 'Kamis' },
      { value: 'Jumat', label: 'Jumat' },
    ],
    namaDosen: getNamaDosen(),
    waktuMulai: getJamPelajaranStart(),
    waktuSelesai: getJamPelajaranEnd(),
  };

  useEffect(() => {
    // Jika key ada dalam URL, berarti sedang dalam mode edit, maka ambil data berdasarkan key
    if (key) {
      fetchData(key);
      setIsEditing(true);
    }
  }, [key]);

  useEffect(() => {
    // Fetch data
    getAllDataDosen();
    getAllDataMatkul();
    getAllDataKelas();
    getAllDataJamPelajaran();
  }, []);

  useEffect(() => {
    if(done==1){
      navigate('/admin/dataJadwal');
    }
  }, [done]);

  const getAllDataDosen = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-dosen');
      setDataDosen(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getNamaDosen () {
    const namaDosen = [];
    for (let i = 0; i < dataDosen.length; i++) {
      namaDosen.push({value: dataDosen[i].id, label: dataDosen[i].Nama_Dosen});
    }
    return namaDosen;
  };

  const getAllDataMatkul = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-mata-kuliah');
      setDataMatkul(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getNamaMatkul () {
    const namaMatkul = [];
    for (let i = 0; i < dataMatkul.length; i++) {
      namaMatkul.push({value: dataMatkul[i].id, label: dataMatkul[i].Nama_Mata_Kuliah});
    }
    return namaMatkul;
  }

  const getAllDataKelas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-kelas');
      setDataKelas(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getNamaKelas () {
    const namaKelas = [];
    for (let i = 0; i < dataKelas.length; i++) {
      namaKelas.push({value: dataKelas[i].id, label: dataKelas[i].Nama_Kelas});
    }
    return namaKelas;
  }

  const getAllDataJamPelajaran = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-jam-pelajaran');
      setDataJamPelajaran(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getJamPelajaranStart () {
    const jamPelajaran = [];
    for (let i = 0; i < dataJamPelajaran.length; i++) {
      jamPelajaran.push({value: dataJamPelajaran[i].id, label: dataJamPelajaran[i].Waktu_Mulai});
    }
    return jamPelajaran;
  }

  function getJamPelajaranEnd () {
    const jamPelajaran = [];
    for (let i = 0; i < dataJamPelajaran.length; i++) {
      let alias = tambahIntervalWaktu(dataJamPelajaran[i].Waktu_Mulai, 50);
      jamPelajaran.push({value: dataJamPelajaran[i].id, label: alias});
    }
    return jamPelajaran;
  }

  const fetchData = async (key) => {
    try {
      const response = await axios.get(`http://localhost:3000/jadwal-kelas/get/${key}`);
      const data = response.data.data;

      if (response.status === 200) {
        console.log('Data yang telah diambil dari server:', data);
        setFormData({
          ID_Jam_Pelajaran_Start: data.ID_Jam_Pelajaran_Start,
          ID_Jam_Pelajaran_End: data.ID_Jam_Pelajaran_End,
          ID_Kelas: data.ID_Kelas,
          Hari_Jadwal: data.Hari_Jadwal,
          ID_Dosen: data.ID_Dosen,
          ID_Matkul: data.ID_Matkul,
        });
      } else {
        console.error('Gagal mengambil data dosen');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  function tambahIntervalWaktu(time, intervalMenit) {
    const [jam, menit, detik] = time.split(':').map(Number);
  
    const totalMenit = (jam * 60) + menit;
  
    const totalMenitBaru = totalMenit + intervalMenit;
  
    const jamBaru = Math.floor(totalMenitBaru / 60);
    const sisaMenit = totalMenitBaru % 60;
  
    // Format hasil baru sebagai tipe data time (HH:MM:SS)
    const waktuBaru = `${jamBaru.toString().padStart(2, '0')}:${sisaMenit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
  
    return waktuBaru;
  }

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.ID_Jam_Pelajaran_Start) {
      errors.ID_Jam_Pelajaran_Start = 'Waktu Mulai harus diisi.';
    }
    if (!formData.ID_Jam_Pelajaran_End) {
      errors.ID_Jam_Pelajaran_End = 'Waktu Akhir harus diisi.';
    }
    if (!formData.ID_Kelas) {
      errors.ID_Kelas = 'Nama Kelas harus diisi.';
    }
    if (!formData.Hari_Jadwal) {
      errors.Hari_Jadwal = 'Hari harus diisi.';
    }
    if (!formData.ID_Dosen) {
      errors.ID_Dosen = 'Nama Dosen harus diisi.';
    }
    if (!formData.ID_Matkul) {
      errors.ID_Matkul = 'Nama Matkul harus diisi.';
    }
    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        if (isEditing) {
          // Jika sedang dalam mode edit, lakukan permintaan patch ke endpoint yang sesuai
          const response = await axios.patch(`http://localhost:3000/jadwal-kelas/update/${key}`, formData);
          if (response.status === 200) {
            console.log('Data berhasil diubah di database:', response.data);
            alert('Data berhasil diubah!');
            setDone(1);
          } else {
            console.error('Gagal mengubah data di database');
            alert('Gagal mengubah data di database');
          }
        } else {
          // Jika tidak dalam mode edit, lakukan permintaan POST untuk menambahkan data baru
          const response = await axios.post('http://localhost:3000/jadwal-kelas/create', formData);
          if (response.status === 201) {
            console.log('Data berhasil ditambahkan ke database:', response.data);
            alert('Data berhasil ditambahkan!');
            setDone(1);
          } else {
            console.error('Gagal menambahkan data ke database');
            alert('Gagal menambahkan data ke database');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengubah/menambah data.');
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <div className="c-app c-default-layout">
      <div className="c-app">
        <div className="c-body">
          <main className="c-main">
            <div className="container-fluid">
              <div className="fade-in">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">Form Jadwal</div>
                      <div className="card-body">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <label htmlFor="ID_Kelas">Kelas</label>
                                <Select
                                  name="ID_Kelas"
                                  options={pilihanData.kelas}
                                  value={pilihanData.kelas.find((option) => option.value === formData.ID_Kelas)}
                                  onChange={(selectedOption) => handleChange('ID_Kelas', selectedOption.value)}
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="Hari_Jadwal">Hari</label>
                                <Select
                                  name="Hari_Jadwal"
                                  options={pilihanData.hari}
                                  value={pilihanData.hari.find((option) => option.value === formData.Hari_Jadwal)}
                                  onChange={(selectedOption) => handleChange('Hari_Jadwal', selectedOption.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <label htmlFor="ID_Matkul">Mata Kuliah</label>
                                <Select
                                  name="ID_Matkul"
                                  options={pilihanData.mataKuliah}
                                  value={pilihanData.mataKuliah.find((option) => option.value === formData.ID_Matkul)}
                                  onChange={(selectedOption) => handleChange('ID_Matkul', selectedOption.value)}
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="ID_Dosen">Dosen</label>
                                <Select
                                  name="ID_Dosen"
                                  options={pilihanData.namaDosen}
                                  value={pilihanData.namaDosen.find((option) => option.value === formData.ID_Dosen)}
                                  onChange={(selectedOption) => handleChange('ID_Dosen', selectedOption.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="row">
                              <div className="col-md-6">
                                <label htmlFor="ID_Jam_Pelajaran_Start">Jam Pelajaran Mulai</label>
                                <Select
                                  name="ID_Jam_Pelajaran_Start"
                                  options={pilihanData.waktuMulai}
                                  value={pilihanData.waktuMulai.find((option) => option.value === formData.ID_Jam_Pelajaran_Start)}
                                  onChange={(selectedOption) => handleChange('ID_Jam_Pelajaran_Start', selectedOption.value)}
                                />
                              </div>
                              <div className="col-md-6">
                                <label htmlFor="ID_Jam_Pelajaran_End">Jam Pelajaran Selesai</label>
                                <Select
                                  name="ID_Jam_Pelajaran_End"
                                  options={pilihanData.waktuSelesai}
                                  value={pilihanData.waktuSelesai.find((option) => option.value === formData.ID_Jam_Pelajaran_End)}
                                  onChange={(selectedOption) => handleChange('ID_Jam_Pelajaran_End', selectedOption.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary">
                            {isEditing ? 'Simpan Perubahan' : 'Tambahkan'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EditJadwal;