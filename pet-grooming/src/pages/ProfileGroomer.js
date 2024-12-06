import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileGroomer = ({groomerId}) => {
  const { id } = useParams();  // Get the groomer ID from URL
  const [groomer, setGroomer] = useState(null);
  const [requests, setRequests] = useState([]);
  const [groomers, setGroomers] = useState([]);
  const [owner, setOwner] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [petDetails, setPetDetails] = useState({
    petName: "",
    petAge: "",
    services: "",
    petImage: "",
    date: "",
    appointmentType: "",
  });

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/groomers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGroomer(data);
        setRequests(data.requests || []);
        setNotifications(data.notifications || []);
      })
      .catch((err) => console.error('Error fetching groomer data:', err));
  }, [id]);

  // Update the status of a request
  const updateRequestStatus = (requestId, newStatus) => {
    const updatedRequests = requests.map((req) =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );

    fetch(`http://localhost:5000/groomers/${groomer.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests: updatedRequests }),
    })
      .then(() => {
        setRequests(updatedRequests);

        if (newStatus === 'accepted') {
          const acceptedRequest = requests.find((req) => req.id === requestId);
          if (acceptedRequest) {
            syncWithOwnerDatabase(acceptedRequest);
            sendAcceptanceNotification(acceptedRequest);
          }
        }
      })
      .catch((err) => console.error('Error updating request status:', err));
  };

  // Sync the accepted request with the owner's database
  const syncWithOwnerDatabase = (acceptedRequest) => {
    fetch(`http://localhost:5000/owners/${acceptedRequest.ownerId}`)
      .then((res) => res.json())
      .then((owner) => {
        const updatedOwnerRequests = [
          ...owner.requests,
          { ...acceptedRequest, status: 'accepted' },
        ];

        return fetch(`http://localhost:5000/owners/${acceptedRequest.ownerId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requests: updatedOwnerRequests }),
        });
      })
      .then(() => console.log('Request synced with owner database'))
      .catch((err) => console.error('Error syncing with owner database:', err));
  };

  // Send notification to the owner about the acceptance
  const sendAcceptanceNotification = (acceptedRequest) => {
    fetch(`http://localhost:5000/owners/${acceptedRequest.ownerId}`)
      .then((res) => res.json())
      .then((owner) => {
        const updatedNotifications = [
          ...owner.notifications,
          {
            id: Date.now(),
            message: `Your request has been accepted by ${groomer.name}. Please provide pet details.`,
            read: false,
          },
        ];

        return fetch(`http://localhost:5000/owners/${acceptedRequest.ownerId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notifications: updatedNotifications }),
        });
      })
      .then(() => console.log('Notification sent to owner'))
      .catch((err) => console.error('Error sending notification:', err));
  };

  const handleAcceptRequest = (requestId) => {
    updateRequestStatus(requestId, 'accepted');
  };

  const handleRejectRequest = (requestId) => {
    updateRequestStatus(requestId, 'rejected');
  };

  if (!groomer) return <div>Loading...</div>;

  const submitPetDetails = (requestId, ownerId, groomerId, petDetails) => {
    // Fetch the owner's data
    fetch(`http://localhost:3002/owners/${ownerId}`)
      .then((res) => res.json())
      .then((owner) => {
        // Update the owner's requests
        const updatedRequests = owner.requests.map((req) =>
          req.id === requestId ? { ...req, petDetails, status: "details-submitted" } : req
        );
  
        // Update the owner's database with the new details
        fetch(`http://localhost:3002/owners/${ownerId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requests: updatedRequests }),
        }).then(() => console.log("Owner's pet details updated"));
      });
  
    // Fetch the groomer's data
    fetch(`http://localhost:3002/groomers/${groomerId}`)
      .then((res) => res.json())
      .then((groomer) => {
        // Update the groomer's requests
        const updatedRequests = groomer.requests.map((req) =>
          req.id === requestId ? { ...req, petDetails, status: "details-submitted" } : req
        );
  
        // Update the groomer's database with the new details
        fetch(`http://localhost:3002/groomers/${groomerId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requests: updatedRequests }),
        }).then(() => console.log("Groomer's pet details updated"));
      });
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
      alert('Final message sent to owner for ${petName');
    });
  };
  
  
 return (
  <div className="profile-groomer container mt-4">
      <h1 className="text-center">Welcome, {groomer?.name}</h1>

     
      {/* Notifications Section */}
      <h2 className="mt-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul className="list-group">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`list-group-item ${
                notification.read ? 'list-group-item-secondary' : ''
              }`}
            >
              {notification.message}
            </li>
          ))}
        </ul>
      )}

      {/* Requests Section */}
      <h2 className="mt-4">Requests</h2>
      <div className="row">
        {requests.length === 0 ? (
          <p>No requests yet</p>
        ) : (
          requests.map((request) => (
            <div className="col-md-4" key={request.id}>
          <div className="uiverse-card card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Owner: {request.ownerName}</h5>
                  <p className="card-text">Status: {request.status}</p>
                  <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRejectRequest(request.id)}
                  >
                    Reject
                  </button>

                  {/* View Details Button */}
                  <button
                      className="btn btn-primary mt-3 w-100"
                    onClick={() => setSelectedRequest(request)}
                  >
                    View Details
                  </button>
                 </div>
                  {/* Mark as Waiting Payment (if applicable) */}
                  {request.status === 'details-submitted' && (
                    <button
                      className="btn btn-warning mt-2"
                      onClick={() =>
                        updateRequestStatus(request.id, 'waiting payment')
                      }
                    >
                      Mark as Waiting Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>


      {/* Selected Request Details Section */}
      {selectedRequest && (
        <div className="mt-4">
          <h3>Request Details</h3>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Owner: {selectedRequest.ownerName}</h5>
              <p className="card-text"><strong>Status:</strong> {selectedRequest.status}</p>
              <p className="card-text"><strong>Pet Name:</strong> {selectedRequest.petDetails.petName}</p>
              <p className="card-text"><strong>Pet Age:</strong> {selectedRequest.petDetails.petAge}</p>
              <p className="card-text"><strong>Services:</strong> {selectedRequest.petDetails.services}</p>
              <p className="card-text"><strong>Appointment Type:</strong> {selectedRequest.petDetails.appointmentType}</p>
              <p className="card-text">
                <strong>Appointment Date:</strong> {selectedRequest.petDetails.date}
              </p>
              {selectedRequest.petDetails?.petImage && (
                <img
                  src={selectedRequest.petDetails.petImage}
                  alt="Pet"
                  className="img-fluid mt-3"
                />
              )}
            </div>
          </div>

          {/* Close Details Button */}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setSelectedRequest(null)} // Close the details view
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};



export default ProfileGroomer;