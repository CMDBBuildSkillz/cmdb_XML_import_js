// "use strict";
// var outputReleaseJSON = [];
// var outputGlobalJSON = [];
// var outputJSON = [];

// function OutputGenericConfigLine(origText, addressText, paramText, valueText, noteText, configType){
//     this.origText = origText;
//     this.addressText = addressText;
//     this.paramText = paramText;
//     this.valueText = JSON.stringify(valueText);
//     this.noteText = noteText;
//     this.configType = configType;
    

//     if (addressText.indexOf('{ENVID}') >= 0||paramText.indexOf('{ENVID}')>=0||valueText.indexOf('{ENVID}')>=0){
//         this.recurseByEnv = true;
//     } else {
//         this.recurseByEnv = false;
//     }
//     this.recurseBySubEnv = false;
//     if (configType=='Global'&& (addressText.indexOf('{Release}') >= 0||paramText.indexOf('{Release}')>=0||valueText.indexOf('{Release}')>=0)){
//         this.recurseByRel = true;
//     } else {
//         this.recurseByRel = false;
//     }
//     if (addressText.indexOf('{SENSITIVE}') >= 0||paramText.indexOf('{SENSITIVE}')>=0||valueText.indexOf('{SENSITIVE}')>=0){
//         this.sensitive = true;
//     } else {
//         this.sensitive = false;
//     }

// }

// function OutputReleaseConfigLine(origText, addressText, paramText, valueText, noteText){
//     this.origText = origText;
//     this.addressText = addressText;
//     this.paramText =paramText;
//     this.valueText = valueText;
//     this.noteText = noteText;

//     if (addressText.indexOf('{ENVID}') >= 0||paramText.indexOf('{ENVID}')>=0){
//         this.recurseByEnv = true;
//     } else {
//         this.recurseByEnv = false;
//     }
//     this.recurseBySubEnv = false;

// }

// function OutputGlobalConfigLine(origText, addressText, paramText, valueText, noteText){
//     this.origText = origText;
//     this.addressText = addressText;
//     this.paramText =paramText;
//     this.valueText = valueText;
//     this.noteText = noteText;

//     if (addressText.indexOf('{ENVID}') >= 0||paramText.indexOf('{ENVID}')>=0){
//         this.recurseByEnv = true;
//     } else {
//         this.recurseByEnv = false;
//     }
//     this.recurseBySubEnv = false;
//     if (addressText.indexOf('{Release}') >= 0||paramText.indexOf('{Release}')>=0){
//         this.recurseByRel = true;
//     } else {
//         this.recurseByRel = false;
//     }

// }

// function getFirstHash(inputText){
//     var hashIndex;
//     var currentIndex;
//     var currentChar;
//     var inSingleQuotes = false;
//     var inDoubleQuotes = false;

//     hashIndex = inputText.indexOf('#');

//     if (hashIndex<0){
//         return hashIndex;
//     } else {

//         if(inputText.indexOf('"')>=0 || inputText.indexOf("'")>=0){
//             for (currentIndex = 0; currentIndex<inputText.length;currentIndex++){
//                 currentChar = inputText.substring(currentIndex,currentIndex+1);
//                 if (currentChar == '"') {inDoubleQuotes = !inDoubleQuotes};
//                 if (currentChar == "'") {inSingleQuotes = !inSingleQuotes};
//                 if (!inDoubleQuotes&&!inSingleQuotes){
//                     if (currentChar == '#'){
//                         return currentIndex;
//                     }
//                 }
//             }

//             return -1;
//         } else {
//             return inputText.indexOf('#');
//         }
//     }
// }

// function generateCMDBvalues(inputLines, outputFile) {
    
//     console.log('Single',multiFiles,inputLines);
    

//     var lineText;
//     var rootSet = false;
//     var lineIsGlobal;
//     var indent = 0;
//     var prevIndent = 0;
//     var indentOffset = 0;
//     var firstColon;
//     var firstColonIsEnd = false;
//     var startsWithHyphen = false;
//     var startsWithHash = false;
//     var firstHash;
//     var hAddress = [];
//     outputReleaseJSON = [];
//     outputJSON = [];

