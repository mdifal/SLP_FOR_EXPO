import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

function TambahDataDosen() {
  const [formData, setFormData] = useState({
    Nama_Dosen: '',
    NIP: '',
    Kode_Dosen: '',
    InitialID: '',
    Email_Dosen: '',
    Nama_Kelas: '',
    Password: '', // Password akan diisi otomatis
    status: 'Bukan Dosen Wali', // Nilai default status
    ID_Dosen_Wali: '',
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showKelasProdi, setShowKelasProdi] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [dataKelas, setDataKelas] = useState([]);
  const [done, setDone] = useState();
  const [selectedKelas, setSelectedKelas] = useState(null);


  // Fungsi untuk menghasilkan password otomatis
  function generatePassword() {
    // Bagian awal password
    const prefix = "*Polbanjtkdosen";

    // Mendapatkan angka acak antara 1000 hingga 9999
    const randomDigits = Math.floor(1000 + Math.random() * 9000);

    // Bagian akhir password
    const suffix = "#";

    // Menggabungkan semua bagian untuk membuat password
    const password = `${prefix}${randomDigits}${suffix}`;

    console.log('Passwordnya: ', password);

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
    if (done == 1) {
      navigate('/dataDosen');
    }
  }, [done]);

  useEffect(() => {
    getAllDataKelas();
  }, []);

  const getAllDataKelas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-kelas/getallformat');
      setDataKelas(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function getNamaKelas() {
    const namaKelas = [];
    for (let i = 0; i < dataKelas.length; i++) {
      if (dataKelas[i].ID_Dosen_Wali === null) {
        namaKelas.push({ value: dataKelas[i].id, label: dataKelas[i].Nama_Kelas });
      }
    }
    return namaKelas;
  }

  useEffect(() => {
    console.log(dataKelas);
  }, [dataKelas]);

  const validateForm = () => {
    const errors = {};
    if (!formData.Nama_Dosen) {
      errors.Nama_Dosen = 'Nama harus diisi.';
    }
    if (!formData.NIP) {
      errors.NIP = 'NIP harus diisi.';
    }
    if (!formData.Kode_Dosen) {
      errors.Kode_Dosen = 'Kode Dosen harus diisi.';
    }
    if (!formData.InitialID) {
      errors.InitialID = 'ID Dosen harus diisi.';
    }
    if (!formData.Email_Dosen) {
      errors.Email_Dosen = 'Email Dosen harus diisi.';
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
        // Create Data Dosen
        const dosenResponse = await axios.post('http://localhost:3000/data-dosen/create', {
          Nama_Dosen: formData.Nama_Dosen,
          NIP: formData.NIP,
          Kode_Dosen: formData.Kode_Dosen,
          InitialID: formData.InitialID,
          Email_Dosen: formData.Email_Dosen,
          Status: formData.status,
          Kelas: selectedKelas ? selectedKelas.label : '',
        });

        const dosen = await axios.get('http://localhost:3000/data-dosen')
        const dosenData = dosen.data.data; // Asumsikan data dosen ada dalam properti 'data'
        console.log("Data Dosen:", dosenData);

        const formDataNIP = formData.NIP; // Nilai NIP yang ingin Anda cari
        const matchingDosen = dosenData.find(dosen => dosen.NIP === formDataNIP);
        if (matchingDosen) {
          console.log("Data Dosen dengan NIP yang cocok:", matchingDosen);
        } else {
          console.log("Data Dosen dengan NIP tidak ditemukan.");
        }
        const id_dosen = matchingDosen.id;
        console.log("id dosen:", id_dosen);
        console.log("status:", formData.status);
        if (dosenResponse.status === 201) {
          if (formData.status === 'Dosen Wali') {
            console.log("masuk dosen wali");
            // Find the ID of the created Dosen
            const dosenData = dosenResponse.data;
            
            // Update Data Kelas
            const kelas = await axios.get('http://localhost:3000/data-kelas/getallformat');
            const kelasData = kelas.data.data;
            console.log("Data kelas:", kelasData);
            // console.log("cobain:", kelasData[9].Nama_Kelas);

            const formDataKelas = selectedKelas.label;
            console.log("kelas yang dipilih:", formDataKelas);

            let matchingKelas = null;
            for (let i = 0; i < kelasData.length; i++) {
              if (kelasData[i].Nama_Kelas === formDataKelas) {
                matchingKelas = kelasData[i];
                break; // Keluar dari loop jika sudah ditemukan kelas yang cocok
              }
            }
            console.log("nih kelasnyah:", id_dosen);
            try {
              await axios.patch(`http://localhost:3000/data-kelas/update/${matchingKelas.id}`, {
                ID_Dosen_Wali: id_dosen,
              });
              console.log("ada isinya ga:", ID_Dosen_Wali);
              console.log("Update berhasil!");
            } catch (error) {
              console.error("Terjadi kesalahan saast melakukan pembaruan:", error);
            }

            if (dosenResponse.status === 201) {
              // Create Data Dosen Wali
              const dosenWaliResponse = await axios.post('http://localhost:3000/data-dosen-wali/create', {
                Password: formData.Password,
                ID_Dosen: id_dosen,
              });
  
              if (dosenWaliResponse.status === 201) {
                alert('Data Dosen berhasil ditambahkan!');
                navigate('/admin/dataDosen');
              } else {
                console.error('Gagal menambahkan data Dosen Wali:', dosenWaliResponse.data.error);
                alert('Gagal menambahkan data Dosen Wali. Error: ' + dosenWaliResponse.data.error);
              }
            } else {
              console.error('Gagal menambahkan data Kelas:', kelasResponse.data.error);
              alert('Gagal menambahkan data Kelas. Error: ' + kelasResponse.data.error);
            }
          } else {
            alert('Data Dosen berhasil ditambahkan!');
            navigate('/admin/dataDosen');
          }
        } else {
          console.error('Gagal menambahkan data Dosen:', dosenResponse.data.error);
          alert('Gagal menambahkan data Dosen. Error: ' + dosenResponse.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambahkan data. Error: ' + error.message);
      }
    } else {
      alert('Ada kesalahan dalam pengisian formulir. Harap periksa lagi.');
    }
  };
  
  const pilihanData = {
    kelas: getNamaKelas(),
  };

  return (
    <CForm onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <div className="header-form">
        <div>
          <h2>Tambah Data Dosen</h2>
        </div>
      </div>
      <CRow>
        <CCol className="box-1">
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
            <CFormLabel htmlFor="Nama">Nama</CFormLabel>
            <CFormInput
              className="input"
              type="text"
              id="Nama"
              value={formData.Nama_Dosen}
              onChange={(e) => handleChange('Nama_Dosen', e.target.value)}
            />
            {formErrors.Nama_Dosen && <div className="text-danger">{formErrors.NIP}</div>}
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
        </CCol>
        <CCol className="box-2">
          <div>
            <CFormLabel>Status</CFormLabel>
            <CFormCheck
              type="radio"
              id="flexCheckDefault1"
              label="Dosen Wali"
              checked={formData.status === 'Dosen Wali'}
              onChange={() => handleStatusChange('Dosen Wali')}
            />
            <CFormCheck
              type="radio"
              id="flexCheckDefault2"
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
                  name="kelas"
                  value={selectedKelas}
                  onChange={handleChangeKelas}
                  options={pilihanData.kelas}
                  isSearchable
                  required
                />
                {isFormSubmitted && !selectedKelas && (
                  <div className="invalid-feedback">Mohon pilih kelas!</div>
                )}
              </div>

            </>
          )}
        </CCol>
      </CRow>
      <div>
        <button type="submit" className="btn btn-primary float-end">
          Kirim
        </button>
      </div>
    </CForm>
  );
};

export default TambahDataDosen;
