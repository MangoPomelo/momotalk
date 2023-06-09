/**
 * Character DTO
 */
export class CharacterData {
  /**
   * Constructor function
   * @param {string} name The name of the character
   * @param {string} avatar The avatar of the character
   * @param {string} club The club of the character
   * @param {string} schoolIcon The school icon of the character
   */
  constructor(name, avatar, club, schoolIcon) {
    this.id = `${name}|${avatar}|${club}|${schoolIcon}`;
    this.name = name;
    this.avatar = avatar;
    this.club = club;
    this.schoolIcon = schoolIcon;
  }
}
