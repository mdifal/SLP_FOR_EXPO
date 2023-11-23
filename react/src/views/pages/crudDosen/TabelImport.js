import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

function TabelImport() {
  const [importedData, setImportedData] = useState([]);
  const [importedFile, setImportedFile] = useState(null);
  const [alertShown, setAlertShown] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setAlertShown(false);
    const file = e.target.files[0];

    if (file) {
      setImportedFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setImportedData(excelData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleImportData = async () => {
    try {
      let allSuccess = true;

      for (let i = 1; i < importedData.length; i++) {
        const [Nama_Dosen, NIP, Kode_Dosen, InitialID, Email_Dosen] = importedData[i];

        console.log('Nama_Dosen:', Nama_Dosen);
        console.log('NIP:', NIP);
        console.log('Kode_Dosen:', Kode_Dosen);
        console.log('InitialID:', InitialID);
        console.log('Email_Dosen:', Email_Dosen);

        const dataToPost = {
          Nama_Dosen: Nama_Dosen,
          NIP: NIP,
          Kode_Dosen: Kode_Dosen,
          InitialID: InitialID,
          Email_Dosen: Email_Dosen,
        };

        const response = await axios.post('http://localhost:3000/data-dosen/create', dataToPost);

        if (response.status !== 201) {
          allSuccess = false;
          console.error('Gagal menambahkan data:', response.data.error);
        }
      }

      if (allSuccess) {
        alert('Data berhasil ditambahkan!');
        setAlertShown(true);
        navigate('/admin/dataDosen');
      } else {
        alert('Gagal menambahkan beberapa data. Periksa konsol untuk detail kesalahan.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menambahkan data. Error: ' + error.message);
    }
  };

  const downloadTemplate = () => {
    const header = ["Nama_Dosen", "NIP", "Kode_Dosen", "InitialID", "Email_Dosen"];
    const templateData = [header];
    const ws = XLSX.utils.aoa_to_sheet(templateData);
  
    const colWidths = [15, 10, 15, 10, 20]; // Sesuaikan lebar kolom sesuai kebutuhan
  
    // Menerapkan lebar kolom yang telah ditentukan
    ws['!cols'] = colWidths.map((width, i) => ({ wch: width }));
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "import-template.xlsx");
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleImportData}>Impor Data</button>
      <button onClick={downloadTemplate}>Unduh Template</button>
    </div>
  );
}

export default TabelImport;
