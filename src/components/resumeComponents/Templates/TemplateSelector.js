import { useTemplate } from "../../../context/TemplateContext";
import { useNavigate } from "react-router-dom";

// Import all template images
import template1 from "../../../img/TemplateImg/template1.png";
// import template2 from "../../../img/TemplateImg/template2.png";
// import template3 from "../../../img/TemplateImg/template3.png";

// Map template names to images
const templateImages = {
  template1,
  // template2,
  // template3
};

const TemplateSelector = () => {
  const { setSelectedTemplate } = useTemplate();
  const navigate = useNavigate();

  const templates = ["template1"];

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    navigate("/create-resume");
  };

  return (
    <>
      {/* <div className="container-xxl position-relative p-0" id="no-print">
        <div className="container-xxl py-5 hero-header">
          <div className="container my-5 py-5 px-lg-5">
            <div className="row g-5 py-5">
              <div className="col-12 text-center">
                <h1 className="text-white animated slideInDown">Choose Your Resume Template</h1>
                <hr className="bg-white mx-auto mt-0" style={{ width: "90px" }} />
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item">
                      <a className="text-white contct-links" href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item text-white active" aria-current="page">
                      Templates
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container mt-4">
        <div className="wow fadeInUp my-5" data-wow-delay="0.1s">
          <p className="section-title text-secondary justify-content-center"><span></span>Templates<span></span></p>
          <h1 className="text-center mb-5">Select Your Template</h1>
        </div>
        <div className="row">
          {templates.map((template) => (
            <div
              key={template}
              className="col-md-4 mb-5"
              onClick={() => selectTemplate(template)}
              style={{ cursor: "pointer" }}
            >
              <div className="card p-2 shadow-sm h-100">
                <h5 className="text-center">{template.toUpperCase()}</h5>
                <img
                  src={templateImages[template]}
                  alt={template}
                  className="img-fluid rounded"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplateSelector;
