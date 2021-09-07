'use strict';

function changemysize(value) {
    const texts = document.getElementsByClassName(`text-change`);
    
    for (let i = 0; i < texts.length; i++) {
        texts[i].style.fontSize = value + `px`; 
    }
}