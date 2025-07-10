import { useState } from "react";
import data from "./projectsData.json";
import type { projectsData } from "../dataDto";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../index.css";

const ProjectsPage = () => {
    const [filter, setFilter] = useState("all");
    let projectsData: projectsData[] = data;

    return (
        <>
            <div className="projects">
                <div className="projectsStyle">
                    {/* filters */}
                    <div className="filter">
                        <div
                            className={
                                filter === "all" ? "activeFilter all" : "all"
                            }
                            onClick={() => setFilter("all")}
                        >
                            All
                        </div>
                        <div
                            className={
                                filter === "js" ? "activeFilter js" : "js"
                            }
                            onClick={() => setFilter("js")}
                        >
                            Javascript
                        </div>
                        <div
                            className={
                                filter === "react"
                                    ? "activeFilter react"
                                    : "react"
                            }
                            onClick={() => setFilter("react")}
                        >
                            React
                        </div>
                        <div
                            className={
                                filter === "mern" ? "activeFilter mern" : "mern"
                            }
                            onClick={() => setFilter("mern")}
                        >
                            Full Stack
                        </div>
                    </div>

                    {/* Projects */}
                    <div className="projectsCon">
                        {projectsData.map((project, index) =>
                            filter === "all" ? (
                                <div key={index} className="projectCard">
                                    <div className="projectCate">
                                        {project.category}
                                    </div>
                                    <img
                                        src={project.image}
                                        className="projectImg"
                                    />
                                    <div className="projectName">
                                        {project.name}
                                    </div>
                                    <div className="projectBtns">
                                        <Link
                                            to={project.gitHubURL}
                                            target="_blank"
                                            className="githubBtn"
                                        >
                                            <FaGithub size={20} /> GitHub
                                        </Link>
                                        <Link
                                            to={project.LiveWebAppURL}
                                            target="_blank"
                                            className="liveBtn"
                                        >
                                            <FaExternalLinkAlt size={20} /> Live
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                project.category === filter && (
                                    <div key={index} className="projectCard">
                                        <div className="projectCate">
                                            {project.category}
                                        </div>
                                        <img
                                            src={project.image}
                                            className="projectImg"
                                        />
                                        <div className="projectName">
                                            {project.name}
                                        </div>
                                        <div className="projectBtns">
                                            <Link
                                                to={project.gitHubURL}
                                                target="_blank"
                                                className="githubBtn"
                                            >
                                                <FaGithub size={20} /> GitHub
                                            </Link>
                                            <Link
                                                to={project.LiveWebAppURL}
                                                target="_blank"
                                                className="liveBtn"
                                            >
                                                <FaExternalLinkAlt size={20} />{" "}
                                                Live
                                            </Link>
                                        </div>
                                    </div>
                                )
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectsPage;