//     for(var i = (startRow - 1); i < inputLines.length; i++){
//         lineText = rtrim(inputLines[i]); //take off trailing spaces
//         //console.log(lineText);
//         if (ltrim(lineText).length > 0) { //if not a blank line

//             prevIndent = indent;
//             //firstHash = lineText.indexOf('#');
//             firstHash = getFirstHash(lineText);
//             firstColon = lineText.indexOf(':');
//             firstColonIsEnd = (firstColon==lineText.length-1);
//             startsWithHash = (ltrim(lineText).indexOf('#')==0);
//             startsWithHyphen = (ltrim(lineText).substring(0,1)  == "-");
            
//             var hAddressText = '';
//             var hParamText = '';
//             var hValueText = '';
//             var hNoteText = '';
//             var SQLString = '';


//             if(!rootSet){
//                 //try and set it
//                 indent = ((lineText.length - ltrim(lineText).length)/2);
//                 if(indent == 0 && !startsWithHash && !startsWithHyphen && firstColon > 0){
//                     hAddress.push(lineText.substring(0,firstColon+1))
//                     rootSet=true;
//                     continue;
//                 } else if (lineText.substring(0,3)=='---') { 
//                     hAddress.push('ROOT:')
//                     rootSet=true;
//                     var nextLine = rtrim(inputLines[i+1]);
//                     if (((nextLine.length - ltrim(nextLine).length)/2) == 0) {
//                         indentOffset=1;
//                     }
//                     continue;
//                 } else {
//                     //can't be a root if it's indent isn't zero
//                     continue; // go to next row
//                 }
//             } else {
//                 //root is set - carry on regardless

//                 //EVERYTHING IS ENDING UP IN GLOBAL AS GLOBAL WAS THE ROOT AND WE NEVER GO BACK AND OVERWRITE IT
//                 //FIX THIS SECTION

//                 if((firstColon > 0 || startsWithHyphen) && !startsWithHash){
//                     indent = ((lineText.length - ltrim(lineText).length)/2)+indentOffset;
//                     if (startsWithHyphen && !indentedArrays){
//                         indent = indent + 2;
//                     }
//                     if (prevIndent > indent) {
//                         if (firstColonIsEnd){
//                             //Remove to indent level then add on?
//                             hAddress.splice(indent+1,hAddress.length-(indent+1)); 
//                             hAddress[hAddress.length-1] = ltrim(lineText.substring(0,firstColon+1));
//                             // console.log('Renamed Address Block B');
//                         } else {
//                             //remove entries down to same level as indent
//                             //splice from index = (indent-1) to index.length?
//                             hAddress.splice(indent,hAddress.length-(indent));
//                             //console.log('Removed Address Block E');
//                         }
//                     } else if (prevIndent == indent && firstColonIsEnd) {
//                         hAddress.push(ltrim(lineText.substring(0,firstColon+1)));
//                         // console.log('Added Address Block C');
//                     } else if (prevIndent < indent && firstColonIsEnd) {
                        
//                         hAddress.push(ltrim(lineText.substring(0,firstColon+1))); //changed this as it appeared to be wrong below

//                         // hAddress.splice(indent+1,hAddress.length-(indent+1));
//                         // hAddress[hAddress.length-1] = ltrim(lineText.substring(0,firstColon+1));
//                         // console.log('Removed and Renamed Address Block D');
//                     }
//                 } else { //starts with a hash or doesn't have a colon or doesn't start with a hyphen - ignore this row
//                     continue; // go to next row
//                 }
//             }
//             if ((startsWithHyphen || !firstColonIsEnd) && !startsWithHash){
//                 hAddressText = '';

//                 if (startsWithHyphen) {
//                     for (var j = 0; j < hAddress.length - 1; j++) {
//                         hAddressText = hAddressText + hAddress[j]
//                     }
//                     hAddressText = hAddressText + "{ParamName}" //+ "{ParamName}:-"
//                 }else{
//                     for (var j = 0; j < hAddress.length; j++) {
//                         hAddressText = hAddressText + hAddress[j]
//                     }
//                     hAddressText = hAddressText + "{ParamName}" //+ "{ParamName}:"
//                 }

