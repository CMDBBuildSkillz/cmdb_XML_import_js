// function toYAML(inputLines, indentScale){
//     var localJSON = [];

//     var lineText;
//     var rootSet = false;

//     var indent = 0;
//     var prevIndent = 0;
//     var indentOffset = 0;
//     var firstColon;
//     var firstColonIsEnd = false;
//     var startsWithHyphen = false;
//     var startsWithHash = false;
//     var firstHash;
//     var hAddress = [];


//     for(var i = (startRow - 1); i < inputLines.length; i++){
//         lineText = rtrim(inputLines[i]); //take off trailing spaces
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
            

//             if(!rootSet){
//                 //try and set it
//                 indent = ((lineText.length - ltrim(lineText).length)/indentScale);
//                 if(indent == 0 && !startsWithHash && !startsWithHyphen && firstColon > 0){
//                     hAddress.push(lineText.substring(0,firstColon+1))
//                     rootSet=true;
//                     continue;
//                 } else if (lineText.substring(0,3)=='---') { 
//                     hAddress.push('ROOT:')
//                     rootSet=true;
//                     var nextLine = rtrim(inputLines[i+1]);
//                     if (((nextLine.length - ltrim(nextLine).length)/indentScale) == 0) {
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
//                     indent = ((lineText.length - ltrim(lineText).length)/indentScale)+indentOffset;
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
//                     } else if (prevIndent = indent && firstColonIsEnd) {
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

//                 }else{
//                     for (var j = 0; j < hAddress.length; j++) {
//                         hAddressText = hAddressText + hAddress[j]
//                     }

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
                
//                 localJSON.push({"Address":hAddressText, "Parameter":hParamText, "Value":hValueText});
//             }

//         }
    
//     }

//     console.log(localJSON);

//     return(localJSON);
// }


