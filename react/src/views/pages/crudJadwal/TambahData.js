import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './TabelCRUD.css';
import axios from 'axios';

const TambahData = () => {
  const [formData, setFormData] = useState({
    kelas: '',
    mataKuliah: '',
    hari: '',
    namaDosen: '',
    waktuMulai: '',
    waktuSelesai: '',
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [dataDosen, setDataDosen] = useState([]);
  const [dataMatkul, setDataMatkul] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataJamPelajaran, setDataJamPelajaran] = useState([]);
  const navigate = useNavigate();
  const [ done, setDone ] = useState();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  useEffect(() => {
    console.log(dataDosen);
  }, [dataDosen]);

  useEffect(() => {
    console.log(dataMatkul);
  }, [dataMatkul]);

  useEffect(() => {
    console.log(dataKelas);
  }, [dataKelas]);

  useEffect(() => {
    console.log(dataJamPelajaran);
  }, [dataJamPelajaran]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    // Validasi form di sini
    const isFormValid = validateForm();
    
    if (isFormValid) {
      try {
        axios.post('http://localhost:3000/jadwal-kelas/create', {
          Hari_Jadwal: formData.hari,
          ID_Jam_Pelajaran_Start: formData.waktuMulai,
          ID_Jam_Pelajaran_End: formData.waktuSelesai,
          ID_Matkul: formData.mataKuliah,
          ID_Dosen: formData.namaDosen,
          ID_Kelas: formData.kelas,
        })
        console.log('Form valid. Data sudah ditambahkan');
        setDone(1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateForm = () => {
    // Lakukan validasi form di sini
    // Misalnya, periksa apakah setidaknya satu input terisi
    for (const key in formData) {
      if (!formData[key]) {
        return false; // Jika salah satu input kosong, kembalikan false
      }
    }
    return true; // Jika semua input terisi, kembalikan true
  };

  // Data untuk menampilkan kelas, mata kuliah, hari, dosen, dan jam pelajaran
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

  return (
    <div className="center-form">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-4 margin-right">
          <label className="table-font">Kelas</label>
          <Select
            name="kelas"
            value={pilihanData.kelas.find((option) => option.value === formData.kelas)}
            onChange={(selectedOption) => {
              handleChange('kelas', selectedOption.value);
            }}
            options={pilihanData.kelas}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.kelas && (
            <div className="invalid-feedback">Mohon pilih kelas!</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="table-font">Mata Kuliah</label>
          <Select
            name="mataKuliah"
            value={pilihanData.mataKuliah.find((option) => option.value === formData.mataKuliah)}
            onChange={(selectedOption) => {
              handleChange('mataKuliah', selectedOption.value);
            }}
            options={pilihanData.mataKuliah}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.mataKuliah && (
            <div className="invalid-feedback">Mohon pilih mata kuliah!</div>
          )}
        </div>

        <div className="col-md-4 margin-right">
          <label className="table-font">Hari</label>
          <Select
            name="hari"
            value={pilihanData.hari.find((option) => option.value === formData.hari)}
            onChange={(selectedOption) => {
              handleChange('hari', selectedOption.value);
            }}
            options={pilihanData.hari}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.hari && (
            <div className="invalid-feedback">Mohon pilih hari!</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="table-font">Nama Dosen</label>
          <Select
            name="namaDosen"
            value={pilihanData.namaDosen.find((option) => option.value === formData.namaDosen)}
            onChange={(selectedOption) => {
              handleChange('namaDosen', selectedOption.value);
            }}
            options={pilihanData.namaDosen}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.namaDosen && (
            <div className="invalid-feedback">Mohon pilih nama dosen!</div>
          )}
        </div>

        <div className="col-md-4 margin-right">
          <label className="table-font">Jam Mulai</label>
          <Select
            name="waktuMulai"
            value={pilihanData.waktuMulai.find((option) => option.value === formData.waktuMulai)}
            onChange={(selectedOption) => {
              handleChange('waktuMulai', selectedOption.value);
            }}
            options={pilihanData.waktuMulai}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.waktuMulai && (
            <div className="invalid-feedback">Mohon pilih waktu!</div>
          )}
        </div>

        <div className="col-md-4 margin-right">
          <label className="table-font">Jam Selesai</label>
          <Select
            name="waktuSelesai"
            value={pilihanData.waktuSelesai.find((option) => option.value === formData.waktuSelesai)}
            onChange={(selectedOption) => {
              handleChange('waktuSelesai', selectedOption.value);
            }}
            options={pilihanData.waktuSelesai}
            isSearchable
            required
          />
          {isFormSubmitted && !formData.waktuSelesai && (
            <div className="invalid-feedback">Mohon pilih waktu!</div>
          )}
        </div>

        <div className="col-xs-12 mt-3">
          <button className="btn btn-primary float-end" type="submit">
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahData;
