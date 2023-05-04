import "./profile.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Posts, Update} from "../../components";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {useLocation} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context";


const Profile = () => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const userId = parseInt(useLocation().pathname.split('/')[2])

    const {isLoading, data} = useQuery(["user"], () =>
        makeRequest.get('/users/find/' + userId).then((res) => {
            return res.data
        })
    );

    const {isLoading: risLoading, data: relationshipsData} = useQuery(["relationships"], () =>
        makeRequest.get('/relationships?followedUserId=' + userId).then((res) => {
            return res.data
        })
    );

    // console.log(relationshipsData, '!1')

    const queryClient = useQueryClient();

    const mutation = useMutation((following) => {
        // 2.1 якщо following = true - видаляємо підписку
        if (following) return makeRequest.delete('/relationships?userId=' + userId)
        // 2.2 якщо following = false - підписe'vjcz
        return makeRequest.post('/relationships', {userId})
    }, {
        onSuccess: () => {
            // 3 при успіщному запиті, вказуємо, що оновити у []
            // в нашому випадку це 245 рядок - user
            queryClient.invalidateQueries(["relationships"])
        }
    });

    const handleFollow = () => {
        // 1. натискання кнопки, якщо звязки містять id поточного юзера(true в 40 рядку)
        // і якщо не містять (false в 40 рядку)
        mutation.mutate(relationshipsData.includes(currentUser.id))
    };

    return (
        <div className={'profile'}>
            <div className="images">
                <img
                    src={isLoading ? 'loading' : "/upload/"+data.coverPic}
                    alt="" className="cover"/>
                <img
                    src={isLoading ? 'loading' : "/upload/"+data.profilePic}
                    alt="" className="profilePic"/>
            </div>
            <div className="profileContainer">
                <div className="container">
                    <div className="uInfo">
                        <div className="left">
                            <a href="https://facebook.com" target={"_blank"} rel="noreferrer">
                                <FacebookTwoToneIcon fontSize="large"/>
                            </a>
                            <a href="https://facebook.com" target={"_blank"} rel="noreferrer">
                                <InstagramIcon fontSize="large"/>
                            </a>
                            <a href="https://facebook.com" target={"_blank"} rel="noreferrer">
                                <TwitterIcon fontSize="large"/>
                            </a>
                            <a href="https://facebook.com" target={"_blank"} rel="noreferrer">
                                <LinkedInIcon fontSize="large"/>
                            </a>
                            <a href="https://facebook.com" target={"_blank"} rel="noreferrer">
                                <PinterestIcon fontSize="large"/>
                            </a>
                        </div>
                        <div className="center">
                            <span>{isLoading ? 'loading' : data.name}</span>
                            <div className="info">
                                <div className="item">
                                    <PlaceIcon/>
                                    <span>{isLoading ? 'loading' : data.city}</span>
                                </div>
                                <div className="item">
                                    <LanguageIcon/>
                                    <span>{isLoading ? 'loading' : data.website}</span>
                                </div>
                            </div>
                            {risLoading ? "loading" : userId === currentUser.id ? (
                                    <button onClick={() => setOpenUpdate(true)}>update</button>) :
                                <button onClick={handleFollow}>
                                    {relationshipsData.includes(currentUser.id)
                                        ? "Following"
                                        : "Follow"}
                                </button>}
                        </div>
                        <div className="right">
                            <EmailOutlinedIcon/>
                            <MoreVertIcon/>
                        </div>
                    </div>
                </div>
                <Posts userId={userId}/>
            </div>
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
        </div>
    )
};

export {Profile};
