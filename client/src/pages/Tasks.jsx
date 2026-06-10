// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import useAxios from "../hooks/axios";
// import toast from "react-hot-toast";
// import { Container, Table } from "react-bootstrap";

// function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [isCompleted, setIsCompleted] = useState("");
//   const [page, setPage] = useState(1);
//   const [pagination, setPagination] = useState({ total: 0, pages: 1 });

//   const navigate = useNavigate();
//   const axios = useAxios();

//   const fetchTasks = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.get("/tasks/getall", {
//         params: { search, isCompleted, page, limit: 10 },
//       });
//       setTasks(data.tasks);
//       setPagination(data.pagination);
//       if (page === 1 && data.pagination.total > 0)
//         toast.success(`Fetched ${data.pagination.total} task${data.pagination.total !== 1 ? "s" : ""}`);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load tasks.");
//     } finally {
//       setLoading(false);
//     }
//   }, [search, isCompleted, page]);

//   useEffect(() => {
//     fetchTasks();
//   }, [fetchTasks]);

//   // Reset to page 1 when filters change
//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const handleFilter = (e) => {
//     setIsCompleted(e.target.value);
//     setPage(1);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this task?")) return;
//     try {
//       const { data } = await axios.delete(`/tasks/delete/${id}`);
//       if (data.success) toast.success(data?.message || "Task deleted successfully");
//       setTasks((prev) => prev.filter((t) => t._id !== id));
//       setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete task.");
//     }
//   };

//   // const handleToggle = async (task) => {
//   //   try {
//   //     const { data } = await axios.patch(`/tasks/${task._id}/toggle`, {
//   //       isCompleted: !task.isCompleted,
//   //     });
//   //     if (data.success) {
//   //       setTasks((prev) =>
//   //         prev.map((t) => (t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t))
//   //       );
//   //       toast.success(`Marked as ${!task.isCompleted ? "completed" : "pending"}`);
//   //     }
//   //   } catch (err) {
//   //     toast.error("Failed to update task.");
//   //   }
//   // };
//   const handleToggle = async (task) => {
//   try {
//     const { data } = await axios.patch(`/tasks/${task._id}/toggle`, {
//       isCompleted: !task.isCompleted,
//     });

//     // Handle both formats: check data.success OR verify data was returned
//     if (data.success || data) {
//       // Determine actual state from server if returned, otherwise fallback to local calculation
//       const updatedTask = data.task || data.data || { isCompleted: !task.isCompleted };
      
//       toast.success(`Marked as ${updatedTask.isCompleted ? "completed" : "pending"}`);
      
//       // Refresh the list to let server-side filtering/pagination align properly
//       fetchTasks();
//     }
//   } catch (err) {
//     console.error(err);
//     toast.error(err.response?.data?.message || "Failed to update task.");
//   }
// };

//   return (
//     <>
//       <style>{`
//         .mj-wrap {
//           font-family: 'DM Sans', sans-serif;
//           min-height: 100vh;
//           padding: 2.5rem 1rem 5rem;
//         }

//         /* Header */
//         .mj-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1.5rem;
//           flex-wrap: wrap;
//           gap: 1rem;
//         }
//         .mj-header h2 {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.8rem;
//           font-weight: 800;
//           color: #0f172a;
//           margin: 0;
//         }
//         .mj-count {
//           font-size: 0.82rem;
//           color: #94a3b8;
//           margin: 0;
//         }
//         .mj-count span {
//           color: #6366f1;
//           font-weight: 700;
//         }

//         /* Controls bar */
//         .mj-controls {
//           display: flex;
//           gap: 0.75rem;
//           margin-bottom: 1.25rem;
//           flex-wrap: wrap;
//           align-items: center;
//         }
//         .mj-search-wrap {
//           position: relative;
//           flex: 1;
//           min-width: 180px;
//         }
//         .mj-search-icon {
//           position: absolute;
//           left: 0.75rem;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #94a3b8;
//           font-size: 0.875rem;
//           pointer-events: none;
//         }
//         .mj-search {
//           width: 100%;
//           padding: 0.5rem 0.875rem 0.5rem 2.25rem;
//           border: 1.5px solid #e2e8f0;
//           border-radius: 0.6rem;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.875rem;
//           color: #0f172a;
//           outline: none;
//           transition: border-color 0.15s;
//         }
//         .mj-search:focus { border-color: #6366f1; }
//         .mj-select {
//           padding: 0.5rem 0.875rem;
//           border: 1.5px solid #e2e8f0;
//           border-radius: 0.6rem;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.875rem;
//           color: #0f172a;
//           outline: none;
//           cursor: pointer;
//           background: #fff;
//           transition: border-color 0.15s;
//         }
//         .mj-select:focus { border-color: #6366f1; }

