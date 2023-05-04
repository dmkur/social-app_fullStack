import "./home.scss";
import {Posts, Stories, Share} from "../../components";


const Home = () => {
    return (
        <div className={'home'}>
            <Stories/>
            <Share/>
            <Posts/>
        </div>
    );
};

export {Home};
