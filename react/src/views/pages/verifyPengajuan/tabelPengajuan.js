import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; 
import 'datatables.net'; 
import './tabelPengajuan.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { CButton } from '@coreui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TabelPengajuan() {
  const tableRef = useRef(null);  
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getAllLeaveRequests();
  }, []);

  const getAllLeaveRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-pengajuan');
      console.log(response.data);
      setData(response.data);
      if (response.status === 200) {
        console.log('Data yang telah diambil dari server:');
        console.log(data);
      } else {
        console.error('Gagal mengambil data pengajuan');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // function tambahIntervalWaktu(time, intervalMenit) {
  //   const [jam, menit, detik] = time.split(':').map(Number);
  
  //   const totalMenit = (jam * 60) + menit;
  
  //   const totalMenitBaru = totalMenit + intervalMenit;
  
  //   const jamBaru = Math.floor(totalMenitBaru / 60);
  //   const sisaMenit = totalMenitBaru % 60;
  
  //   // Format hasil baru sebagai tipe data time (HH:MM:SS)
  //   const waktuBaru = `${jamBaru.toString().padStart(2, '0')}:${sisaMenit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
  
  //   return waktuBaru;
  // }

  // function getNIM (data, id){
  //   let i = 0;
  //   while (i < data.length){
  //     if (data[i].id == id){
  //       return data[i].id;
  //     }
  //     i++;
  //   }
  //   return "NULL";
  // } 

  // function getJamPelajaran (data, id_jam){
  //   let i = 0;
  //   while (i < data.length){
  //     if (data[i].id == id_jam){
  //       return data[i].Waktu_Mulai;
  //     }
  //     i++;
  //   }
  //   return "NULL";
  // }

  // function getNamaDosen (data, id_dosen){
  //   let i = 0;
  //   while (i < data.length){
  //     if (data[i].Data_Dosen.id == id_dosen){
  //       return data[i].Data_Dosen.Nama_Dosen;
  //     }
  //     i++;
  //   }
  //   return "NULL";
  // }

  // function getNamaMatkul (data, id_matkul){
  //   let i = 0;
  //   while (i < data.length){
  //     if (data[i].Data_Mata_Kuliah.id == id_matkul){
  //       return data[i].Data_Mata_Kuliah.Nama_Mata_Kuliah;
  //     }
  //     i++;
  //   }
  //   return "NULL";
  // }

  // function getNamaKelas (data, id_kelas){
  //   let i = 0;
  //   while (i < data.length){
  //     if (data[i].id == id_kelas){
  //       return data[i].Nama_Kelas;
  //     }
  //     i++;
  //   }
  //   return "NULL";
  // }
  
  // useEffect(() => {
  //   // Mengatur opsi bahasa DataTables
  //   $.extend($.fn.dataTable.defaults, {
  //     language: {
  //       paginate: {
  //         previous: '<', // Mengubah "Previous" menjadi tanda "<"
  //         next: '>', // Mengubah "Next" menjadi tanda ">"
  //       },
  //     },
  //   });
  // }, [data]);

  const [form, setForm] = useState({}); // Form data
  const [detailItem, setDetailItem] = useState(null); // To display details
  const [editIndex, setEditIndex] = useState(-1); // Index of the data being edited
  const [sortBy, setSortBy] = useState('Nomor');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // const handleSort = (criteria) => {
  //   if (criteria === sortBy) {
  //     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortBy(criteria);
  //     setSortOrder('asc');
  //   }
  // };

  // // Function to filter data based on search text
  // const filteredData = data.filter((item) =>
  //   item.Hari_Jadwal.toLowerCase().includes(searchText.toLowerCase()) ||
  //   item.Nama_Dosen.toLowerCase().includes(searchText.toLowerCase()) ||
  //   item.Mata_Kuliah.toLowerCase().includes(searchText.toLowerCase())
  // );

  // const sortedData = [...filteredData].sort((a, b) => {
  //   const order = sortOrder === 'asc' ? 1 : -1;

  //   if (sortBy === 'Mata Kuliah') {
  //     return order * a.Mata_Kuliah.localeCompare(b.Mata_Kuliah);
  //   } else if (sortBy === 'Hari Jadwal') {
  //     return order * a.Hari_Jadwal.localeCompare(b.Hari_Jadwal);
  //   } else if (sortBy === 'Nama Dosen') {
  //     return order * a.Nama_Dosen.localeCompare(b.Nama_Dosen);
  //   } else if (sortBy === 'Jam') {
  //     return order * a.Jam.localeCompare(b.Jam);
  //   } else if (sortBy === 'Kelas') {
  //     return order * a.ID_Kelas.localeCompare(b.ID_Kelas);
  //   }
  // });

  // // Calculate the number of pages
  // const pageNumbers = Math.ceil(sortedData.length / itemsPerPage);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // const handleNextPage = () => {
  //   if (currentPage < pageNumbers) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // // Function to delete data
  // const hapusData = async (id) => {
  //   const confirmation = window.confirm('Anda yakin ingin menghapus data ini?');

  //   if (confirmation) {
  //     try {
  //       await axios.delete(`http://localhost:3000/jadwal-kelas/delete/${id}`);
  //       const newData = data.filter((item) => item.id !== id);
  //       setdata(newData);
  //     } catch (error) {
  //       console.error('Error deleting data:', error);
  //     }
  //   }
  // };

  // JSX for the header section
  const headerSection = (
    <div className="font-header table-font">
      <div>
        <h2>Data Jadwal Mata Kuliah</h2>
      </div>
    </div>
  );


  // JSX untuk bagian isian tabel
  return (
    <>
      <div className="container">
        <div className="table-box">
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
                  <div onClick={() => handleSort('NIM')}>
                    NIM
                    <span className="sort-icon">
                      {sortBy === 'NIM' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Nama Lengkap')}>
                    Nama Lengkap
                    <span className="sort-icon">
                      {sortBy === 'Nama Lengkap' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Keterangan')}>
                    Keterangan
                    <span className="sort-icon">
                      {sortBy === 'Keterangan' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Jenis Izin')}>
                    Jenis Izin
                    <span className="sort-icon">
                      {sortBy === 'Jenis Izin' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Tanggal Pengajuan')}>
                    Tanggal Pengajuan
                    <span className="sort-icon">
                      {sortBy === 'Tanggal Pengajuan' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Tanggal Izin')}>
                    Tanggal Izin
                    <span className="sort-icon">
                      {sortBy === 'Tanggal Izin' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Jam Izin')}>
                    Jam Izin
                    <span className="sort-icon">
                      {sortBy === 'Jam Izin' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('File Pengajuan')}>
                    File Pengajuan
                    <span className="sort-icon">
                      {sortBy === 'File Pengajuan' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Status Pengajuan')}>
                    Status Pengajuan
                    <span className="sort-icon">
                      {sortBy === 'Status Pengajuan' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">Aksi</th>
              </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
            <tr key={index}>
              <td className="cell rata table-font">{index + 1}</td>
              <td className="cell rata table-font">{item.ID_Mahasiswa}</td>
              <td className="cell rata table-font">{item.ID_Mahasiswa}</td>
              <td className="cell rata table-font">{item.Keterangan}</td>
              <td className="cell rata table-font">{item.Jenis_Izin}</td>
              <td className="cell rata table-font">{item.Tanggal_Pengajuan}</td>
              <td className="cell rata table-font">{item.Tanggal_Izin}</td>
              <td className="cell rata table-font">{item.ID_Jadwal_Kelas}</td>
              <td className="cell rata table-font">{item.File_Pengajuan}</td>
              <td className="cell rata table-font">{item.Status_Pengajuan}</td>
              <td className="cell aksi">
                <CButton href={`/#/dosen/verifyPengajuan/${item.id}`} style={{ backgroundColor: 'transparent', color: 'black' }}>
                  <CIcon icon={cilInfo} />
                </CButton>                
                <CButton href={``} style={{ backgroundColor: 'transparent', color: 'black' }} >
                    <CIcon icon={cilPencil} />
                </CButton>
                <CButton onClick={''} style={{ backgroundColor: 'transparent', color: 'black' }}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </td>
            </tr>
          ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="btn-pagination"
              // onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            {/* {Array.from({ length: pageNumbers }, (_, i) => {
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
            })} */}

            <button
              className="btn-pagination"
              // onClick={handleNextPage}
              // disabled={currentPage === pageNumbers}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabelPengajuan;
