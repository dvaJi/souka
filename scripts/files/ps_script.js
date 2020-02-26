// Operating System related
var dirSeparator = $.os.search(/windows/i) === -1 ? '/' : '\\';

scriptPath = function() {
  new String(fileName);

  fileName = $.fileName;
  return fileName;
};

//
// Default setting
//
SoukaInputOptions = function(obj) {
  var self = this;

  Stdlib.copyFromTo(obj, self);
};
SoukaInputOptions.prototype.typename = 'SoukaInputOptions';
SoukaInputOptions.LOG_FILE = Stdlib.PREFERENCES_FOLDER + '/SoukaInput.log';

//
// User UI
//
SoukaInput = function() {
  var self = this;

  self.saveIni = false;
  self.hasBorder = true;
  self.optionsClass = SoukaInputOptions;
  self.settingsPanel = false; //Have a settings panel that you created yourself

  self.winRect = {
    // the size of our window
    x: 200,
    y: 200,
    w: 875,
    h: 650
  };

  self.title = _MY_APPNAME + ' ' + _MY_VER; // our window title
  self.notesSize = 75;
  self.notesTxt = _MY_TIP_TITLE;
  self.documentation = _MY_TIP_TEXT;

  self.processTxt = _MY_STRING_BUTTON_RUN;
  self.cancelTxt = _MY_STRING_BUTTON_CANCEL;
};

SoukaInput.prototype = new GenericUI();
SoukaInput.prototype.typename = 'SoukaInput';

