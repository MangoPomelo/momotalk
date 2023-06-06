/**
 * Character DTO
 */
export class CharacterData {
  /**
   * Constructor function
   * @param {string} name The name of the character
   * @param {string} avatar The avatar of the character
   */
  constructor(name, avatar) {
    this.id = `${name}|${avatar}`;
    this.name = name;
    this.avatar = avatar;
  }
}
