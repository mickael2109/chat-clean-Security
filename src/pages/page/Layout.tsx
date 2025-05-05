
import { Outlet, useNavigate } from 'react-router-dom';
import ClientList from '../../ui/components/ClientList';
import Sidebar from '../../ui/components/Sidebar';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Layout = () => {
    const navigate = useNavigate();
    const token = Cookies.get('___chat-token');

    useEffect(() => {
            if(!token){
                navigate("/");
            }
       }, [token,navigate])

    return (
        <div className='flex flex-row h-screen' >
            <div className='border-r border-[#ffffff17] p-5'>
                <Sidebar />
            </div>
            <div className='w-[500px] border-r border-[#ffffff17]'>
               <ClientList />
            </div>
            <div className='px-5 py-2 w-full'>
                <Outlet/>
            </div>
           
        </div>
    );
}

export default Layout;
