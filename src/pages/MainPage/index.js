import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatPage } from '../ChatPage';
import { ListPage } from '../ListPage';
import './index.css';
import { CharacterService } from '../../services/characterService';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { SidebarItem } from '../../components/SidebarItem';
import { toPng } from 'html-to-image';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
import { CharacterData } from '../../classes/characterData';

/**
 * MainPage component <br/>
 * @return {JSX.Element} MainPage component <br/>
 */
export function MainPage() {
  const { i18n } = useTranslation();

  const characterServiceRef = useRef(new CharacterService(i18n.language));

  const [loadedCharacters, setLoadedCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(new CharacterData());
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    (async () => {
      const characterService = characterServiceRef.current;
      const characterDataList = await characterService.fetchCharacterDataList();
      setLoadedCharacters(characterDataList);
    })();
  }, []);

  useUpdateEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const onSubmit = useCallback((event, selected) => {
    setSelectedCharacter(selected);
  });

  const onExport = useCallback(async (event) => {
    const messageListDom = document.querySelector('.message-list');
    const dataUrl = await toPng(messageListDom, { backgroundColor: 'rgb(255, 247, 225)' });
    download(dataUrl, 'screenshot.png');
  });

  const onChangeLanguage = useCallback((event) => {
    const selectableLanguages = ['cn', 'en', 'jp', 'kr', 'th', 'tw', 'vi'];
    const currentLanguageIdx = selectableLanguages.indexOf(currentLanguage);
    const nextLanguage = selectableLanguages[(currentLanguageIdx + 1) % selectableLanguages.length];
    setCurrentLanguage(nextLanguage);
  }, [currentLanguage]);

  return (
    <main className="main-page">
      <Header title="momoTalk" onHelpClick={() => void open('https://github.com/MangoPomelo/momotalk')}/>
      <Sidebar>
        <SidebarItem title="export" onClick={onExport} icon='data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32"><path d="M22 12V8h20v4zm0 8h20v-4H22zm20 14V24H22v10H10l22 22 22-22z" fill="%23FFFFFF"/></svg>' />
        <SidebarItem title="language" onClick={onChangeLanguage} icon='data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1054 1024" width="32" height="32"><path d="M624.371688 106.134246H446.766569v-53.603155a51.99506 51.99506 0 0 0-103.99012 0v53.603155H166.600748a51.99506 51.99506 0 1 0 0 103.99012h48.957548A350.385953 350.385953 0 0 0 303.824824 393.0898a246.753188 246.753188 0 0 1-74.865739 11.614016 51.99506 51.99506 0 1 0 0 103.99012 350.743308 350.743308 0 0 0 167.420519-42.346492 349.492567 349.492567 0 0 0 167.241842 42.346492 51.99506 51.99506 0 1 0 0-103.99012 245.502448 245.502448 0 0 1-75.580448-11.614016 350.207276 350.207276 0 0 0 87.194465-183.680143h49.136225a51.99506 51.99506 0 1 0 0-103.99012zM395.486218 339.486645A246.038479 246.038479 0 0 1 321.692542 210.124366h148.838092a246.931865 246.931865 0 0 1-75.044416 129.362279zM1050.516766 841.390848L911.327241 496.186533a51.99506 51.99506 0 0 0-96.485678 0l-139.368201 345.204315a51.99506 51.99506 0 1 0 96.485678 38.951626l17.867718-44.133264h146.515289l17.867718 44.133264a52.173737 52.173737 0 0 0 48.242839 32.519247 53.603154 53.603154 0 0 0 19.475813-3.752221 51.99506 51.99506 0 0 0 28.588349-67.718652zM831.637218 732.576445l31.268507-77.545897L893.459523 732.576445zM549.327271 826.203288a51.816383 51.816383 0 0 0-24.300096-31.447184L393.163415 719.175656a51.99506 51.99506 0 1 0-51.637706 89.338591l44.669296 25.729514A229.778856 229.778856 0 0 1 105.135798 589.634699a51.99506 51.99506 0 1 0-103.632765-9.827245 333.768975 333.768975 0 0 0 332.339557 365.394837 318.760092 318.760092 0 0 0 47.170776-3.573544l-2.50148 4.46693a51.99506 51.99506 0 0 0 45.02665 77.903251 51.459028 51.459028 0 0 0 45.205326-26.265546l75.580448-132.042437a51.637705 51.637705 0 0 0 5.002961-39.487657z" fill="%23FFFFFF"/></svg>' />
      </Sidebar>
      <ListPage characters={loadedCharacters} onSubmit={onSubmit}/>
      <ChatPage character={selectedCharacter}/>
    </main>
  );
}

/**
 * Trigger downloading file
 * @param {string} dataUrl Given data url
 * @param {string} filename Filename to save
 */
function download(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}
