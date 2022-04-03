import React, { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getSettingFromLocalStorage, SaveSettingsToLocalStorage } from "./services/SettingsServices";

export const  AppSettingsContext = React.createContext({});

const AppSettingProvider = (props) => {
    
    const [AppSettings, setAppSettings] = useState(getSettingFromLocalStorage());

    const [t, i18n] = useTranslation();
    const toggleAppMode = () => {
        let mode = AppSettings.mode === 'light' ? 'dark' : 'light';
        setAppSettings({...AppSettings,mode})
    }
    const setAppLang = (lang) => {
        setAppSettings({ ...AppSettings, lang })
        SaveSettingsToLocalStorage(AppSettings);
        i18n.changeLanguage(lang);
    }

    
    useEffect(() => {
        i18n.changeLanguage(AppSettings.lang);
    }, []);

    useEffect(() => {
        SaveSettingsToLocalStorage(AppSettings);
        i18n.changeLanguage(AppSettings.lang);
    }, [AppSettings]);
    return (
        <AppSettingsContext.Provider value={{ AppSettings ,toggleAppMode,setAppLang }}>
            {props.children}
        </AppSettingsContext.Provider>
    )





}

export default AppSettingProvider;