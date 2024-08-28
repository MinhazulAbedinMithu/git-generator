import React, { useState } from 'react';
import BannerForm from './components/BannerForm';
import BannerPreview from './components/BannerPreview';

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="App p-8">
      <BannerForm onSubmit={handleFormSubmit} />
      {formData && <BannerPreview data={formData} />}
    </div>
  );
}

export default App;
