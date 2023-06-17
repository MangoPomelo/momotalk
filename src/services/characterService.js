import { CharacterData } from '../classes/characterData';

/**
 * Character model which connects to schale.gg
 */
export class CharacterService {
  #currentLanguage;
  #cache;
  #studentUrl;

  /**
   * Constructor
   * @param {('cn' | 'en' | 'jp' | 'kr' | 'th' | 'tw' | 'vi')} language Language for initial data fetching
   */
  constructor(language = 'en') {
    const selectableLanguages = ['cn', 'en', 'jp', 'kr', 'th', 'tw', 'vi'];
    const lng = selectableLanguages.includes(language) ? language : 'en';

    this.#currentLanguage = lng;
    this.#cache = {};
    this.#studentUrl = `https://schale.gg/data/${lng}/students.min.json`;
  }

  /**
   * Fetch and adapt data to character data list
   * @return {CharacterData[]} Character data list
   */
  async fetchCharacterDataList() {
    const studentList = await this.#fetchStudents();
    const characterDataList = studentList.map((student) => this.#adaptStudentToCharacterData(student));

    return characterDataList;
  }

  /**
   * Fetch student data from the server
   * @return {{ Name: string, CollectionTexture: string, Club: string, School: string }[]} Student data list
   */
  async #fetchStudents() {
    const response = await fetch(this.#studentUrl);
    const json = response.json();
    return json;
  }

  /**
   * Adapt student list to character data list
   * @param {{ DevName: string, CollectionTexture: string, Club: string, School: string }} student Student data from server
   * @return {CharacterData} Character data list
   */
  #adaptStudentToCharacterData(student) {
    const name = student.DevName;
    const avatar = `https://schale.gg/images/student/collection/${student.CollectionTexture}.webp`;
    const club = student.Club;
    const schoolIcon = `https://schale.gg/images/schoolicon/School_Icon_${student.School.toUpperCase()}_W.png`;

    return new CharacterData(name, avatar, club, schoolIcon);
  }
}
