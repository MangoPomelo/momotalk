import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatPage } from '../ChatPage';
import { ListPage } from '../ListPage';
import './index.css';
import { CharacterModel } from '../../models/characterModel';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { SidebarItem } from '../../components/SidebarItem';
import { toPng } from 'html-to-image';

/**
 * MainPage component <br/>
 * @return {JSX.Element} MainPage component <br/>
 */
export function MainPage() {
  const characterModelRef = useRef(new CharacterModel());

  const [loadedCharacters, setLoadedCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    (async () => {
      const model = characterModelRef.current;
      model.setLanguage(currentLanguage);
      const characterDataList = await model.fetchCharacterDataList();
      setLoadedCharacters(characterDataList);
    })();
  }, [currentLanguage]);

  const onSubmit = useCallback((event, selected) => {
    setSelectedCharacters(selected);
  });

  const onExport = useCallback(async (event) => {
    const messageListDom = document.querySelector('.message-list');
    const dataUrl = await toPng(messageListDom);
    download(dataUrl, 'screenshot.png');
  });

  const onChangeLanguage = useCallback((event) => {
    const selectableLanguages = ['ch', 'en', 'jp', 'kr', 'th', 'tw', 'vi'];
    const currentLanguageIdx = selectableLanguages.indexOf(currentLanguage);
    const nextLanguage = selectableLanguages[(currentLanguageIdx + 1) % selectableLanguages.length];
    setCurrentLanguage(nextLanguage);
  }, [currentLanguage]);

  return (
    <main className="main-page">
      <Header title="yuzuTalk" onHelpClick={() => void open('https://twitter.com/messages/compose?recipient_id=1390445620444291073&ref_src=twsrc%5Etfw')}/>
      <Sidebar>
        <SidebarItem title="export" onClick={onExport} icon='data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32"><path d="M22 12V8h20v4zm0 8h20v-4H22zm20 14V24H22v10H10l22 22 22-22z" fill="%23FFFFFF"/></svg>' />
        <SidebarItem title="language" onClick={onChangeLanguage} icon='data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path d="M24 23h-2.784l-1.07-3h-4.875l-1.077 3h-2.697l4.941-13h2.604l4.958 13zm-4.573-5.069l-1.705-4.903-1.712 4.903h3.417zm-9.252-10.804c.126-.486.201-.852.271-1.212l-2.199-.428c-.036.185-.102.533-.22 1-.742-.109-1.532-.122-2.332-.041.019-.537.052-1.063.098-1.569h2.456v-2.083h-2.161c.106-.531.198-.849.288-1.149l-2.147-.645c-.158.526-.29 1.042-.422 1.794h-2.451v2.083h2.184c-.058.673-.093 1.371-.103 2.077-2.413.886-3.437 2.575-3.437 4.107 0 1.809 1.427 3.399 3.684 3.194 2.802-.255 4.673-2.371 5.77-4.974 1.134.654 1.608 1.753 1.181 2.771-.396.941-1.561 1.838-3.785 1.792v2.242c2.469.038 4.898-.899 5.85-3.166.93-2.214-.132-4.635-2.525-5.793zm-2.892 1.531c-.349.774-.809 1.543-1.395 2.149-.09-.645-.151-1.352-.184-2.107.533-.07 1.072-.083 1.579-.042zm-3.788.724c.062.947.169 1.818.317 2.596-1.996.365-2.076-1.603-.317-2.596z" fill="%23FFFFFF"/></svg>' />
      </Sidebar>
      <ListPage characters={loadedCharacters} onSubmit={onSubmit}/>
      <ChatPage candidates={selectedCharacters}/>
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
