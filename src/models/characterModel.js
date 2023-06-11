import { CharacterData } from '../classes/characterData';

/**
 * Character model which connects to schale.gg
 */
export class CharacterModel {
  #currentLanguage;
  #cache;
  #studentUrl;
  #localizationUrl;

  /**
   * Constructor
   * @param {('cn' | 'en' | 'jp' | 'kr' | 'th' | 'tw' | 'vi')} defaultLanguage Language for initial data fetching
   */
  constructor(defaultLanguage = 'en') {
    const selectableLanguages = ['cn', 'en', 'jp', 'kr', 'th', 'tw', 'vi'];
    const language = selectableLanguages.includes(defaultLanguage) ? defaultLanguage : 'en';

    this.#currentLanguage = language;
    this.#cache = {};
    this.#studentUrl = `https://schale.gg/data/${language}/students.min.json`;
    this.#localizationUrl = `https://schale.gg/data/${language}/localization.min.json`;
  }

  /**
   * Change the current language for data fetching
   * @param {('cn' | 'en' | 'jp' | 'kr' | 'th' | 'tw' | 'vi')} language Target language
   * @return {boolean} Success of not
   */
  setLanguage(language) {
    const selectableLanguages = ['cn', 'en', 'jp', 'kr', 'th', 'tw', 'vi'];
    if (!selectableLanguages.includes(language)) {
      return false;
    }

    this.#currentLanguage = language;
    this.#studentUrl = `https://schale.gg/data/${language}/students.min.json`;
    this.#localizationUrl = `https://schale.gg/data/${language}/localization.min.json`;

    return true;
  }

  /**
   * Fetch and adapt data to character data list
   * @return {CharacterData[]} Character data list
   */
  async fetchCharacterDataList() {
    if (this.#hasCache()) {
      return this.#getCache();
    }

    const [studentList, localization] = await Promise.all([this.#fetchStudents(), this.#fetchLocalization()]);
    const characterDataList = studentList.map((student) => this.#adaptStudentToCharacterData(student, localization));

    this.#cache = this.#cacheCharacterDataList(characterDataList);
    return this.#cache[this.#currentLanguage];
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
   * @param {{ Name: string, CollectionTexture: string, Club: string, School: string }} student Student data from server
   * @param {{ Club: Object.<string, string> }} localization Translations
   * @return {CharacterData} Character data list
   */
  #adaptStudentToCharacterData(student, localization) {
    const name = student.Name;
    const avatar = `https://schale.gg/images/student/collection/${student.CollectionTexture}.webp`;
    const club = localization.Club[student.Club] ?? student.Club;
    const schoolIcon = `https://schale.gg/images/schoolicon/School_Icon_${student.School.toUpperCase()}_W.png`;

    return new CharacterData(name, avatar, club, schoolIcon);
  }

  /**
   * Cache character data list
   * @param {CharacterData[]} characterDataList Character data list
   * @return {CharacterData[]} Cached result
   */
  #cacheCharacterDataList(characterDataList) {
    this.#cache[this.#currentLanguage] = characterDataList;
    return this.#cache;
  }

  /**
   * Fetch data from the server
   * @return {{ Club: Object.<string, string> }} Translations
   */
  async #fetchLocalization() {
    const response = await fetch(this.#localizationUrl);
    const json = response.json();
    return json;
  }

  /**
   * Check if the cached data exists
   * @return {boolean} True if the cached data exists
   */
  #hasCache() {
    return this.#cache[this.#currentLanguage] != null;
  }

  /**
   * Get the cached data by current selected language
   * @return {CharacterData[]} Cached result
   */
  #getCache() {
    return this.#cache[this.#currentLanguage] ?? [];
  }
}