//
// User interface construction
//
SoukaInput.prototype.createPanel = function(pnl, ini) {
  var self = this;
  var opts = new SoukaInputOptions(ini); // default values

  // window's location
  self.moveWindow(100, 100);

  var xOfs = 10;
  var yOfs = 10;
  var xx = xOfs;
  var yy = yOfs;

  //------------------Self-created configuration panel------------------

  pnl.settingsPnl = pnl.add('panel', [xOfs, yy, pnl.size.width - xOfs, yy + 60]);

  SoukaInput.createSettingsPanel(pnl.settingsPnl, ini);

  xx = xOfs;
  yy += 75;
  yOfs = yy;
  //------------------Souka file area------------------

  // Souka text file input
  pnl.lpTextFileLabel = pnl.add(
    'statictext',
    [xx, yy, xx + 120, yy + 20],
    _MT_STRING_LABEL_TEXTFILE
  );
  xx += 120;
  pnl.lpTextFileTextBox = pnl.add('edittext', [xx, yy, xx + 170, yy + 20], '');
  pnl.lpTextFileTextBox.enabled = false;
  xx += 175;
  pnl.lpTextFileBrowseButton = pnl.add('button', [xx, yy, xx + 30, yy + 20], '...');

  pnl.lpTextFileBrowseButton.onClick = function() {
    try {
      var pnl = this.parent;
      var fmask = '*.txt;*.json';
      var f = File.openDialog(_MT_STRING_LABEL_TEXTFILE, fmask);

      if (f && f.exists) {
        pnl.lpTextFileTextBox.text = f.toUIString();

        // Map source and output folder are assigned to the directory
        var fl = new Folder(f.path);
        pnl.sourceTextBox.text = fl.toUIString();
        pnl.targetTextBox.text = fl.toUIString() + dirSeparator + 'output';
      } else {
        return; //Cancel
      }

      pnl.chooseImageListBox.removeAll();
      pnl.chooseGroupListBox.removeAll();

      // Read the Souka file
      var labelFile;
      try {
        labelFile = new SoukaTextReader(pnl.lpTextFileTextBox.text);
      } catch (err) {
        alert(err);
        return;
      }

      // Fill image selection list
      var arr = labelFile.ImageList;
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          pnl.chooseImageListBox[i] = pnl.chooseImageListBox.add('item', arr[i], i);
          pnl.chooseImageListBox[i].selected = true;
        }
      }

      // Populate the group selection list
      var arr = labelFile.GroupData;
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == '') continue;
          pnl.chooseGroupListBox[i] = pnl.chooseGroupListBox.add('item', arr[i], i);
          pnl.chooseGroupListBox[i].selected = true;

          // Paint white Specify the group text box to fill in the first group
          if (pnl.overlayGroupTextBox.text == '') {
            pnl.overlayGroupTextBox.text = arr[i];
          }
        }
      }

      pnl.labelFile = labelFile; //Return to the SoukaTextReader object
    } catch (e) {
      alert(Stdlib.exceptionMessage(e));
    }
  };

  //------------------Picture selection area------------------
  yy = yOfs + 35;
  xx = xOfs;

  // Select the image you want to import
  pnl.chooseImageLabel = pnl.add(
    'statictext',
    [xx, yy, xx + 150, yy + 22],
    _MT_STRING_LABEL_SELECTIMAGE
  );
  yy += 20;
  pnl.chooseImageListBox = pnl.add('listbox', [xx, yy, xx + 150, yy + 285], [], {
    multiselect: true
  });

  //------------------Group selection area------------------
  yy = yOfs + 35;
  xOfs += 170;
  xx = xOfs;

  //Select the group you want to import
  pnl.chooseGroupLabel = pnl.add(
    'statictext',
    [xx, yy, xx + 150, yy + 22],
    _MT_STRING_LABEL_SELECTGROUP
  );
  yy += 20;
  pnl.chooseGroupListBox = pnl.add('listbox', [xx, yy, xx + 150, yy + 285], [], {
    multiselect: true
  });

  //------------------Setting area------------------
  yy = yOfs;
  xOfs = 10 + 345;
  xx = xOfs;

  // >>>>>File preprocessing
  pnl.add('statictext', [xx, yy, xx + 120, yy + 20], _MT_STRING_LABEL_TIP_FILE);
  yy += 20;
  // Map source folder
  pnl.sourceLabel = pnl.add('statictext', [xx, yy, xx + 120, yy + 20], _MT_STRING_LABEL_SOURCE);
  xx += 120;
  pnl.sourceTextBox = pnl.add('edittext', [xx, yy, xx + 300, yy + 20], '');
  xx += 305;
  pnl.sourceBrowse = pnl.add('button', [xx, yy, xx + 30, yy + 20], '...');

  pnl.sourceBrowse.onClick = function() {
    try {
      var pnl = this.parent;
      var def = pnl.sourceTextBox.text ? new Folder(pnl.sourceTextBox.text) : Folder.desktop;
      var f = Folder.selectDialog(_MT_STRING_LABEL_SOURCE, def);

      if (f) {
        pnl.sourceTextBox.text = f.toUIString();
        if (!pnl.targetTextBox.text) {
          pnl.targetTextBox.text = pnl.sourceTextBox.text;
        }
      }
    } catch (e) {
      alert(Stdlib.exceptionMessage(e));
    }
  };

  xx = xOfs;
  yy += 25;

  // Output directory
  pnl.targetLabel = pnl.add('statictext', [xx, yy, xx + 120, yy + 20], _MT_STRING_LABEL_TARGET);
  xx += 120;
  pnl.targetTextBox = pnl.add('edittext', [xx, yy, xx + 300, yy + 20], '');
  xx += 305;
  pnl.targetBrowse = pnl.add('button', [xx, yy, xx + 30, yy + 20], '...');

  pnl.targetBrowse.onClick = function() {
    try {
      var pnl = this.parent;
      var f;
      var def = pnl.targetTextBox.text;
      if (!def) {
        if (pnl.sourceTextBox.text) {
          def = pnl.sourceTextBox.text;
        } else {
          def = Folder.desktop;
        }
      }
      var f = Stdlib.selectFolder(_MT_STRING_LABEL_TARGET, def);

      if (f) {
        pnl.targetTextBox.text = f.toUIString();
      }
    } catch (e) {
      alert(Stdlib.exceptionMessage(e));
    }
  };

  xx = xOfs;
  yy += 25;

  // Ignore the source file name in Souka text
  pnl.ignoreImgFileNameCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_IGNOREIMGFILENAME
  );
  pnl.ignoreImgFileNameCheckBox.onClick = function() {
    pnl.setSourceFileTypeCheckBox.value = false; // Mutually exclusive with the specified source
    pnl.ignoreImgFileNameTestButton.enabled = pnl.ignoreImgFileNameCheckBox.value;
  };
  xx += 260;
  pnl.ignoreImgFileNameTestButton = pnl.add('button', [xx, yy, xx + 80, yy + 18], 'preview');
  pnl.ignoreImgFileNameTestButton.enabled = false;

  // Preview ignore file name effect
  pnl.ignoreImgFileNameTestButton.onClick = function() {
    var originFileNameList = SoukaInput.getFilesListOfPath(pnl.sourceTextBox.text);
    var selectedImgFileNameList = SoukaInput.getSelectedItemsText(pnl.chooseImageListBox);

    var preview_list_string = '';
    for (var i = 0; i < selectedImgFileNameList.length; i++) {
      if (i >= 10) {
        break;
      }
      if (!originFileNameList[i]) {
        break;
      }
      preview_list_string =
        preview_list_string +
        selectedImgFileNameList[i].text +
        ' -> ' +
        originFileNameList[selectedImgFileNameList[i].index] +
        '\n';
    }
    alert(preview_list_string);
  };

  xx = xOfs;
  yy += 20;

  // Use the specified type map source
  pnl.setSourceFileTypeCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_SETSOURCETYPE
  );
  pnl.setSourceFileTypeCheckBox.onClick = function() {
    pnl.ignoreImgFileNameCheckBox.value = false; //Mutually exclusive with no view source file name
    pnl.setSourceFileTypeList.enabled = pnl.setSourceFileTypeCheckBox.value;
  };
  xx += 260;
  var setSourceFileTypeListItems = ['.psd', '.png', '.jpg', 'jpeg', '.tif', '.tiff'];
  pnl.setSourceFileTypeList = pnl.add(
    'dropdownlist',
    [xx, yy, xx + 70, yy + 22],
    setSourceFileTypeListItems
  );
  pnl.setSourceFileTypeList.selection = pnl.setSourceFileTypeList.find('.psd');
  pnl.setSourceFileTypeList.enabled = false;

  xx = xOfs;
  yy += 20;

  // Handling unlabeled documents
  pnl.outputNoSignPsdCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_OUTPUTNOSIGNPSD
  );
  xx = xOfs;
  yy += 20;

  // Do not close the document after import
  pnl.notCloseCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_NOTCLOSE
  );
  xx = xOfs;
  yy += 20;

  // Text replacement (example: "A->B|C->D")
  pnl.textReplaceCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_TEXTREPLACE
  );
  pnl.textReplaceCheckBox.onClick = function() {
    pnl.textReplaceTextBox.enabled = pnl.textReplaceCheckBox.value;
  };
  xx += 260;
  pnl.textReplaceTextBox = pnl.add('edittext', [xx, yy, xx + 180, yy + 20]);
  pnl.textReplaceTextBox.text = '！？->!?|...->…';
  pnl.textReplaceTextBox.enabled = false;
  xx = xOfs;
  yy += 20;

  // >>>>>Import project
  yy += 10;
  pnl.add('statictext', [xx, yy, xx + 120, yy + 20], _MT_STRING_LABEL_TIP_INPUTITEM);
  yy += 20;

  // Export label option
  pnl.outputLabelNumberCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_OUTPUTLABELNUMBER
  );
  xx = xOfs;
  yy += 20;

  // Do not group layers
  pnl.layerNotGroupCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_LAYERNOTGROUP
  );
  yy += 20;

  // >>>>>Format / Automation
  yy += 10;
  pnl.add('statictext', [xx, yy, xx + 120, yy + 20], _MT_STRING_LABEL_TIP_STYLE_AUTO);
  yy += 20;

  // Use custom font settings
  pnl.setFontCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_SETFONT
  );
  pnl.setFontCheckBox.onClick = function() {
    var value = pnl.setFontCheckBox.value;
    pnl.font.family.enabled = value;
    pnl.font.style.enabled = value;
    pnl.font.fontSize.enabled = value;
  };
  xx = xOfs;
  yy += 20;
  // ont
  pnl.font = pnl.add('group', [xx, yy, xx + 400, yy + 40]);
  self.createFontPanel(pnl.font, ini);
  pnl.font.label.text = _MT_STRING_LABEL_FONT;
  pnl.font.family.enabled = false;
  pnl.font.style.enabled = false;
  pnl.font.fontSize.enabled = false;
  pnl.font.family.selection = pnl.font.family.find('SimSun');

  xx = xOfs;
  yy += 20;

  // Output horizontal text
  pnl.outputHorizontalCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 250, yy + 22],
    _MT_STRING_CHECKBOX_OUTPUTHORIZONTALTEXT
  );
  xx = xOfs;
  yy += 20;

  // Execute action GroupN
  pnl.runActionGroupCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 500, yy + 22],
    _MT_STRING_CHECKBOX_RUNACTION
  );
  pnl.runActionGroupCheckBox.onClick = function() {
    pnl.runActionGroupList.enabled = pnl.runActionGroupCheckBox.value;
  };
  xx = xOfs + 30;
  yy += 20;
  var ary = Stdlib.getActionSets();
  pnl.runActionGroupList = pnl.add('dropdownlist', [xx, yy, xx + 180, yy + 22], ary);
  pnl.runActionGroupList.selection = pnl.runActionGroupList.find('SoukaAction');
  if (pnl.runActionGroupList.selection == undefined) {
    pnl.runActionGroupList.selection = pnl.runActionGroupList[0];
  }
  pnl.runActionGroupList.enabled = false;

  xx = xOfs;
  yy += 20;

  // Whitening option
  pnl.overlayCheckBox = pnl.add(
    'checkbox',
    [xx, yy, xx + 300, yy + 22],
    _MT_STRING_CHECKBOX_OVERLAY
  );
  pnl.overlayCheckBox.onClick = function() {
    pnl.overlayGroupTextBox.enabled = pnl.overlayCheckBox.value;
  };
  xx += 300;

  pnl.overlayGroupTextBox = pnl.add('edittext', [xx, yy, xx + 180, yy + 20]);
  pnl.overlayGroupTextBox.enabled = false;

  //------------------Read configuration area------------------
  if (ini) {
    // if there was an ini object
    //Text replacement
    if (ini.textReplace) {
      pnl.textReplaceCheckBox.value = true;
      pnl.textReplaceTextBox.enabled = true;
      pnl.textReplaceTextBox.text = opts.textReplace;
    }

    // Font
    if (ini.setFont) {
      pnl.setFontCheckBox.value = true;
      pnl.font.family.enabled = true;
      pnl.font.style.enabled = true;
      pnl.font.fontSize.enabled = true;
      pnl.font.setFont(ini.font, ini.fontSize);
    }

    // Export label option
    if (ini.outputLabelNumber) {
      pnl.outputLabelNumberCheckBox.value = ini.outputLabelNumber;
    }

    // Output horizontal text
    if (ini.horizontalText) {
      pnl.outputHorizontalCheckBox.value = ini.horizontalText;
    }
    // Handling unlabeled documents
    if (ini.outputNoSignPsd) {
      pnl.outputNoSignPsdCheckBox.value = ini.outputNoSignPsd;
    }

    // Ignore the source file name in Souka text
    if (ini.ignoreImgFileName) {
      pnl.ignoreImgFileNameCheckBox.value = true;
    }

    // Use the specified type map source
    if (ini.sourceFileType) {
      pnl.setSourceFileTypeCheckBox.value = true;
      pnl.setSourceFileTypeList.enabled = true;
      pnl.setSourceFileTypeList.selection.text = ini.sourceFileType;
    }

    // Execute action GroupN
    if (ini.runActionGroup) {
      pnl.runActionGroupCheckBox.value = true;
      pnl.runActionGroupList.enabled = true;
      pnl.runActionGroupList.selection.text = ini.runActionGroup;
    }

    // Do not close the document after import
    if (ini.notClose) pnl.notCloseCheckBox.value = true;

    // Do not group layers
    if (ini.layerNotGroup) pnl.layerNotGroupCheckBox.value = true;

    // Paint white
    if (ini.overloayGroup) {
      pnl.overlayCheckBox.value = true;
      pnl.overlayGroupTextBox.enabled = true;
      pnl.overlayGroupTextBox.text = ini.overloayGroup;
    }
  }

  return pnl;
};

