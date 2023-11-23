import React, { useState, useEffect } from 'react';
import './tabelDosen.css'; // Import your CSS file
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { CButton } from '@coreui/react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function TabelCRUD() {
  const [data, setData] = useState([]);
  const [dosenWali, setDosenWali] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('Nama');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    getAllDataDosen();
    getAllDataDosenWali();
  }, []);

  const getAllDataDosen = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-dosen');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Mengambil data dari data-dosen-wali
  const getAllDataDosenWali = async () => {
    try {
      const responseDosenWali = await axios.get('http://localhost:3000/data-dosen-wali');
      setDosenWali(responseDosenWali.data.data);
      console.log("data dosen wali:", responseDosenWali.data.data);
    } catch (error) {
      console.error('Error fetching data from data-dosen-wali:', error);
    }
  };

  // Function to delete data
  const hapusData = async (id) => {
      try {
        // Periksa apakah ID dosen ada di tabel data_dosen_wali
        console.log("id dosen ini:", id);
        const dosenWaliTerkait = dosenWali.find((dosen) => dosen.ID_Dosen === id);
        console.log("id dosen ini2:", dosenWaliTerkait);
        if (dosenWaliTerkait) {
          // Jika ditemukan, hapus data dari tabel data_dosen_wali
          const confirmationDosenWali = window.confirm('Anda yakin ingin menghapus data ini dari dosen wali?');
          if (confirmationDosenWali){
            await axios.delete(`http://localhost:3000/data-dosen-wali/delete/${dosenWaliTerkait.id}`);
            try {
              // Cari Kelas yang dipilih oleh dosen tersebut
              const kelas = await axios.get('http://localhost:3000/data-kelas/getallformat');
              const kelasData = kelas.data.data;
              console.log("Data kelas:", kelasData);

              const matchingKelas = kelasData.find(kelas => kelas.ID_Dosen_Wali === id);
              console.log("ini kelas yang cocok:", matchingKelas);
              if (matchingKelas) {
                console.log("Data Dosen dengan id yang cocok:", matchingKelas);
              } else {
                console.log("Data Dosen dengan id tidak ditemukan.");
              }
              console.log("id kelasnya:", matchingKelas.id);
              try {
                await axios.patch(`http://localhost:3000/data-kelas/update/${matchingKelas.id}`, {
                  ID_Dosen_Wali: null,
                });
                console.log("ada isinya ga:", ID_Dosen_Wali);
                console.log("Update berhasil!");
              } catch (error) {
                console.error("Terjadi kesalahan saast melakukan pembaruan:", error);
              }
            } catch (error) {
              console.error("Terjadi kesalahan saat melakukan pembaruan:", error);
            }
          }
        }
        
        const confirmation = window.confirm('Anda yakin ingin menghapus data ini?');
        if (confirmation){
          // Hapus data dari tabel data_dosen
          await axios.delete(`http://localhost:3000/data-dosen/delete/${id}`);
          const newData = data.filter((item) => item.id !== id);
          setData(newData); 
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
  };
  

  const handleSort = (criteria) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  // Function to filter data based on search text
  const filteredData = data.filter((item) =>
    item.Kode_Dosen.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Nama_Dosen.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    if (sortBy === 'Nama') {
      return order * a.Nama_Dosen.localeCompare(b.Nama_Dosen);
    } else if (sortBy === 'ID Dosen') {
      return order * a.InitialID.localeCompare(b.InitialID);
    } else if (sortBy === 'Kode Dosen') {
      return order * a.Kode_Dosen.localeCompare(b.Kode_Dosen);
    } else if (sortBy === 'NIP') {
      return order * a.NIP.localeCompare(b.NIP);
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
  

  const headerSection = (
    <div className="font-title table-font">
      <div>
        <h2>Data Dosen</h2>
      </div>
    </div>
  );

  return (
    <>
      <div className="container">
      {headerSection}
        <div className="containerTabel box-blue"></div>
        <div className="table-box">
        <CButton href={`/#/admin/tambahDosen/`} className="btn-tambah table-font">
            + Tambah Data
          </CButton>
          <CButton href={`/#/admin/TabelImport/`} className="btn-imporEkspor table-font">
            Impor
          </CButton>
          <CButton href={`http://localhost:3000/data-dosen/getAllExport`} className="btn-imporEkspor table-font">
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
          <table className="tabel">
            <thead>
              <tr>
                <th className="header-cell rata table-font">Nomor</th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Kode Dosen')}>
                    Kode Dosen
                    <span className="sort-icon">
                      {sortBy === 'Kode Dosen' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('ID Dosen')}>
                    ID Dosen
                    <span className="sort-icon">
                      {sortBy === 'ID Dosen' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('NIP')}>
                    NIP
                    <span className="sort-icon">
                      {sortBy === 'NIP' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Nama')}>
                    Nama
                    <span className="sort-icon">
                      {sortBy === 'Nama' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id}>
                  <td className="cell rata table-font">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td className="cell rata table-font">{item.Kode_Dosen}</td>
                  <td className="cell rata table-font">{item.InitialID}</td>
                  <td className="cell rata table-font">{item.NIP}</td>
                  <td className="cell rata table-font">{item.Nama_Dosen}</td>
                  <td className="cell aksi">
                    <CButton href={`/#/admin/detailDosen/${item.id}`} className="margin-button" style={{ color: 'black', backgroundColor: 'transparent' }}>
                      <CIcon icon={cilInfo} />
                    </CButton>
                    <CButton href={`/#/admin/editDosen/${item.id}`} style={{ color: 'black', backgroundColor: 'transparent' }}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <button style={{ backgroundColor: 'transparent' }} onClick={() => hapusData(item.id)}>
                      <CIcon icon={cilTrash} />
                    </button>
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
