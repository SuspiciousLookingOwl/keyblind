import { PhoneticOptions, generate as generatePhonetic } from "phonetic";

// Get words from JSON
const languageWords: {
  [key: string]: string[];
} = {};
const languagesContext = require.context("../assets/words", false, /\.(json)$/);
languagesContext.keys().forEach(function(language) {
  languageWords[
    language.substring(language.lastIndexOf("/") + 1, language.lastIndexOf("."))
  ] = languagesContext(language);
});

/**
 * Punctuate a word randomly
 *
 * @param word Word to punctuate
 */
const punctuate = (word: string) => {
  const punctuationRandom = Math.floor(Math.random() * 100) + 1;
  if (punctuationRandom >= 1 && punctuationRandom <= 37) {
    word += "."; // 37%
  } else if (punctuationRandom >= 38 && punctuationRandom <= 73) {
    word += ","; // 36%
  } else if (punctuationRandom >= 74 && punctuationRandom <= 82) {
    word += "?"; // 9%
  } else if (punctuationRandom >= 83 && punctuationRandom <= 91) {
    word += "!"; // 9%
  } else if (punctuationRandom >= 92 && punctuationRandom <= 94) {
    word += ":"; // 3%
  } else if (punctuationRandom >= 95 && punctuationRandom <= 97) {
    word += ";"; // 3%
  } else if (punctuationRandom >= 98 && punctuationRandom <= 100) {
    word = `"${word}"`; // 3%
  }
  return word;
};

const generateRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Generate random phonetic words
 *
 * @param length How many words to generate
 * @param difficulty Phonetic complexity
 */
export const generatePhoneticWords = ({
  length,
  difficulty,
  capitalLetterProbability,
  punctuationProbability
}: {
  length: number;
  difficulty: number;
  capitalLetterProbability: number;
  punctuationProbability: number;
}): string[] => {
  const words: string[] = [];

  // Default for low complexity
  const options: PhoneticOptions = {
    capFirst: false,
    phoneticSimplicity: 5,
    compoundSimplicity: 5,
    syllables: 1
  };

  if (difficulty === 2) {
    // Medium complexity
    options.phoneticSimplicity = 2;
    options.compoundSimplicity = 1;
  } else if (difficulty === 3) {
    // High complexity
    options.phoneticSimplicity = 1;
    options.compoundSimplicity = 1;
  }

  for (let i = 0; i < length; i++) {
    // Determine how many syllables
    const syllablesRandom = Math.floor(Math.random() * 10 + 1);
    if (syllablesRandom > 3 && syllablesRandom < 7) options.syllables = 2;
    else if (syllablesRandom > 8 && syllablesRandom < 10) options.syllables = 3;
    else if (syllablesRandom == 10) options.syllables = 4;

    let word = generatePhonetic(options);

    const isCapitalize = generateRandomInteger(1, 100) <= capitalLetterProbability;
    const isPunctuate = Math.floor(Math.random() * 100) + 1 <= punctuationProbability;

    if (isCapitalize) word = word.charAt(0).toUpperCase() + word.substring(1);
    if (isPunctuate) word = punctuate(word);

    words.push(word);
  }

  return words;
};

/**
 * Generate random normal words
 *
 * @param language Language of words to generate
 * @param length How many words to generate
 * @param difficulty Words difficulty
 * @param capitalLetterProbability
 * @param punctuationProbability
 */
export const generateWords = ({
  length,
  difficulty,
  capitalLetterProbability,
  punctuationProbability,
  language
}: {
  length: number;
  difficulty: number;
  capitalLetterProbability: number;
  punctuationProbability: number;
  language: string;
}): string[] => {
  const words: string[] = [];

  let wordRange = [0, 199];
  if (difficulty === 2) wordRange = [200, 799];
  if (difficulty === 3) wordRange = [800 - 999];

  for (let i = 0; i < length; i++) {
    let word = languageWords[language][generateRandomInteger(wordRange[0], wordRange[1])];

    const isCapitalize = generateRandomInteger(1, 100) <= capitalLetterProbability;
    const isPunctuate = Math.floor(Math.random() * 100) + 1 <= punctuationProbability;

    if (isCapitalize) word = word.charAt(0).toUpperCase() + word.substring(1);
    if (isPunctuate) word = punctuate(word);

    words.push(word);
  }
  return words;
};
