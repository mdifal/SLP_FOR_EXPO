import React, { useState, useEffect } from 'react';
import './daftarMahasiswa.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CIcon from '@coreui/icons-react';
import {
  cilInfo,
  cilTrash,
  cilPencil,
  cilSearch,
  cilArrowTop,
  cilArrowBottom,
  cilChartPie,
} from '@coreui/icons';

const DaftarMahasiswa = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('Nama');
  const [sortOrder, setSortOrder] = useState('asc');
  const [id, setIdDosen] = useState(sessionStorage.getItem('idDosen'));
  const urlDosenGetOne = `http://localhost:3000/data-dosen/getdosenclass/${id}`;
  console.log('dosen yang masuk:', urlDosenGetOne);
  const [DataMhs, setMhs] = useState([]);

  useEffect(() => {
    getAllDataDosen();
  }, []);

  const getAllDataDosen = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/data-dosen/getdosenclass/${id}`
      );
      console.log('dosen aja', response.data);
      console.log('mahasiswa aja', response.data.dataMahasiswa);

      // Data mahasiswa
      const dataMahasiswa = response.data.dataMahasiswa;
      setMhs(dataMahasiswa);
      console.log('isi data mahasiswa:', dataMahasiswa);
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

  // Kode yang mengurutkan data berdasarkan kriteria tertentu
  const sortedData = [...DataMhs].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
  
    if (sortBy === 'Nama') {
      return order * (String(a.Nama) || '').localeCompare(String(b.Nama) || '');
    } else if (sortBy === 'NIM') {
      return order * (String(a.NIM) || '').localeCompare(String(b.NIM) || '');
    } else if (sortBy === 'No_Telepon') {
      return order * (String(a.Nomor_Telp) || '').localeCompare(String(b.Nomor_Telp) || '');
    } else if (sortBy === 'Email') {
      return order * (String(a.Email) || '').localeCompare(String(b.Email) || '');
    } else if (sortBy === 'Ortu') {
      return order * (String(a.Nama_Ortu) || '').localeCompare(String(b.Nama_Ortu) || '');
    } else if (sortBy === 'No_Ortu') {
      return order * (String(a.Nomor_Telp_Ortu) || '').localeCompare(String(b.Nomor_Telp_Ortu) || '');
    }
  });

  // JSX untuk bagian header
  const headerSection = (
    <div className="font-title table-font">
      <div>
        <h2>Daftar Mahasiswa</h2>
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

  return (
    <div className="container">
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
                  {sortBy === 'NIM' && sortOrder === 'asc' ? (
                    <CIcon icon={cilArrowTop} />
                  ) : (
                    <CIcon icon={cilArrowBottom} />
                  )}
                </span>
              </div>
            </th>
            <th className="header-cell rata table-font">
              <div onClick={() => handleSort('Nama')}>
                Nama Lengkap
                <span className="sort-icon">
                  {sortBy === 'Nama' && sortOrder === 'asc' ? (
                    <CIcon icon={cilArrowTop} />
                  ) : (
                    <CIcon icon={cilArrowBottom} />
                  )}
                </span>
              </div>
            </th>
            <th className="header-cell rata table-font">
              <div onClick={() => handleSort('No_Telepon')}>
                Nomor Telepon
                <span className="sort-icon">
                  {sortBy === 'No_Telepon' && sortOrder === 'asc' ? (
                    <CIcon icon={cilArrowTop} />
                  ) : (
                    <CIcon icon={cilArrowBottom} />
                  )}
                </span>
              </div>
            </th>
            <th className="header-cell rata table-font">
              <div onClick={() => handleSort('Email')}>
                Email
                <span className="sort-icon">
                  {sortBy === 'email' && sortOrder === 'asc' ? (
                    <CIcon icon={cilArrowTop} />
                  ) : (
                    <CIcon icon={cilArrowBottom} />
                  )}
                </span>
              </div>
            </th>
            <th className="header-cell rata table-font">
              <div onClick={() => handleSort('Ortu')}>
                Nama Orang Tua
                <span className="sort-icon">
                  {sortBy === 'Ortu' && sortOrder === 'asc' ? (
                    <CIcon icon={cilArrowTop} />
                  ) : (
                    <CIcon icon={cilArrowBottom} />
                  )}
                </span>
              </div>
            </th>
            <th className="header-cell rata table-font">
              <div onClick={() => handleSort('No_Ortu')}>
                Nomor Telepon Orang Tua
                <span className="sort-icon">
                  {sortBy === 'No_Ortu' && sortOrder === 'asc' ? (
                    <CIcon icon={cilArrowTop} />
                  ) : (
                    <CIcon icon={cilArrowBottom} />
                  )}
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id}>
              <td className="cell rata table-font">
                {index + 1 + (currentPage - 1) * itemsPerPage}
              </td>
              <td className="cell rata table-font">{item.NIM}</td>
              <td className="cell rata table-font">{item.Nama}</td>
              <td className="cell rata table-font">{item.Nomor_Telp}</td>
              <td className="cell rata table-font">{item.Email}</td>
              <td className="cell rata table-font">{item.Nama_Ortu}</td>
              <td className="cell rata table-font">{item.Nomor_Telp_Ortu}</td>
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
  );
};

export default DaftarMahasiswa;
