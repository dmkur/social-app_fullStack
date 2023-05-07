import "./navBar.scss";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext, DarkModeContext} from "../../context";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const NavBar = () => {
    const {toggle, darkMode} = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="navBar">
            <div className="left">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span>dmkursocial</span>
                </Link>
                <HomeOutlinedIcon/>
                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggle}/>
                ) : (
                    <DarkModeOutlinedIcon onClick={toggle}/>
                )}
                <GridViewOutlinedIcon/>
                <div className={"search"}>
                    <SearchOutlinedIcon/>
                    <input type="text" placeholder={"Search"}/>
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon/>
                <EmailOutlinedIcon/>
                <NotificationsOutlinedIcon/>
                <div className="user">
                    <img
                        src={"/upload/" + currentUser.profilePic}
                        alt=""
                    />
                    <Link to={'/profile/' + currentUser.id} style={{textDecoration: "none"}}>
                        <span>{currentUser.name}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export {NavBar};
