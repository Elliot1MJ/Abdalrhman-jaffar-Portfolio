import myCVPDF from "../assets/Abdalrhman_Jaffar's_CV.pdf";
import "../index.css";

const CVPage = () => {
    return (
        <>
            <div className="cv">
                <div className="cvStyle">
                    <div className="cvBtns">
                        <a
                            href={myCVPDF}
                            target="_blank"
                            className="PDFViewBtn"
                        >
                            Open in PDF viewer
                        </a>
                        <a
                            href={myCVPDF}
                            target="_blank"
                            download
                            className="DownLoadPDFBtn"
                        >
                            Download PDF
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CVPage;
