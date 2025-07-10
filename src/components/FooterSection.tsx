import { Link } from "react-router-dom";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import "../index.css";

const FooterSection = () => {
    return (
        <>
            <div className="footer">
                <div className="footerStyle">
                    <div className="presonalInf">
                        <div className="myName">Abdalrhman Mohammed Jaffar</div>
                        <div className="myEduWork">
                            Computer Science Engineering Student & Full Stack
                            Developer
                        </div>
                    </div>
                    <div className="contactBar">
                        <Link
                            to={"https://github.com/Elliot1MJ"}
                            target="_blank"
                            className="contactTag"
                        >
                            <FaGithub size={24} />
                        </Link>

                        <Link
                            to={"https://wa.me/qr/UG7XUCIS5KQRO1"}
                            target="_blank"
                            className="contactTag"
                        >
                            <FaWhatsapp size={24} />
                        </Link>

                        <Link
                            to={"mailto:dev.elliot.j@gmail.com"}
                            target="_blank"
                            className="contactTag"
                        >
                            <FiMail size={24} />
                        </Link>
                    </div>
                    <div className="copyRight">
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </div>
                </div>
            </div>
        </>
    );
};

export default FooterSection;
