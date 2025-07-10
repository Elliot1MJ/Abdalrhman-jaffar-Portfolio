import { FiHome } from "react-icons/fi";
import "../index.css";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NavigationBar = () => {
    const location = useLocation();
    const URLEndPoint = location.pathname;
    return (
        <>
            <motion.div
                className="navbar"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "tween" }}
            >
                <div className="navbarStyle">
                    <Link
                        to={"/"}
                        className={
                            URLEndPoint === "/"
                                ? "navTag activeNavTag"
                                : "navTag"
                        }
                    >
                        <FiHome size={22} />
                    </Link>

                    <Link
                        to={"/about"}
                        className={
                            URLEndPoint === "/about"
                                ? "navTag activeNavTag"
                                : "navTag"
                        }
                    >
                        About
                    </Link>

                    <Link
                        to={"/projects"}
                        className={
                            URLEndPoint === "/projects"
                                ? "navTag activeNavTag"
                                : "navTag"
                        }
                    >
                        Projects
                    </Link>

                    <Link
                        to={"/contact"}
                        className={
                            URLEndPoint === "/contact"
                                ? "navTag activeNavTag"
                                : "navTag"
                        }
                    >
                        Contact
                    </Link>

                    <Link
                        to={"/cv"}
                        className={
                            URLEndPoint === "/cv"
                                ? "navTag activeNavTag"
                                : "navTag"
                        }
                    >
                        CV
                    </Link>
                </div>
            </motion.div>
        </>
    );
};

export default NavigationBar;
