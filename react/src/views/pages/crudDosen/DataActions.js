import React from 'react';
import { CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilInfo, cilTrash, cilPencil } from '@coreui/icons';

function DataActions({ id }) {
  return (
    <div className="aksi">
      <CButton href={`/#/admin/detailDosen/${id}`} className="margin-button" style={{ color: 'black', backgroundColor: 'transparent' }}>
        <CIcon icon={cilInfo} />
      </CButton>
      <CButton href={`/#/admin/editDosen/${id}`} style={{ color: 'black', backgroundColor: 'transparent' }}>
        <CIcon icon={cilPencil} />
      </CButton>
      <button className="custom-button" data-id={id}>
        <CIcon icon={cilTrash} />
      </button>
    </div>
  );
}

export default DataActions;
