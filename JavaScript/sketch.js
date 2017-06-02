"use strict";

//var serverAddress = 'http://gbrpmscdbt02.corp.internal:8081';
var serverAddress = 'http://centd643512w5q:8080';

function setup() {
    createCanvas(100,100);
    fill(0);
    createP('Connecting to: ' + serverAddress).parent('headerDiv');
    getToken(gotLoginData, serverAddress + '/api/login','{"username":"duncan","password":"password"}');
}

function getToken(callback, url,args){
  var xhr = new XMLHttpRequest();
  var params = args;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
  xhr.send(params);

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    }
    if(xhr.readyState == 4 && xhr.status != 200) {
      createP('Connection Failed: ' + xhr.responseText).parent('headerDiv');
    }
  }  
}

function gotLoginData(data){
    tokenJSON = JSON.parse(data);
    console.log(tokenJSON.token);
    relInput = createInput('x.y.z');
    relInput.parent('relSelectDiv');
    var relButton = createButton('Go');
    relButton.mousePressed(gotRelInput);
    relButton.parent('relSelectDiv');
}