//         /* Add button */
//         .mj-btn-add {
//           background: #0f172a;
//           color: #fff;
//           border: none;
//           border-radius: 0.75rem;
//           padding: 0.55rem 1.2rem;
//           font-family: 'DM Sans', sans-serif;
//           font-weight: 600;
//           font-size: 0.875rem;
//           cursor: pointer;
//           transition: background 0.2s, transform 0.1s;
//           white-space: nowrap;
//         }
//         .mj-btn-add:hover { background: #6366f1; }
//         .mj-btn-add:active { transform: scale(0.97); }

//         /* Table */
//         .mj-table-wrap {
//           border-radius: 1.25rem;
//           overflow: hidden;
//           border: 1px solid #e2e8f0;
//           box-shadow: 0 4px 24px rgba(0,0,0,0.05);
//           animation: mjFadeUp 0.5s ease both;
//         }
//         @keyframes mjFadeUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .mj-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 0.875rem;
//           background: #fff;
//           margin: 0 !important;
//         }
//         .mj-table thead tr { background: #0f172a; color: #fff; }
//         .mj-table thead th {
//           padding: 1rem 1.25rem;
//           font-family: 'Syne', sans-serif;
//           font-weight: 700;
//           font-size: 0.75rem;
//           text-transform: uppercase;
//           letter-spacing: 0.08em;
//           border: none;
//           white-space: nowrap;
//         }
//         .mj-table tbody tr {
//           border-bottom: 1px solid #f1f5f9;
//           transition: background 0.15s;
//         }
//         .mj-table tbody tr:last-child { border-bottom: none; }
//         .mj-table tbody tr:hover { background: #f8fafc; }
//         .mj-table tbody td {
//           padding: 1rem 1.25rem;
//           color: #334155;
//           vertical-align: middle;
//           border: none;
//         }

//         /* Task title */
//         .mj-task-title {
//           font-weight: 700;
//           color: #0f172a;
//           font-size: 0.9rem;
//         }
//         .mj-task-title.done {
//           text-decoration: line-through;
//           color: #94a3b8;
//         }
//         .mj-task-desc {
//           font-size: 0.78rem;
//           color: #94a3b8;
//           margin-top: 2px;
//           max-width: 260px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//         }

//         /* Badges */
//         .mj-badge {
//           display: inline-block;
//           padding: 0.25rem 0.7rem;
//           border-radius: 999px;
//           font-size: 0.68rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//         }
//         .mj-badge-completed {
//           background: #f0fdf4;
//           color: #16a34a;
//           border: 1px solid #bbf7d0;
//         }
//         .mj-badge-pending {
//           background: #fef3c7;
//           color: #92400e;
//           border: 1px solid #fde68a;
//         }

//         /* Date */
//         .mj-date { color: #64748b; font-size: 0.82rem; }

//         /* Action buttons */
//         .mj-actions { display: flex; gap: 0.4rem; flex-wrap: wrap; }
//         .mj-btn {
//           padding: 0.3rem 0.75rem;
//           border-radius: 0.6rem;
//           font-size: 0.75rem;
//           font-weight: 600;
//           font-family: 'DM Sans', sans-serif;
//           cursor: pointer;
//           border: 1px solid transparent;
//           transition: all 0.15s;
//         }
//         .mj-btn-delete { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
//         .mj-btn-delete:hover { background: #dc2626; color: #fff; }
//         .mj-btn-edit { background: #eff6ff; color: #3b82f6; border-color: #bfdbfe; }
//         .mj-btn-edit:hover { background: #3b82f6; color: #fff; }
//         .mj-btn-toggle-done { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
//         .mj-btn-toggle-done:hover { background: #16a34a; color: #fff; }
//         .mj-btn-toggle-pending { background: #fef3c7; color: #92400e; border-color: #fde68a; }
//         .mj-btn-toggle-pending:hover { background: #f59e0b; color: #fff; }

