// MIT License
//
// Copyright (c) 2023 Mark "Grandy" Bishop
// https://github.com/GrandyB/SheetToHTML
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/** Straight/instant text transition. */
class TextCutAnimator {
    animate(outputElement, newText) {
        outputElement.innerHTML = newText;
    }
}

/** Reduce existing text to empty, then write it letter by letter. */
class TextWipeAndRewriteAnimator {
    constructor(typingInterval) {
        this.typingInterval = typingInterval;
    }
    animate(outputElement, newText) {
        const existing = outputElement.innerHTML;
        var updates = [];
        for (var i = 0; i < existing.length; i++) {
            const s = existing.slice(0, existing.length-i);
            console.debug(s);
            updates.push(s);
        }
        for (var j = 0; j <= newText.length; j++) {
            const s = newText.slice(0, j);
            outputElement.innerHTML = s;
            console.debug(s);
            updates.push(s);
        }
        var i = 0;
        updates.forEach(u => {
            setTimeout(() => { 
                outputElement.innerHTML = u;
            }, this.typingInterval * i);
            i++;
        });
    }
}

/** Replace existing to new letter by letter. */
class TextSwitchAnimator {
    constructor(typingInterval) {
        this.typingInterval = typingInterval;
    }
    animate(outputElement, newText) {
        var existing = outputElement.innerHTML;
        var biggerToSmaller = existing.length > newText.length;
        this.doUpdates(outputElement, 
            biggerToSmaller ? this.createBiggerToSmallerUpdates(existing, newText) : this.createSmallerOrSameToBiggerUpdates(existing, newText));

    }
    createBiggerToSmallerUpdates(existing, newText) {
        // e.g. SHAZBOT to FISH - should delete 'BOT' right to left, then continue swapping right to left
        var updates = [];
        for (var i = existing.length; i >= 0; i--) {
            if (newText[i]) {
                // We've reached the new text, splice it in
                existing = existing.substring(0, i) + newText[i] + existing.substring(i + 1);
            } else {
                existing = existing.slice(0, i);
            }
            updates.push(existing);
        }
        return updates;
    }
    createSmallerOrSameToBiggerUpdates(existing, newText) {
        // e.g. FISH to SHAZBOT - should just switch left to right, letter by letter
        var updates = [];
        for (let i = 0; i <= newText.length; i++) {
            existing = newText.substring(0, i) + existing.substring(i)
            updates.push(existing);
        }
        return updates;
    }
    doUpdates(outputElement, updates) {
        console.debug(updates);
        var i = 0;
        updates.forEach(u => {
            setTimeout(() => { 
                outputElement.innerHTML = u;
            }, this.typingInterval * i);
            i++;
        });
    }
}

class ImageCrossfadeAnimator {
    constructor(time) {
        this.time = time;
    }
    createImageElement(existing, src) {
        const img = existing.cloneNode(true);
        img.src = src;
        img.classList.add('fade-in');
        return img;
    }

    animate(outputElement, newSrc) {
        const newImg = this.createImageElement(outputElement, newSrc);
        outputElement.parentNode.insertBefore(newImg, outputElement.nextSibling);
      
        setTimeout(() => {
          newImg.classList.remove('fade-in');
        }, 100);
        setTimeout(() => {
          outputElement.remove();
        }, 100 + this.time);
    }
}

class ImageCutAnimator {
    animate(outputElement, newSrc) {
        outputElement.src = newSrc;
    }
}

const DEFAULT_TEXT_ANIMATOR = new TextSwitchAnimator(20);
const DEFAULT_IMAGE_ANIMATOR = new ImageCrossfadeAnimator(500);

class TextAnimator {
    static for(name) {
        switch(name) {
            case "wipe-rewrite":
                return new TextWipeAndRewriteAnimator(20);
            case "switch":
                return new TextSwitchAnimator(20);
            case "cut":
                return new TextCutAnimator();
            default:
                return DEFAULT_TEXT_ANIMATOR;
        }
    }
}

class ImageAnimator {
    static for(name) {
        switch(name) {
            case "fade":
                return new ImageCrossfadeAnimator(500);
            case "cut":
                return new ImageCutAnimator();
            default:
                return DEFAULT_IMAGE_ANIMATOR;
        }
    }
}