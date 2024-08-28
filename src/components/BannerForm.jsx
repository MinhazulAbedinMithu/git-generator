import React, { useState } from 'react';

const BannerForm = ({ onSubmit }) => {
  const [companyName, setCompanyName] = useState('');
  const [tagline, setTagline] = useState('');
  const [logo, setLogo] = useState(null);
  const [color, setColor] = useState('#ff0000');

  const handleLogoChange = (e) => {
    setLogo(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ companyName, tagline, logo, color });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label>Company Name:</label>
        <input 
          type="text" 
          value={companyName} 
          onChange={(e) => setCompanyName(e.target.value)} 
          className="border p-2"
        />
      </div>
      <div>
        <label>Tagline:</label>
        <input 
          type="text" 
          value={tagline} 
          onChange={(e) => setTagline(e.target.value)} 
          className="border p-2"
        />
      </div>
      <div>
        <label>Company Logo:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleLogoChange} 
          className="border p-2"
        />
      </div>
      <div>
        <label>Text Color:</label>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          className="border p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Generate Banner</button>
    </form>
  );
};

export default BannerForm;
