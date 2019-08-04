var concat = require('concat');
var { join } = require('path');

const stdlib = join(__dirname, 'files', 'stdlib.js');
const genericUi = join(__dirname, 'files', 'generic_ui.js');
const myAction = join(__dirname, 'files', 'my_action.js');
const textReader = join(__dirname, 'files', 'text_reader.js');
const getInternalFontName = join(__dirname, 'files', 'get_internal_font_name.js');
const globalConst = language => join(__dirname, 'files', `global_const_${language}.js`);
const psScript = join(__dirname, 'files', 'ps_script.js');

const fileExported = language =>
  join(__dirname, '..', 'public', 'assets', `PS_Script_${language}.jsx`);

const LANGUAGES = ['en', 'es'];

for (const language of LANGUAGES) {
  concat(
    [stdlib, genericUi, myAction, textReader, getInternalFontName, globalConst(language), psScript],
    fileExported(language)
  );
}
