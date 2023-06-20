/**
 * Character DTO
 */
export class CharacterData {
  /**
   * Check if given character is a valid character
   * @param {CharacterData} character Given character data
   * @return {boolean} Is null character or not
   */
  static isNullCharacter(character) {
    return character.id === '';
  }

  /**
   * Check if given two character are equal
   * @param {CharacterData} characterA Character data A
   * @param {CharacterData} characterB Character data B
   * @return {boolean} Is identical character or not
   */
  static areEqual(characterA, characterB) {
    return characterA.id === characterB.id;
  }

  /**
   * Constructor function
   * @param {string} [name=''] The name of the character
   * @param {string} [avatar=''] The avatar of the character
   * @param {string} [club=''] The club of the character
   * @param {string} [schoolIcon=''] The school icon of the character
   */
  constructor(name = '', avatar = '', club = '', schoolIcon = '') {
    this.id = `${name}${avatar}${club}${schoolIcon}`;
    this.name = name;
    this.avatar = avatar;
    this.club = club;
    this.schoolIcon = schoolIcon;
  }
}
