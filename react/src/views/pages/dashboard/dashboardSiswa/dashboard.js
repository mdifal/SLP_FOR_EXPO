import React, { useState, useEffect } from 'react';
import '../../../../scss/styleCrud.css';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom, cilChartPie } from '@coreui/icons';


const dashboardMahasiswa = () => {
  const [jadwalKelasAll, setJadwalKelasAll] = useState([]);
  const [daftarPengajuan, setDaftarPengajuan] = useState([]);
  const [dataJadwal, setDataJadwal] = useState([]);
  const [jadwalKelas, setJadwalKelas] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);
  const [jamPelajaran, setJamPelajaran] = useState([]);
  const [Sakit, setSakit] = useState(0);
  const [Izin, setIzin] = useState(0);
  const getDayName = (date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayIndex = date.getDay();
    return days[dayIndex];
  };
  const [hari, setHari] = useState(getDayName(new Date()));
  const [id, setIdMahasiswa] = useState(sessionStorage.getItem('idMhs'))
  const urlMahasiswaGetOne = `http://localhost:3000/data-mahasiswa/students/${id}`;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    getAllLeaveRequests();
    getAllClassHours();
    getAllScheduleToday();
  }, []);

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

  function getJamPelajaran(data, id_jam) {
    let i = 0;
    while (i < data.length) {
      if (data[i].id == id_jam) {
        return data[i].Waktu_Mulai;
      }
      i++;
    }
    return "NULL";
  }

  function getNamaDosen(data, id_dosen) {
    let i = 0;
    while (i < data.length) {
      if (data[i].Data_Dosen.id == id_dosen) {
        return data[i].Data_Dosen.Nama_Dosen;
      }
      i++;
    }
    return "NULL";
  }

  function getNamaMatkul(data, id_matkul) {
    let i = 0;
    while (i < data.length) {
      if (data[i].Data_Mata_Kuliah.id == id_matkul) {
        return data[i].Data_Mata_Kuliah.Nama_Mata_Kuliah;
      }
      i++;
    }
    return "NULL";
  }

  function getJamStart(data, id_jadwal) {
    let i = 0;
    while (i < data.length) {
      if (data[i].id == id_jadwal) {
        return data[i].ID_Jam_Pelajaran_Start;
      }
      i++;
    }
    return "NULL";
  }

  function getJamEnd(data, id_jadwal) {
    let i = 0;
    while (i < data.length) {
      if (data[i].id == id_jadwal) {
        return data[i].ID_Jam_Pelajaran_End;
      }
      i++;
    }
    return "NULL";
  }

  const getAllScheduleToday = async () => {
    try {
      const mahasiswa = await axios.get(urlMahasiswaGetOne);
      const response = await axios.get(`http://localhost:3000/jadwal-kelas/${mahasiswa.data.data.ID_Kelas}/${hari}`);
      console.log('ini jadwal', response.data);
      const dataMatkul = response.data.mata_kuliah;
      const dataJamPelajaran = response.data.jam_pelajaran;
      const dataDosen = response.data.dosen;
      const formattedData = response.data.data.map((item, index) => {
        const JamPelajaran = getJamPelajaran(dataJamPelajaran, item.ID_Jam_Pelajaran_Start) + " - " + tambahIntervalWaktu(getJamPelajaran(dataJamPelajaran, item.ID_Jam_Pelajaran_End), 50);
        const namaDosen = getNamaDosen(dataDosen, item.ID_Dosen);
        const namaMatkul = getNamaMatkul(dataMatkul, item.ID_Matkul);
        return {
          ...item,
          DT_RowId: `${index + 1}`,
          Jam: JamPelajaran,
          Nama_Dosen: namaDosen,
          Mata_Kuliah: namaMatkul,
        };
      });
      setDataJadwal(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getAllLeaveRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/data-pengajuan/leave/mahasiswa/${id}`);
      setSakit(response.data.data.Sakit);
      setIzin(response.data.data.Izin);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getAllClassHours = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-jam-pelajaran');
      setJamPelajaran(response.data.data);
      console.log('hoii', response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const pageNumbers = Math.ceil(dataJadwal.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataJadwal.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className='container'>
        <div className="grid-container">
          <div className="box-information">
            <div className='box-blue box-information'>
            </div>
            <div className='box-white box-information'>
              <div className="box-text-information">
                <div className="d-flex justify-content-center flex-column">
                  <div className="text-information text-blue">Jumlah Izin</div>
                  <div className="text-information">{Izin} Jam Pelajaran</div>
                </div>
                <div>
                  <CIcon size={'3xl'} icon={cilChartPie} />
                </div>
              </div>
            </div>
          </div>
          <div className="box-information">
            <div className='box-blue box-information'>
            </div>
            <div className='box-white box-information'>
              <div className="box-text-information">
                <div className="d-flex justify-content-center flex-column">
                  <div className="text-information text-blue">Jumlah sakit</div>
                  <div className="text-information">{Sakit} Jam Pelajaran</div>
                </div>
                <div>
                  <CIcon size={'3xl'} icon={cilChartPie} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-font">
          <h2>Jadwal Kuliah Hari Ini</h2>
        </div>
        <div>
          <div className="containerTabel">
            <div className="containerTabel box-blue">

            </div>
            <div className="containerTabel table-box">
              <table className="tabel">
                <thead>
                  <tr>
                    <th className="header-cell rata table-font">Nomor</th>
                    <th className="header-cell rata table-font">
                      <div>
                        Mata Kuliah
                      </div>
                    </th>
                    <th className="header-cell rata table-font">
                      <div>
                        Waktu
                      </div>
                    </th>
                    <th className="header-cell rata table-font">
                      <div>
                        Dosen
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr key={index}>
                      <td className="cell rata table-font">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td className="cell rata table-font">{item.Mata_Kuliah}</td>
                      <td className="cell rata table-font">{item.Jam}</td>
                      <td className="cell rata table-font">{item.Nama_Dosen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  className="btn-pagination"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  {'<'}
                </button>
                {Array.from({ length: pageNumbers }, (_, i) => {
                  const pageNumber = i + 1;
                  const isActive = pageNumber === currentPage;

                  return (
                    <button
                      key={i}
                      className={`btn-pagination ${isActive ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  className="btn-pagination"
                  onClick={handleNextPage}
                  disabled={currentPage === pageNumbers}
                >
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};
export default dashboardMahasiswa;