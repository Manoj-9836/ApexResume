import { createContext, useState, useContext } from "react";

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => useContext(TemplateContext);