//                 if (!startsWithHyphen) {
//                     hParamText = ltrim(lineText.substring(0,firstColon));
//                 } else {
//                     hParamText = hAddress[hAddress.length-1].substring(0,hAddress[hAddress.length-1].length);
//                 }

//                 if ((hParamText.substring(0,1) == "'" && hParamText.substring(hParamText.length - 1) == "'")||(hParamText.substring(0,1) == '"' && hParamText.substring(hParamText.length - 1) == '"')){
//                     hParamText = hParamText.substring(1,hParamText.length - 1);
//                 }
            
//                 if(firstHash <= 0) {
//                     // get all chars after first colon
//                     if (!startsWithHyphen){
//                         hValueText = rtrim(ltrim(lineText.substring(firstColon+1,lineText.length)));
//                     } else {
//                         hValueText = rtrim(ltrim(lineText.substring(0,lineText.length)));
//                     }
//                     hNoteText = '';
//                 } else {
//                     // get all chars between first colon and hash
//                     //hValueText = rtrim(ltrim(lineText.substring(firstColon+1,firstHash)));
//                     if (!startsWithHyphen){
//                         hValueText = rtrim(ltrim(lineText.substring(firstColon+1,firstHash)));
//                     } else {
//                         hValueText = rtrim(ltrim(lineText.substring(0,firstHash)));
//                     }
//                     // get all chars after has for notes
//                     hNoteText = rtrim(ltrim(lineText.substring(firstHash,lineText.length)));
//                 }

//                 if (startsWithHyphen) {
//                     hValueText = hValueText.substring(2);
//                 }

//                 if ((hValueText.substring(0,1) == "'" && hValueText.substring(hValueText.length - 1) == "'")||(hValueText.substring(0,1) == '"' && hValueText.substring(hValueText.length - 1) == '"')){
//                     hValueText = hValueText.substring(1,hValueText.length - 1);
//                 }

//             }
//             if (hParamText && !firstColonIsEnd && !startsWithHash ){
//                 //outputLine = new OutputLine(inputLines[i],hAddressText,hParamText,hValueText,hNoteText );
//                 hAddressText = rubyClean(hAddressText, thisReleaseName);
//                 hParamText = rubyClean(hParamText,thisReleaseName);
//                 hValueText = rubyClean(hValueText,thisReleaseName);
                

//                 if(hAddressText.indexOf('oneleo_release_map:')>=0||hAddressText.indexOf('oneleonardo_envs:')>=0||hAddressText.indexOf('talend_interfaces')>=0){
//                     lineIsGlobal=false;
//                 } else {
//                     lineIsGlobal=true;
//                 }

//                 // hValueText = JSON.stringify(hValueText);

//                 if(!lineIsGlobal){
//                     //outputReleaseJSON.push(new OutputReleaseConfigLine(lineText,hAddressText,hParamText,hValueText,hNoteText ));
//                     outputJSON.push(new OutputGenericConfigLine(lineText,hAddressText,hParamText,hValueText,hNoteText,'Release'));
//                 } else {
//                     if(incGlobal){
//                         // as release or global section? //overwrite or 
//                         if(globalInGlobal){
//                             //outputGlobalJSON.push(new OutputGlobalConfigLine(lineText,hAddressText,hParamText,hValueText,hNoteText ));
//                             outputJSON.push(new OutputGenericConfigLine(lineText,hAddressText,hParamText,hValueText,hNoteText,'Global' ));
//                         } else {
//                             //outputReleaseJSON.push(new OutputReleaseConfigLine(lineText,hAddressText,hParamText,hValueText,hNoteText));
//                             outputJSON.push(new OutputGenericConfigLine(lineText,hAddressText,hParamText,hValueText,hNoteText,'Release' ));
//                         }
//                     } else {
//                         //not doing anything if we arne't including them                        
//                     }

//                 }

//             }

