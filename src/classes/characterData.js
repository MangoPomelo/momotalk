/**
 * Character DTO
 */
export class CharacterData {
  /**
   * Constructor function
   * @param {string} name The name of the character
   * @param {string} avatar The avatar of the character
   * @param {string} club The club of the character
   * @param {string} school The school logo of the character
   */
  constructor(name, avatar, club, school) {
    this.id = `${name}|${avatar}|${club}|${school}`;
    this.name = name;
    this.avatar = avatar;
    this.club = club;
    this.school = school;
  }
}
