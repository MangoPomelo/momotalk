import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatPage } from '../ChatPage';
import { ListPage } from '../ListPage';
import './index.css';
import { CharacterModel } from '../../models/characterModel';
import { CharacterData } from '../../classes/characterData';
import { Header } from '../../components/Header';

/**
 * MainPage component <br/>
 * @return {JSX.Element} MainPage component <br/>
 */
export function MainPage() {
  const [loadedCharacters, setLoadedCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const characterModelRef = useRef(new CharacterModel());

  useEffect(() => {
    (async () => {
      const characterDataList = await characterModelRef.current.fetchCharacterDataList();
      setLoadedCharacters(characterDataList);
    })();
  }, []);

  const onSubmit = useCallback((event, selected) => {
    const sensei = new CharacterData('sensei', '/images/character/Sensei.png', '', '/images/emblem/dummy.png');
    setSelectedCharacters([...selected, sensei]);
  });

  return (
    <main className="main-page">
      <Header title="yuzuTalk" onHelpClick={() => void open('https://twitter.com/messages/compose?recipient_id=1390445620444291073&ref_src=twsrc%5Etfw')}/>
      <ListPage characters={loadedCharacters} onSubmit={onSubmit}/>
      <ChatPage candidates={selectedCharacters}/>
    </main>
  );
}
