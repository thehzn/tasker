
import { useSelector } from "react-redux";


function Profile(){
const user = useSelector((state)=>state.auth.user);
    
   
   
    return(
        <>
        <style>{`
        .dashboard-section {
          min-height: 100vh;
          background: #0a0a14;
          display: flex;
          flex-direction:column;
           gap:40px;
          align-items: center;
          justify-content: center;
          
        }
        .dashboard-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          color: #fff;
          margin-top:0;
          padding-top:0px;
          font-size: clamp(2rem, 5vw, 3.5rem);
        }
          .dashboard-title span {
          background: linear-gradient(135deg, #7c6af7, #f76a8c);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
          .cards{
          display:flex;
          gap:20px;
          padding:20px;
          flex-wrap:wrap;
          justify-content:center;
         
          

          }
          /* AdminProfile.css */
.admin-page { background: #0a0a14; font-family: 'DM Sans',sans-serif; color: #e8e8f0; padding: 2.5rem 2rem; max-width: 680px; margin: 0 auto; min-height: 100vh; }
.admin-header { display: flex; align-items: center; gap: 1.2rem; margin-bottom: 2rem; }
.admin-avatar { width: 62px; height: 62px; border-radius: 50%; background: rgba(247,106,140,0.15); border: 1px solid rgba(247,106,140,0.25); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 800; color: #f76a8c; flex-shrink: 0; text-transform: uppercase; }
.admin-header h1 { font-size: 1.15rem; font-weight: 800; color: #fff; margin-bottom: 0.2rem; }
.admin-header p { font-size: 0.82rem; color: rgba(255,255,255,0.35); }
.admin-badge { display: inline-block; font-size: 0.68rem; padding: 2px 9px; border-radius: 100px; background: rgba(247,106,140,0.1); color: #f76a8c; border: 1px solid rgba(247,106,140,0.22); font-weight: 600; margin-top: 0.4rem; }
.admin-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 1.5rem 0; }
.admin-sec-title { font-size: 0.72rem; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 1rem; }
.admin-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
.admin-info-item { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 0.9rem 1rem; }
.admin-info-label { font-size: 0.7rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.3rem; }
.admin-info-value { font-size: 0.88rem; color: #fff; font-weight: 500; }
.admin-stat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
.admin-stat { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 1.1rem; text-align: center; }
.admin-stat-num { font-size: 1.6rem; font-weight: 800; }
.admin-stat-lbl { font-size: 0.72rem; color: rgba(255,255,255,0.3); margin-top: 0.2rem; }
          `}
          </style>

         <div className="dashboard-section">
            
      <h2 className="dashboard-title"><span> Profile page</span></h2>
      <div className="admin-header">
        <div className="admin-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
          
        </div>
      </div>

      <div className="admin-divider" />
        {/* Account info */}
      <p className="admin-sec-title">Account info</p>
      <div className="admin-info-grid">
        <div className="admin-info-item">
          <p className="admin-info-label">Name</p>
          <p className="admin-info-value">{user?.name}</p>
        </div>
        <div className="admin-info-item">
          <p className="admin-info-label">Email</p>
          <p className="admin-info-value">{user?.email}</p>
        </div>
        <div className="admin-info-item">
          <p className="admin-info-label">Role</p>
          <p className="admin-info-value" style={{ color: '#f76a8c' }}>
            {user?.role}
          </p>
        </div>
        <div className="admin-info-item">
          <p className="admin-info-label">Member since</p>
          <p className="admin-info-value">
            {new Date(user?.createdAt).toLocaleDateString('en-IN', {
              month: 'short', year: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="admin-divider" />
    
     
    </div>
        
        
        </>
    )


}
export default Profile;