//
// Custom settings
//
SoukaInput.createSettingsPanel = function(pnl, ini) {
  var win = GenericUI.getWindow(pnl.parent);

  pnl.text = _MT_STRING_LABEL_SETTING;
  pnl.win = win;

  pnl.fileMask = 'INI Files: *.ini, All Files: *.*';
  pnl.loadPrompt = 'Read Setting';
  pnl.savePrompt = 'Save Setting';
  pnl.defaultFile = undefined;

  var w = pnl.bounds[2] - pnl.bounds[0];
  var offsets = [w * 0.2, w * 0.5, w * 0.8];
  var y = 15;
  var bw = 90;

  var x = offsets[0] - bw / 2;
  pnl.load = pnl.add('button', [x, y, x + bw, y + 20], _MY_STRING_BUTTON_LOAD);
  x = offsets[1] - bw / 2;
  pnl.save = pnl.add('button', [x, y, x + bw, y + 20], _MY_STRING_BUTTON_SAVE);
  x = offsets[2] - bw / 2;
  pnl.reset = pnl.add('button', [x, y, x + bw, y + 20], _MY_STRING_BUTTON_RESET);

  pnl.load.onClick = function() {
    var pnl = this.parent;
    var win = pnl.win;
    var mgr = win.mgr;
    var def = pnl.defaultFile;

    if (!def) {
      if (mgr.iniFile) {
        def = GenericUI.iniFileToFile(mgr.iniFile);
      } else {
        def = GenericUI.iniFileToFile('~/settings.ini');
      }
    }

    var f;
    var prmpt = pnl.loadPrompt;
    var sel = Stdlib.createFileSelect(pnl.fileMask);
    if (isMac()) {
      sel = undefined;
    }
    f = Stdlib.selectFileOpen(prmpt, sel, def);
    if (f) {
      win.ini = SoukaInput.readIni(f);
      win.close(4);

      if (pnl.onLoad) {
        pnl.onLoad(f);
      }
    }
  };

  pnl.save.onClick = function() {
    var pnl = this.parent;
    var win = pnl.win;
    var mgr = win.mgr;
    var def = pnl.defaultFile;

    if (!def) {
      if (mgr.iniFile) {
        def = GenericUI.iniFileToFile(mgr.iniFile);
      } else {
        def = GenericUI.iniFileToFile('~/settings.ini');
      }
    }

    var f;
    var prmpt = pnl.savePrompt;
    var sel = Stdlib.createFileSelect(pnl.fileMask);

    if (isMac()) {
      sel = undefined;
    }
    f = Stdlib.selectFileSave(prmpt, sel, def);

    if (f) {
      var mgr = win.mgr;
      var res = mgr.validatePanel(win.appPnl, win.ini, true);

      if (typeof res != 'boolean') {
        SoukaInput.writeIni(f, res);

        if (pnl.onSave) {
          pnl.onSave(f);
        }
      }
    }
  };

  pnl.reset.onClick = function() {
    var pnl = this.parent;
    var win = pnl.win;
    var mgr = win.mgr;

    if (mgr.defaultIniFile) {
      win.ini = mgr.readIniFile(mgr.defaultIniFile);
    } else if (mgr.ini) {
      win.ini = mgr.ini;
    }

    win.close(4);
    if (pnl.onReset) {
      pnl.onReset();
    }
  };
};

