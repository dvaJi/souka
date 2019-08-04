//
//   This is a Input Text Tool for Souka Text File.
//
//@show include
//

// Souka special format TextReader
SoukaTextReader = function(path) {
  var self = this;

  if (!path) {
    throw new Error("SoukaTextReader no filename");
  }

  var file = new File(path);
  if (!file || !file.exists) {
    throw new Error("SoukaTextReader file not exists");
  }

  // turn on
  file.open("r");

  // Json format read
  if (path.substring(path.lastIndexOf("."), path.length) === '.json') {
    file.open("r", "TEXT", "????");
    file.lineFeed = "unix";
    file.encoding = 'UTF-8';
    var json = file.read();
    var data = (new Function('return ' + json))();
    file.close();
    return data;
  }

  // Branch reading
  var state = 'start'; //'start','filehead','context'
  var notDealStr;
  var notDealLabelheadMsg;
  var nowFilename;
  var labelData = {};
  var filenameList = [];
  var groupData;

  for (var i = 0; !file.eof; i++) {
    var lineStr = file.readln();
    var lineMsg = SoukaTextReader.judgeLineType(lineStr);
    switch (lineMsg.Type) {
      case 'filehead':
        if (state == 'start') {
          //Handling start blocks
          var result = SoukaTextReader.readStartBlocks(notDealStr);
          if (!result)
            throw new Error("readStartBlocks fail");
          groupData = result.Groups;
        } else if (state === 'filehead') {} else if (state === 'context') {
          //Save label
          labelData[nowFilename].push({
            LabelheadValue: notDealLabelheadMsg.Values,
            LabelString: notDealStr.trim()
          });
        }

        //New file item
        labelData[lineMsg.Title] = [];
        filenameList.push(lineMsg.Title);
        nowFilename = lineMsg.Title;
        notDealStr = "";
        state = 'filehead';
        break;

      case 'labelhead':
        if (state === 'start') { //start-labelhead does not exist
          throw new Error("start-filehead");
        } else if (state === 'filehead') {
          // Do nothing
        } else if (state === 'context') {
          labelData[nowFilename].push({
            LabelheadValue: notDealLabelheadMsg.Values,
            LabelString: notDealStr.trim()
          });
        }

        notDealStr = "";
        notDealLabelheadMsg = lineMsg;
        state = 'context';
        break;

      case 'unknown':
        notDealStr += "\r" + lineStr;
        break;
      default:
        console.error('Uknown type', lineMsg.Type)
        break;
    }
  }

  if (state === 'context' && lineMsg.Type === 'unknown') {
    labelData[nowFilename].push({
      LabelheadValue: notDealLabelheadMsg.Values,
      LabelString: notDealStr.trim()
    });
  }

  // Member variables
  self.Path = path;
  self.ImageList = filenameList;
  self.LabelData = labelData;
  self.GroupData = groupData;

  return self;
};

//
// Judge string type 'filehead','labelhead','unknown'
//
SoukaTextReader.judgeLineType = function(str) {
  var myType = 'unknown';
  var myTitle;
  var myValues;

  str = str.trim();
  var fileheadRegExp = />{6,}\[.+\]<{6,}/g;
  var labelheadRegExp = /-{6,}\[\d+\]-{6,}\[.+\]/g;

  var fileheadStrArr = fileheadRegExp.exec(str);
  var labelheadStrArr = labelheadRegExp.exec(str);
  if (fileheadStrArr && fileheadStrArr.length != 0) {
    myType = 'filehead';
    var filehead = fileheadStrArr[0];
    myTitle = filehead.substring(filehead.indexOf("[") + 1, filehead.indexOf("]"));
  } else if (labelheadStrArr && labelheadStrArr.length != 0) {
    myType = 'labelhead';
    var labelhead = labelheadStrArr[0];
    myTitle = labelhead.substring(labelhead.indexOf("[") + 1, labelhead.indexOf("]"));
    var valuesStr = labelhead.substring(labelhead.lastIndexOf("[") + 1, labelhead.lastIndexOf("]"))
    myValues = valuesStr.split(",");
  }

  return {
    Type: myType,
    Title: myTitle,
    Values: myValues,
  };
};

SoukaTextReader.readStartBlocks = function(str) {
  var blocks = str.split("-");
  if (blocks.length < 3)
    throw new Error("Start blocks error!");

  //Block1 file header
  var filehead = blocks[0].split(",");
  if (filehead.length < 2)
    throw new Error("filehead error!");
  var first_version = parseInt(filehead[0]);
  var last_version = parseInt(filehead[1]);

  //Block2 group information
  var groups = blocks[1].split("\r");
  for (var i = 0; i < groups.length; i++)
    groups[i] = groups[i].trim();

  //End of block
  var comment = blocks[blocks.length - 1];

  return {
    FirstVer: first_version,
    LastVer: last_version,
    Groups: groups,
    Comment: comment,
  };
};

"text_reader.js";
