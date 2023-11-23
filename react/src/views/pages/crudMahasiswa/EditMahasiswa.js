import axios from "axios";
import React, { useState } from "react";
import {
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CCard,
  CContainer,
  CButton,
  CImage,
} from "@coreui/react";
import pencil from "../../../assets/images/pencil-solid.svg";
import "./style.css";
import { useParams } from 'react-router-dom';



const EditMahasiswa = () => {
  const [NoTelp, setNoTelp] = useState("");
  const [NoTelpOrtu, setNoTelpOrtu] = useState("");
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };
  const baseURL = `http://localhost:3000/data-mahasiswa/students/edit/${id}`;
  const createPost = () => {
    const data = new FormData();

    data.append("Nomor_Telp", NoTelp);
    data.append("Nomor_Telp_Ortu", NoTelpOrtu);
    data.append("photo", file);

    axios
      .post(baseURL, data)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [post, setPost] = useState(null);

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
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <main className="c-main">
          <div className="container-fluid">
            <CContainer>
              <CRow>
                <CForm method="POST">
                  <CCol className="my-col">
                    <CRow>
                      <CCol xs="6" className="my-col-inner">
                        <CRow className="mb-3">
                          <CCol className="ml-0">
                            <CFormLabel htmlFor="kelas" className="label">
                              Kelas
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="kelas"
                              name="kelas"
                              defaultValue={post.kelas.Nama_kelas}
                              disabled
                            />
                          </CCol>
                          <CCol>
                            <CFormLabel htmlFor="programStudi" className="label">
                              Program Studi
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="programStudi"
                              name="programStudi"
                              defaultValue={post.kelas.prodi}
                              disabled
                            />
                          </CCol>
                        </CRow>
                        <CFormLabel htmlFor="jurusan" className="label">
                          Jurusan
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="jurusan"
                          name="jurusan"
                          defaultValue="Teknik Komputer dan Informatika"
                          disabled
                        />
                        <CFormLabel htmlFor="email" className="label">
                          Email
                        </CFormLabel>
                        <CFormInput
                          type="email"
                          id="email"
                          name="email"
                          defaultValue={post.data.Email}
                          disabled
                        />
                        <CFormLabel htmlFor="noHandphone" className="label">
                          No Handphone
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="noHandphone"
                          name="noHandphone"
                          defaultValue={post.data.Nomor_Telp}
                          onChange={(event) => setNoTelp(event.target.value)}
                        />
                        <br />
                        <p className="header-text">Data Orang Tua Wali</p>
                        <CFormLabel htmlFor="namaOrangTuaWali" className="label">
                          Nama Orang Tua Wali
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="namaOrangTuaWali"
                          name="namaOrangTuaWali"
                          defaultValue={post.data.Nomor_Telp_Ortu}
                          disabled
                        />
                        <CFormLabel htmlFor="noHandphoneOrangTuaWali" className="label">
                          No Handphone Orang Tua Wali
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="noHandphoneOrangTuaWali"
                          name="noHandphoneOrangTuaWali"
                          defaultValue={post.data.Nomor_Telp_Ortu}
                          onChange={(event) => setNoTelpOrtu(event.target.value)}
                        />
                      </CCol>
                      <CCol xs="6" className="my-col-inner">
                        <CCard className="card-style">
                          <div className="card-content-style">
                            {selectedImage ? (
                              <CImage
                                src={selectedImage}
                                fluid
                                className="image-style"
                              />
                            ) : (
                              <CImage src={require(`../../../assets/ProfilPic/${imgSrc}`)} fluid className="image-style" />


                            )}
                            <CImage src={pencil} className="pencil-icon-style" />
                          </div>
                          <input
                            type="file"
                            id="ProfilPic"
                            name="ProfilPic"
                            className="file-input-style"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </CCard>
                        <CFormLabel htmlFor="nama" className="label">
                          Nama
                        </CFormLabel>
                        <CFormInput type="text" id="nama" name="nama" defaultValue={post.data.Nama} disabled />
                        <CFormLabel htmlFor="nim" className="label">
                          NIM
                        </CFormLabel>
                        <CFormInput type="text" id="nim" name="nim" defaultValue={post.data.NIM} disabled />
                        <CFormLabel htmlFor="waliDosen" className="label">
                          Wali Dosen
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="waliDosen"
                          name="waliDosen"
                          defaultValue={post.WaliDosen.Nama_Dosen}
                          disabled
                        />
                        <CButton
                          component="input"
                          value="Submit"
                          className="submitButtonStyle"
                          onClick={createPost}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                </CForm>
              </CRow>
            </CContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditMahasiswa;
