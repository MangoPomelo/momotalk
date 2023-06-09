import { CharacterData } from '../classes/characterData';

/**
 * Character model which connects to schale.gg
 */
export class CharacterModel {
  #cache = [];
  #studentUrl = 'https://schale.gg/data/en/students.min.json';
  #localizationUrl = 'https://schale.gg/data/en/localization.min.json';
  #hasCache = false;

  /**
   * Fetch and adapt data to character data list
   * @return {CharacterData[]} Character data list
   */
  async fetchCharacterDataList() {
    if (this.#hasCache) {
      return this.#cache;
    }

    const [studentList, localization] = await Promise.all([this.#fetchStudents(), this.#fetchLocalization()]);
    const characterDataList = studentList.map((student) => this.#adaptStudentToCharacterData(student, localization));
    this.#cache = this.#cacheCharacterDataList(characterDataList);
    return this.#cache;
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
    this.#cache = characterDataList;
    this.#hasCache = true;
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
}