//         /* Empty / loading */
//         .mj-empty {
//           text-align: center;
//           padding: 3rem;
//           color: #94a3b8;
//           font-size: 0.9rem;
//         }

//         /* Pagination */
//         .mj-pagination {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           margin-top: 1.5rem;
//         }
//         .mj-page-btn {
//           padding: 0.4rem 1rem;
//           border-radius: 0.6rem;
//           font-size: 0.8rem;
//           font-weight: 600;
//           font-family: 'DM Sans', sans-serif;
//           cursor: pointer;
//           border: 1.5px solid #e2e8f0;
//           background: #fff;
//           color: #334155;
//           transition: all 0.15s;
//         }
//         .mj-page-btn:hover:not(:disabled) { background: #0f172a; color: #fff; border-color: #0f172a; }
//         .mj-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
//         .mj-page-info { font-size: 0.82rem; color: #94a3b8; padding: 0 0.25rem; }

//         /* Error */
//         .mj-error {
//           background: #fef2f2;
//           color: #dc2626;
//           border: 1px solid #fecaca;
//           border-radius: 0.75rem;
//           padding: 0.875rem 1.25rem;
//           font-size: 0.875rem;
//           margin-bottom: 1rem;
//         }
//       `}</style>

//       <Container className="mj-wrap">
//         {/* Header */}
//         <div className="mj-header">
//           <h2>My Tasks</h2>
//           <div className="d-flex align-items-center gap-3">
//             <p className="mj-count">
//               Showing <span>{pagination.total}</span> task{pagination.total !== 1 ? "s" : ""}
//             </p>
//             <button className="mj-btn-add" onClick={() => navigate("/addtask")}>
//               + Add New Task
//             </button>
//           </div>
//         </div>

//         {/* Error */}
//         {error && <div className="mj-error">⚠ {error}</div>}

//         {/* Controls */}
//         <div className="mj-controls">
//           <div className="mj-search-wrap">
//             <span className="mj-search-icon">🔍</span>
//             <input
//               type="text"
//               className="mj-search"
//               placeholder="Search tasks..."
//               value={search}
//               onChange={handleSearch}
//             />
//           </div>

//           <select className="mj-select" value={isCompleted} onChange={handleFilter}>
//             <option value="">All statuses</option>
//             <option value="false">Pending</option>
//             <option value="true">Completed</option>
//           </select>
//         </div>

//         {/* Table */}
//         <div className="mj-table-wrap">
//           <Table className="mj-table">
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>Title</th>
//                 <th>Status</th>
//                 <th>Created</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="5" className="mj-empty">Loading tasks...</td>
//                 </tr>
//               ) : tasks.length > 0 ? (
//                 tasks.map((task, i) => (
//                   <tr key={task._id}>
//                     <td>{(page - 1) * 10 + i + 1}</td>

//                     <td>
//                       <span className={`mj-task-title ${task.isCompleted ? "done" : ""}`}>
//                         {task.title}
//                       </span>
//                       {task.description && (
//                         <div className="mj-task-desc" title={task.description}>
//                           {task.description}
//                         </div>
//                       )}
//                     </td>

//                     <td>
//                       <span className={`mj-badge ${task.isCompleted ? "mj-badge-completed" : "mj-badge-pending"}`}>
//                         {task.isCompleted ? "Completed" : "Pending"}
//                       </span>
//                     </td>

//                     <td className="mj-date">
//                       {new Date(task.createdAt).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </td>

//                     <td>
//                       <div className="mj-actions">
//                         <button
//                           className={`mj-btn ${task.isCompleted ? "mj-btn-toggle-pending" : "mj-btn-toggle-done"}`}
//                           onClick={() => handleToggle(task)}
//                         >
//                           {task.isCompleted ? "Undo" : "Done"}
//                         </button>
//                         <button
//                           className="mj-btn mj-btn-edit"
//                           onClick={() => navigate(`/edittask/${task._id}`)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="mj-btn mj-btn-delete"
//                           onClick={() => handleDelete(task._id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="mj-empty">
//                     {search || isCompleted !== "" ? "No matching tasks found." : "No tasks added yet."}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         {pagination.pages > 1 && (
//           <div className="mj-pagination">
//             <button
//               className="mj-page-btn"
//               onClick={() => setPage((p) => p - 1)}
//               disabled={page <= 1}
//             >
//               ← Prev
//             </button>
//             <span className="mj-page-info">
//               Page {page} of {pagination.pages}
//             </span>
//             <button
//               className="mj-page-btn"
//               onClick={() => setPage((p) => p + 1)}
//               disabled={page >= pagination.pages}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// }

