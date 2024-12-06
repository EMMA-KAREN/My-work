import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import Editprofile from "./Editprofile";

const ProfileOwner = () => {
  const { userId } = useParams();
  console.log("Extracted userId from URL:", userId);
  
  const navigate = useNavigate();

  const [owner, setOwner] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle Editprofile form
  const [profileEditData, setProfileEditData] = useState(null);
  const [groomers, setGroomers] = useState([]);
  const [selectedGroomer, setSelectedGroomer] = useState(null);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [petDetails, setPetDetails] = useState({
    petName: "",
    petAge: "",
    services: "",
    petImage: "",
    date: "",
    appointmentType: "",
  });
  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/owners/${userId}`);
        const data = await response.json();
        setOwner(data);
        setProfileEditData(data);
        setNotifications(data.notifications || []);
        setRequests(data.requests || []);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };
  
    const fetchGroomersData = async () => {
      try {
        const response = await fetch("http://localhost:5000/groomers");
        const data = await response.json();
        setGroomers(data);
      } catch (error) {
        console.error("Error fetching groomers:", error);
      }
    };
  
    fetchOwnerData();
    fetchGroomersData();
  
    const intervalId = setInterval(fetchOwnerData, 5000); // Refetch owner data every 5 seconds
  
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [userId]);
  

// Toggle edit mode and pass profile data to the Editprofile component
const toggleEdit = () => {
  setIsEditing(!isEditing);
  setProfileEditData(owner); // Pass owner data, including image, to Editprofile
};


const handleProfileUpdate = async (updatedData) => {
  try {
    const response = await fetch(`http://localhost:5000/owners/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile.");
    }

    const updatedOwner = await response.json();
    setOwner(updatedOwner);
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating profile:", error);
    alert(`Error updating profile: ${error.message}`);
  }
};

  

  if (!owner) {
    return <div>Loading owner data...</div>;
  }
  
  // useEffect(() => {
  //   const fetchGroomers = () => {
  //     fetch("http://localhost:5000/groomers")
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error(`Failed to fetch groomers: ${res.status}`);
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log("Fetched groomers:", data);
  //         setGroomers(data);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching groomers:", err);
  //       });
  //   };
  //   fetchGroomers();
  // }, []);
  
  const sendRequest = async () => {
    if (!selectedGroomer) {
      alert("Please select a groomer!");
      return;
    }
  
    try {
      // Find the selected groomer
      const groomer = groomers.find((g) => g.id === selectedGroomer);
      if (!groomer) throw new Error("Selected groomer not found!");
  
      // Create the request object
      const request = {
        id: Date.now(),
        ownerId: owner.id,
        ownerName: owner.name,
        groomerId: selectedGroomer,
        groomerName: groomer.name,
        status: "pending",
        petDetails: {},
      };
  
      // Update the groomer's database
      const groomerResponse = await fetch(`http://localhost:5000/groomers/${selectedGroomer}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requests: [...groomer.requests, request] }),
      });
  
      if (!groomerResponse.ok) {
        throw new Error("Failed to update groomer's database.");
      }
  
      // Update the owner's database
      const ownerResponse = await fetch(`http://localhost:5000/owners/${owner.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requests: [...requests, request] }),
      });
  
      if (!ownerResponse.ok) {
        throw new Error("Failed to update owner's database.");
      }
  
      // Update local state
      setRequests((prev) => [...prev, request]);
  
      // Optional: Send a notification to the owner
      sendNotificationToOwner(request);
  
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    }
  };
  

  const sendNotificationToOwner = (request) => {
    fetch(`http://localhost:5000/owners/${owner.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notifications: [
          ...owner.notifications,
          {
            id: Date.now(),
            message: `Request sent to groomer ${request.groomerName}.`,
            read: false,
          },
        ],
      }),
    }).then(() => {
      alert("Notification sent!");
    });
  };

  const handlePetDetailChange = (e) => {
    const { name, value } = e.target;
    setPetDetails((prev) => {
      if (name === "appointmentType") {
        return { ...prev, [name]: value, address: "", timeSlot: "" }; // Reset conditional fields
      }
      return { ...prev, [name]: value };
    });
  };
  

  const submitPetDetails = (request) => {
    const updatedRequests = requests.map((req) =>
      req.id === selectedRequest.id
        ? { ...req, petDetails, status: "details-submitted" }
        : req
    );
  
    fetch(`http://localhost:5000/owners/${owner.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requests: updatedRequests }),
    })
      .then(() => {
        setRequests(updatedRequests);
        sendPetDetailsToGroomer(selectedRequest);
        alert("Pet details submitted!");
      })
      .catch((err) => console.error("Error updating owner:", err));
  };
  
  
  const sendPetDetailsToGroomer = (request) => {
    const groomer = groomers.find((g) =>
      g.requests.some((req) => req.id === request.id)
    );
  
    if (!groomer) return;
  
    const updatedGroomerRequests = groomer.requests.map((req) =>
      req.id === request.id ? { ...req, petDetails } : req
    );
  
    fetch(`http://localhost:5000/groomers/${groomer.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests: updatedGroomerRequests }),
    }).then(() => {
      sendFinalMessageToOwner(request, petDetails.petName);
    });
  };
  
  const sendFinalMessageToOwner = (request, petName) => {
    const groomer = groomers.find((g) => g.id === request.groomerId);
  
    fetch(`http://localhost:5000/owners/${request.ownerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notifications: [
          ...owner.notifications,
          {
            id: Date.now(),
            message: `Looking forward to meeting ${petName}!`,
            read: false,
          },
        ],
      }),
    }).then(() => {
      alert(`Final message sent to owner for ${petName}`);
    });
  };
  

  if (!owner) {
    return <div>Loading owner data...</div>;
  }

  return (
    <div className="container mt-5 p-4 bg-light rounded">
      <h1 className="text-center display-4 mb-4">Welcome,<span className="text-primary">{owner.name}</span></h1>

        {/* Render Editprofile or ProfileOwner content based on state */}
        {isEditing ? (
        <Editprofile
          userId={userId}
          initialData={profileEditData}
          onSave={handleProfileUpdate}
          onCancel={toggleEdit}
        />
      ) : (
        <div className="p-4 bg-white shadow rounded">
          <h2 className="h4 mb-3">Profile Details</h2>
          <p><strong>Name:</strong> {owner.name}</p>
          <p><strong>Email:</strong> {owner.email}</p>
          <p><strong>Password:</strong> <span className="text-muted">(hidden)</span></p>
         

<p><strong>Profile Image:</strong></p>
{owner.image ? (
  <img src={owner.image} alt="Owner Profile"  className="img-fluid border rounded" style={{ maxWidth: '200px' }} />
) : (
  <p className="text-danger">No image available</p>
)}

          <button className="btn btn-primary mt-3" onClick={toggleEdit}>
            Edit Profile
          </button>
        </div>
      )}
    
  

      <h2 className="mt-4">Groomers</h2>
      <div className="row">
        {groomers.map((groomer) => (
          <div className="col-md-4" key={groomer.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{groomer.name}</h5>
                <p className="card-text">Email: {groomer.email}</p>
                <button
  className="btn btn-primary"
  onClick={() => setSelectedGroomer(groomer.id)}
  aria-label={`Select groomer ${groomer.name}`}
>
  Select Groomer
</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-success mt-4" onClick={sendRequest}>
        Send Request
      </button>

      <h2 className="mt-5 text-secondary">Notifications</h2>
      <ul className="list-group">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`list-group-item ${
              notification.read ? "list-group-item-secondary" : ""
            }`}
          >
            {notification.message}
          </li>
        ))}
      </ul>

      <h2 className="mt-5 text-secondary">Accepted Requests</h2>
      <div className="row">
        
  {requests.filter((req) => req.status === "accepted").map((req) => (
    <div key={req.id} className="card mb-6">
       <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{req.groomerName}</h5>
        <p className="card-text text-success">Status: {req.status}</p>
        <button
  className="btn btn-primary"
  onClick={() => {
    console.log("Selected request for pet details:", req); // Debug
    setSelectedRequest(req);
    window.scrollTo(0, document.body.scrollHeight);
  }}
>
  Edit and Submit Pet Details
</button>

                  </div>
                </div>
                </div>
            )
            
        )}
      </div>
    

      {selectedRequest && (
  <div className="mt-4">
    <h2 className="mb-3">Submit Pet Details for {selectedRequest.groomerName}</h2>
    <form
     className="bg-white p-4 shadow rounded"
      onSubmit={(e) => {
        e.preventDefault();
        submitPetDetails(selectedRequest); // Submit details for the selected request
      }}
    >
      {/* Pet Name */}
      <div className="mb-3">
        <label>Pet Name</label>
        <input
          type="text"
          className="form-control"
          name="petName"
          value={petDetails.petName}
          onChange={handlePetDetailChange}
        />
      </div>

      {/* Pet Age */}
      <div className="mb-3">
        <label>Pet Age</label>
        <input
          type="text"
          className="form-control"
          name="petAge"
          value={petDetails.petAge}
          onChange={handlePetDetailChange}
        />
      </div>

      {/* Services */}
      <div className="mb-3">
        <label className="form-label">Services</label>
        <input
          type="text"
          className="form-control"
          name="services"
          value={petDetails.services}
          onChange={handlePetDetailChange}
        />
      </div>

      {/* Pet Image */}
      <div className="mb-3">
        <label className="form-label">Pet Image URL</label>
        <input
          type="text"
          className="form-control"
          name="petImage"
          value={petDetails.petImage}
          onChange={handlePetDetailChange}
        />
      </div>

      {/* Appointment Date */}
      <div className="mb-3">
        <label className="form-label">Appointment Date</label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={petDetails.date}
          onChange={handlePetDetailChange}
        />
      </div>

      <div className="mb-3">
  <label className="form-label">Appointment Type</label>
  <select
    className="form-control"
    name="appointmentType"
    value={petDetails.appointmentType}
    onChange={handlePetDetailChange}
  >
    <option value="">Select</option>
    <option value="indoor">Indoor</option>
    <option value="shop">Shop Visit</option>
  </select>
</div>

      {/* Appointment Type (Indoor or Shop visit) */}
      {petDetails.appointmentType === 'indoor' && (
  <div className="mb-3">
    <label>Address</label>
    <input
      type="text"
      className="form-control"
      name="address"
      value={petDetails.address || ''}
      onChange={handlePetDetailChange}
    />
  </div>
)}

{petDetails.appointmentType === 'shop' && (
  <div className="mb-3">
    <label>Preferred Time Slot</label>
    <input
      type="text"
      className="form-control"
      name="timeSlot"
      value={petDetails.timeSlot || ''}
      onChange={handlePetDetailChange}
    />
  </div>
)}


      <button type="submit" className="btn btn-success">
        Submit Details
      </button>
    </form>
  </div>
)}

    </div>
  );
};

export default ProfileOwner;
