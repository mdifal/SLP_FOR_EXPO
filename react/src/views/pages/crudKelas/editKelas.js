import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'; // Import komponen Select
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
} from '@coreui/react';
import './crudKelas.css';

function EditKelas() {
  const { key } = useParams();
  const [formData, setFormData] = useState({
    Nama_Kelas: '',
    Program_Studi: '',
    Tahun_Ajaran: '',
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const kelasOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    // Tambahkan pilihan kelas lainnya
  ];

  const prodiOptions = [
    { value: 'D3', label: 'D3' },
    { value: 'D4', label: 'D4' },
    // Tambahkan pilihan lainnya
  ];

  useEffect(() => {
    // Mengambil data kelas berdasarkan ID dari database
    axios
      .get(`http://localhost:3000/data-kelas/getoneformat/${key}`)
      .then((response) => {
        const kelasData = response.data.dataKelas;
  
        // Inisialisasi variabel kelas dan prodi
        let kelas = '';
        let prodi = '';
  
        if (kelasData) {
          const nama_kelas = kelasData.Nama_Kelas;
          const karakterArray = nama_kelas.split('');
  
          if (karakterArray.length >= 4) {
            kelas = karakterArray.slice(1, 2).join('');
            prodi = karakterArray.slice(2).join('');
          }
        }
  
        // Mengisi formulir dengan data kelas yang diambil dari database
        setFormData({
          Nama_Kelas: kelas,
          Program_Studi: prodi,
          Tahun_Ajaran: kelasData.Tahun_Ajaran,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengambil data. Error: ' + error.message);
      });
  }, [key]);
  

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value.toUpperCase(),
    });

    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  useEffect(() => {
    if (done) {
      navigate('/admin/dataKelas'); // Navigate to the data kelas list page
    }
  }, [done, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.Nama_Kelas) {
      errors.Nama_Kelas = 'Nama harus diisi.';
    }
    if (!formData.Program_Studi) {
      errors.Program_Studi = 'Program Studi harus diisi.';
    }
    if (!formData.Tahun_Ajaran) {
      errors.Tahun_Ajaran = 'Tahun Masuk harus diisi.';
    }

    setFormErrors(errors);
    return errors;
  };

  const updateDataKelas = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        const Nama_Kelas = formData.Nama_Kelas + formData.Program_Studi;

        // Mengirim permintaan PUT untuk memperbarui data kelas
        await axios.patch(`http://localhost:3000/data-kelas/update/${key}`, {
          Nama_Kelas: Nama_Kelas,
          Tahun_Ajaran: formData.Tahun_Ajaran,
        });

        // Handle successful submission
        setDone(true);
        setFormData({ Nama_Kelas: '', Program_Studi: '', Tahun_Ajaran: '' }); // Clear the form
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memperbarui data. Error: ' + error.message);
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <CForm onSubmit={updateDataKelas} style={{ padding: '20px' }}>
      <div className="header-form">
        <div>
          <h2>Perbarui Data Kelas</h2>
        </div>
      </div>
      <CRow>
        <CCol className="box-1">
          <div>
            <CFormLabel htmlFor="Nama_Kelas">Nama Kelas</CFormLabel>
            <Select
              id="Nama_Kelas"
              value={kelasOptions.find(option => option.value === formData.Nama_Kelas)}
              onChange={(selectedOption) => handleChange('Nama_Kelas', selectedOption.value)}
              options={kelasOptions}
            />
            {formErrors.Nama_Kelas && <div className="text-danger">{formErrors.Nama_Kelas}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Program_Studi">Program Studi</CFormLabel>
            <Select
              id="Program_Studi"
              value={prodiOptions.find(option => option.value === formData.Program_Studi)}
              onChange={(selectedOption) => handleChange('Program_Studi', selectedOption.value)}
              options={prodiOptions}
            />
            {formErrors.Program_Studi && <div className="text-danger">{formErrors.Program_Studi}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Tahun_Ajaran">Tahun Masuk</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Tahun_Ajaran"
              value={formData.Tahun_Ajaran}
              onChange={(e) => handleChange('Tahun_Ajaran', e.target.value)}
              disabled
            />
            {formErrors.Tahun_Ajaran && <div className="text-danger">{formErrors.Tahun_Ajaran}</div>}
          </div>
        </CCol>
      </CRow>
      <div>
        <a href={`/#/admin/dataKelas`} className="btn btn-secondary float-start">
          Kembali
        </a>
        <button type="submit" className="btn btn-primary float-end">
          Kirim
        </button>
      </div>
    </CForm>
  );
}

export default EditKelas;
