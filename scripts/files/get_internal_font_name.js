// Function written by Luca Hofmann
// http://stackoverflow.com/questions/20575016/photoshop-cs3-scripting-font-names
//
function getInternalFontName(pFontName) {
  for (var i = 0; i < app.fonts.length; i++) {
    if (pFontName === app.fonts[i].postScriptName) {
      return pFontName;
    }
    if (pFontName === app.fonts[i].name) {
      return app.fonts[i].postScriptName;
    }
  }
  return null;
}