// export default Tasks;

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/axios";
import toast from "react-hot-toast";
import { Container } from "react-bootstrap";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isCompleted, setIsCompleted] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  const navigate = useNavigate();
  const axios = useAxios();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/tasks/getall", {
        params: { search, isCompleted, page, limit: 10 },
      });
      setTasks(data.tasks);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }, [search, isCompleted, page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilter = (e) => {
    setIsCompleted(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const { data } = await axios.delete(`/tasks/${id}`);
      if (data.success) {toast.success("Task deleted");
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setPagination((prev) => ({ ...prev, total: prev.total - 1 }));}
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete task.");
    }
  };

  const handleToggle = async (task) => {
    try {
      const { data } = await axios.patch(`/tasks/${task._id}/toggle`);
      if (data.success || data) {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === task._id ? { ...t, isCompleted: !t.isCompleted } : t
          )
        );
        toast.success(`Marked as ${!task.isCompleted ? "completed" : "pending"}`);
      }
    } catch (err) {
      toast.error("Failed to update task.");
    }
  };

  return (
    <>
      <style>{`
        .tl-wrap {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          max-width: 680px;
          margin: 0 auto;
        }

        /* Header */
        .tl-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .tl-header h2 {
          font-family: 'Syne', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }
        .tl-btn-add {
          background: #0f172a;
          color: #fff;
          border: none;
          border-radius: 0.75rem;
          padding: 0.5rem 1.1rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .tl-btn-add:hover { background: #6366f1; }

        /* Controls */
        .tl-controls {
          display: flex;
          gap: 0.625rem;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
        }
        .tl-search-wrap {
          position: relative;
          flex: 1;
          min-width: 160px;
        }
        .tl-search-icon {
          position: absolute;
          left: 0.7rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 0.8rem;
          pointer-events: none;
        }
        .tl-search {
          width: 100%;
          padding: 0.5rem 0.875rem 0.5rem 2rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.6rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s;
          background: #fff;
        }
        .tl-search:focus { border-color: #6366f1; }
        .tl-search::placeholder { color: #94a3b8; }
        .tl-select {
          padding: 0.5rem 0.875rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.6rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #0f172a;
          outline: none;
          cursor: pointer;
          background: #fff;
          transition: border-color 0.15s;
        }
        .tl-select:focus { border-color: #6366f1; }

        /* Count */
        .tl-count {
          font-size: 0.8rem;
          color: #94a3b8;
          margin-bottom: 0.875rem;
        }
        .tl-count span { color: #6366f1; font-weight: 700; }

        /* Task list */
        .tl-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          animation: tlFadeUp 0.4s ease both;
        }
        @keyframes tlFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Task item */
        .tl-item {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 0.875rem;
          padding: 0.875rem 1rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .tl-item:hover {
          border-color: #c7d2fe;
          box-shadow: 0 2px 12px rgba(99,102,241,0.07);
        }
        .tl-item.completed {
          background: #fafafa;
          border-color: #f1f5f9;
        }

        /* Checkbox */
        .tl-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          flex-shrink: 0;
          cursor: pointer;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.15s, background 0.15s;
          background: #fff;
        }
        .tl-checkbox:hover { border-color: #6366f1; }
        .tl-checkbox.checked {
          background: #6366f1;
          border-color: #6366f1;
          color: #fff;
          font-size: 0.65rem;
        }

        /* Content */
        .tl-content { flex: 1; min-width: 0; }
        .tl-title {
          font-size: 0.9375rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.125rem;
        }
        .tl-title.done {
          text-decoration: line-through;
          color: #94a3b8;
        }
        .tl-desc {
          font-size: 0.8rem;
          color: #94a3b8;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0.375rem;
        }
        .tl-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .tl-badge {
          display: inline-block;
          padding: 0.125rem 0.5rem;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .tl-badge-completed { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
        .tl-badge-pending   { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
        .tl-date { font-size: 0.75rem; color: #cbd5e1; }

        /* Actions */
        .tl-actions {
          display: flex;
          gap: 0.3rem;
          flex-shrink: 0;
          align-items: center;
        }
        .tl-btn {
          padding: 0.25rem 0.6rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.15s;
        }
        .tl-btn-edit   { background: #eff6ff; color: #3b82f6; border-color: #bfdbfe; }
        .tl-btn-edit:hover   { background: #3b82f6; color: #fff; }
        .tl-btn-delete { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
        .tl-btn-delete:hover { background: #dc2626; color: #fff; }

        /* States */
        .tl-empty {
          text-align: center;
          padding: 3rem 1rem;
          color: #94a3b8;
        }
        .tl-empty-icon { font-size: 2rem; margin-bottom: 0.5rem; }
        .tl-empty-title { font-size: 0.9rem; font-weight: 600; color: #64748b; }
        .tl-empty-sub   { font-size: 0.8rem; margin-top: 0.25rem; }

        .tl-loading {
          text-align: center;
          padding: 3rem;
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .tl-error {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        /* Pagination */
        .tl-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }
        .tl-page-btn {
          padding: 0.4rem 1rem;
          border-radius: 0.6rem;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #334155;
          transition: all 0.15s;
        }
        .tl-page-btn:hover:not(:disabled) { background: #0f172a; color: #fff; border-color: #0f172a; }
        .tl-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .tl-page-info { font-size: 0.82rem; color: #94a3b8; padding: 0 0.25rem; }

        @media (max-width: 480px) {
          .tl-desc { display: none; }
          .tl-btn span { display: none; }
        }
      `}</style>

      <Container>
        <div className="tl-wrap">

          {/* Header */}
          <div className="tl-header">
            <h2>My Tasks</h2>
            <button className="tl-btn-add" onClick={() => navigate("/addtask")}>
              + New Task
            </button>
          </div>

          {/* Error */}
          {error && <div className="tl-error">⚠ {error}</div>}

          {/* Controls */}
          <div className="tl-controls">
            <div className="tl-search-wrap">
              <span className="tl-search-icon">🔍</span>
              <input
                type="text"
                className="tl-search"
                placeholder="Search tasks..."
                value={search}
                onChange={handleSearch}
              />
            </div>
            <select className="tl-select" value={isCompleted} onChange={handleFilter}>
              <option value="">All</option>
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>

          {/* Count */}
          <p className="tl-count">
            <span>{pagination.total}</span> task{pagination.total !== 1 ? "s" : ""}
          </p>

          {/* List */}
          {loading ? (
            <div className="tl-loading">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="tl-empty">
              <div className="tl-empty-icon">📋</div>
              <div className="tl-empty-title">
                {search || isCompleted !== "" ? "No matching tasks" : "No tasks yet"}
              </div>
              <div className="tl-empty-sub">
                {search || isCompleted !== ""
                  ? "Try adjusting your filters."
                  : 'Click "+ New Task" to get started.'}
              </div>
            </div>
          ) : (
            <div className="tl-list">
              {tasks.map((task) => (
                <div key={task._id} className={`tl-item ${task.isCompleted ? "completed" : ""}`}>

                  {/* Checkbox */}
                  <div
                    className={`tl-checkbox ${task.isCompleted ? "checked" : ""}`}
                    onClick={() => handleToggle(task)}
                    title={task.isCompleted ? "Mark as pending" : "Mark as done"}
                  >
                    {task.isCompleted && "✓"}
                  </div>

                  {/* Content */}
                  <div className="tl-content">
                    <div className={`tl-title ${task.isCompleted ? "done" : ""}`}>
                      {task.title}
                    </div>
                    {task.description && (
                      <div className="tl-desc" title={task.description}>
                        {task.description}
                      </div>
                    )}
                    <div className="tl-meta">
                      <span className={`tl-badge ${task.isCompleted ? "tl-badge-completed" : "tl-badge-pending"}`}>
                        {task.isCompleted ? "Completed" : "Pending"}
                      </span>
                      <span className="tl-date">
                        {new Date(task.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="tl-actions">
                    <button
                      className="tl-btn tl-btn-edit"
                      onClick={() => navigate(`/edittask/${task._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="tl-btn tl-btn-delete"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="tl-pagination">
              <button
                className="tl-page-btn"
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
              >
                ← Prev
              </button>
              <span className="tl-page-info">
                Page {page} of {pagination.pages}
              </span>
              <button
                className="tl-page-btn"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= pagination.pages}
              >
                Next →
              </button>
            </div>
          )}

        </div>
      </Container>
    </>
  );
}

export default Tasks;