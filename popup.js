document.addEventListener("DOMContentLoaded", () => {
    const qrBtn = document.getElementById("generate-qr-btn");
    const customTextRadio = document.getElementById("custom-text-radio");
    const customTextInput = document.getElementById("custom-text-input");
    const customTextInputContainer = document.querySelector(".custom-text-input-container");
    const currentUrlRadio = document.getElementById("current-url-radio");

    if (qrBtn) {
      qrBtn.addEventListener("click", generateQR);
    } else {
      //console.error("Could not find generate-qr-btn element");
    }
  
    if (customTextRadio) {
      customTextRadio.addEventListener("change", toggleCustomTextInput);
    } else {
      //console.error("Could not find custom-text-radio element");
    }
    if (currentUrlRadio) {
        currentUrlRadio.addEventListener("change", toggleCustomTextInput);
      } else {
       // console.error("Could not find current-url-radio element");
      } 
    function toggleCustomTextInput() {
      if (customTextRadio.checked) {
        customTextInput.disabled = false;
        customTextInputContainer.style.display = "block";
      } else {
        customTextInput.disabled = true;
        customTextInputContainer.style.display = "none";
      }
    }
  
    async function generateQR() {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      let textToEncode;
      if (customTextRadio.checked) {
        textToEncode = customTextInput.value;
      } else {
        textToEncode = tab.url;
      }
      if (textToEncode.trim() === "") {
       // console.error("Text to encode cannot be empty");
        return;
      }
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(textToEncode)}`;
      const image = document.createElement("img");
      const title = document.createElement("div");
      const subtitle = document.createElement("div");
      image.src = url;
      image.alt = "Generated QR Code";
      image.style.width = "150px";
      image.style.height = "150px";

      title.innerHTML = '<br />'+textToEncode;
      subtitle.innerHTML =  '<a href="'+url+'" target="_blank" style="color:blue;text-decoration:none">&#10697; Open QR</a><br /><br />';
      subtitle.style.marginTop = '0';
      subtitle.style.float = 'right';
      document.body.appendChild(title);
      document.body.appendChild(image);
      document.body.appendChild(subtitle);
    }
  });
  