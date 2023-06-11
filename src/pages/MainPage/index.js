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

  useEffect(() => {
    (async () => {
      const characterDataList = await characterModelRef.current.fetchCharacterDataList();
      setLoadedCharacters(characterDataList);
    })();
  }, []);

  const onSubmit = useCallback((event, selected) => {
    setSelectedCharacters(selected);
  });

  const onExport = useCallback(async (event) => {
    const messageListDom = document.querySelector('.message-list');
    const dataUrl = await toPng(messageListDom);
    download(dataUrl, 'screenshot.png');
  });

  return (
    <main className="main-page">
      <Header title="yuzuTalk" onHelpClick={() => void open('https://twitter.com/messages/compose?recipient_id=1390445620444291073&ref_src=twsrc%5Etfw')}/>
      <Sidebar>
        <SidebarItem title="export" onClick={onExport} icon='data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32"><path d="M22 12V8h20v4zm0 8h20v-4H22zm20 14V24H22v10H10l22 22 22-22z" fill="%23FFFFFF"></path></svg>'/>
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
