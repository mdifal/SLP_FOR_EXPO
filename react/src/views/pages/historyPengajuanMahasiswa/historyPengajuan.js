import React, { useState, useEffect } from 'react';
import '../../../../src/scss/styleHistoryPengajuanMahasiswa.css';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react';
import { cilInfo, cilTrash, cilPencil, cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons';



const HistoryPengajuanMahasiswa = () => {

    const [daftarPengajuan, setDaftarPengajuan] = useState([]);
    const [dataJadwal, setDataJadwal] = useState([]);
    const [jadwalKelas, setJadwalKelas] = useState([]);
    const [mahasiswa, setMahasiswa] = useState([]);
    const [mataKuliah, setMataKuliah] = useState([]);
    const [jamPelajaran, setJamPelajaran] = useState([]);
    const [id, setIdMahasiswa] = useState(sessionStorage.getItem('idMhs'))
    const urlMahasiswaGetOne = `http://localhost:3000/data-mahasiswa/students/${id}`;
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState('Tanggal');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        getAllLeaveRequests();
    }, []);

    const getAllLeaveRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/data-pengajuan/historyLeave/mahasiswa/${id}`);
            console.log('pengajuan', response.data);
            setDaftarPengajuan(response.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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

    function getJumlahJamIzin(mahasiswa, jadwal, tgl, jenis, keterangan) {
        const response = mahasiswa.filter(item => item.Jenis_Izin === jenis && item.Tanggal_Pengajuan === tgl && item.Keterangan.toLowerCase() === keterangan.toLowerCase());
        let jumlahJP = 0;
        response.forEach(item => {
            jumlahJP += getJamEnd(jadwal, item.ID_Jadwal_Kelas) - getJamStart(jadwal, item.ID_Jadwal_Kelas) + 1;
        });
        return jumlahJP;
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
    const filteredData = daftarPengajuan.filter((item) =>
        item.Jenis.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Tanggal.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.JamPelajaran.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.Status.toLowerCase().includes(searchText.toLowerCase())
    );

    const sortedData = [...filteredData].sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;

        if (sortBy === 'Jenis') {
            return order * a.Jenis.localeCompare(b.Jenis);
        } else if (sortBy === 'Tanggal') {
            return order * a.Tanggal.toString().localeCompare(b.Tanggal.toString());
        } else if (sortBy === 'JP') {
            return order * a.JamPelajaran.localeCompare(b.JamPelajaran);
        } else if (sortBy === 'Status') {
            return order * a.Status.localeCompare(b.Status);
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
                <div>
                    <div className="containerTabel">
                        <div className="containerTabel box-blue">

                        </div>
                        <div className="containerTabel table-box">
                            <div className="d-flex justify-content-between">
                                <div className="table-font">
                                    <h2>History Pengajuan Mahasiswa</h2>
                                </div>
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
                                        <th className="header-cell rata table-font">Nomor</th>
                                        <th className="header-cell rata table-font">
                                            <div onClick={() => handleSort('Jenis')}>
                                                Jenis
                                                <span className="sort-icon">
                                                    {sortBy === 'Jenis' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                                                </span>
                                            </div>
                                        </th>
                                        <th className="header-cell rata table-font">
                                            <div onClick={() => handleSort('Tanggal')}>
                                                Tanggal Pengajuan
                                                <span className="sort-icon">
                                                    {sortBy === 'Tanggal' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                                                </span>
                                            </div>
                                        </th>
                                        <th className="header-cell rata table-font">
                                            <div onClick={() => handleSort('JP')}>
                                                Jumlah Jam Pelajaran
                                                <span className="sort-icon">
                                                    {sortBy === 'JP' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                                                </span>
                                            </div>
                                        </th>
                                        <th className="header-cell rata table-font">
                                            <div onClick={() => handleSort('Status')}>
                                                Status Pengajuan
                                                <span className="sort-icon">
                                                    {sortBy === 'Status' && sortOrder === 'asc' ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />}
                                                </span>
                                            </div>
                                        </th>
                                        <th className="header-cell rata table-font">
                                            <div>
                                                Aksi
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="cell rata table-font">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                            <td className="cell rata table-font">{item.Jenis}</td>
                                            <td className="cell rata table-font">{item.Tanggal}</td>
                                            <td className="cell rata table-font">{item.JamPelajaran} Jam</td>
                                            <td className="cell rata table-font">{item.Status}</td>
                                            <td><CButton href={`/#/mahasiswa/Pengajuan/detail/${item.ID}`} className="margin-button" style={{ color: 'black', backgroundColor: 'transparent' }}>
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
                </div>
            </div>
        </>
    );
};
export default HistoryPengajuanMahasiswa;