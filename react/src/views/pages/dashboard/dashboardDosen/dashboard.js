import React, { useState, useEffect } from 'react';
import '../../../../scss/styleCrud.css';
import { CCard, CCardBody, CCol, CCardHeader, CRow, CButton } from '@coreui/react'
import {CChartLine} from '@coreui/react-chartjs'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom, cilChartPie} from '@coreui/icons';


const dashboardDosen = () => {
    const [jadwalKelasAll, setJadwalKelasAll] = useState([]);
    const [daftarPengajuan, setDaftarPengajuan] = useState([]);
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [jadwalKelas, setJadwalKelas] = useState([]);
    const [mahasiswa, setMahasiswa] = useState([]);
    const [mataKuliah, setMataKuliah] = useState([]);
    const [jamPelajaran, setJamPelajaran] = useState([]);
    const [SakitGenap, setSakitGenap] = useState(0);
    const [IzinGenap, setIzinGenap] = useState(0);
    const [SakitGanjil, setSakitGanjil] = useState(0);
    const [IzinGanjil, setIzinGanjil] = useState(0);
    const [Semester, setSemester] = useState('');
    const [Genap, setSemesterGenap] = useState('');
    const [Ganjil, setSemesterGanjil] = useState('');
    const [JumlahMhs, setMhs] = useState(0);
    const [NamaKelas, setNamaKelas] = useState('');
    const getDayName = (date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayIndex = date.getDay();
        return days[dayIndex];
      };
    const [hari, setHari] = useState(getDayName(new Date()));
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Nama');
    const [sortOrder, setSortOrder] = useState('asc');
    const [id, setIdDosen] = useState(sessionStorage.getItem('idDosen'))
    const urlDosenGetOne = `http://localhost:3000/data-dosen/getdosenclass/${id}`;
    console.log('gatau ini bisa apa ngga', urlDosenGetOne);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const random = () => Math.round(Math.random() * 100);

      useEffect(() => {
        getAllDataDosen();
        getAllPengajuan();
        getAllLeaveRequests();
      }, []);   
      
      
      const getAllLeaveRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/data-pengajuan/pengajuanTrendNew/${id}`);
            console.log('trend aja', response.data);
            console.log('trend izin aja', response.data.dataJumlahIzin);
            console.log('trend sakit aja', response.data.dataJumlahSakit);
            console.log('trend semester aja', response.data.semester);

            // Menampung seluruh jumlah izin semester ganjil
            const IzinGanjil = response.data.dataJumlahIzinGanjil;
            setIzinGanjil(IzinGanjil);
            console.log('Ini bener ga sih izin ganjil??', IzinGanjil);

            // Menampung seluruh jumlah izin semester genap
            const IzinGenap = response.data.dataJumlahIzinGenap;
            setIzinGenap(IzinGenap);
            console.log('Ini bener ga sih izin genap??', IzinGenap);

            // Menampung seluruh jumlah sakit semester ganjil
            const SakitGanjil = response.data.dataJumlahSakitGanjil;
            setSakitGanjil(SakitGanjil);
            console.log('Ini bener ga sih izin ganjil??', SakitGanjil);

            // Menampung seluruh jumlah sakit semester genap
            const SakitGenap = response.data.dataJumlahSakitGenap;
            setSakitGenap(SakitGenap);
            console.log('Ini bener ga sih izin genap??', SakitGenap);

            // Menampung string ganjil/genap
            const semester = response.data.semester;
            // let semesternew = 'Ganjil';
            setSemester(semester);
            console.log('Ini bener ga sih semesteer??', semester);

            // Menampung string bulan Semester Genap
            const bulanGenap = response.data.dataBulanGenap;
            setSemesterGenap(bulanGenap);
            console.log('Ini bener ga sih Semester Genap??', bulanGenap);

            // Menampung string bulan Semester Ganjil
            const bulanGanjil = response.data.dataBulanGanjil;
            setSemesterGanjil(bulanGanjil);
            console.log('Ini bener ga sih Semesteer Ganjil??', bulanGanjil);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }

    
      const getAllDataDosen = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/data-dosen/getdosenclass/${id}`);
            console.log('dosen aja', response.data);
            console.log('mahasiswa aja', response.data.dataMahasiswa);
            console.log('kelas aja', response.data.dataKelas[0].Nama_Kelas);

            // Hitung jumlah mahasiswa
            const totalMahasiswa = response.data.dataMahasiswa.length;
            setMhs(totalMahasiswa);

            // Ambil Nama_Kelas
            const NamaKelas = response.data.dataNamaKelas;
            setNamaKelas(NamaKelas);
            console.log('bener ga nih kelasnya', NamaKelas);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }

      const getAllPengajuan = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/data-pengajuan/pengajuantabel/${id}`);
            console.log('pengajuan aja', response.data);

            // Ambil Pengajuan
            const dataPengajuan = response.data.dataMahasiswaPengajuan;
            setDataPengajuan(dataPengajuan);
            console.log('bener ga nih pengajuannya', dataPengajuan);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }

      const handleSort = (criteria) => {
        if (criteria === sortBy) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
          setSortBy(criteria);
          setSortOrder('asc');
        }
      };
    
      // Function to filter data based on search text
      const filteredData = dataPengajuan.filter((item) =>
        item.Nama.toLowerCase().includes(searchText.toLowerCase())
      );
    
      const sortedData = [...filteredData].sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        
        if (sortBy === 'Nama Mahasiswa') {
          return order * a.Nama.localeCompare(b.Nama);
        } else if (sortBy === 'NIM') {
          return order * (a.NIM - b.NIM);
        } else if (sortBy === 'Jumlah Izin') {
          return order * (a.JumlahIzin - b.JumlahIzin); // Perbandingan berdasarkan angka
        } else if (sortBy === 'Jumlah Sakit') {
          return order * (a.JumlahSakit - b.JumlahSakit); // Perbandingan berdasarkan angka
        }
      });
      
    

      const pageNumbers = Math.ceil(sortedData.length / itemsPerPage);

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    
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
                    <div className='box-blue box-information'></div>
                    <div className='box-white box-information'>
                      <div className="box-text-information">
                            <div className="d-flex justify-content-center flex-column">
                              <div className="text-information text-blue">Jumlah Mahasiswa {NamaKelas && `${NamaKelas}`}</div>
                              <a href="#/dosen/dashboard/daftarMahasiswa">
                                <div className="text-information"> {JumlahMhs} Mahasiswa</div>
                              </a>
                            </div>
                            <div>
                                <CIcon size={'5xl'}  icon={cilChartPie} />
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
                                <div className="text-information text-blue">Jumlah Mahasiswa izin / sakit terbanyak</div>
                                <div className="text-information"> Mahasiswa</div>
                            </div>
                            <div>
                                <CIcon size={'5xl'}  icon={cilChartPie} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-font">
                <h2>Rekap Mahasiswa</h2>
            </div>
            <div>
                <div className="containerTabelRekap">
                <div className="containerTabelRekap box-blue"></div>
                    <div className="containerTabelRekap table-box">
                        <div className="search-input-container">
                            <input
                            type="text"
                            placeholder="Cari..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-input"
                            />
                            <CIcon icon={cilSearch} className="search-icon" />
                        </div>
                        <table className="tabel">
                        <thead>
                            <tr>
                                <th className="header-cell rata table-font">Nomor</th>
                                <th className="header-cell rata table-font">
                                <div onClick={() => handleSort('Nama Mahasiswa')}>
                                    Nama Mahasiswa
                                    <span className="sort-icon">
                                    {sortBy === 'Nama Mahasiswa' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                                    </span>
                                </div>
                                </th>
                                <th className="header-cell rata table-font">
                                <div onClick={() => handleSort('NIM')}>
                                    NIM
                                    <span className="sort-icon">
                                    {sortBy === 'NIM' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                                    </span>
                                </div>
                                </th>
                                <th className="header-cell rata table-font">
                                <div onClick={() => handleSort('Jumlah Izin')}>
                                    Jumlah Izin
                                    <span className="sort-icon">
                                    {sortBy === 'Jumlah Izin' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                                    </span>
                                </div>
                                </th>
                                <th className="header-cell rata table-font">
                                <div onClick={() => handleSort('Jumlah Sakit')}>
                                    Jumlah Sakit
                                    <span className="sort-icon">
                                    {sortBy === 'Jumlah Sakit' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                                    </span>
                                </div>
                                </th>
                            </tr>
                            </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={index}>
                                    <td className="cell rata table-font">{index +1 + (currentPage - 1) * itemsPerPage}</td>
                                    <td className="cell rata table-font">{item.Nama}</td>
                                    <td className="cell rata table-font">{item.NIM}</td>
                                    <td className="cell rata table-font">{item.JumlahIzin}</td>
                                    <td className="cell rata table-font">{item.JumlahSakit}</td>
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
                <div className="containerTabelTrend jarak-container">
                    <div className="containerTabelTrend box-blue"></div>
                      <div className="containerTabelTrend table-box">
                      <CCard className="mb-4 card-grafik">
                        <CCardHeader>Trend Pengajuan Semester {Semester}</CCardHeader>
                        <CCardBody>
                          <CChartLine
                            data={{
                              labels: Semester === 'Ganjil' ? Ganjil : Genap,
                              datasets: [
                                {
                                  label: 'Jumlah Izin',
                                  backgroundColor: 'rgba(220, 220, 220, 0.2)',
                                  borderColor: 'rgba(220, 220, 220, 1)',
                                  pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                                  pointBorderColor: '#fff',
                                  data: Semester === 'Ganjil' ?  IzinGanjil : IzinGenap, // Gunakan data dari setIzin
                                },
                                {
                                  label: 'Jumlah Sakit',
                                  backgroundColor: 'rgba(151, 187, 205, 0.2)',
                                  borderColor: 'rgba(151, 187, 205, 1)',
                                  pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                                  pointBorderColor: '#fff',
                                  data: Semester === 'Ganjil' ?  SakitGanjil : SakitGenap,  // Gunakan data dari setSakit
                                },
                              ],
                            }}
                          />
                        </CCardBody>
                      </CCard>
                      </div>
                </div>
            </div>
        </div>
        </>
    );

};
export default dashboardDosen;