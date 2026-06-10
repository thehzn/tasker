import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/axios";
import toast from "react-hot-toast";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();

  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch current task details on mount
  useEffect(() => {
    const fetchTask = async (taskId) => {
      try {
        setError("");
        setLoading(true);
        
        // Adjust endpoint to match your task backend routing structure
        const { data } = await axios.get(`/tasks/${taskId}`);
        console.log(data);
        if (data.success || data) {
          const taskData = data.task || data.data;
          setTaskDetails({
            title: taskData.title || "",
            description: taskData.description || "",
            isCompleted: taskData.isCompleted || false,
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load task details.");
      } finally {
        setLoading(false);
      }
    };

    if (id){
        console.log(id);
 fetchTask(id);
    }
  }, [id]);

  // Handle text inputs, textareas, and checkboxes
  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setTaskDetails({
      ...taskDetails,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Submit updated details to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      
      const { data } = await axios.put(`/tasks/${id}`, taskDetails);
      
      if (data.success || data) {
        toast.success("Task details updated successfully");
        navigate("/tasks"); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .profile-section {
          min-height: 100vh;
          background: #0a0a14;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }
        .profile-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          color: #fff;
          font-size: clamp(2rem, 5vw, 3.5rem);
          padding: 40px;
        }
        .profile-title span {
          background: linear-gradient(135deg, #7c6af7, #f76a8c);
          -webkit-background-clip: text; 
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .profile-sub { color: rgba(255,255,255,0.45); font-size: 1rem; }
       
        .search-input {
          background: rgba(255,255,255,0.07) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          color: #fff !important;
          border-radius: 10px !important;
          padding: 0.75rem !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          text-align: left;
        }
        .search-input label {
          color: #fff;
          font-weight: 500;
          min-width: 100px;
          margin-bottom: 0;
        }
        .search-input .form-control {
          background: rgba(0,0,0,0.2) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          color: #fff !important;
        }
        .search-input .form-control:focus {
          border-color: rgba(124,106,247,0.5) !important;
          box-shadow: none !important;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.3) !important; }
        
        .checkbox-container {
          justify-content: flex-start;
          gap: 15px;
        }
        .form-check-input {
          cursor: pointer;
          width: 1.25rem;
          height: 1.25rem;
          background-color: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
        .form-check-input:checked {
          background-color: #7c6af7 !important;
          border-color: #7c6af7 !important;
        }
        .form-check-label {
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          user-select: none;
        }
        .create-btn {
          color: #282441;
          background: linear-gradient(135deg, #7c6af7, #9b8df9) !important;
          border: none !important;
          border-radius: 10px !important;
          padding: 0.85rem 1.4rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.5px;
        }
      `}</style>

      <section className="profile-section">
        <div className="container text-center">
          <h1 className="profile-title mb-3">
            Edit your<span> Task</span>
          </h1>
          <p className="profile-sub mb-4">
            Modify the task parameters below.
          </p>

          <form onSubmit={handleSubmit} className="row justify-content-center mb-3">
            <div className="col-md-7 col-lg-6">
              {error && <div className="alert alert-danger">{error}</div>}
              
              {/* Task Title */}
              <div className="search-input mb-3">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Finish API integration"
                  value={taskDetails.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Task Description */}
              <div className="search-input mb-3 d-flex flex-column align-items-stretch">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="description">Description</label>
                </div>
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="Describe your goals for this task..."
                  rows={4}
                  value={taskDetails.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Status Checkbox */}
              <div className="search-input checkbox-container mb-4">
                <input
                  id="isCompleted"
                  type="checkbox"
                  className="form-check-input"
                  checked={taskDetails.isCompleted}
                  onChange={handleChange}
                />
                <label htmlFor="isCompleted" className="form-check-label">
                  Mark as Completed
                </label>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 create-btn"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Task"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default EditTask;