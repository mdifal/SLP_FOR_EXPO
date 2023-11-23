import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
} from '@coreui/react';

function TambahDataKelas() {
  const [formData, setFormData] = useState({
    Nama_Kelas: '',
    Program_Studi: '',
    Tahun_Ajaran: new Date().getFullYear(),
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

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
    const currentYear = new Date().getFullYear();
    setFormData({
      ...formData,
      Tahun_Ajaran: currentYear,
    });
  }, []);

  const kelasOptions = [ 
    'A',
    'B',
    'C',
  ];

  const prodiOptions = [ 
    'D3',
    'D4',
  ];

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  useEffect(() => {
    if (done) {
      navigate(-1); // Navigate back to the previous page
    }
  }, [done, navigate]);

  const validateForm = () => {
    const errors = {};
    if (formData.Nama_Kelas.length !== 1) {
      errors.Nama_Kelas = 'Nama kelas harus terdiri dari satu karakter.';
    }
    if (!formData.Program_Studi) {
      errors.Program_Studi = 'Program Studi harus terdiri dari dua karakter.';
    }
    if (!formData.Tahun_Ajaran) {
      errors.Tahun_Ajaran = 'Tahun Masuk harus diisi.';
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        // Menggabungkan Nama Kelas dan Program Studi tanpa spasi di antaranya
        const Nama_Kelas = formData.Nama_Kelas + formData.Program_Studi;

        // Kemudian mengirim Nama_Kelas yang telah digabungkan
        await axios.post('http://localhost:3000/data-kelas/create', {
          Nama_Kelas: Nama_Kelas,
          Tahun_Ajaran: formData.Tahun_Ajaran,
        });

        // Handle successful submission
        setDone(true);
        setFormData({ Nama_Kelas: '', Program_Studi: '', Tahun_Ajaran: '' }); // Clear the form
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambahkan data. Error: ' + error.message);
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <div className="header-form">
        <div>
          <h2>Tambah Data Kelas</h2>
        </div>
      </div>
      <CRow>
        <CCol className="box-1">
          <div>
            <CFormLabel htmlFor="Nama_Kelas">Nama Kelas</CFormLabel>
            <select
              className="input"
              id="Nama_Kelas"
              value={formData.Nama_Kelas}
              onChange={(e) => handleChange('Nama_Kelas', e.target.value)}
            >
              <option value="">Pilih Nama Kelas</option>
              {kelasOptions.map((kelas, index) => (
                <option key={index} value={kelas}>
                  {kelas}
                </option>
              ))}
            </select>
            {formErrors.Nama_Kelas && <div className="text-danger">{formErrors.Nama_Kelas}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Program_Studi">Program Studi</CFormLabel>
            <select
              className="input"
              id="Program_Studi"
              value={formData.Program_Studi}
              onChange={(e) => handleChange('Program_Studi', e.target.value)}
              >
              <option value="">Pilih Program Studi</option>
              {prodiOptions.map((prodi, index) => (
                <option key={index} value={prodi}>
                  {prodi}
                </option>
              ))}
            </select>
            {formErrors.Nama_Kelas && <div className="text-danger">{formErrors.Nama_Kelas}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Tahun_Ajaran">Tahun Masuk</CFormLabel>
            <CFormInput
              className="input"
              type="number"
              id="Tahun_Ajaran"
              value={formData.Tahun_Ajaran}
              onChange={(e) => handleChange('Tahun_Ajaran', e.target.value)}
              min={2019}
              max={getCurrentYear()} // Set max to the current year
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

export default TambahDataKelas;
