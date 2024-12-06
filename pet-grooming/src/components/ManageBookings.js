import React, { useState, useEffect } from "react";
function Editprofile({ userId, initialData, onSave, onCancel }) {
    const [profilename, setProfilename] = useState(initialData?.name || '');
    const [profileemail, setProfileemail] = useState(initialData?.email || '');
    const [profilepassword, setProfilepassword] = useState(initialData?.password || '');
    const [profilepic, setProfilepic] = useState(initialData?.profile_pic || '');

        const [formData, setFormData] = useState(initialData || {});
      
        useEffect(() => {
          setFormData(initialData);
        }, [initialData]);
      

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData); // Pass the updated form data back to ProfileOwner
          };
          
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
    return (
        <div className="edit-profile-container">
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <h2 className="text-center mb-4">Edit Profile</h2>
    
            {/* Profile Image */}
            <div className="mb-4">
              <label className="form-label">Profile Image URL</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={formData.image || ''}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
              {/* Display image preview */}
              {formData.image && (
                <div className="mt-3">
                  <p>Preview:</p>
                  <img
                    src={formData.image}
                    alt="Profile Preview"
                    className="img-fluid profile-image-preview"
                  />
                </div>
              )}
            </div>
    
            {/* Other Profile Fields */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
    
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
    
            <div className="mb-4 d-flex justify-content-between">
              <button type="submit" className="btn btn-success">Save Changes</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    export default Editprofile;
  