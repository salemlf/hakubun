export const TAG_REGEXES = {
  readingJapaneseRegEx: new RegExp(`<reading><ja>(.+?)</ja></reading>`, "g"),
  japaneseReadingRegEx: new RegExp(
    `<ja>(.*?)<reading>(.+?)</reading>(.*?)</ja>`,
    "g"
  ),
  japaneseRegEx: new RegExp(`<ja>(.+?)</ja>`, "g"),
  kanjiRegEx: new RegExp(`<kanji>(.+?)</kanji>`, "g"),
  kanjiJapaneseRegEx: new RegExp(`<kanji><ja>(.+?)</ja></kanji>`, "g"),
  radRegEx: new RegExp(`<radical>(.+?)</radical>`, "g"),
  vocabRegEx: new RegExp(`<vocabulary>(.+?)</vocabulary>`, "g"),
  readingRegEx: new RegExp(`<reading>(.+?)</reading>`, "g"),
  meaningRegEx: new RegExp(`<meaning>(.+?)</meaning>`, "g"),
};