//         }
    
//     }

//     if (debug){
//         // console.log(outputReleaseJSON);
//         // saveJSON(outputReleaseJSON, outputFile);
//         // saveJSON(outputGlobalJSON, outputFile + '-global');
//         console.log(outputJSON);
//         saveJSON(outputJSON, outputFile+'-total');
//         return 'Debug Exit';
//     } else {
//         if (createReleaseRequired){
//             createRelease();
//         } else {
//             writeReleaseData();
//         }
//     }
// }
// //=================================================================================
// //=================================================================================
// //=================================================================================
// function generateCMDBvaluesMulti(outputFile) {

//     var mainLines = mainFile;
//     envJSON = toYAML(envFile,8);
//     relJSON = toYAML(relFile,2);
//     intJSON = toYAML(intFile,2); // is a MIX of 2 and 4
 
//     console.log('Multi',multiFiles,mainLines,envJSON,relJSON,intJSON);
 
//     var lineText;
//     var rootSet = false;
//     var finishedGlobals = false;

//     var indent = 0;
//     var prevIndent = 0;
//     var indentOffset = 0;
//     var firstColon;
//     var firstColonIsEnd = false;
//     var startsWithHyphen = false;
//     var startsWithHash = false;
//     var firstHash;
//     var hAddress = [];
//     outputReleaseJSON = [];

//     for(var i = (startRow - 1); i < mainLines.length; i++){
//         lineText = rtrim(mainLines[i]); //take off trailing spaces
//         //console.log(lineText);
//         if (ltrim(lineText).length > 0) { //if not a blank line

//             prevIndent = indent;
//             firstHash = getFirstHash(lineText);
//             firstColon = lineText.indexOf(':');
//             firstColonIsEnd = (firstColon==lineText.length-1);
//             startsWithHash = (ltrim(lineText).indexOf('#')==0);
//             startsWithHyphen = (ltrim(lineText).substring(0,1)  == "-");
            
//             var hAddressText = '';
//             var hParamText = '';
//             var hValueText = '';
//             var hNoteText = '';
//             var SQLString = '';

//             if (!finishedGlobals){
//                 if(lineText.indexOf('oneleo_release_map')>=0||lineText.indexOf('oneleonardo_envs')>=0||lineText.indexOf('talend_interfaces')>=0){
//                     finishedGlobals=true;
//                 }
//             }

//             if(!rootSet){
//                 //try and set it
//                 indent = ((lineText.length - ltrim(lineText).length)/2);
//                 if(indent == 0 && !startsWithHash && !startsWithHyphen && firstColon > 0){
//                     hAddress.push(lineText.substring(0,firstColon+1))
//                     rootSet=true;
//                     continue;
//                 } else if (lineText.substring(0,3)=='---') { 
//                     hAddress.push('ROOT:')
//                     rootSet=true;
//                     var nextLine = rtrim(mainLines[i+1]);
//                     if (((nextLine.length - ltrim(nextLine).length)/2) == 0) {
//                         indentOffset=1;
//                     }
//                     continue;
//                 } else {
//                     //can't be a root if it's indent isn't zero
//                     continue; // go to next row
//                 }
//             } else {
//                 //root is set - carry on regardless
//                 if((firstColon > 0 || startsWithHyphen) && !startsWithHash){
//                     indent = ((lineText.length - ltrim(lineText).length)/2)+indentOffset;
//                     if (prevIndent > indent) {
//                         if (firstColonIsEnd){
//                             //Remove to indent level then add on?
//                             hAddress.splice(indent+1,hAddress.length-(indent+1)); 
//                             hAddress[hAddress.length-1] = ltrim(lineText.substring(0,firstColon+1));
//                             // console.log('Renamed Address Block B');
//                         } else {
//                             //remove entries down to same level as indent
//                             //splice from index = (indent-1) to index.length?
//                             hAddress.splice(indent,hAddress.length-(indent));
//                             //console.log('Removed Address Block E');
//                         }
//                     } else if (prevIndent == indent && firstColonIsEnd) {
//                         hAddress.push(ltrim(lineText.substring(0,firstColon+1)));
//                         // console.log('Added Address Block C');
//                     } else if (prevIndent < indent && firstColonIsEnd) {
//                         hAddress.splice(indent+1,hAddress.length-(indent+1));
//                         hAddress[hAddress.length-1] = ltrim(lineText.substring(0,firstColon+1));
//                         // console.log('Removed and Renamed Address Block D');
//                     }
//                 } else { //starts with a hash or doesn't have a colon or doesn't start with a hyphen - ignore this row
//                     continue; // go to next row
//                 }
//             }
//             if ((startsWithHyphen || !firstColonIsEnd) && !startsWithHash){
//                 hAddressText = '';

