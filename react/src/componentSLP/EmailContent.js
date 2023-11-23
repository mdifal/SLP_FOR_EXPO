import React from 'react';

const EmailContent = ({
  ID_Mahasiswa, Keterangan, Jenis_Izin
 }) => {
  return (
    <html>
      <head>
        <style>
          {/* Add your CSS styles here */}
        </style>
      </head>
      <body>
        <h1>Hello, Dosen!</h1>
        <p>Ada pengajuan {Jenis_Izin} baru.</p>
        <p>Oleh: {ID_Mahasiswa}</p>
        <p>Keterangan: {Keterangan}</p>
      </body>
    </html>
  );
};

export default EmailContent;
