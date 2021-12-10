import React, { useState } from 'react';
import '../css/Language.css';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
 
let len;
let idimoSel;

const Idioma = () => {
    const [Form, IdiomaSel] = useState({
        idioma: idimoSel
    });
    const [languagebar, setLanguagebar] = useState(false);
    let [languageSel, changeLanguageSel] = useState("CAT");

    const showLanguagebar = () => setLanguagebar(!languagebar);
    const setLanguageSel = (language) => changeLanguageSel(language);

    const setLangauge = (idimoSel) => {
        switch(idimoSel) {
            case "1":
                i18n.changeLanguage("ca");
                languageSel = "CAT";
                break;
            case "2":
                i18n.changeLanguage("es");
                languageSel = "ESP";
                break;
            default:
                i18n.changeLanguage("ca");
                languageSel = "CAT";
                break;
        }

        setLanguageSel(languageSel);
    };

    //Maneja la edición e inserción en los forms
    const handleChange = e => {
        IdiomaSel({ [Form.idioma]: e.target.className });

        len = e.target.className;
        idimoSel=len;

        switch(len) {
            case "1":
                i18n.changeLanguage("ca");
                languageSel = "CAT";
                break;
            case "2":
                i18n.changeLanguage("es");
                languageSel = "ESP";
                break;
            default:
                i18n.changeLanguage("ca");
                languageSel = "CAT";
                break;
        }

        showLanguagebar();
        setLanguageSel(languageSel);
    }

    const { i18n } = useTranslation();

    if (idimoSel !== undefined && idimoSel !== '1' && languageSel === 'CAT') {
        setLangauge(idimoSel);
    }

    return (
        <IdiomaNav>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="nav">
                    <span>{languageSel}</span>
                    <div className="navicon">
                        <NavLink to='#'>
                            <FaIcons.FaBars onClick={showLanguagebar} />
                        </NavLink>
                    </div>
                </div>
                {(languagebar)
                    ? <ul>
                        <DropdownLanguage>
                            <li onClick={handleChange}>
                                <div value="1" className="1">CAT</div>
                            </li>
                        </DropdownLanguage>
                        <DropdownLanguage>
                            <li onClick={handleChange}>
                                <div value="2" className="2">ESP</div>
                            </li>
                        </DropdownLanguage>
                    </ul>
                    : null}
            </IconContext.Provider>
        </IdiomaNav>
    );
};

const IdiomaNav = styled.nav`
    width: 100px;
    position: absolute;
    top: 0;
    right: 0;
    transition: 350ms;
    z-index: 10;
    float: right;
`;

const DropdownLanguage = styled.nav`
    background-color: gray;
    padding: 5px;
    text-align: center;
    color: white;
    &:hover {
        cursor: pointer;
        color: #0a58ca;
    }
`;

export default Idioma
