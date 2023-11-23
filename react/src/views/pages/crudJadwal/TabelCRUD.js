import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css'; // Import DataTables CSS
import $ from 'jquery'; 
import 'datatables.net'; 
import './TabelCRUD.css';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { CButton, CCol, CRow } from '@coreui/react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function TabelCRUD({}) {
  const tableRef = useRef(null);  
  const [idAdmin, setIdAdmin] = useState(sessionStorage.getItem('idAdmin'));

  // penampung data untuk table
  const [dataJadwal, setDataJadwal] = useState([]);

  // memanggil method yang akan mengambil data dari database
  useEffect(() => {
    getAllClassSchedules();
  }, []);


  //method untuk mengambil data dari database
  const getAllClassSchedules = async () => {
    try {
      console.log('ini id admin', idAdmin);
      const response = await axios.get(`http://localhost:3000/jadwal-kelas/tabel/formatted/${idAdmin}`);
      const dataJamPelajaran = response.data.jam_pelajaran; 

      console.log(dataJamPelajaran);

      //mengambil data yang diperlukan untuk menggantikan id
      const dataDosen = response.data.dosen;        
      const dataMatkul = response.data.mata_kuliah;
      const dataKelas = response.data.kelas;

      console.log(dataKelas);
      
      //mengganti data id dengan data asli
      const formattedData = response.data.data.map((item, index) => {
        const JamPelajaran = getJamPelajaran(dataJamPelajaran, item.ID_Jam_Pelajaran_Start)+" - "+ tambahIntervalWaktu(getJamPelajaran(dataJamPelajaran, item.ID_Jam_Pelajaran_End), 50); 
        const namaDosen = getNamaDosen(dataDosen, item.ID_Dosen);
        const namaMatkul = getNamaMatkul(dataMatkul, item.ID_Matkul);
        const namaKelas = getNamaKelas(dataKelas, item.ID_Kelas);

        //mappiing data
        return {
          ...item,
          DT_RowId: `${index + 1}`,
          Jam: JamPelajaran,
          Nama_Dosen: namaDosen,
          Mata_Kuliah: namaMatkul,
          Nama_Kelas: namaKelas
        };
      });

      //memasukkan data yang sudah terformat ke variabel dataJadwal
      setDataJadwal(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function tambahIntervalWaktu(time, intervalMenit) {

    //memisahkan jam, menit, detik
    const [jam, menit, detik] = time.split(':').map(Number);
    
    // mengubah jam mejadi menit
    const totalMenit = (jam * 60) + menit;
    
    // menghitung menit keseluruhannya
    const totalMenitBaru = totalMenit + intervalMenit;
    
    //mengubahnya menjadi jam lagi
    const jamBaru = Math.floor(totalMenitBaru / 60);

    //menghitung sisa menit
    const sisaMenit = totalMenitBaru % 60;
  
    // Format hasil baru sebagai tipe data time (HH:MM:SS)
    const waktuBaru = `${jamBaru.toString().padStart(2, '0')}:${sisaMenit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`;
  
    return waktuBaru;
  }

  function getJamPelajaran (data, id_jam){
    let i = 0;

    //mencari data dalam sekumpulan data
    while (i < data.length){
      if (data[i].id == id_jam){
        return data[i].Waktu_Mulai;
      }
      i++;
    }
    
    return "NULL";
  }

  function getNamaDosen (data, id_dosen){
    let i = 0;
    
    //mencari data dalam sekumpulan data
    while (i < data.length){
      if (data[i].Data_Dosen.id == id_dosen){
        return data[i].Data_Dosen.Nama_Dosen;
      }
      i++;
    }

    return "NULL";
  }

  function getNamaMatkul (data, id_matkul){
    let i = 0;
    
    //mencari data dalam sekumpulan data
    while (i < data.length){
      if (data[i].Data_Mata_Kuliah.id == id_matkul){
        return data[i].Data_Mata_Kuliah.Nama_Mata_Kuliah;
      }
      i++;
    }

    return "NULL";
  }

  function getNamaKelas (data, id_kelas){
    let i = 0;
    
    //mencari data dalam sekumpulan data
    while (i < data.length){
      if (data[i].id == id_kelas){

        // Mendapatkan tahun sekarang
        const currentYear = new Date().getFullYear(); 
        
        // mendapatkan bulan sekarang untuk menentukan tingkat mahasiswa
        const currentMonth = new Date().getMonth();

        let angkaKelas = 0;

        if (currentMonth > 6) {
          //kalau akhir tahun berarti tambah satu
          angkaKelas = currentYear - data[i].Tahun_Ajaran + 1;
        } else {
          //kalau akhir tahun sesuai
          angkaKelas = currentYear - data[i].Tahun_Ajaran;
        }

        const tingkat = angkaKelas.toString();

        //formating data biar jadi contoh 2A-D3
        const kelasFormatted = tingkat + data[i].Nama_Kelas[0] + "-" + data[i].Nama_Kelas.slice(1);

        return kelasFormatted;
      }
      i++;
    }
    return "NULL";
  }
  
  useEffect(() => {
    // Mengatur opsi bahasa DataTables
    $.extend($.fn.dataTable.defaults, {
      language: {
        paginate: {
          previous: '<', // Mengubah "Previous" menjadi tanda "<"
          next: '>', // Mengubah "Next" menjadi tanda ">"
        },
      },
    });
  }, [dataJadwal]);

  const [sortBy, setSortBy] = useState('Nomor');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (criteria) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  // Function to filter data based on search text
  const filteredData = dataJadwal.filter((item) =>
    item.Hari_Jadwal.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Nama_Dosen.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Mata_Kuliah.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Nama_Kelas.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Jam.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    if (sortBy === 'Mata Kuliah') {
      return order * a.Mata_Kuliah.localeCompare(b.Mata_Kuliah);
    } else if (sortBy === 'Hari Jadwal') {
      return order * a.Hari_Jadwal.localeCompare(b.Hari_Jadwal);
    } else if (sortBy === 'Jam') {
      return order * a.Jam.localeCompare(b.Jam);
    } if (sortBy === 'Kelas') {
      return order * a.Nama_Kelas.localeCompare(b.Nama_Kelas);
    }    
  });

  // Calculate the number of pages
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

  // Function to delete data
  const hapusData = async (id) => {
    const confirmation = window.confirm('Anda yakin ingin menghapus data ini?');

    if (confirmation) {
      try {
        //mengirim data yang akan dihapus
        await axios.delete(`http://localhost:3000/jadwal-kelas/delete/${id}`);

        const newData = dataJadwal.filter((item) => item.id !== id);

        //memperbarui dataJadwal
        setDataJadwal(newData);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  // JSX for the header section
  const headerSection = (
    <div className="font-title table-font">
      <div>
        <h2>Data Jadwal Mata Kuliah</h2>
      </div>
    </div>
  );

  const exportToExcel = () => {
    try {
      if(dataJadwal){
        //formating data
        const dataToExport = dataJadwal.map(item => ({
          No: item.DT_RowId,
          Hari: item.Hari_Jadwal,
          Jam: item.Jam,
          Mata_Kuliah: item.Mata_Kuliah,
          Nama_Dosen: item.Nama_Dosen,
          Kelas: item.Nama_Kelas,
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);

        //mengatur lebar kolom dispreadsheet yang akan didownload
        const columnWidths = [
          { wch: 3},    // Lebar kolom pertama (No) 3 karakter
          { wch: 10 },  // Lebar kolom kedua (Hari) 10 karakter
          { wch: 20 },   // Lebar kolom ketiga (Jam) 20 karakter
          { wch: 35 },  // Lebar kolom keempat (Mata_Kuliah) 20 karakter
          { wch: 30 },  // Lebar kolom kelima (Nama_Dosen) 20 karakter
          { wch: 7},    // Lebar kolom keenam (Kelas) 7 karakter
        ];
        
        // Menambahkan pengaturan lebar kolom ke sheet
        ws['!cols'] = columnWidths;

        const wb = XLSX.utils.book_new();

        // Nama sheet dalam file Excel
        XLSX.utils.book_append_sheet(wb, ws, 'DataJadwal');

        // Simpan file Excel dengan nama tertentu (misalnya: data-jadwal.xlsx)
        XLSX.writeFile(wb, 'data-jadwal.xlsx');
      }
    } catch (error){
      console.error('Error ekspor data:', error);
    }
  };


  // JSX untuk bagian isian tabel
  return (
    <>
    <div className="container">
        {headerSection}
        <div className="containerTabel box-blue"></div>
        <div className="table-box">
          <div className="top-table">
            <CButton href={`/#/admin/tambahJadwal`} className="btn-tambah table-font">
              + Tambah Data
            </CButton>                     
            <CButton href={`/#/admin/ImporTabel`} className="btn-imporEkspor table-font">
              Impor
            </CButton>
            <CButton onClick={exportToExcel} className="btn-imporEkspor table-font">
              Ekspor
            </CButton>
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
          </div>
          <table className="tabel">
            <thead>
              <tr>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Hari Jadwal')}>
                    Hari
                    <span className="sort-icon">
                      {sortBy === 'Hari Jadwal' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Jam')}>
                    Jam
                    <span className="sort-icon">
                      {sortBy === 'Jam' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Mata Kuliah')}>
                    Mata Kuliah
                    <span className="sort-icon">
                      {sortBy === 'Mata Kuliah' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Kelas')}>
                    Kelas
                    <span className="sort-icon">
                      {sortBy === 'Kelas' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">Aksi</th>
              </tr>
            </thead>
            <tbody>
            {currentData.map((item, index) => (
            <tr key={index}>
              <td className="cell rata table-font">{item.Hari_Jadwal}</td>
              <td className="cell rata table-font">{item.Jam}</td>
              <td className="cell rata table-font">{item.Mata_Kuliah}</td>
              <td className="cell rata table-font">{item.Nama_Kelas}</td>
              <td className="cell aksi">
                <CButton href={`/#/admin/detailJadwal/${item.id}`} style={{ backgroundColor: 'transparent', color: 'black' }}>
                  <CIcon icon={cilInfo} />
                </CButton>                
                <CButton href={`/#/admin/editJadwal/${item.id}`} style={{ backgroundColor: 'transparent', color: 'black' }} >
                    <CIcon icon={cilPencil} />
                </CButton>
                <CButton onClick={() => hapusData(item.id)} style={{ backgroundColor: 'transparent', color: 'black' }}>
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
    </>
  );
}

export default TabelCRUD;
