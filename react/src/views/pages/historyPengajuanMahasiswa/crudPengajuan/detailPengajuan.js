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
import '../../../../scss/styleHistoryPengajuanMahasiswa.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
const DetailPengajuanMahasiswa = () => {
    const baseURL = "http://localhost:3000/data-pengajuan/";

    let urlJadwalKelasGetOne = "";
    const { key } = useParams();
    const [dataPengajuan, setPengajuan] = useState([]);
    const [AllPengajuan, setAllPengajuan] = useState([]);
    const jenis = ['Izin', 'Sakit'];
    const [jadwalKelas, setJadwalKelas] = useState([]);
    const [mahasiswa, setMahasiswa] = useState([]);
    const [Nama, setNama] = useState("")
    const [NIM, setNIM] = useState("")
    const [mataKuliah, setMataKuliah] = useState([]);
    const [jamPelajaran, setJamPelajaran] = useState([]);
    const [id, setIdMahasiswa] = useState(sessionStorage.getItem('idMhs'))
    const [kelas, setKelas] = useState(1)
    const getDayName = (date) => {
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayIndex = date.getDay();
        return days[dayIndex];
    };
    const [selectedjadwal, setSelectedJadwal] = useState([]);
    const [selectedjadwalcoba, setSelectedJadwalCoba] = useState([]);
    const [keterangan, setKeterangan] = useState("")
    const [tanggalPengajuan, setTanggalPengajuan] = useState(new Date())
    const [TanggalPengajuanFormatted, setTanggalPengajuanFormatted] = useState({})
    const [jenisIzin, setJenisIzin] = useState("")
    const [jumlahJP, setJumlahJP] = useState()
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

    const getLeaveRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/data-pengajuan/${key}`);
            console.log('pengajuan', response.data.data);
            console.log('jadwal', response.data.jadwal);
            console.log('mahasiswa', response.data.mahasiswa[0].Data_Mahasiswa);
            setPengajuan(response.data.data)
            setStatusPengajuan(response.data.data.Status_Pengajuan)
            setJenisIzin(response.data.data.Jenis_Izin)
            setKeterangan(response.data.data.Keterangan)
            setJadwalKelas(response.data.jadwal)
            setMahasiswa(response.data.mahasiswa[0].Data_Mahasiswa)
            setNama(response.data.mahasiswa[0].Data_Mahasiswa.Nama)
            setNIM(response.data.mahasiswa[0].Data_Mahasiswa.NIM)
            let date = new Date(response.data.data.Tanggal_Pengajuan);
                console.log('tanggalnllllll:', date);
                const formattedData = {
                    date: date,
                    hari : getDayName(date),
                    tanggal : date.getDate(),
                    bulan : date.toLocaleString('id-ID', { month: 'long' }),
                    tahun : date.getFullYear()};
            setTanggalPengajuan(formattedData.date)
            setTanggalPengajuanFormatted(formattedData)
            console.log('hariii',getDayName(formattedData.date))
            getAllLeaveRequests(response.data.mahasiswa[0].Data_Mahasiswa.id, response.data.data.Jenis_Izin, response.data.data.Tanggal_Pengajuan, response.data.data.Keterangan, response.data.jadwal)
            console.log('coba', selectedjadwalcoba)
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

    function getJumlahJamIzin(mahasiswa, jadwal) {
        let jumlahJP = 0;
        mahasiswa.forEach(item => {
            jumlahJP += getJamEnd(jadwal, item.ID_Jadwal_Kelas) - getJamStart(jadwal, item.ID_Jadwal_Kelas) + 1;
        });
        return jumlahJP;
    }
    const getAllLeaveRequests = async (id, jenis, tanggal, keterangan, dataJamPelajaran) => {
        try {
            console.log('id data', { id });
            const response = await axios.get(`http://localhost:3000/data-pengajuan/mahasiswa/${id}`);
            console.log('pengajuan coba-c', response.data);
            let pengajuan = response.data.data;
            let mahasiswa = response.data.mahasiswa[0].Data_Mahasiswa
            const jadwal = response.data.jadwal;
            pengajuan = pengajuan.filter(item => item.Jenis_Izin === jenis && item.Keterangan === keterangan && item.Tanggal_Pengajuan === tanggal);
            setAllPengajuan(pengajuan)
            setJumlahJP(getJumlahJamIzin(pengajuan, jadwal))

            console.log('data izin:', pengajuan);
            while (pengajuan.length > 0) {
                let date = pengajuan[0].Tanggal_Izin;
                console.log('tanggaln:', date);
                const formattedData = {
                    date: new Date(date)
                };
                setSelectedDate(formattedData.date)
                const urlJadwalKelasGetOne = `http://localhost:3000/jadwal-kelas/${mahasiswa.ID_Kelas}/${getDayName(formattedData.date)}`;
                fetch(urlJadwalKelasGetOne).then((response) => response.json())
                    .then((data) => {
                        console.log('hai', data);
                        setJadwalKelas(data.data);
                        setMataKuliah(data.mata_kuliah);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                if (!selectedDates.some((d) => d.date.toDateString() === formattedData.date.toDateString())) {
                    setSelectedDates(selectedDates => [...selectedDates, formattedData])
                }
                console.log('tanggaln:', formattedData);
                pengajuan = pengajuan.filter(item =>
                    item.Tanggal_Izin !== date.toString()
                );
                console.log('dataPengajuan baru ', pengajuan);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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
        getLeaveRequests()

        const getTanggalHariIni = () => {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Januari dimulai dari 0
            const yyyy = today.getFullYear();

            const tanggalHariIni = `${yyyy}-${mm}-${dd}`;
            return tanggalHariIni

        };
        setTanggalPengajuan(getTanggalHariIni());
        setStatusPengajuan('Delivered');

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

    const hapusData = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/data-pengajuan/delete/${id}`);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    function createPost() {
        AllPengajuan.map((item) => {
            hapusData(item.id);
        });

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
        window.location.href = 'http://localhost:3006/#/mahasiswa/Pengajuan';

    }

    const handleCheckboxChange = (id) => {
        const updatedCheckboxStatus = { ...checkboxStatus };

        updatedCheckboxStatus[id] = !updatedCheckboxStatus[id];
        setCheckboxStatus(updatedCheckboxStatus);

        setSelectedJadwal((prevSelectedJadwal) => {
            const updatedSelectedJadwal = [...prevSelectedJadwal];

            if (!updatedSelectedJadwal.includes(id)) {
                updatedSelectedJadwal.push(id);
            } else {
                const index = updatedSelectedJadwal.indexOf(id);
                if (index !== -1) {
                    updatedSelectedJadwal.splice(index, 1);
                }
            }

            return updatedSelectedJadwal;
        });
    };

    const handleSelectAllChange = (date) => {
        const updatedData = tableData?.map((item) => {
            item.isChecked = !selectAll
            return item
        })
        setTableData(updatedData)
        setSelectAll(!selectAll)


        const updatedDates = selectedDates?.map((d) => {
            if (d.date.toDateString() === date.toDateString()) {
                const dateData = updatedData?.map((item) => item.isChecked)
                return { date: d.date, data: dateData }
            }
            return d
        })
        setSelectedDates(updatedDates)
    }

    const handleDateChange = (date) => {
        if (!selectedDates.some((d) => d.date.toDateString() === date.toDateString())) {
            const updatedSelectedDates = [
                ...selectedDates,
                { date, data: tableData?.map((item) => item.isChecked) },
            ]
            setSelectedDates(updatedSelectedDates)
        }
        setSelectedDate(date)
        const harihari = getDayName(date)
        urlJadwalKelasGetOne = `http://localhost:3000/jadwal-kelas/${kelas}/${harihari}`;
        console.log(urlJadwalKelasGetOne);
        fetch(urlJadwalKelasGetOne)
            .then((response) => response.json())
            .then((data) => {
                console.log('hai', data);
                setJadwalKelas(data.data);
                setMataKuliah(data.mata_kuliah);

            })
            .catch((err) => {
                console.log(err);
            });
    }


    const toggleExpandedDate = (date) => {
        if (expandedDates.includes(date)) {
            const updatedExpandedDates = expandedDates.filter((d) => d !== date)
            setExpandedDates(updatedExpandedDates)
        } else {
            setExpandedDates([...expandedDates, date])
        }
    }

    const cancelSelectedDate = (date) => {
        const updatedSelectedDates = selectedDates.filter((d) => d.date !== date);
        setSelectedDates(updatedSelectedDates);
        if (updatedSelectedDates.length === 1) {
            setSelectedDate(updatedSelectedDates[0].date)
            const harihari = getDayName(updatedSelectedDates[0].date);
            const urlJadwalKelasGetOne = `http://localhost:3000/jadwal-kelas/${kelas}/${harihari}`;
            console.log(urlJadwalKelasGetOne);
            fetch(urlJadwalKelasGetOne)
                .then((response) => response.json())
                .then((data) => {
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
        <>
            <div className='container'>
                <div className='grid-container'>
                    <div>
                        Nama :
                    </div>
                    <div>
                        {Nama}
                    </div>
                </div>
                <div className='grid-container'>
                    <div>
                        NIM :
                    </div>
                    <div>
                        {NIM}
                    </div>
                </div>
                <div className='grid-container'>
                    <div>
                        Tanggal Pengajuan :
                    </div>
                    <div>
                        {`${TanggalPengajuanFormatted.hari}, ${TanggalPengajuanFormatted.tanggal} ${TanggalPengajuanFormatted.bulan} ${TanggalPengajuanFormatted.tahun}`}
                    </div>
                </div>
                <div className='grid-container'>
                    <div>
                        Tanggal Izin :
                    </div>
                    <div>
                        {selectedDates?.map((date, index) => (
                            <div key={index}>
                                {`${getDayName(date.date)}, ${date.date.getDate()} ${date.date.toLocaleString('id-ID', { month: 'long' })} ${date.date.getFullYear()}`}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='grid-container'>
                    <div>
                        Status :
                    </div>
                    <div>
                        {statusPengajuan}
                    </div>
                </div>
                <div className='grid-container'>
                    <div>
                        Alasan :
                    </div>
                    <div>
                        {keterangan}
                    </div>
                </div>
                <div className='grid-container'>
                    <div>
                        Jumlah Pelajaran :
                    </div>
                    <div>
                        {jumlahJP} Jam Pelajaran
                    </div>
                </div>
            </div>
        </>
    );
};
export default DetailPengajuanMahasiswa;