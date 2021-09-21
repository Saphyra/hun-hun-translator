const keyMap = {
    "a": ["q", "y", "í", "s", "w", "e"],
    "á": ["q", "y", "í", "s", "w", "e", "a", "é", "p", "ő", "ú", "ű", "é", "-"],
    "b": ["v", "g", "h", "j", "m", "n", " "],
    "c": ["x", "d", "f", "v", " "],
    "d": ["x", "s", "e", "r", "f", "c"],
    "e": ["w", "3", "4", "r", "d", "s"],
    "é": ["w", "3", "4", "r", "d", "s", "l", "p", "ő", "á", "-", "."],
    "f": ["d", "r", "t", "g", "v", "c"],
    "g": ["f", "t", "z", "h", "b", "v"],
    "h": ["g", "z", "u", "j", "n", "b"],
    "i": ["j", "u", "8", "9", "o", "k"],
    "í": ["j", "u", "8", "9", "o", "k", "a", "y"],
    "j": ["h", "u", "i", "k", "m", "n"],
    "k": ["j", "i", "o", "l", ",", "m"],
    "l": ["k", "o", "p", "é", ".", ","],
    "m": ["n", "j", "k", ",", " "],
    "n": ["b", "h", "j", "k", "m", " "],
    "o": ["i", "9", "ö", "p", "l", "k"],
    "ó": ["i", "9", "ö", "p", "l", "k", "ü", "ő", "ú"],
    "ö": ["i", "9", "ö", "p", "l", "k", "ö", "p", "ő", "ó"],
    "ő": ["i", "9", "ö", "p", "l", "k", "p", "ü", "ó", "ú", "á", "é"],
    "p": ["o", "ö", "ü", "ő", "é", "l"],
    "q": ["1", "2", "w", "a"],
    "r": ["e", "4", "5", "t", "f", "d"],
    "s": ["w", "e", "d", "x", "y", "a"],
    "t": ["5", "6", "z", "g", "f", "r"],
    "u": ["7", "8", "i", "j", "h", "z"],
    "ú": ["7", "8", "i", "j", "h", "z", "ó", "ő", "á", "ű"],
    "ü": ["7", "8", "i", "j", "h", "z", "ö", "p", "ő", "ó"],
    "ű": ["7", "8", "i", "j", "h", "z", "ú", "á"],
    "v": ["c", "f", "g", "b", " "],
    "w": ["q", "2", "3", "e", "s", "a"],
    "x": ["y", "s", "d", "c", " "],
    "y": ["í", "a", "s", "c"],
    "z": ["t", "6", "7", "u", "h", "g"],
    ",": [],
    "?": [],
    "-": [],
    "!": [],
    ".": [],
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": [],
}

function translate(){
    const input = document.getElementById("input").value;

    const parts = input.split(" ");

    const processed = [];
    for(let i in parts){
        const p = {
            original: parts[i],
            translated: translateWord(parts[i])
        }
        processed.push(p);
    }

    displayResult(processed);
}

function translateWord(word){
    const shuffled = word[0] + shuffle(word.substring(1, word.length - 1)) + word[word.length - 1];

    if(word.length == 1){
        return simulateMistype(word);
    }else{
        let result = "";
        const charArr = word.split("");
        for(let i in charArr){
            result += simulateMistype(charArr[i]);
        }
        return result;
    }

    function simulateMistype(letter){
        if(random(0, 100) > 8){
            if(random(0, 100) > 87){
                return addExtraCharacter(letter);
            }

            return letter;
        }

        const isUpper = isUpperCase(letter);

        const replacement = getReplacement(letter);

        if(replacement == null){
            return letter;
        }

        const replacementIndex = random(0, replacement.length - 1);
        const result = replacement[replacementIndex];

        return isUpper ? result.toUpperCase() : result;

        function addExtraCharacter(letter){
            const replacement = getReplacement(letter);

            if(replacement == null){
                return letter;
            }

            const replacementIndex = random(0, replacement.length - 1);
            let addition = replacement[replacementIndex];
            if(random(0, 100) > 70){
                addition = addition.toUpperCase();
            }

            return random(0, 100) > 50 ? addition + letter : letter + addition;
        }
    }

    function isUpperCase(letter){
        return letter.toUpperCase() == letter;
    }

    function shuffle(t){
        return t.split('').sort(function(){return 0.5-Math.random()}).join('');
    }

    function getReplacement(letter){
        const replacement = keyMap[letter.toLowerCase()];
        if(replacement == undefined){
            console.log("Unmapped letter", letter);
            return null;
        }

        if(replacement.length == 0){
            return null;
        }

        return replacement;
    }
}

function displayResult(result){
    const processedInputContainer = document.getElementById("processed-input");
        processedInputContainer.innerHTML = "";
    const translationContainer = document.getElementById("translation");
        translationContainer.innerHTML = "";

    for(let i in result){
        const original = result[i].original;
        const translated = result[i].translated;

        const originalNode = createNode(original);
        const translatedNode = createNode(translated);

        processedInputContainer.appendChild(originalNode);
        translationContainer.appendChild(translatedNode);

        translatedNode.onmouseover = function(){
            originalNode.classList.add("highlighted");
            translatedNode.classList.add("highlighted");
        }

         translatedNode.onmouseout = function(){
            originalNode.classList.remove("highlighted");
            translatedNode.classList.remove("highlighted");
        }

        translatedNode.onclick = function(){
            translatedNode.innerText = translateWord(original);
        }
    }

    function createNode(text){
        const node = document.createElement("SPAN");
            node.innerText = text;
        return node;
    }
}

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}