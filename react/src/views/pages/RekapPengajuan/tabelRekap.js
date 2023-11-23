import React, { useState, useEffect } from 'react';
import './tabelMahasiswa.css'; // Import your CSS file
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { CButton } from '@coreui/react';
import axios from "axios";
import Modal from 'react-modal';
import * as XLSX from 'xlsx';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
function TabelRekap() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('Nama');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    getRekapPengajuan();
  }, []);

  const getRekapPengajuan = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data-pengajuan/mahasiswa/rekap/pengajuan/');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const sortedData = [...data].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    // Convert NIM to string for proper sorting
    const nimA = String(a.NIM);
    const nimB = String(b.NIM);

    if (a.Nama !== null && b.Nama !== null) {
      if (sortBy === 'NIM') {
        return order * nimA.localeCompare(nimB);
      } else if (sortBy === 'Nama') {
        return order * a.Nama.localeCompare(b.Nama);
      }

     else if (sortBy === 'Jumlah_Izin') {
      return order * (a.TotalIzin - b.TotalIzin);
    } else if (sortBy === 'Jumlah_Sakit') {
      return order * (a.TotalSakit - b.TotalSakit);
    }
  }
  });

  // JSX for the header section
  const headerSection = (
    <div className="font-title table-font">
      <div>
        <h2>Data Mahasiswa</h2>
      </div>
    </div>
  );

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

  const exportToExcel = () => {
    try {
      if (data && data.length > 0) {
        // Formatting data
        const dataToExport = data.map((item, index) => ({
          No: index + 1 + (currentPage - 1) * itemsPerPage,
          NIM: item.NIM,
          Nama: item.Nama,
          Jumlah_Izin: item.TotalIzin,
          Jumlah_Sakit: item.TotalSakit,
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(dataToExport);

        // Set column widths
        const columnWidths = [
          { wch: 3 },
          { wch: 10 },
          { wch: 35 },
          { wch: 20 },
          { wch: 20 },
        ];

        ws['!cols'] = columnWidths;

        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DataPengajuan');

        // Save the Excel file with a specific name
        XLSX.writeFile(wb, 'data-pengajuan.xlsx');
      } else {
        console.warn('No data to export.');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };


  return (
    <>
      <div className="container">
      {headerSection}
        <div className="containerTabel box-blue"></div>
        <div className="table-box">

          <CButton onClick={exportToExcel} className="btn-eksport table-font">
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
                  <div onClick={() => handleSort('NIM')}>
                    NIM
                    <span className="sort-icon">
                      {sortBy === 'NIM' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>
                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Nama')}>
                    Nama Lengkap
                    <span className="sort-icon">
                      {sortBy === 'Nama' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>

                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Jumlah_Izin')}>
                    Izin
                    <span className="sort-icon">
                      {sortBy === 'Jumlah_Izin' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                    </span>
                  </div>
                </th>

                <th className="header-cell rata table-font">
                  <div onClick={() => handleSort('Jumlah_Sakit')}>
                    Sakit
                    <span className="sort-icon">
                      {sortBy === 'Jumlah_Sakit' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
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
                  <td className="cell rata table-font">{item.NIM}</td>
                  <td className="cell rata table-font">{item.Nama}</td>
                  <td className="cell rata table-font">{item.TotalIzin}</td>
                  <td className="cell rata table-font">{item.TotalSakit}</td>


                  <td className="cell aksi">
                    <CButton href={`/#/admin/rekap/detail/${item.ID_Mahasiswa}`} className="margin-button" style={{ color: 'black', backgroundColor: 'transparent' }}>
                      <CIcon icon={cilInfo} />
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

export default TabelRekap;