//
// Read user UI data
//
SoukaInput.prototype.validatePanel = function(pnl, ini, tofile) {
  var self = this;
  var opts = new SoukaInputOptions(ini);

  // No need to store these when writing configuration items
  if (!tofile || tofile == false) {
    // Map source folder
    if (pnl.sourceTextBox.text) {
      f = new Folder(pnl.sourceTextBox.text);
    } else {
      return self.errorPrompt(_MT_ERROR_NOTFOUNDSOURCE);
    }

    if (!f || !f.exists) {
      return self.errorPrompt(_MT_ERROR_NOTFOUNDSOURCE);
    }
    opts.source = f.toUIString();

    // Output directory
    if (pnl.targetTextBox.text) {
      f = new Folder(pnl.targetTextBox.text);
      if (!f.exists) {
        if (!f.create()) {
          return self.errorPrompt(_MT_ERROR_CANNOTBUILDNEWFOLDER);
        }
      }
    } else {
      return self.errorPrompt(_MT_ERROR_NOTFOUNDTARGET);
    }

    if (!f || !f.exists) {
      return self.errorPrompt(_MT_ERROR_NOTFOUNDTARGET);
    }
    opts.target = f.toUIString();

    // Souka text
    f = new File(pnl.lpTextFileTextBox.text);
    if (!f || !f.exists) {
      return self.errorPrompt(_MT_ERROR_NOTFOUNLABELTEXT);
    }
    opts.labelFilename = pnl.lpTextFileTextBox.text;

    var fl = new Folder(f.path);
    opts.labelFilePath = fl.toUIString();

    // Image selection
    if (!pnl.chooseImageListBox.selection || pnl.chooseImageListBox.selection.length == 0)
      return self.errorPrompt(_MT_ERROR_NOTCHOOSEIMAGE);
    else {
      var sortedImgSelection = pnl.chooseImageListBox.selection.sort();
      opts.imageSelected = new Array();

      for (var i = 0; i < sortedImgSelection.length; i++) {
        opts.imageSelected[i] = {
          text: sortedImgSelection[i].text,
          index: sortedImgSelection[i].index
        };
      }
    }
    // Group selection
    if (!pnl.chooseGroupListBox.selection || pnl.chooseGroupListBox.selection.length == 0)
      return self.errorPrompt(_MT_ERROR_NOTCHOOSEGROUP);
    else {
      opts.groupSelected = new Array();
      for (var i = 0; i < pnl.chooseGroupListBox.selection.length; i++)
        opts.groupSelected[i] = pnl.chooseGroupListBox.selection[i].text;
    }
  }
  // Text replacement
  if (pnl.textReplaceCheckBox.value) opts.textReplace = pnl.textReplaceTextBox.text;

  // Font
  if (pnl.setFontCheckBox.value) {
    opts.setFont = true;
    var font = pnl.font.getFont();
    opts.font = font.font;
    opts.fontSize = font.size;
  }

  // Export label option
  if (pnl.outputLabelNumberCheckBox.value) opts.outputLabelNumber = true;

  // Output horizontal text
  if (pnl.outputHorizontalCheckBox.value) opts.horizontalText = true;

  // Handling unlabeled documents
  if (pnl.outputNoSignPsdCheckBox.value) opts.outputNoSignPsd = true;

  // Ignore the source file name in Souka text
  if (pnl.ignoreImgFileNameCheckBox.value) {
    opts.ignoreImgFileName = true;
  }

  // Use the specified type map source
  if (pnl.setSourceFileTypeCheckBox.value) {
    opts.sourceFileType = pnl.setSourceFileTypeList.selection.text;
  } else opts.sourceFileType = undefined;

  // Execute action GroupN
  if (pnl.runActionGroupCheckBox.value) opts.runActionGroup = pnl.runActionGroupList.selection;
  else opts.runActionGroup = undefined;

  // Do not close the document after import
  if (pnl.notCloseCheckBox.value) opts.notClose = true;

  // Do not group layers
  if (pnl.layerNotGroupCheckBox.value) opts.layerNotGroup = true;

  // Paint white
  if (pnl.overlayCheckBox.value) {
    opts.overloayGroup = pnl.overlayGroupTextBox.text;
  }

  return opts;
};

