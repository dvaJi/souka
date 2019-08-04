//
// Action library
//
MyAction = function() {};

// Cancel selection
MyAction.selectNone = function() {
  var desc1 = new ActionDescriptor();
  var ref1 = new ActionReference();
  try {
    ref1.putProperty(cTID('Chnl'), sTID('selection'));
    desc1.putReference(cTID('null'), ref1);
    desc1.putEnumerated(cTID('T   '), cTID('Ordn'), cTID('None'));
    executeAction(sTID('set'), desc1, DialogModes.NO);
  } catch (e) {}
};

// Invert Selection
MyAction.selectInverse = function() {
  try {
    executeAction(cTID('Invs'), undefined, DialogModes.NO);
  } catch (e) {}
};

// Selection shrinkage (pixels)
MyAction.selectContract = function(pxl) {
  var desc1 = new ActionDescriptor();
  try {
    desc1.putUnitDouble(cTID('By  '), cTID('#Pxl'), pxl);
    executeAction(cTID('Cntc'), desc1, DialogModes.NO);
  } catch (e) {}
};

// Selection extension (pixels)
MyAction.selectExpand = function(pxl) {
  var desc1 = new ActionDescriptor();
  try {
    desc1.putUnitDouble(cTID('By  '), cTID('#Pxl'), pxl);
    executeAction(cTID('Expn'), desc1, DialogModes.NO);
  } catch (e) {}
};

// magic wand (x, y, tolerance, sample all layers, anti-aliasing, newly selected region mode string)
// The newly selected area mode string can be:
// 'setd' new area
// 'addTo' add
// 'subtractFrom' is removed
// 'interfaceWhite' intersection
MyAction.magicWand = function(x, y, tolerance, merged, antiAlias, newAreaModeStr) {
  try {
    if (x === undefined || y === undefined) {
      x = 0;
      y = 0;
    }
    if (tolerance === undefined) tolerance = 32;
    if (merged === undefined) merged = false;
    if (antiAlias === undefined) antiAlias = true;
    if (newAreaModeStr === undefined || newAreaModeStr === '') newAreaModeStr = 'setd';

    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID('selection'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(cTID('Hrzn'), cTID('#Pxl'), x);
    desc2.putUnitDouble(cTID('Vrtc'), cTID('#Pxl'), y);
    desc1.putObject(cTID('T   '), cTID('Pnt '), desc2);
    desc1.putInteger(cTID('Tlrn'), tolerance);
    desc1.putBoolean(cTID('Mrgd'), merged);
    desc1.putBoolean(cTID('AntA'), antiAlias);
    executeAction(sTID(newAreaModeStr), desc1, DialogModes.NO);
  } catch (e) {}
};

// New layer
MyAction.newLyr = function() {
  try {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putClass(cTID('Lyr '));
    desc1.putReference(cTID('null'), ref1);
    executeAction(cTID('Mk  '), desc1, DialogModes.NO);
  } catch (e) {}
};
// Delete current layer
MyAction.delLyr = function() {
  try {
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    executeAction(cTID('Dlt '), desc1, DialogModes.NO);
  } catch (e) {}
};

// Fill (what pad is used, transparency)
// use can be:
// 'FrgC' foreground
// 'BckC' background color
// 'Blck' black
// 'Gry ' Gray
// 'Wht ' White
MyAction.fill = function(use, opct) {
  try {
    var desc1 = new ActionDescriptor();
    desc1.putEnumerated(cTID('Usng'), cTID('FlCn'), cTID(use));
    desc1.putUnitDouble(cTID('Opct'), cTID('#Prc'), opct);
    desc1.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
    executeAction(cTID('Fl  '), desc1, DialogModes.NO);
  } catch (e) {}
};

// Dialog whitewash action (label data, image width, image height, magic wand tolerance, shrink protection pixels)
MyAction.lp_dialogClear = function(labelArr, imgWidht, imgHeight, tolerance, contract) {
  // Parameter check
  if (labelArr.length === 0) {
    return;
  }

  MyAction.selectNone();

  // Unit conversion
  imgWidht.convert('px');
  imgHeight.convert('px');

  // Check all blank areas in the box
  for (var i = 0; i < labelArr.length; i++) {
    var x = labelArr[i].x * imgWidht;
    var y = labelArr[i].y * imgHeight;

    MyAction.magicWand(x, y, tolerance, true, true, 'addTo');
  }

  // Fill in a blank area in the newly created auxiliary layer
  MyAction.newLyr();
  MyAction.fill('Blck', 100);

  // Use the magic wand at the four corners and then reverse the selection of protective shrinkage
  MyAction.selectNone();
  MyAction.magicWand(0, 0, tolerance, false, true, 'addTo');
  MyAction.magicWand(imgWidht - 1, 0, tolerance, false, true, 'addTo');
  MyAction.magicWand(0, imgHeight - 1, tolerance, false, true, 'addTo');
  MyAction.magicWand(imgWidht - 1, imgHeight - 1, tolerance, false, true, 'addTo');
  MyAction.selectInverse();
  MyAction.selectContract(contract);

  // Delete the auxiliary layer Create a white layer and fill the background color
  MyAction.delLyr();
  MyAction.newLyr();
  MyAction.fill('BckC', 100);

  MyAction.selectNone();
};

'my_action.js';
