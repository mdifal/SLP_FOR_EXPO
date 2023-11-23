import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CCol,
  CRow,
} from '@coreui/react';
import { useParams, useNavigate } from 'react-router-dom';

const EditDataDosen = () => {
  const [formData, setFormData] = useState({
    Nama_Dosen: '',
    NIP: '',
    Kode_Dosen: '',
    InitialID: '',
    Email_Dosen: '',
    Nama_Kelas: '',
    Password: '',
    status: 'Bukan Dosen Wali',
    ID_Dosen_Wali: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [dataKelas, setDataKelas] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [showKelasProdi, setShowKelasProdi] = useState(false);
  const { key } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Inisialisasi state isFormSubmitted
  const [done, setDone] = useState(0); // Inisialisasi state done
  const navigate = useNavigate();

  // Fungsi untuk menghasilkan password otomatis
  function generatePassword() {
    // Bagian awal password
    const prefix = "*Polbanjtk";

    // Mendapatkan angka acak antara 1000 hingga 9999
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    // Bagian akhir password
    const suffix = "#";

    // Menggabungkan semua bagian untuk membuat password
    const password = `${prefix}${randomDigits}${suffix}`;

    return password;
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

    if (name === 'status' && value === 'Bukan Dosen Wali') {
      // Reset the form fields related to Dosen Wali
      setFormData({
        ...formData,
        Nama_Kelas: '',
        Password: '',
      });
      setFormErrors({
        ...formErrors,
        Nama_Kelas: '',
        Password: '',
      });
    }
  };

  const handleStatusChange = (status) => {
    setFormData({
      ...formData,
      status: status,
      // Saat status berubah, reset password jika bukan "Dosen Wali"
      Password: status === 'Dosen Wali' ? generatePassword() : '',
    });

    if (status === 'Dosen Wali') {
      setShowKelasProdi(true);
    } else {
      setShowKelasProdi(false);
    }

    setFormErrors({
      ...formErrors,
      Nama_Kelas: '',
      Password: '',
    });
  };

  const handleChangeKelas = (selectedOption) => {
    setSelectedKelas(selectedOption);
    // Juga perbarui formData dengan nilai yang dipilih
    handleChange('Nama_Kelas', selectedOption ? selectedOption.label : '');
  };

  useEffect(() => {
    if (done === 1) {
      navigate('/admin/dataDosen');
    }
  }, [done]);

  useEffect(() => {
    getAllDataKelas();
    getAllDataDosenWali();
  }, []);

  const getAllDataKelas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-kelas/getallformat');
      setDataKelas(response.data.data);
      console.log("isi kelas:", setDataKelas)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getNamaKelas() {
    const namaKelas = [];
    for (let i = 0; i < dataKelas.length; i++) {
      namaKelas.push({ value: dataKelas[i].id, label: dataKelas[i].Nama_Kelas });
    }
    return namaKelas;
  }

  const getAllDataDosenWali = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-dosen-wali');
      setDataDosenWali(response.data.data);
      console.log('Data Dosen Wali:', response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (key) {
      fetchData(key);
      setIsEditing(true);
    }
  }, [key]);

  const fetchData = async (key) => {
    try {
      const dataDosenResponse = await axios.get(`http://localhost:3000/data-dosen/get/${key}`);
      const dataDosen = dataDosenResponse.data.data;
      console.log("ini id nya bro:", dataDosen.id)
      if (dataDosenResponse.status === 200) {
        setFormData((prevData) => ({
          ...prevData,
          Nama_Dosen: dataDosen.Nama_Dosen,
          NIP: dataDosen.NIP,
          Kode_Dosen: dataDosen.Kode_Dosen,
          InitialID: dataDosen.InitialID,
          Email_Dosen: dataDosen.Email_Dosen,
        }));
      } else {
        console.error('Gagal mengambil data dosen');
      }

      const allDosenResponse = await axios.get('http://localhost:3000/data-dosen-wali');
      const allDosenData = allDosenResponse.data.data;

      for (let i = 0; i < allDosenData.length; i++) {
        const indeks = allDosenData[i];

        if (indeks.ID_Dosen.toString() === key.toString()) {
          dataDosen.id = indeks.id;
          break;
        }
      }

      const dosenWaliResponse = await axios.get(`http://localhost:3000/data-dosen-wali/get/${dataDosen.id}`);
      const dosenWaliData = dosenWaliResponse.data.data;
      console.log("ini isi dosen wali:", dosenWaliData);

      if (dosenWaliResponse.status === 200) {
        if (dosenWaliData) {
          setFormData((prevData) => ({
            ...prevData,
            Status: 'Dosen Wali',
            Nama_Kelas: dataDosen.Nama_Kelas,
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            Status: 'Bukan Dosen Wali',
          }));
        }
      } else {
        console.error('Gagal mengambil data dosen wali');
      }
      console.log('Data_Dosen URL:', `http://localhost:3000/data-dosen/get/${key}`);
      console.log('Data_Kelas URL:', `http://localhost:3000/data-kelas/getoneformat/${dataDosen.id}`);
      console.log('Data_Dosen_Wali URL:', `http://localhost:3000/data-dosen-wali/get/${dataDosen.id}`);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  useEffect(() => {
    if (formData.Status === 'Dosen Wali') {
      setShowKelasProdi(true);
    } else {
      setShowKelasProdi(false);
    }
  }, [formData.Status]);

  const validateForm = () => {
    const errors = {};
    if (!formData.Nama_Dosen) {
      errors.Nama_Dosen = 'Nama harus diisi.';
    }
    if (!formData.NIP) {
      errors.NIP = 'NIP harus diisi.';
    }
    if (!formData.InitialID) {
      errors.InitialID = 'ID Dosen harus diisi.';
    }
    if (!formData.Email_Dosen) {
      errors.Email_Dosen = 'Email Dosen harus diisi.';
    }

    if (formData.Status === 'Dosen Wali' && !selectedKelas) {
      errors.Nama_Kelas = 'Kelas harus dipilih.';
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
        // Update Data Dosen
        const dosenResponse = await axios.patch(`http://localhost:3000/data-dosen/patch/${key}`, {
          Nama_Dosen: formData.Nama_Dosen,
          NIP: formData.NIP,
          Kode_Dosen: formData.Kode_Dosen,
          InitialID: formData.InitialID,
          Email_Dosen: formData.Email_Dosen,
        });
  
        if (dosenResponse.status === 200) {
          // Cek perubahan status
          if (formData.Status === 'Dosen Wali' && dosenResponse.data.Status === 'Bukan Dosen Wali') {
            // Status berubah dari Dosen Wali menjadi bukan Dosen Wali
            // Hapus entri dari data-dosen-wali
            await axios.delete(`http://localhost:3000/data-dosen-wali/delete/${key}`);
  
            // Perbarui entri di data-kelas dengan menghapus ID Dosen Wali
            await axios.patch(`http://localhost:3000/data-kelas/update/${kelasData.id}`, {
              ID_Dosen_Wali: null,
            });
          } else if (formData.Status === 'Bukan Dosen Wali' && dosenResponse.data.Status === 'Dosen Wali') {
            // Status berubah dari bukan Dosen Wali menjadi Dosen Wali
            // Buat entri baru di data-dosen-wali
            const dosenWaliResponse = await axios.post('http://localhost:3000/data-dosen-wali/create', {
              Password: formData.Password,
              ID_Dosen: key,
            });
  
            if (dosenWaliResponse.status === 201) {
              // Perbarui entri di data-kelas dengan mengatur ID Dosen Wali ke ID yang sesuai
              await axios.patch(`http://localhost:3000/data-kelas/update/${kelasData.id}`, {
                ID_Dosen_Wali: key,
              });
            }
          }
  
          setDone(1); // Set done to 1 when the update is successful
        } else {
          console.error('Gagal mengupdate data dosen');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengupdate data. Error: ' + error.message);
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };  

  const pilihanData = {
    kelas: getNamaKelas(),
  };

  const kelasData = dataKelas.find((kelas) => kelas.ID_Dosen_Wali !== null && kelas.ID_Dosen_Wali.toString() === key);
  console.log('Pilihan kelas:', pilihanData.kelas);

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <CRow>
        <CCol className='box-1'>
          <div>
            <CFormLabel htmlFor="Kode_Dosen">Kode Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Kode_Dosen"
              value={formData.Kode_Dosen}
              onChange={(e) => handleChange('Kode_Dosen', e.target.value)}
            />
            {formErrors.Kode_Dosen && <div className="text-danger">{formErrors.Kode_Dosen}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="InitialID">ID Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="InitialID"
              value={formData.InitialID}
              onChange={(e) => handleChange('InitialID', e.target.value)}
            />
            {formErrors.InitialID && <div className="text-danger">{formErrors.InitialID}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Nama_Dosen">Nama Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Nama_Dosen"
              value={formData.Nama_Dosen}
              onChange={(e) => handleChange('Nama_Dosen', e.target.value)}
            />
            {formErrors.Nama_Dosen && <div className="text-danger">{formErrors.Nama_Dosen}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="NIP">NIP</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="NIP"
              value={formData.NIP}
              onChange={(e) => handleChange('NIP', e.target.value)}
            />
            {formErrors.NIP && <div className="text-danger">{formErrors.NIP}</div>}
          </div>
          <div>
            <CFormLabel htmlFor="Email_Dosen">Email Dosen</CFormLabel>
            <CFormInput
              className="input"
              type="email"
              id="Email_Dosen"
              value={formData.Email_Dosen}
              onChange={(e) => handleChange('Email_Dosen', e.target.value)}
            />
            {formErrors.Email_Dosen && <div className="text-danger">{formErrors.Email_Dosen}</div>}
          </div>
          <div>
            <CFormLabel>Status</CFormLabel>
            <CFormCheck
              type="radio"
              id="flexCheckDefault1"
              name="status"
              label="Dosen Wali"
              checked={formData.status === 'Dosen Wali'}
              onChange={() => handleStatusChange('Dosen Wali')}
            />
            <CFormCheck
              type="radio"
              id="flexCheckDefault2"
              name="status"
              label="Bukan Dosen Wali"
              checked={formData.status === 'Bukan Dosen Wali'}
              onChange={() => handleStatusChange('Bukan Dosen Wali')}
            />
          </div>
          {showKelasProdi && (
            <>
              <div className="col-md-4 margin-right">
                <label className="table-font">Kelas</label>
                <Select
                  name="Nama_Kelas"
                  options={pilihanData.kelas}
                  value={pilihanData.kelas.find((option) => option.label === kelasData.Nama_Kelas)}
                  onChange={(selectedOption) => handleChange('Nama_Kelas', selectedOption.label)}
                  required
                />
              </div>
            </>
          )}
        </CCol>
      </CRow>
      <div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Simpan Perubahan' : 'Tambahkan'}
        </button>
      </div>
    </CForm>
  );
};

export default EditDataDosen;
