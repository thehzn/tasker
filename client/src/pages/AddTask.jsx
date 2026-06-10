import useAxios from "../hooks/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddTask() {
  const axios = useAxios();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("/tasks/add", form);
      if (data.success) {
        navigate("/tasks");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .at-section {
          min-height: 100vh;
          background: #0a0a14;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        .at-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          color: #fff;
          font-size: clamp(2rem, 5vw, 3.5rem);
          padding: 40px;
        }

        .at-title span {
          background: linear-gradient(135deg, #7c6af7, #f76a8c);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .at-sub {
          color: rgba(255,255,255,0.45);
          font-size: 1rem;
        }

        .at-field {
          background: rgba(255,255,255,0.07) !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          color: #fff !important;
          border-radius: 10px !important;
          padding: 0.75rem !important;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .at-field label {
          color: rgba(255,255,255,0.55);
          font-size: 0.82rem;
          font-weight: 500;
          text-align: left;
          margin-bottom: 2px;
        }

        .at-field .form-control,
        .at-field .form-select {
          background: transparent !important;
          border: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 0 !important;
          color: #fff !important;
          padding: 0.4rem 0 !important;
          font-size: 0.95rem;
          box-shadow: none !important;
          outline: none !important;
        }

        .at-field .form-control::placeholder {
          color: rgba(255,255,255,0.25) !important;
        }

        .at-field .form-control:focus,
        .at-field .form-select:focus {
          border-bottom-color: rgba(124,106,247,0.7) !important;
          background: transparent !important;
          box-shadow: none !important;
        }

        .at-field .form-select option {
          background: #1a1a2e;
          color: #fff;
        }

        /* Priority badge colors in select */
        .at-priority-high { color: #f87171; }
        .at-priority-medium { color: #a78bfa; }
        .at-priority-low { color: #6b7280; }

        .at-submit-btn {
          color: #282441;
          background: linear-gradient(135deg, #7c6af7, #9b8df9) !important;
          border: none !important;
          border-radius: 10px !important;
          padding: 0.85rem 1.4rem !important;
          font-weight: 600 !important;
          font-size: 0.95rem;
          transition: opacity 0.2s, transform 0.1s;
        }

        .at-submit-btn:hover:not(:disabled) {
          opacity: 0.88;
        }

        .at-submit-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .at-submit-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .at-back {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.45);
          border-radius: 10px;
          padding: 0.85rem 1.4rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.15s;
          width: 100%;
          font-weight: 500;
        }

        .at-back:hover {
          border-color: rgba(124,106,247,0.5);
          color: #fff;
        }
      `}</style>

      <section className="at-section">
        <div className="container text-center">
          <h2 className="at-title mb-3">
            Add new Task
          </h2>
          <p className="at-sub mb-4">Fill in the task details below.</p>

          <form onSubmit={handleSubmit} className="row justify-content-center mb-3">
            <div className="col-md-7 col-lg-6">

              {error && <div className="alert alert-danger text-start mb-3">{error}</div>}

              {/* Title */}
              <div className="at-field mb-3">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Complete project report"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="at-field mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="e.g. Write and submit the Q3 report by Friday"
                  rows={4}
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

                

              {/* Buttons */}
              <button
                type="submit"
                className="btn w-100 at-submit-btn mb-2"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Task"}
              </button>

              <button
                type="button"
                className="at-back"
                onClick={() => navigate("/tasks")}
                disabled={loading}
              >
                ← Back to Tasks
              </button>

            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default AddTask;