import { useEffect } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminLayout() {

  const { isAuthenticated } = useSelector((state) => state.auth); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className=''>
        { isAuthenticated ? <Layout/> : navigate('/login')}
    </div>
  )
}

export default AdminLayout