SoukaInput.prototype.doAction = function(action, actionSet) {
  if (Stdlib.hasAction(action, actionSet.toString())) {
    app.doAction(action, actionSet.toString());
  }
};

//
// Perform user UI functions
//
SoukaInput.prototype.process = function(opts, doc) {
  var self = this;
  var errorMsg = '';

  Stdlib.log.setFile(opts.labelFilePath + dirSeparator + 'SoukaInputer.log'); //SoukaInputOptions.LOG_FILE);
  Stdlib.log('Start');
  Stdlib.log('Properties:');
  Stdlib.log(listProps(opts));

  //Read map source folder file list
  var originFileList = SoukaInput.getFilesListOfPath(opts.source);

  //Parsing Souka text
  var lpFile = new SoukaTextReader(opts.labelFilename);

  //Read text replacement configuration
  if (opts.textReplace) var textReplace = SoukaInput.textReplaceReader(opts.textReplace);

  //Traverse the selected image Import data
  for (var i = 0; i < opts.imageSelected.length; i++) {
    var originName = opts.imageSelected[i].text;
    var filename;
    var labelData = lpFile.LabelData[originName];
    var gourpData = lpFile.GroupData;

    // Replace the file suffix name according to sourceFileType
    if (opts.sourceFileType) {
      filename = originName.substring(0, originName.lastIndexOf('.')) + opts.sourceFileType;
    } else filename = originName;

    // Ignore the original image name
    if (opts.ignoreImgFileName) {
      filename = originFileList[opts.imageSelected[i].index];
    }

    // Do not process unlabeled documents
    if (!opts.outputNoSignPsd && labelData.length == 0) continue;

    // Open image file
    var bgFile = File(opts.source + dirSeparator + filename);
    if (!bgFile || !bgFile.exists) {
      var msg = 'Image ' + filename + ' Not Found.';
      Stdlib.log(msg);
      errorMsg = errorMsg + msg + '\r\n';
      continue;
    }

    // Open file in PS

    var bg;
    try {
      bg = app.open(bgFile);
    } catch (e) {
      var msg = 'open file ' + filename + ' fail';
      Stdlib.log(msg);
      errorMsg = errorMsg + msg + '\r\n';
      continue;
    }

    // If the document type is index color mode, change to RGB mode.
    if (bg.mode === DocumentMode.INDEXEDCOLOR) {
      bg.changeMode(ChangeMode.RGB);
    }

    var layerGroups = {};

    // Perform an action "_start" when the file is opened
    if (opts.runActionGroup) {
      try {
        bg.activeLayer = bg.layers[bg.layers.length - 1];
        this.doAction('_start', opts.runActionGroup);
      } catch (e) {}
    }

    // Paint white
    if (opts.overloayGroup) {
      var labelArr = [];

      // Find out which labels need to be painted
      for (var j = 0; j < labelData.length; j++) {
        var labelX = labelData[j].LabelheadValue[0];
        var labelY = labelData[j].LabelheadValue[1];
        var labelXY = { x: labelX, y: labelY };
        var labelGroup = gourpData[labelData[j].LabelheadValue[2]];

        if (labelGroup === opts.overloayGroup) {
          labelArr.push(labelXY);
        }
      }

      //Execute white
      MyAction.lp_dialogClear(labelArr, bg.width, bg.height, 16, 1);
    }

    // Set Preferences values
    var startDocResolution = doc.resolution;
    var startTypeUnits = app.preferences.typeUnits;
    var startDisplayDialogs = app.displayDialogs;
    var startRulerUnits = app.preferences.rulerUnits;
    try {
      app.preferences.rulerUnits = Units.PIXELS;
      app.preferences.typeUnits = TypeUnits.PIXELS;
      app.displayDialogs = DialogModes.NO;
      if (doc.resolution) {
        doc.resizeImage(undefined, undefined, 72, ResampleMethod.NONE);
      }
    } catch (err) {
      Stdlib.log(err);
    }

    // Traversing LabelData
    for (var j = 0; j < labelData.length; j++) {
      var labelNum = j + 1;
      var labelX = labelData[j].LabelheadValue[0];
      var labelY = labelData[j].LabelheadValue[1];
      var labelWidth = labelData[j].LabelheadValue[2];
      var labelHeight = labelData[j].LabelheadValue[3];
      var labelGroup = gourpData[labelData[j].LabelheadValue[4]];
      var labelString = labelData[j].LabelString;
      var artLayer;

      // Whether the group needs to be imported
      if (opts.groupSelected.indexOf(labelGroup) === -1) continue;

      // Create a group
      if (!opts.layerNotGroup && !layerGroups[labelGroup]) {
        layerGroups[labelGroup] = bg.layerSets.add();
        layerGroups[labelGroup].name = labelGroup;
      }
      if (opts.outputLabelNumber && !layerGroups['_Label']) {
        layerGroups['_Label'] = bg.layerSets.add();
        layerGroups['_Label'].name = 'Label';
      }

      // Export label
      if (opts.outputLabelNumber) {
        SoukaInput.newTextLayer(
          bg,
          labelNum,
          labelX,
          labelY,
          labelWidth,
          labelHeight,
          'Arial',
          opts.setFont ? opts.fontSize : undefined,
          false,
          90,
          layerGroups['_Label']
        );
      }

      // Replacement text
      if (textReplace) {
        for (var k = 0; k < textReplace.length; k++) {
          while (labelString.indexOf(textReplace[k].From) !== -1)
            labelString = labelString.replace(textReplace[k].From, textReplace[k].To);
        }
      }

      // White background
      SoukaInput.newWhiteBoxLayer(
        bg,
        labelString,
        labelX,
        labelY,
        labelWidth,
        labelHeight,
        layerGroups[labelGroup]
      );

      // Export text
      if (labelString && labelString != '') {
        artLayer = SoukaInput.newTextLayer(
          bg,
          labelString,
          labelX,
          labelY,
          labelWidth,
          labelHeight,
          opts.setFont ? opts.font : 'SimSun',
          opts.setFont ? opts.fontSize : undefined,
          !opts.horizontalText,
          90,
          opts.layerNotGroup ? undefined : layerGroups[labelGroup]
        );
      }

      // Execute the action, the name is the group name
      if (opts.runActionGroup) {
        try {
          bg.activeLayer = artLayer;
          this.doAction(labelGroup, opts.runActionGroup);
        } catch (e) {
          Stdlib.log('DoAction ' + labelGroup + ' in ' + opts.runActionGroup + ' Error: \r\n' + e);
        }
      }
    }

    //end set preferences
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits = startTypeUnits;
    app.displayDialogs = startDisplayDialogs;

    if (doc.resolution === 72) {
      doc.resizeImage(undefined, undefined, startDocResolution, ResampleMethod.NONE);
    }

    // Perform an action "_end" when the file is closed
    if (opts.runActionGroup) {
      try {
        bg.activeLayer = bg.layers[bg.layers.length - 1];
        this.doAction('_end', opts.runActionGroup);
      } catch (e) {}
    }

    // Save document
    var fileOut = new File(opts.target + '//' + filename);
    var options = PhotoshopSaveOptions;
    var asCopy = false;
    var extensionType = Extension.LOWERCASE;
    bg.saveAs(fileOut, options, asCopy, extensionType);

    // Close file
    if (!opts.notClose) bg.close();
  }
  alert(_MY_STRING_COMPLETE);
  if (errorMsg !== '') {
    alert('error:\r\n' + errorMsg);
  }
  Stdlib.log('Complete!');
};

