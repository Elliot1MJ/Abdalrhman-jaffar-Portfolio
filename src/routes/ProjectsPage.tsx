import { useState } from "react";
import type { projectsData } from "../dataDto";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../index.css";

// images
// JS
// import ageCalculator from "../assets/images/projects-Images/JS/age-calculator-app.png";
import sunnysideAgency from "../assets/images/projects-Images/JS/Sunnyside-Agency-LP.png";
import bookMarkMaster from "../assets/images/projects-Images/JS/Book-Mark-Master-LP.png";
import contactFormPage from "../assets/images/projects-Images/JS/contact-form-main.png";
import CURDSApp from "../assets/images/projects-Images/JS/CURDS-app.png";
// import mortgageCalculator from "../assets/images/projects-Images/JS/mortgage-repayment-calculator-app.png";
import multiStepApp from "../assets/images/projects-Images/JS/Multi-Step-App.png";
import productListApp from "../assets/images/projects-Images/JS/product-list-with-cart-app.png";

// react
import faqAccordionPage from "../assets/images/projects-Images/React/faq-accordion-main.png";
import interactiveRatingPage from "../assets/images/projects-Images/React/interactive-rating-component-main.png";
import articlePreviewPage from "../assets/images/projects-Images/React/article-preview-component-master.png";
import baseApparelPage from "../assets/images/projects-Images/React/base-apparel-coming-soon-master.png";
import introSignupFormPage from "../assets/images/projects-Images/React/intro-component-with-signup-form-master.png";
import pingComingSoonPage from "../assets/images/projects-Images/React/ping-coming-soon-page-master.png";
import todoApp from "../assets/images/projects-Images/React/TodoApp-website-main.png";
import weatherApp from "../assets/images/projects-Images/React/WeatherApp.png";
// mern
import blisscetStore from "../assets/images/projects-Images/MERN/E-commerce-store.png";

export let data = [
    // {
    //     name: "Age Calculator App",
    //     category: "js",
    //     image: ageCalculator,
    //     gitHubURL: "https://github.com/Elliot1MJ/AgeCalculator-Website_JS",
    //     LiveWebAppURL: "https://age-calculator-website-js.vercel.app/",
    // },
    {
        name: "Sunnyside Agency",
        category: "js",
        image: sunnysideAgency,
        gitHubURL: "https://github.com/Elliot1MJ/SunnysideAgencyLP-Website_JS",
        LiveWebAppURL: "https://age-calculator-website-js-zbka.vercel.app/",
    },
    {
        name: "Book Mark Master",
        category: "js",
        image: bookMarkMaster,
        gitHubURL: "https://github.com/Elliot1MJ/BookMarkMasterLP-Website_JS",
        LiveWebAppURL: "https://book-mark-master-lp-website-js.vercel.app/",
    },
    {
        name: "Contact Form Page",
        category: "js",
        image: contactFormPage,
        gitHubURL: "https://github.com/Elliot1MJ/ContactFormMain-Website_JS",
        LiveWebAppURL: "https://contact-form-main-website-js.vercel.app/",
    },
    {
        name: "CURDS App",
        category: "js",
        image: CURDSApp,
        gitHubURL: "https://github.com/Elliot1MJ/CURDSApp-Website_JS",
        LiveWebAppURL: "https://curds-app-website-js.vercel.app/",
    },
    // {
    //     name: "Mortgage Calculator",
    //     category: "js",
    //     image: mortgageCalculator,
    //     gitHubURL:
    //         "https://github.com/Elliot1MJ/MortgageRepaymentCalculatorApp-Website_JS",
    //     LiveWebAppURL:
    //         "https://mortgage-repayment-calculator-app-w.vercel.app/",
    // },
    {
        name: "Multi Step App",
        category: "js",
        image: multiStepApp,
        gitHubURL: "https://github.com/Elliot1MJ/MultiStepApp-Website_JS",
        LiveWebAppURL: "https://multi-step-app-website-js.vercel.app/",
    },
    {
        name: "Product List App",
        category: "js",
        image: productListApp,
        gitHubURL:
            "https://github.com/Elliot1MJ/ProductListWithCart-Website_JS",
        LiveWebAppURL: "https://product-list-with-cart-website-js.vercel.app/",
    },
    {
        name: "Faq Accordion Page",
        category: "react",
        image: faqAccordionPage,
        gitHubURL: "https://github.com/Elliot1MJ/FaqAccordion-Website-React",
        LiveWebAppURL: "https://faq-accordion-website-react.vercel.app/",
    },
    {
        name: "Interactive Rating Page",
        category: "react",
        image: interactiveRatingPage,
        gitHubURL:
            "https://github.com/Elliot1MJ/InteractiveRatingComponent-Website_React",
        LiveWebAppURL:
            "https://interactive-rating-component-websit.vercel.app/",
    },
    {
        name: "Article Preview Page",
        category: "react",
        image: articlePreviewPage,
        gitHubURL:
            "https://github.com/Elliot1MJ/ArticlePreviewComponent-Website_React",
        LiveWebAppURL:
            "https://article-preview-component-website-r.vercel.app/",
    },
    {
        name: "Base Apparel Page",
        category: "react",
        image: baseApparelPage,
        gitHubURL:
            "https://github.com/Elliot1MJ/BaseApparelComingSoon-Website_React",
        LiveWebAppURL:
            "https://base-apparel-coming-soon-website-re.vercel.app/",
    },
    {
        name: "Intro Signup Form Page",
        category: "react",
        image: introSignupFormPage,
        gitHubURL: "https://github.com/Elliot1MJ/IntroSignupForm-Website_React",
        LiveWebAppURL: "https://intro-signup-form-website-react.vercel.app/",
    },
    {
        name: "Ping Coming Soon Page",
        category: "react",
        image: pingComingSoonPage,
        gitHubURL: "https://github.com/Elliot1MJ/PingComingSoon-Website-React",
        LiveWebAppURL: "https://ping-coming-soon-website-react.vercel.app/",
    },
    {
        name: "Todo App",
        category: "react",
        image: todoApp,
        gitHubURL: "https://github.com/Elliot1MJ/TodoApp-website_React",
        LiveWebAppURL: "https://todo-app-website-react.vercel.app/",
    },
    {
        name: "Weatherly App",
        category: "react",
        image: weatherApp,
        gitHubURL: "https://github.com/Elliot1MJ/WeatherApp-Website_React",
        LiveWebAppURL: "https://weather-app-website-react.vercel.app/",
    },
    {
        name: "Blisscet Store",
        category: "mern",
        image: blisscetStore,
        gitHubURL: "https://github.com/Elliot1MJ/BlisscetStore-Website-MERN",
        LiveWebAppURL: "https://blisscet-store-website-mern.vercel.app/login",
    },
];

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
