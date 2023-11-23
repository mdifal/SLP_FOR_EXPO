import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useParams, useNavigate } from 'react-router-dom';
import avatar8 from './../../assets/images/avatars/8.jpg';
import Cookies from 'js-cookie';

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const Logout = () => {
    // Perform any necessary logout logic (clear tokens, etc.)
    // For example, you can clear the sessionStorage items you set during login
    sessionStorage.removeItem('idMhs');
    sessionStorage.removeItem('idDosen');
    sessionStorage.removeItem('idAdmin');

    Cookies.remove('jwt');

    // Navigate to the logout page or endpoint
    navigate('/');
  }

  return (
    <CDropdown variant="nav-item" >

      <CDropdownToggle placement="bottom-end"
        className="py-0"
        caret={false} >

        <CAvatar src={avatar8}
          size="md" />

      </CDropdownToggle>
      <CDropdownMenu className="pt-0"
        placement="bottom-end" > {
          /* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
                  <CDropdownItem href="#">
                    <CIcon icon={cilBell} className="me-2" />
                    Updates
                    <CBadge color="info" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilEnvelopeOpen} className="me-2" />
                    Messages
                    <CBadge color="success" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilTask} className="me-2" />
                    Tasks
                    <CBadge color="danger" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilCommentSquare} className="me-2" />
                    Comments
                    <CBadge color="warning" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader> */
        }
        <CDropdownItem href="#" >

          <CIcon icon={cilUser}
            className="me-2" />
          Profile
        </CDropdownItem> {
          /* <CDropdownItem href="#">
                    <CIcon icon={cilSettings} className="me-2" />
                    Settings
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilCreditCard} className="me-2" />
                    Payments
                    <CBadge color="secondary" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownItem href="#">
                    <CIcon icon={cilFile} className="me-2" />
                    Projects
                    <CBadge color="primary" className="ms-2">
                      42
                    </CBadge>
                  </CDropdownItem>
                  <CDropdownDivider /> */
        }
        <CDropdownItem onClick={Logout} >
          <CIcon icon={cilLockLocked}
            className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