//
// Create a white box layer
//
SoukaInput.newWhiteBoxLayer = function(doc, text, x, y, width, height, group) {
  var startDisplayDialogs = app.displayDialogs;
  try {
    app.displayDialogs = DialogModes.NO;
  } catch (err) {
    Stdlib.log(err);
  }

  artLayerRef = doc.artLayers.add();
  artLayerRef.kind = LayerKind.NORMAL;
  var h = doc.width * x;
  var v = doc.height * y;
  var selectionRegion = Array(
    Array(h, v),
    Array(h + UnitValue(width, 'px'), v),
    Array(h + UnitValue(width, 'px'), v + UnitValue(height, 'px')),
    Array(h, v + UnitValue(height, 'px')),
    Array(h, v)
  );
  app.activeDocument.selection.select(selectionRegion);
  var whiteColor = new SolidColor();
  whiteColor.rgb.red=255;
  whiteColor.rgb.green=255;
  whiteColor.rgb.blue=255;

  app.activeDocument.selection.fill(whiteColor);
  app.activeDocument.selection.deselect();

  if (group) artLayerRef.move(group, ElementPlacement.PLACEATBEGINNING);
  artLayerRef.name = "bg_" + text;

  app.displayDialogs = startDisplayDialogs;
};

//
// Create a text layer
//
SoukaInput.newTextLayer = function(
  doc,
  text,
  x,
  y,
  width,
  height,
  font,
  size,
  isVertical,
  opacity,
  group
) {
  artLayerRef = doc.artLayers.add();
  artLayerRef.kind = LayerKind.TEXT;
  textItemRef = artLayerRef.textItem;

  if (size) textItemRef.size = size;
  else textItemRef.size = doc.height / 90.0;

  textItemRef.font = font;
  textItemRef.hyphenation = true;
  textItemRef.justification = Justification.CENTER;

  textItemRef.antiAliasMethod = AntiAlias.SMOOTH;
  textItemRef.position = Array((doc.width * 1.02) * x, (doc.height * 1.01) * y);

  textItemRef.kind = TextType.PARAGRAPHTEXT;

  docRef = app.activeDocument;
  ratio = docRef.measurementScale.pixelLength;
  docRes = docRef.resolution;

  textItemRef.width = UnitValue(width, 'px');
  textItemRef.height = UnitValue(height, 'px');

  if (group) artLayerRef.move(group, ElementPlacement.PLACEATBEGINNING);

  textItemRef.contents = text;

  return artLayerRef;
};

