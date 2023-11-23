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
import pencil from "../../../../assets/images/pencil-solid.svg";
import '../../../../scss/styleProfile.css';
import { useParams } from 'react-router-dom';

const EditMahasiswa = () => {
  const [Nama, setNama] = useState("");
  const [Email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [id, setIdDosen] = useState(sessionStorage.getItem('idDosen'));
  const [post, setPost] = useState(null);

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

  React.useEffect(() => {
    axios.get(`http://localhost:3000/data-dosen/get/${id}`).then((response) => {
      console.log('nyobacikk', response.data);
      setPost(response.data);
    });
  }, []);

  const baseURL = `http://localhost:3000/data-dosen/editdosen/${id}`;

  const createPost = () => {
    if (!file) {
      console.error("File belum dipilih");
      return;
    }

    const data = new FormData();
    data.append("Nama_Dosen", Nama);
    data.append("Email_Dosen", Email);
    data.append("photo", file);

    console.log('masukk');

    axios
      .post(baseURL, data)
      .then((response) => {
        setPost(response.data);
        alert("Data berhasil diupdate!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
                            <CFormLabel htmlFor="namaDosen" className="label">
                              Nama
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="namaDosen"
                              name="namaDosen"
                              defaultValue={post ? post.data.Nama_Dosen : ""}
                              onChange={(event) => setNama(event.target.value)}
                            />
                          </CCol>
                          <CCol>
                            <CFormLabel htmlFor="NIP" className="label">
                              NIP
                            </CFormLabel>
                            <CFormInput
                              type="text"
                              id="NIP"
                              name="NIP"
                              defaultValue={post ? post.data.NIP : ""}
                              disabled
                            />
                          </CCol>
                        </CRow>
                        <CFormLabel htmlFor="kodedosen" className="label">
                          Kode Dosen
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="kodedosen"
                          name="kodedosen"
                          defaultValue={post ? post.data.Kode_Dosen : ""}
                          disabled
                        />
                        <CFormLabel htmlFor="initialID" className="label">
                          ID
                        </CFormLabel>
                        <CFormInput
                          type="text"
                          id="initialID"
                          name="initialID"
                          defaultValue={post ? post.data.InitialID : ""}
                          disabled
                        />
                        <CFormLabel htmlFor="Email" className="label">
                          Email
                        </CFormLabel>
                        <CFormInput
                          type="email"
                          id="Email"
                          name="Email"
                          defaultValue={post ? post.data.Email_Dosen : ""}
                          onChange={(event) => setEmail(event.target.value)}
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
                              <CImage
                                src={require(`../../../../assets/ProfilPic/${post ? post.data.Foto_Profil || "blank.jpeg" : "blank.jpeg"}`)}
                                fluid
                                className="image-style"
                              />
                            )}
                            <CImage
                              src={pencil}
                              className="pencil-icon-style"
                            />
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
                        <CButton
                          component="input"
                          value="Submit"
                          className="submitButtonStyleDosen"
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
