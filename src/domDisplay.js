export function setListSrc(imageList, srcList) {
    for (let i = 0; i < imageList.length; i++) {
        imageList[i].src = srcList[i];
    }
}

export function setText(textElementList, textList) {
    for (let i = 0; i < textElementList.length; i++) {
        textElementList[i].textContent = textList[i];
    }
}

export function setSingleText(textElement, textString) {
    textElement.textContent = textString;
}