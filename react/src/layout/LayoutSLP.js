
import React, { useEffect, useState } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../componentSLP/index'

const LayoutSLP = () => {
  const [Value, setValue] = useState('');

  useEffect(() => {
    const hashFragment = window.location.hash;
    const segments = hashFragment.split('/');
    const value = segments[1];
    setValue(value);
  }, []);
  return (
    <div>
      <AppSidebar role={Value}/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default LayoutSLP 
