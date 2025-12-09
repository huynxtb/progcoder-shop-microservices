import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English", label: "EN" },
  { code: "vi", name: "Tiếng Việt", label: "VI" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    const lang = languages.find((lang) => lang.code === i18n.language);
    if (lang) {
      setCurrentLang(lang);
    }
  }, [i18n.language]);

  const handleChange = (e) => {
    const selectedCode = e.target.value;
    const selectedLang = languages.find((lang) => lang.code === selectedCode);
    if (selectedLang) {
      setCurrentLang(selectedLang);
      i18n.changeLanguage(selectedCode);
    }
  };

  return (
    <select
      name="language"
      id="top-header-language-dropdown"
      value={currentLang.code}
      onChange={handleChange}
      className="form-select"
      style={{ 
        border: "none", 
        background: "transparent", 
        cursor: "pointer",
        padding: "5px 10px"
      }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;

