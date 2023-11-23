import React, { useState, useEffect } from 'react';
import './tabelMahasiswa.css'; // Import your CSS file
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { CButton, CFormInput } from '@coreui/react';
import axios from "axios";
import FormData from 'form-data';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999, // Adjust this value as needed
  },
  overlay: {
    zIndex: 9998, // Adjust this value as needed
  },
};
function TabelCRUD() {


  const [idAdmin, setIdAdmin] = useState(sessionStorage.getItem('idAdmin'));

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
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getAllDataDosen();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('xlsx', selectedFile);

    try {
      // Kirim formData dengan file ke endpoint yang sesuai

      axios.post('http://localhost:3000/data-mahasiswa/import', formData)
      .then((response) => {
        console.log('File uploaded successfully:', response.data);
        closeModal(); // Tutup modal setelah upload berhasil
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });

      console.log('File uploaded successfully:', response.data);
      closeModal(); // Tutup modal setelah upload berhasil
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const getAllDataDosen = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/data-mahasiswa/students/all/${idAdmin}`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to delete data
  const hapusData = async (id) => {
    const confirmation = window.confirm('Anda yakin ingin menghapus data ini?');

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:3000/data-dosen/delete/${id}`);
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
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

    if (sortBy === 'Nama') {
      return order * a.Nama.localeCompare(b.Nama);
    } else if (sortBy === 'NIM ') {
      return order * a.NIM.localeCompare(b.NIM);;
    } else if (sortBy === 'ID_Kelas') {
      return order * a.Kelas.localeCompare(b.Kelas);
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

  const ExportData = () => {
    axios({
      url: 'http://localhost:3000/data-mahasiswa/export',
      method: 'GET',
      responseType: 'blob', // Menentukan tipe respons sebagai blob
    })
      .then((response) => {
        // Membuat objek URL dari blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // Membuat link untuk mengunduh file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data_mahasiswa.xlsx');
        // Simulasikan klik link
        link.click();
      })
      .catch((error) => {
        console.error('Error exporting data:', error);
      });
  };

  return (
    <>
      <div className="container">
      {headerSection}
        <div className="containerTabel box-blue"></div>
        <div className="table-box">
          <CButton href={`/#/admin/mahasiswa/tambah/`} className="btn-tambah table-font">
            + Tambah Data
          </CButton>
          <CButton onClick={ExportData} className="btn-tambah table-font">
            Export
          </CButton>
          <CButton onClick={openModal} className="btn-tambah table-font">
            Import
          </CButton>
          <Modal
  isOpen={modalIsOpen}
  onAfterOpen={afterOpenModal}
  onRequestClose={closeModal}
  style={customStyles}
  contentLabel="Example Modal"
>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Import Data</h2>
    <button onClick={closeModal} style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '1.5rem' }}>×</button>
  </div>
  <div>
    <form encType="multipart/form-data" method="post">
      <label htmlFor="fileInput">Pilih file:</label>
      <CFormInput type="file" id="fileInput" name="file" onChange={handleFileUpload} />
      <br></br>
      <CButton style={{width:'50%', backgroundColor: '#3C9A62'}}>Format</CButton>
      <br></br><br></br>
      <CButton type="submit" style={{width:'100%'}} onClick={handleSubmit}>Upload</CButton>
    </form>
  </div>
</Modal>
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
                  <div onClick={() => handleSort('ID_Kelas')}>
                    Kelas
                    <span className="sort-icon">
                      {sortBy === 'ID_Kelas' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
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
                  <td className="cell rata table-font">{item.Kelas.Nama_Kelas}</td>

                  <td className="cell aksi">
                    <CButton href={`/#/admin/mahasiswa/detail/${item.id}`} className="margin-button" style={{ color: 'black', backgroundColor: 'transparent' }}>
                      <CIcon icon={cilInfo} />
                    </CButton>
                    <CButton href={`/#/admin/mahasiswa/edit/${item.id}`} style={{ color: 'black', backgroundColor: 'transparent' }}>
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
