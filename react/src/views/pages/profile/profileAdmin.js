import React, { useEffect, useState } from 'react';
import { CCol, CRow } from '@coreui/react';
import { useParams } from 'react-router-dom';
import '../../../scss/styleProfile.css';

const ProfileAdmin = () => {
  const { key } = useParams(); 
  const [adminDetails, setAdminDetails] = useState({
    idAdmin: null,
    user: '',
    jurusan: '',
    programStudi: '',
  });
  
  var imgSrc = `blank.jpeg`

  // Use useEffect to set admin details when the component mounts or when the key changes
  useEffect(() => {
    // Set admin details based on the key parameter
    if (key === '1') {
      setAdminDetails({
        idAdmin: 1,
        jurusan: 'Teknik Komputer dan Informatika',
        programStudi: 'D3 Teknik Informatika',
        email: 'admind3jtk@polban.ac.id',
        no: '08888888888'
      });
    } else if (key === '2') {
      setAdminDetails({
        idAdmin: 2,
        jurusan: 'Teknik Komputer dan Informatika',
        programStudi: 'D4 Teknik Informatika',
        email: 'admind4jtk@polban.ac.id',
        no: '08888888888'
      });
    }
    // Add more conditions for additional admin types if needed
  }, [key]);

  return (
    <div className="container">
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3} className="img-container">
            <img className="img" src={require(`../../../assets/ProfilPic/${imgSrc}`)} />
        </CCol>
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className="details">
            <div className="identitas">
              <h3>Identitas Admin</h3>
            </div>
            <div className="label-data">
              <div className="item">
                <div className="label">Jurusan</div>
                <div className="value">: {adminDetails.jurusan}</div>
              </div>
              <div className="item">
                <div className="label">Program Studi</div>
                <div className="value">: {adminDetails.programStudi}</div>
              </div>
              <div className="item">
                <div className="label">Email</div>
                <div className="value">: {adminDetails.email}</div>
              </div>
              <div className="item">
                <div className="label">No Telepon</div>
                <div className="value">: {adminDetails.no}</div>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default ProfileAdmin;

