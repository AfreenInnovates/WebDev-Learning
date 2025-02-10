import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:2000/${id}`);
        const result = await response.json();

        if (!response.ok) {
          console.log(result.error);
          setError(result.error);
        } else {
          setName(result.name);
          setEmail(result.email);
          setAge(result.age);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch user data.");
      }
    }
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedUser = { name, email, age };

    const response = await fetch(`http://localhost:2000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      console.log(result);
      setError("");
      navigate("/all");
    }
  };

  return (
    <motion.div
      className="container my-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center text-warning fw-bold">Update User</h2>
      <form onSubmit={handleUpdate} className="shadow-lg p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="0"
            required
          />
        </div>

        <motion.button
          type="submit"
          className="btn btn-warning w-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Update;
