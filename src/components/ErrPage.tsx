import SadFace from "../assets/images/sad-circle-svgrepo-com.svg";
import "../index.css";

const ErrPage = () => {
    return (
        <div className="errPage">
            <div className="errPageStyle">
                <img src={SadFace} className="sadFaceImg" />
                <div className="errStatus">404</div>
                <div className="errStatusType">Page not found</div>
                <div className="errMsg">
                    The page you are looking for doesn't exisit or an error
                    accourd.
                </div>
            </div>
        </div>
    );
};

export default ErrPage;