//                 if (startsWithHyphen) {
//                     for (var j = 0; j < hAddress.length - 1; j++) {
//                         hAddressText = hAddressText + hAddress[j]
//                     }
//                     hAddressText = hAddressText + "{ParamName}" //+ "{ParamName}:-"
//                 }else{
//                     for (var j = 0; j < hAddress.length; j++) {
//                         hAddressText = hAddressText + hAddress[j]
//                     }
//                     hAddressText = hAddressText + "{ParamName}" //+ "{ParamName}:"
//                 }

//                 if (!startsWithHyphen) {
//                     hParamText = ltrim(lineText.substring(0,firstColon));
//                 } else {
//                     hParamText = hAddress[hAddress.length-1].substring(0,hAddress[hAddress.length-1].length);
//                 }

//                 if ((hParamText.substring(0,1) == "'" && hParamText.substring(hParamText.length - 1) == "'")||(hParamText.substring(0,1) == '"' && hParamText.substring(hParamText.length - 1) == '"')){
//                     hParamText = hParamText.substring(1,hParamText.length - 1);
//                 }
            
//                 if(firstHash <= 0) {
//                     // get all chars after first colon
//                     hValueText = rtrim(ltrim(lineText.substring(firstColon+1,lineText.length)));
//                     hNoteText = '';
//                 } else {
//                     // get all chars between first colon and hash
//                     hValueText = rtrim(ltrim(lineText.substring(firstColon+1,firstHash)));
//                     // get all chars after has for notes
//                     hNoteText = rtrim(ltrim(lineText.substring(firstHash,lineText.length)));
//                 }

//                 if (startsWithHyphen) {
//                     hValueText = hValueText.substring(2);
//                 }

//                 if ((hValueText.substring(0,1) == "'" && hValueText.substring(hValueText.length - 1) == "'")||(hValueText.substring(0,1) == '"' && hValueText.substring(hValueText.length - 1) == '"')){
//                     hValueText = hValueText.substring(1,hValueText.length - 1);
//                 }

//             }
//             if (hParamText && !firstColonIsEnd && !startsWithHash ){

//                 if (hAddressText.indexOf("<%=") >=0) {
//                     hAddressText = rubyLookup(hAddressText,'A');
//                 }

//                 if (hParamText.indexOf("<%=") >=0) {
//                     hParamText = rubyLookup(hParamText, 'P');
//                 }
//                 if (hValueText.indexOf("<%=") >=0) {
//                     hValueText = rubyLookup(hValueText, 'V');
//                 }

//                 hAddressText = rubyClean(hAddressText, thisReleaseName);
//                 hParamText = rubyClean(hParamText,thisReleaseName);
//                 hValueText = rubyClean(hValueText,thisReleaseName);
                


//                 if(incGlobal || finishedGlobals){
//                     outputReleaseJSON.push(new OutputReleaseConfigLine(lineText,hAddressText,hParamText,hValueText,hNoteText ));
//                 }
//             }

//         }
    
//     }

//     console.log(outputReleaseJSON);
//     //saveJSON(outputJSON, outputFile);
//     console.log('Multifile unavailable at present - use single only')
//     console.log('Exiting...')
//     if (debug){
//         return 'Debug Exit';
//     } else {
//         if (createReleaseRequired){
//             createRelease();
//         } else {
//             writeReleaseData();
//         }
//     }
// }