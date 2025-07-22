import { Outlet } from "react-router-dom";
import "./index.css";
import NavigationBar from "./components/NavigationBar";
import FooterSection from "./components/FooterSection";

const MainWebsitePage = () => {
    return (
        <>
            <NavigationBar />
            <div className="main-content">
                <Outlet />
            </div>
            <FooterSection />
        </>
    );
};

export default MainWebsitePage;
