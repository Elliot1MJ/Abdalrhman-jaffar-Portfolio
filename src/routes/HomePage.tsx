import { Link } from "react-router-dom";
import myPic from "../assets/images/myPic.jpg";
import BlisscetImg from "../assets/images/projects-Images/MERN/E-commerce-store.png";
import TodoAppImg from "../assets/images/projects-Images/React/TodoApp-website-main.png";
import {
    FaHtml5,
    FaCss3,
    FaJs,
    FaReact,
    FaNodeJs,
    FaStar,
    FaExternalLinkSquareAlt,
} from "react-icons/fa";
import {
    SiTypescript,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiGithub,
} from "react-icons/si";
import "../index.css";

const HomePage = () => {
    return (
        <>
            <div className="homePage">
                <div className="homePageStyle">
                    {/* About Me */}
                    <div className="aboutMe">
                        <div className="myInf">
                            <div className="hpMyName">
                                Hi, I'm Abdalrhman Mohammed Jaffar
                                <br />A Full Stack Developer
                            </div>
                            <div className="hpWorkInf">
                                I'm a passionate developer who loves creating
                                beautiful, functional, and user-friendly web
                                applications. With expertise in modern web
                                technologies, I bring ideas to life through
                                clean code and intuitive design. When I'm not
                                coding, you'll find me exploring new
                                technologies, contributing to open-source
                                projects, or sharing knowledge with the
                                developer community.
                            </div>
                            <div className="hpInfBtns">
                                <Link to={"/contact"}>
                                    <button className="hireMeBtn allBtns">
                                        Hire Me
                                    </button>
                                </Link>

                                <Link to={"/about"}>
                                    <button className="moreAboutMeBtn allBtns">
                                        More about me
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="imgPreview">
                            <img src={myPic} className="hpMyPic" />
                        </div>
                    </div>

                    <div className="line"></div>

                    {/* Skills */}
                    <div className="skills">
                        <div className="SkillTitle">
                            <FaStar size={25} /> Technical Skills{" "}
                            <FaStar size={25} />
                            <br />
                            (Front & Back)
                        </div>

                        <div className="skillsLines">
                            {/* HTML */}
                            <div className="lineItem">
                                <FaHtml5 size={45} />
                                <div className="lineItemName">HTML5</div>
                            </div>

                            {/* CSS */}
                            <div className="lineItem">
                                <FaCss3 size={40} />
                                <div className="lineItemName">CSS3</div>
                            </div>

                            {/* JS */}
                            <div className="lineItem">
                                <FaJs size={40} />
                                <div className="lineItemName">Javascript</div>
                            </div>

                            {/* Ts */}
                            <div className="lineItem">
                                <SiTypescript size={35} />
                                <div className="lineItemName">Typescript</div>
                            </div>

                            {/* React */}
                            <div className="lineItem">
                                <FaReact size={40} />
                                <div className="lineItemName">React js</div>
                            </div>

                            {/* Node js */}
                            <div className="lineItem">
                                <FaNodeJs size={45} />
                                <div className="lineItemName">Node Js</div>
                            </div>

                            {/* Express js */}
                            <div className="lineItem">
                                <SiExpress size={40} />
                                <div className="lineItemName">Express js</div>
                            </div>

                            {/* Mongodb */}
                            <div className="lineItem">
                                <SiMongodb size={40} />
                                <div className="lineItemName">Mongodb</div>
                            </div>

                            {/* mySQL */}
                            <div className="lineItem">
                                <SiMysql size={40} />
                                <div className="lineItemName">MySQL</div>
                            </div>
                        </div>
                    </div>

                    <div className="line"></div>

                    {/* Featured Projects */}
                    <div className="featuredProjects">
                        {/* Title */}
                        <div className="featuredProjectsTitle">
                            <FaStar size={25} /> Featured Projects{" "}
                            <FaStar size={25} />
                        </div>

                        {/* Last Projects */}
                        <div className="hpTempProjects">
                            <div className="hpTempProjectCon">
                                <img
                                    src={BlisscetImg}
                                    className="hpTempProjectImg"
                                />
                                <div className="hpTempProjectTitle">
                                    Blisscet Store
                                </div>
                                <div className="hpTempProjectBtnCon">
                                    <Link
                                        to={
                                            "https://github.com/Elliot1MJ/BlisscetStore-Website-MERN"
                                        }
                                        target="_blank"
                                    >
                                        <button className="gitHub allBtns">
                                            <SiGithub /> Github
                                        </button>
                                    </Link>
                                    <Link
                                        to={
                                            "https://blisscet-store-website-mern.vercel.app"
                                        }
                                        target="_blank"
                                    >
                                        <button className="Live allBtns">
                                            <FaExternalLinkSquareAlt /> Live
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="hpTempProjectCon">
                                <img
                                    src={TodoAppImg}
                                    className="hpTempProjectImg"
                                />
                                <div className="hpTempProjectTitle">
                                    Todo App
                                </div>
                                <div className="hpTempProjectBtnCon">
                                    <Link
                                        to={
                                            "https://github.com/Elliot1MJ/TodoApp-website_React"
                                        }
                                        target="_blank"
                                    >
                                        <button className="gitHub allBtns">
                                            <SiGithub /> Github
                                        </button>
                                    </Link>
                                    <Link
                                        to={
                                            "https://todo-app-website-react.vercel.app/"
                                        }
                                        target="_blank"
                                    >
                                        <button className="Live allBtns">
                                            <FaExternalLinkSquareAlt /> Live
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* More Project */}
                        <Link to={"/projects"}>
                            <div className="moreProjects allBtns">
                                Click here For More Projects
                            </div>
                        </Link>
                    </div>

                    <div className="line"></div>

                    {/* Order a Website */}
                    <div className="orderWebsite">
                        <div className="wayToContact">
                            Have an idea about a project? <FaStar />
                        </div>
                        <div className="owMainText">
                            <div>Ready to bring your vision to life?</div>
                            <div>
                                Whether you need a stunning portfolio, a
                                powerful business site, or a custom web app, I’m
                                here to help! Let’s create something amazing
                                together—just click the button below to get
                                started.
                            </div>
                        </div>
                        <Link to={"/contact"}>
                            <button className="sendMsg allBtns">
                                Send message here
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
