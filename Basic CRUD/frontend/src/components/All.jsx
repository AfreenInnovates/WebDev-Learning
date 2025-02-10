import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const All = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function getData() {
    try {
      const response = await fetch("http://localhost:2000");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data.");
    }
  }

  const handleDelete = async (id) => {
      const response = await fetch(`http://localhost:2000/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      }

      if (response.ok) {
        getData();
        setError("Deleted!");
        
        setTimeout(() => {
          setError("");
        }, 2000)
      }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="container py-5">
      {error && <div className='alert alert-danger'>{error}</div>}
      <h2 className="text-center mb-4 fw-bold text-primary">All Data</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="custom-grid">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className="custom-card">
              <div className="card shadow-sm border-0 rounded-lg">
                <div className="card-body text-center">
                  <h5 className="card-title text-primary fw-bold">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text fw-semibold">{ele.age} years old</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(ele._id)}>Delete</button>
                    <button className="btn btn-outline-success btn-sm" onClick={() => navigate(`/update/${ele._id}`)}>Edit</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-secondary">No data available</p>
        )}
      </div>

      <style>{`
        .custom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
          gap: 20px;
          justify-content: center;
          padding: 20px;
        }

        .custom-card {
          display: flex;
          justify-content: center;
        }

        .card {
          width: 100%;
          max-width: 320px;
          padding: 15px;
          border-radius: 12px;
          border: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-in-out;
          background: white;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .btn {
          transition: all 0.2s ease-in-out;
        }

        .btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default All;
