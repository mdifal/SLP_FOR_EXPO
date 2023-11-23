import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormTextarea,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import '../../../scss/styleFormPengajuan.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
// import { idMahasiswa } from '../login/Login'

const baseURL = "http://localhost:3000/data-pengajuan/";

let urlJadwalKelasGetOne = "";
const CustomCheckboxTable = () => {
  const [jadwalKelasAll, setJadwalKelasAll] = useState([]);
  const [jadwalKelas, setJadwalKelas] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  const [jamPelajaran, setJamPelajaran] = useState([]);
  const [id, setIdMahasiswa] = useState(sessionStorage.getItem('idMhs')) // fetch id mahasiswa dari session storage
  const [nama, setNama] = useState("")
  const [NIM, setNIM] = useState("")
  const [kelas, setKelas] = useState(1)
  const getDayName = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayIndex = date.getDay();
    return days[dayIndex];
  };
  const [hari, setHari] = useState(getDayName(new Date()));
  const [selectedjadwal, setSelectedJadwal] = useState([]);
  const [keterangan, setKeterangan] = useState("")
  const [tanggalPengajuan, setTanggalPengajuan] = useState(new Date())
  const [tanggalAbsen, setTanggalAbsen] = useState("")
  const [idJadwalKelas, setIdJadwalKelas] = useState('1')
  const [jenisIzin, setJenisIzin] = useState("")
  const [statusPengajuan, setStatusPengajuan] = useState("")
  const [fileBukti, setFileBukti] = useState(null)
  const [tableData, setTableData] = useState([]) // State untuk data tabel
  const [selectedDate, setSelectedDate] = useState(new Date()) // State untuk menyimpan tanggal yang dipilih
  const [selectedDates, setSelectedDates] = useState([]) // State untuk menyimpan tanggal-tanggal yang dipilih
  const [selectAll, setSelectAll] = useState(false) // State untuk checkbox "Pilih Semua Jadwal"
  const [expandedDates, setExpandedDates] = useState([]) // State untuk tanggal yang sedang diperluas
  const [checkboxStatus, setCheckboxStatus] = useState({})
  const selectedDatesExist = selectedDates.length > 0
  const navigate = useNavigate()
  const urlMahasiswaGetOne = `http://localhost:3000/data-mahasiswa/students/${id}`;

  // const formatSelectedDate = (date) => {
  //   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  //   return date.toLocaleDateString(undefined, options)
  // }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setFileBukti(file)

    }
  };

  const dayName = getDayName(selectedDate)

  useEffect(() => {
    setIdMahasiswa(sessionStorage.getItem('idMhs'))
    console.log('id MAHASISWA: ', id)

    // Lakukan apa pun yang Anda butuhkan dengan URL ini, misalnya, permintaan API.
    console.log(urlJadwalKelasGetOne);

    const getTanggalHariIni = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Januari dimulai dari 0
      const yyyy = today.getFullYear();

      const tanggalHariIni = `${yyyy}-${mm}-${dd}`;
      return tanggalHariIni

    };
    // Panggil fungsi getTanggalHariIni saat komponen pertama kali dirender
    setTanggalAbsen(getTanggalHariIni());
    setTanggalPengajuan(getTanggalHariIni());
    setStatusPengajuan('Delivered');

    setIdJadwalKelas(1);
    fetch(urlMahasiswaGetOne)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMahasiswa(data);
        setNama(data.data.Nama);
        setNIM(data.data.NIM);
        setKelas(data.data.ID_Kelas);
        console.log('kelasnya', data.data.ID_Kelas);
        setIdMahasiswa(data.data.id? data.data.id : id);

        // Setelah mendapatkan data Mahasiswa, lakukan permintaan kedua
        const urlJadwalKelasGetOne = `http://localhost:3000/jadwal-kelas/${data.data.ID_Kelas}/${hari}`;
        return fetch(urlJadwalKelasGetOne);
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('hai', data);
        setJadwalKelasAll(data);
        setJadwalKelas(data.data);
        setMataKuliah(data.mata_kuliah);
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  useEffect(() => {
    getAllClassHours();
  }, []);

  const getAllClassHours = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-jam-pelajaran');
      setJamPelajaran(response.data.data);
      console.log('hoii', response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  function getJamPelajaran (data, id_jam){
    let i = 0;
    while (i < data.length){
      if (data[i].id == id_jam){
        return data[i].Waktu_Mulai;
      }
      i++;
    }
    return "NULL";
  }

  function getNamaMatkul (data, id_matkul){
    let i = 0;
    while (i < data.length){
      if (data[i].Data_Mata_Kuliah.id == id_matkul){
        return data[i].Data_Mata_Kuliah.Nama_Mata_Kuliah;
      }
      i++;
    }
    return "NULL";
  }


  function createPost() {

    if (selectedDates.length === 0) {
      selectedDates.push({ date: new Date() });
    } else if (selectedDates.length > 1) {
      console.log('lebih dr 1')
      selectedDates.forEach((item) => {
        const tanggal = item.date;
        const hariSelected = getDayName(tanggal);
        urlJadwalKelasGetOne = `http://localhost:3000/jadwal-kelas/${kelas}/${hariSelected}`;

        fetch(urlJadwalKelasGetOne)
          .then((response) => response.json())
          .then((data) => {
            const jadwalKelasArray = data.data;
            jadwalKelasArray.forEach(item => {
              const data = new FormData();
              data.append("ID_Mahasiswa", id);
              data.append("Keterangan", keterangan);
              data.append("Jenis_Izin", jenisIzin);
              data.append("Tanggal_Pengajuan", tanggalPengajuan);
              data.append("Tanggal_Izin", tanggal);
              data.append("ID_Jadwal_Kelas", item.id);
              data.append("File_Pengajuan", fileBukti);
              data.append("Status_Pengajuan", statusPengajuan);

              axios
                .post(baseURL, data)
                .then((response) => {
                  setPost(response.data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });

            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      selectedDates.forEach((item) => {
        const tanggal = item.date;
        if (selectedjadwal.length === 0) {
          const hariSelected = getDayName(tanggal);
          urlJadwalKelasGetOne = `http://localhost:3000/jadwal-kelas/${kelas}/${hariSelected}`;
          fetch(urlJadwalKelasGetOne)
            .then((response) => response.json())
            .then((data) => {
              setJadwalKelas(data.data);

            })
            .catch((err) => {
              console.log(err);
            });

          jadwalKelas.forEach((item) => {
            selectedjadwal.push(item.id)
          });
        }
        selectedjadwal.forEach((item) => {
          const data = new FormData();
          data.append("ID_Mahasiswa", id);
          data.append("Keterangan", keterangan);
          data.append("Jenis_Izin", jenisIzin);
          data.append("Tanggal_Pengajuan", tanggalPengajuan);
          data.append("Tanggal_Izin", tanggal);
          data.append("ID_Jadwal_Kelas", item);
          data.append("File_Pengajuan", fileBukti);
          data.append("Status_Pengajuan", statusPengajuan);

          axios
            .post(baseURL, data)
            .then((response) => {
              //setPost(response.data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });

        });
      });
    }

  }

  const handleCheckboxChange = (id) => {
    // Copy state checkboxStatus menjadi objek baru
    const updatedCheckboxStatus = { ...checkboxStatus };

    // Ubah status checkbox untuk id yang sesuai
    updatedCheckboxStatus[id] = !updatedCheckboxStatus[id];
    setCheckboxStatus(updatedCheckboxStatus);

    setSelectedJadwal((prevSelectedJadwal) => {
      // Buat salinan state terbaru
      const updatedSelectedJadwal = [...prevSelectedJadwal];

      if (!updatedSelectedJadwal.includes(id)) {
        // Jika checkbox dicentang dan ID belum ada di dalam selectedjadwal, tambahkan ID
        updatedSelectedJadwal.push(id);
      } else {
        // Jika checkbox tidak dicentang (false), hilangkan ID dari selectedjadwal
        const index = updatedSelectedJadwal.indexOf(id);
        if (index !== -1) {
          updatedSelectedJadwal.splice(index, 1);
        }
      }

      return updatedSelectedJadwal;
    });

    // Periksa selectedjadwal yang telah diperbarui

  };

  // Fungsi untuk menangani perubahan checkbox "Pilih Semua Jadwal"
  const handleSelectAllChange = (date) => {
    const updatedData = tableData?.map((item) => {
      item.isChecked = !selectAll // Setel semua checkbox sesuai dengan nilai "Pilih Semua Jadwal"
      return item
    })
    setTableData(updatedData)
    setSelectAll(!selectAll) // Toggle nilai "Pilih Semua Jadwal"

    // Perbarui status checkbox sesuai dengan tanggal yang dipilih
    const updatedDates = selectedDates?.map((d) => {
      if (d.date.toDateString() === date.toDateString()) {
        // Temukan tanggal yang sesuai
        const dateData = updatedData?.map((item) => item.isChecked)
        return { date: d.date, data: dateData }
      }
      return d
    })
    setSelectedDates(updatedDates)
  }

  // Fungsi untuk menangani perubahan tanggal yang dipilih
  const handleDateChange = (date) => {
    // Periksa apakah tanggal sudah ada dalam selectedDates
    if (!selectedDates.some((d) => d.date.toDateString() === date.toDateString())) {
      const updatedSelectedDates = [
        ...selectedDates,
        { date, data: tableData?.map((item) => item.isChecked) },
      ]
      
      setSelectedDates(updatedSelectedDates)
      console.log('tanggaln:', updatedSelectedDates);
    }
    setSelectedDate(date)
    const harihari = getDayName(date)
    urlJadwalKelasGetOne = `http://localhost:3000/jadwal-kelas/${kelas}/${harihari}`;
    // Lakukan apa pun yang Anda butuhkan dengan URL ini, misalnya, permintaan API.
    console.log(urlJadwalKelasGetOne);
    fetch(urlJadwalKelasGetOne)
      .then((response) => response.json())
      .then((data) => {
        console.log('hai', data);
        setJadwalKelasAll(data);
        setJadwalKelas(data.data);
        setMataKuliah(data.mata_kuliah);

      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Fungsi untuk menampilkan atau menyembunyikan jadwal berdasarkan tanggal yang diperluas
  const toggleExpandedDate = (date) => {
    if (expandedDates.includes(date)) {
      // Jika tanggal sudah ada dalam expandedDates, hapus dari array
      const updatedExpandedDates = expandedDates.filter((d) => d !== date)
      setExpandedDates(updatedExpandedDates)
    } else {
      // Jika tanggal belum ada dalam expandedDates, tambahkan ke array
      setExpandedDates([...expandedDates, date])
    }
  }

  const cancelSelectedDate = (date) => {
    const updatedSelectedDates = selectedDates.filter((d) => d.date !== date);
    
    setSelectedDates(updatedSelectedDates);
      if (updatedSelectedDates.length === 1) {
        const harihari = getDayName(updatedSelectedDates[0].date);
        const urlJadwalKelasGetOne = `http://localhost:3000/jadwal-kelas/${kelas}/${harihari}`;
        console.log(urlJadwalKelasGetOne);
        fetch(urlJadwalKelasGetOne)
          .then((response) => response.json())
          .then((data) => {
            setJadwalKelasAll(data);
            setJadwalKelas(data.data);
            setMataKuliah(data.mata_kuliah);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    const updatedCheckboxStatus = { ...checkboxStatus };
    delete updatedCheckboxStatus[date.toDateString()];
    setCheckboxStatus(updatedCheckboxStatus);
  };

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {/* Form elements */}
      <CCol md={1}></CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01" className="table-font">
          Nama
        </CFormLabel>
        <CFormInput type="text" id="validationCustom01" value={nama} placeholder="Ketikkan nama Anda" disabled />
        <CFormFeedback valid>Nama sudah terisi!</CFormFeedback>
        <CFormFeedback invalid>Mohon Nama diisi</CFormFeedback>
      </CCol>
      <CCol md={2}></CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02" className="table-font">
          NIM
        </CFormLabel>
        <CFormInput type="text" id="validationCustom02" placeholder="Ketikkan NIM Anda" value={NIM} disabled />
        <CFormFeedback valid>NIM sudah terisi!</CFormFeedback>
        <CFormFeedback invalid>Mohon NIM diisi</CFormFeedback>
      </CCol>
      <CCol md={1}></CCol>
      <CCol md={1}></CCol>
      <CCol md={1}>
        <CFormLabel htmlFor="validationCustom06" className="table-font margin-tanggal">
          Tanggal pengajuan:
        </CFormLabel>
      </CCol>
      <CCol md={5}>
        <div className="date-picker-container">
          <div className="input-group">
            <DatePicker
              id="validationCustom06"
              selected={selectedDate}
              onChange={(date) => handleDateChange(date)}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()} // Menonaktifkan tanggal sebelum hari ini
              required
              className="form-control margin-tanggal1"
            />
          </div>
        </div>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom04" className="table-font">
          Jenis Surat
        </CFormLabel>
        <CFormSelect
          id="validationCustom04"
          value={jenisIzin}
          onChange={(event) => setJenisIzin(event.target.value)}
          required
        >
          <option value="">Pilih Jenis Surat</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
        </CFormSelect>
        <CFormFeedback valid>Jenis surat sudah dipilih!</CFormFeedback>
        <CFormFeedback invalid>Mohon pilih jenis surat</CFormFeedback>
      </CCol>
      <CCol md={7}>
        {/* <CFormLabel htmlFor="validationCustom04" className="table-font margin-jadwal">
          Pilih Jadwal Absen:
        </CFormLabel> */}
        <table className="table table-bordered custom-table">
          <thead>
            {selectedDates.length < 2 && (
              <>
                <tr>
                  <th>
                    {/* <CFormCheck
                  type="checkbox"
                  id="selectAllCheckbox"
                  checked={selectAll}
                  onChange={() => handleSelectAllChange(selectedDate)}
                /> */}
                  </th>
                  <th>Jam Pelajaran</th>
                  <th>Nama Mata Kuliah</th>
                </tr>
                {jadwalKelas?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <CFormCheck
                          type="checkbox"
                          id={item.id.toString()}
                          checked={checkboxStatus[item.id]}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                      </td>
                      <td><p>{getJamPelajaran(jamPelajaran, item.ID_Jam_Pelajaran_Start)+" - "+ tambahIntervalWaktu(getJamPelajaran(jamPelajaran, item.ID_Jam_Pelajaran_End), 50)}</p></td>
                      <td>{getNamaMatkul(mataKuliah, item.ID_Matkul)}</td>
                    </tr>
                  );
                })}
              </>
            )}
          </thead>
          <tbody>
            {/* {jadwalKelas.data?.map((jadwal) => (
                  <tr key={jadwal.id}>
                    <td>
                      <CFormCheck
                        type="checkbox"
                        id={jadwal.id}
                        checked={jadwal.isChecked}
                        onChange={() => handleCheckboxChange(jadwal.id, selectedDate)}
                      />
                    </td>
                    <td>{jadwal.ID_Jam_Pelajaran_Start} sampai {jadwal.ID_Jam_Pelajaran_End}</td>
                    <td>{jadwal.ID_Matkul}</td>
                  </tr>
                ))} */}
          </tbody>
        </table>
      </CCol>
      <CCol md={4}>
        <div className="mb-5">
          <CFormLabel htmlFor="validationCustom05" className="form-label table-font">
            Alasan
          </CFormLabel>
          <CFormTextarea
            id="validationTextarea"
            placeholder="Ketikkan alasan Anda"
            value={keterangan}
            onChange={(event) => setKeterangan(event.target.value)}
            rows={7}
            required
          >
          </CFormTextarea>
          <CFormFeedback valid>Alasan sudah diisi</CFormFeedback>
          <CFormFeedback invalid>Mohon Alasan diisi</CFormFeedback>
        </div>
      </CCol>
      <CCol md={7} >
        {dayName && selectedDatesExist && (
          <>
            <CFormLabel className="tanggal-dipilih form-label table-font">
              Tanggal yang Dipilih:
            </CFormLabel>
            <ul>
              {selectedDates?.map((date, index) => (
                <div key={index}>
                  <CButton
                    color="info"
                    className="detail-tanggal table-font"
                    onClick={() => toggleExpandedDate(date.date)}
                  >{`Detail: ${getDayName(date.date)}, ${date.date.getDate()} ${date.date.toLocaleString('id-ID', { month: 'long' })} ${date.date.getFullYear()}`}</CButton>
                  <CButton
                    color="danger"
                    className="cancel-tanggal table-font"
                    onClick={() => cancelSelectedDate(date.date)}
                  >Batal</CButton>
                  {/* {expandedDates.includes(date.date) && (
                    <table className="tabel-detail table table-bordered custom-table">
                      <thead>
                        <tr>
                          <th>
                            <CFormCheck
                              type="checkbox"
                              id={`selectAllCheckbox${index}`}
                              checked={selectAll}
                              onChange={() => handleSelectAllChange(date.date)}
                            />
                          </th>
                          <th>Jam Pelajaran</th>
                          <th>Nama Mata Kuliah</th>
                        </tr>
                      </thead>
                      <tbody>
                        {date.data?.map((isChecked, index) => {
                          const item = tableData[index]
                          return (
                            <tr key={item.id}>
                              <td>
                                <CFormCheck
                                  type="checkbox"
                                  id={item.id}
                                  checked={isChecked}
                                  onChange={() => handleCheckboxChange(item.id)}
                                />
                              </td>
                              <td>{item.jamPelajaran}</td>
                              <td>{item.namaMataKuliah}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )} */}
                </div>
              ))}
            </ul>
          </>
        )}
      </CCol>
      <div className="mb-3 custom-input margin-lampiran">
        <CFormLabel htmlFor="validationCustom07" className="table-font">
          Lampiran
        </CFormLabel>
        <CFormInput type="file" id="validationTextarea" aria-label="file example" required onChange={handleFileChange} />
        <CFormFeedback valid>Lampiran sudah terisi!</CFormFeedback>
        <CFormFeedback invalid>Mohon untuk upload lampiran!</CFormFeedback>
      </div>
      <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Saya mengajukan sakit/izin dengan data yang benar"
          required
        />
        <CFormFeedback valid>Pernyataan sudah diceklis!</CFormFeedback>
        <CFormFeedback invalid>Mohon ceklis pernyataan ini!</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit" onClick={createPost}>
          Kirim
        </CButton>
      </CCol>
    </CForm>
  )
}

const Validation = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <strong className="table-font-judul fs-5">Formulir Pengajuan</strong>
            <DocsExample href="forms/validation">
              <CustomCheckboxTable />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation
