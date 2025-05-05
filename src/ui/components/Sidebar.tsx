import { FaUsers } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectClientsSender } from "../../redux/client/clientSelectors";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const clientSender = useSelector(selectClientsSender);

    return (
        <div>
            <li className="text-xs opacity-60 tracking-wide">{clientSender?.username}</li> 
            <div className="h-[90vh] flex flex-col justify-between">
                {/* haut */}
                <div className="flex flex-col items-center gap-1">
                    <NavLink to="/admin/test"><div className="hover:bg-[#aca8a82f] p-2 rounded-full h-[50px] w-[50px] flex flex-row items-center justify-center cursor-pointer"><i className="text-[25px] "><MdOutlineMessage /></i></div></NavLink>
                    <div className="hover:bg-[#aca8a82f] p-2 rounded-full h-[50px] w-[50px] flex flex-row items-center justify-center cursor-pointer"><i className="text-[25px] "><FaUsers /></i></div>
                </div>

                {/* bas */}
                <div className="flex flex-col items-center gap-1">
                    <div className="hover:bg-[#aca8a82f] p-2 rounded-full h-[50px] w-[50px] flex flex-row items-center justify-center cursor-pointer"><i className="text-[25px] "><IoSettingsOutline /></i></div>
                    <div className="hover:bg-[#aca8a82f] p-2 rounded-full h-[50px] w-[50px] flex flex-row items-center justify-center cursor-pointer"><i className="text-[25px] "><IoIosLogOut /></i></div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