//
// Text replacement string parser
//
SoukaInput.textReplaceReader = function(str) {
  var arr = [];
  var strs = str.split('|');
  if (!strs) return; // Parsing failure

  for (var i = 0; i < strs.length; i++) {
    if (!strs[i] || strs[i] === '') continue;

    var strss = strs[i].split('->');
    if (strss.length !== 2 || strss[0] === '') return; // Parsing failure

    arr.push({
      From: strss[0],
      To: strss[1]
    });
  }

  if (arr.length !== 0) return arr;
  else return;
};

//
// Write configuration
//
SoukaInput.writeIni = function(iniFile, ini) {
  //$.level = 1; debugger;
  if (!ini || !iniFile) {
    return;
  }
  var file = GenericUI.iniFileToFile(iniFile);

  if (!file) {
    Error.runtimeError(9001, Error('Bad ini file specified: "' + iniFile + '".'));
  }

  if (file.open('w', 'TEXT', '????')) {
    file.lineFeed = 'unix';
    file.encoding = 'UTF-8';
    var str = GenericUI.iniToString(ini);
    file.write(str);
    file.close();
  }
  return ini;
};

//
// Read configuration
//
SoukaInput.readIni = function(iniFile, ini) {
  //$.level = 1; debugger;

  if (!ini) {
    ini = {};
  }
  if (!iniFile) {
    return ini;
  }
  var file = GenericUI.iniFileToFile(iniFile);

  if (!file) {
    Error.runtimeError(9001, Error('Bad ini file specified: "' + iniFile + '".'));
  }

  if (!file.exists) {
    //
    // XXX Check for an ini path .ini file in the script's folder.
    //
  }

  if (file.exists && file.open('r', 'TEXT', '????')) {
    file.lineFeed = 'unix';
    file.encoding = 'UTF-8';
    var str = file.read();
    ini = GenericUI.iniFromString(str, ini);
    file.close();
  }

  if (ini.noUI) {
    ini.noUI = toBoolean(ini.noUI);
  }

  return ini;
};

//
// Get a list of file name strings for files under the folder
//
SoukaInput.getFilesListOfPath = function(path) {
  var folder = new Folder(path);
  if (!folder.exists) {
    return null;
  }

  var fileList = folder.getFiles();
  var fileNameList = new Array();

  for (var i = 0; i < fileList.length; i++) {
    var file = fileList[i];
    if (file instanceof File) {
      var short_name = file.toString().split('/');
      fileNameList.push(short_name[short_name.length - 1]);
    }
  }

  return fileNameList.sort();
};

//
// Get the ListBox selected item text and index
//
SoukaInput.getSelectedItemsText = function(listBox) {
  var selectedItems = new Array();

  for (var i = 0; i < listBox.children.length; i++) {
    if (listBox[i].selected) selectedItems.push({ text: listBox[i].text, index: listBox[i].index });
  }
  return selectedItems;
};
// Main program
SoukaInput.main = function() {
  var ui = new SoukaInput();
  ui.exec();
};

SoukaInput.main();

'ps_script.js';
