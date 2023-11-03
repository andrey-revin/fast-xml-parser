'use strict';

class XmlNode{
  constructor(tagname, lineNumber) {
    this.tagname = tagname;
    this.lineNumber = lineNumber;
    this.child = []; //nested tags, text, cdata, comments in order
    this[":@"] = {}; //attributes map
  }
  add(key,val){
    // this.child.push( {name : key, val: val, isCdata: isCdata });
    if(key === "__proto__") key = "#__proto__";
    this.child.push( {[key]: val });
  }
  addChild(node) {
    if(node.tagname === "__proto__") node.tagname = "#__proto__";
    if(node[":@"] && Object.keys(node[":@"]).length > 0){
      this.child.push( { [node.tagname]: node.child, [":@"]: node[":@"], lineNumber: node.lineNumber });
    }else{
      this.child.push( { [node.tagname]: node.child, lineNumber: node.lineNumber });
    }
  };
};


module.exports = XmlNode;