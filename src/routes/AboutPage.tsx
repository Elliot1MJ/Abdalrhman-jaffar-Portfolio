import { FaStar, FaCode, FaGraduationCap, FaLanguage } from "react-icons/fa";
import { FiGitPullRequest } from "react-icons/fi";
import myPic from "../assets/images/myPic.jpg";
import "../index.css";

const AboutPage = () => {
    return (
        <>
            <div className="aboutPage">
                <div className="aboutPageStyle">
                    {/* MyImg */}
                    <img src={myPic} className="hpMyPic" />

                    {/* About Text */}
                    <div className="aboutText">
                        <div className="aboutHeadText">
                            Hi, This is Abdalrhman Mohammed Jaffar, a
                            21-year-old Computer Science Engineering student
                            from Syria.
                        </div>
                        <div className="aboutMainText">
                            Currently I'm in my third year at Lattakia
                            University (formerly Tishreen University), I'm
                            passionate about full-stack development and creating
                            efficient, user-friendly web applications. My
                            technical journey focuses on JavaScript ecosystems,
                            particularly React and Node.js. I enjoy solving
                            complex problems and turning ideas into functional
                            applications that provide real value to users. When
                            I'm not coding, I'm learning new technologies,
                            contributing to open-source projects, or improving
                            my language skills in English and Turkish.
                        </div>
                    </div>

                    <div className="line"></div>

                    {/* Education */}
                    <div className="edu">
                        <div className="eduTitle">
                            <FaStar /> Education <FaStar />
                        </div>
                        <div className="eduInf">
                            <div>Bachelor of Computer Science Engineering</div>
                            <div>
                                Lattakia University (formerly Tishreen
                                University)
                            </div>
                            <div>
                                <span>Location:</span> Lattakia, Syria
                            </div>
                            <div>
                                <span>Duration:</span> 2022 - 2028 (Expected)
                            </div>
                            <div>
                                <span>Current Status:</span> 3rd Year Student
                            </div>
                            <div>
                                <span>Relevant Coursework:</span> Data
                                Structures, Algorithms, Database Systems, Web
                                Development, Software Engineering
                            </div>
                        </div>
                    </div>

                    <div className="line"></div>

                    {/* Stats */}
                    <div className="stats">
                        {/* Title */}
                        <div className="statsTitle">
                            <FaStar /> Stats <FaStar />
                        </div>

                        {/* Stats Inf */}
                        <div className="statsInfCon">
                            <div className="statsBox">
                                <FaCode size={50} />
                                <div>+2 Years Experience</div>
                            </div>

                            <div className="statsBox">
                                <FiGitPullRequest size={50} />
                                <div>+17 Projects Completed</div>
                            </div>

                            <div className="statsBox">
                                <FaLanguage size={50} />
                                <div>3 Languages</div>
                            </div>

                            <div className="statsBox">
                                <FaGraduationCap size={50} />
                                <div>3rd University Year</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
