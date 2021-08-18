var scafiWeb = document.createElement("iframe");
scafiWeb.src = "https://scafi-web.droppages.com/?headless" //without scafi head
scafiWeb.seamless = "seamless"
scafiWeb.frameBorder = "0"
scafiWeb.style = "display:block; width:100%; height:80vh"
var nav = document.getElementsByTagName("nav")[0];
nav.insertAdjacentElement("afterEnd", scafiWeb)
