import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  CForm,
  CFormLabel,
  CFormInput,
  CCard,
  CFormCheck,
  CImage,
  CContainer,
  CCol,
  CButton,
  CRow,
} from '@coreui/react';
import img from '../../../assets/images/profile.jpg';
import './style.css';
import axios from 'axios';

import pencil from "../../../assets/images/pencil-solid.svg";
const TambahMahasiswa = () => {
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    kode: '',
    id: '',
    email: '',
    status: '',
    kelas: '',
    prodi: '',
  });

  const [selectedImage, setSelectedImage] = useState(null); // Menyimpan gambar yang dipilih
  const [showKelasProdi, setShowKelasProdi] = useState(false); // Menyimpan status tampilan Kelas dan Prodi
  const [formErrors, setFormErrors] = useState({}); // Menyimpan pesan error untuk setiap field
  const [dataKelas, setKelasData] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [Nama, setNama] = useState(null);
  const [NIM, setNim] = useState(null);
  const [Email, setEmail] = useState(null);
  const [NoTelp, setNoTelp] = useState(null);
  const [NoTelpOrtu, setNoTelpOrtu] = useState(null);
  const [Nama_Ortu, setNamaOrtu] = useState(null);
  const [post, setPost] = useState([]);
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Hapus pesan error saat pengguna mulai mengisi field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleChangeKelas = (selectedOption) => {
    setSelectedKelas(selectedOption);
    // Juga perbarui formData dengan nilai yang dipilih
    setSelectedKelas(selectedOption);

  };

  useEffect(() => {
    getAllDataStudent();
    getAllKelas();
  }, []);
  const getAllKelas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-kelas/');
      setKelasData(response.data.data);
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

  const handleImageChange = (event) => {
    // Mengambil berkas gambar yang dipilih oleh pengguna
    const file = event.target.files[0];

    // Memeriksa apakah ada berkas yang dipilih
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleStatusChange = (status) => {
    handleChange('status', status);

    // Menyembunyikan/menampilkan Kelas dan Prodi berdasarkan status
    setShowKelasProdi(status === 'Dosen Wali');
  };

  const validateForm = () => {
    const errors = {};
    // Validasi untuk setiap field, pastikan tidak kosong
    if (!formData.nama) {
      errors.nama = 'Nama harus diisi.';
    }
    if (!formData.nip) {
      errors.nip = 'NIP harus diisi.';
    }
    if (!formData.kode) {
      errors.kode = 'Kode Dosen harus diisi.';
    }
    if (!formData.id) {
      errors.id = 'ID Dosen harus diisi.';
    }
    if (!formData.email) {
      errors.email = 'Email Dosen harus diisi.';
    }
    if (!formData.status) {
      errors.status = 'Status harus dipilih.';
    }
    if (showKelasProdi) {
      if (!formData.kelas) {
        errors.kelas = 'Kelas harus diisi.';
      }
      if (!formData.prodi) {
        errors.prodi = 'Program Studi harus diisi.';
      }
    }
    return errors;
  };

  const baseURL = `http://localhost:3000/data-mahasiswa/create`;
  const createPost = () => {


    const CrMHS = axios.post('http://localhost:3000/data-mahasiswa/create', {
      Nama: Nama,
      NIM: NIM,
      Password : "1234",
      Email: Email,
      Nama_Ortu : Nama_Ortu,
      Nomor_Telp : NoTelp,
      Nomor_Telp_Ortu : NoTelpOrtu,
      ID_Kelas : 1
    });




  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Tidak ada error, data dapat dikirim
      console.log('Form valid. Data akan dikirim:', formData);
    } else {
      // Terdapat error, tampilkan pesan error
      setFormErrors(errors);
    }
  };



  const getAllDataStudent = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-mahasiswa/students/');
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  var imgSrc = `blank.jpeg`
  var kelasx = getNamaKelas();
  const duaKarakterPertama = kelasx.map((kelasa) => kelasa.label.slice(0, 2));
  const duaKarakterTerakhir = kelasx.map((kelasa) => kelasa.label.slice(-2));
  const pilihanData = {
    kelas: getNamaKelas(),
    NKelas: duaKarakterPertama,

  };
  // console.log(selectedKelas);

  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <main className="c-main">
          <div className="container-fluid">
            <CContainer>
              <CRow>
                <CForm method="POST">
                  <CCol className="my-col">
                    <CRow>
                      <CCol xs="6" className="my-col-inner">
                        <CRow className="mb-3">
                          <CCol className="ml-0">
                            <CFormLabel htmlFor="kelas" className="label">
                              Kelas
                            </CFormLabel>
                            {(
                              <>

                                <Select
                                  name="kelas"
                                  value={selectedKelas}
                                  onChange={handleChangeKelas}
                                  options={pilihanData.kelas}
                                  isSearchable
                                  required
                                />

                              </>
                            )}

                          </CCol>

                        </CRow>
                        <CFormLabel htmlFor="jurusan" className="label">
                          Jurusan
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="jurusan"
                          name="jurusan"
                          defaultValue="Teknik Komputer dan Informatika"
                          disabled

                        />
                        <CFormLabel htmlFor="email" className="label">
                          Email
                        </CFormLabel>
                        <CFormInput
                          type="email"
                          id="email"
                          name="email"
                          onChange={(event) => setEmail(event.target.value)}

                        />
                        <CFormLabel htmlFor="noHandphone" className="label">
                          No Handphone
                        </CFormLabel>
                        <CFormInput
                          type="number"
                          id="noHandphone"
                          name="noHandphone"

                          onChange={(event) => setNoTelp(event.target.value)}
                        />
                        <br />
                        <p className="header-text">Data Orang Tua Wali</p>
                        <CFormLabel htmlFor="namaOrangTuaWali" className="label">
                          Nama Orang Tua Wali
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="namaOrangTuaWali"
                          name="namaOrangTuaWali"
                          onChange={(event) => setNamaOrtu(event.target.value)}
                        />
                        <CFormLabel htmlFor="noHandphoneOrangTuaWali" className="label">
                          No Handphone Orang Tua Wali
                        </CFormLabel>
                        <CFormInput
                          type="number"
                          id="noHandphoneOrangTuaWali"
                          name="noHandphoneOrangTuaWali"
                          onChange={(event) => setNoTelpOrtu(event.target.value)}
                        />
                      </CCol>
                      <CCol xs="6" className="my-col-inner">
                        <CCard className="card-style">
                          <div className="card-content-style">
                            {selectedImage ? (
                              <CImage
                                src={selectedImage}
                                fluid
                                className="image-style"
                              />
                            ) : (
                              <CImage src={require(`../../../assets/ProfilPic/${imgSrc}`)} fluid className="image-style" />


                            )}
                            <CImage src={pencil} className="pencil-icon-style" />
                          </div>
                          <input
                            type="file"
                            id="ProfilPic"
                            name="ProfilPic"
                            className="file-input-style"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </CCard>
                        <CFormLabel htmlFor="nama" className="label">
                          Nama
                        </CFormLabel>
                        <CFormInput type="text" id="nama" name="nama"  onChange={(event) => setNama(event.target.value)}/>
                        <CFormLabel htmlFor="nim" className="label">
                          NIM
                        </CFormLabel>
                        <CFormInput type="number" id="nim" name="nim"  onChange={(event) => setNim(event.target.value)}/>
                        <CFormLabel htmlFor="waliDosen" className="label">
                          Wali Dosen
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="waliDosen"
                          name="waliDosen"

                        />
                        <CButton
                          component="input"
                          value="Submit"
                          className="submitButtonStyle"
                          onClick={createPost}

                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CForm>
              </CRow>
            </CContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TambahMahasiswa;
