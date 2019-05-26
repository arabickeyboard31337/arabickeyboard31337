
      // Get DOM elements
      var textarea  = document.getElementById('textarea');
      var searchBar = document.getElementById('searchBar');
      var main = document.getElementById('main');

      // Initialize/Create alert box
      var copyAlert = document.createElement("div");
      copyAlert.setAttribute('class', 'alert alert-dark fade');

      var copyAlertSpan = document.createElement("span");
      var copyAlertSpanText = document.createTextNode("Text Copied!");

      copyAlertSpan.appendChild(copyAlertSpanText);

      copyAlert.appendChild(copyAlertSpan);

      // App Functions
      function writeTextArea(letter) {
		    //IE support
        if (document.selection) {
          textarea.focus();
          sel = document.selection.createRange();
          sel.text = letter;
        }
        //MOZILLA and others
        else if (textarea.selectionStart || textarea.selectionStart == '0') {
          var startPos = textarea.selectionStart;
          var endPos = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, startPos) + letter + textarea.value.substring(endPos, textarea.value.length);
            textarea.selectionStart = startPos + letter.length; 
            textarea.selectionEnd = startPos + letter.length;
            textarea.focus();
        } else {
          textarea.value += letter;
          textarea.focus();
        }   
      }

      function backspaceTextArea() {
        var startPos = textarea.selectionStart;
        var endPos = textarea.selectionEnd;

        if(textarea.selectionStart == textarea.selectionEnd) {
          textarea.value = textarea.value.substring(0, startPos - 1) + textarea.value.substring(endPos, textarea.value.length);
          textarea.selectionStart = startPos - 1; 
          textarea.selectionEnd = startPos - 1;
        } else {
          textarea.value = textarea.value.substring(0, startPos) + textarea.value.substring(endPos, textarea.value.length);
          textarea.selectionStart = startPos; 
          textarea.selectionEnd = startPos;
        }

      	textarea.focus();     
      }

      function newTextArea() {
        textarea.value = "";
        textarea.focus();
      }

      function selectAllCopy() {
        textarea.select();
        document.execCommand("copy");
        main.appendChild(copyAlert);
      }

      function saveTextArea() {
        var textToWrite = textarea.value;
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = "Myfile";

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null) {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
      }

      function printTextArea() {
        childWindow = window.open('','childWindow','location=yes, menubar=yes, toolbar=yes');
        childWindow.document.open();
        childWindow.document.write('<html><head></head><body>');
        childWindow.document.write(textarea.value.replace(/\n/gi,'<br>'));
        childWindow.document.write('</body></html>');
        childWindow.print();
        childWindow.document.close();
        childWindow.close();
      }

      function googleSearch() {
      	window.open('https://www.google.com/search?q=' + textarea.value);
      }

      function googleImagesSearch() {
        window.open('https://www.google.com/search?q=' + textarea.value + '&tbm=isch');
      }

      function youtubeSearch() {
        window.open('https://www.youtube.com/results?search_query=' + textarea.value);
      }

      function yahooSearch() {
        window.open('https://search.yahoo.com/search?q=' + textarea.value);
      }

      function bingSearch() {
        window.open('https://www.bing.com/search?q=' + textarea.value);
      }


      function translateTextArea(lang) {
        window.open('https://translate.google.com/#view=home&op=translate&sl=ar&tl=' + lang + '&text=' + textarea.value);
      }

      imageMapResize();