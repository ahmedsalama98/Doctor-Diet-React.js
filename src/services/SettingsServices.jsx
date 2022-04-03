

export const getSettingFromLocalStorage= ()=>{

    let settingsFromLocalStorage = localStorage.getItem('APP_SETTINGS');
    let defaultSettings = {
        mode: 'light',
        lang: 'en'
    };

    
    let AppSettings = settingsFromLocalStorage !== undefined && settingsFromLocalStorage!=null ? JSON.parse(settingsFromLocalStorage) : defaultSettings;

    
    return AppSettings;
}

export const SaveSettingsToLocalStorage = (appSettings) => {
    localStorage.setItem('APP_SETTINGS', JSON.stringify(appSettings));
}