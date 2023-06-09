import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChatPage } from '../ChatPage';
import { ListPage } from '../ListPage';
import './index.css';
import { CharacterModel } from '../../models/characterModel';

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
    setSelectedCharacters(selected);
  });

  return (
    <main className="main-page">
      <ListPage characters={loadedCharacters} onSubmit={onSubmit}/>
      <ChatPage candidates={selectedCharacters}/>
    </main>
  );
}
