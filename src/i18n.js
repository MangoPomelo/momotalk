import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      ns: ['students', 'localization'],
      fallbackLng: 'en',
      supportedLngs: ['cn', 'en', 'jp', 'kr', 'th', 'tw', 'vi'],
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      backend: {
        loadPath: 'https://schale.gg/data/{{lng}}/{{ns}}.min.json',
        parse: (data, language, namespace) => {
          if (namespace === 'students') {
            return parseStudents(data);
          }

          if (namespace === 'localization') {
            return parseLocalization(data);
          }

          return data;
        },
        allowMultiLoading: true,
      },
    });


export default i18n;

/**
 * Data in Json format
 * @template T
 * @typedef {string} Json
 */

/**
 * Parser for students parsing
 * @param {Json<{DevName: string, Name: string}[]>} rawStudentList Raw student list from server
 * @return {Object.<string, string>} Translation paris
 */
function parseStudents(rawStudentList) {
  const studentList = JSON.parse(rawStudentList);
  const parsedResult = Object.fromEntries(studentList.map((student) => [student.DevName, student.Name]));
  return parsedResult;
}

/**
 * Parser for localization parsing
 * @param {Json<{ Club: Object.<string, string>, School: Object.<string, string> }>} rawLocalization Raw localization file from server
 * @return {Object.<string, string>} Translation paris
 */
function parseLocalization(rawLocalization) {
  const localization = JSON.parse(rawLocalization);
  const parsedResult = { ...localization.Club, ...localization.School };
  return parsedResult;
};
