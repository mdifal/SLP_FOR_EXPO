import React from 'react';
import { useParams } from 'react-router-dom';
import { CCol, CRow } from '@coreui/react';
import './Detail.css';
import axios from "axios";


const DetailMahasiswa = () => {
  const { id } = useParams();
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get(`http://localhost:3000/data-mahasiswa/students/${id}`).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  if (post.data.Foto_Profil != null){
    var imgSrc = `${post.data.Foto_Profil}`;
  }
  else{
    var imgSrc = `blank.jpeg`
  }
  return (
    <div className="container">
      <CRow>
        <CCol xs={12} sm={6} md={4} lg={3} className="img-container">
          <img className="img" src={require(`../../../assets/ProfilPic/${imgSrc}`)} alt={`Foto ${post.Nama}`} />
          <div className="nama">{post.Nama}</div>
        </CCol>
        <CCol xs={12} sm={6} md={8} lg={9} className="detail-container">
          <div className="details">
            <div className="identitas">
              <h3>Identitas Mahasiswa</h3>
            </div>
            <div className="label-data">
              <div className="item">
                <div className="label">NIM</div>
                <div className="value">: {post.data.NIM}</div>
              </div>
              <div className="item">
                <div className="label">ID</div>
                <div className="value">: {post.data.id}</div>
              </div>
              <div className="item">
                <div className="label">Nama</div>
                <div className="value">: {post.data.Nama}</div>
              </div>
              <div className="item">
                <div className="label">Nomor Telepon</div>
                <div className="value">: {post.data.Nomor_Telp}</div>
              </div>
              <div className="item">
                <div className="label">Email</div>
                <div className="value">: {post.data.Email}</div>
              </div>
              <div className="item">
                <div className="label">Kelas</div>
                <div className="value">: {post.kelas.kelas}</div>
              </div>
              <div className="item">
                <div className="label">No Telp Ortu</div>
                <div className="value">: {post.data.Nomor_Telp_Ortu}</div>
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default DetailMahasiswa;
