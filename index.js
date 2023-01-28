import { exec } from 'child_process';
import { translate } from '@william5553/translate-google-api';

//Example
//var text = await translateText(10, 'es');

/**
 * [Given a number of sentences and a language in ISO language code, returns a randomly generated text in that language.]
 * @param {number} nSentences [number of sentences you want in your text] 
 * @param {string} language [ISO language code]
 * @returns {string} [A text with nSentences phrases and in the desired language]
 */

export async function generateAndTranslateText(nSentences, language) {
    return new Promise((resolve, reject) => {
        generateText(nSentences).then((res) => {
            translate(res, { to: language }).then((result) => {
                resolve(result.text);
            })
        })
    })
}

async function testGetPhrase() {
    var phrase = await getPhrase();
    if (phrase == 1) { console.warn('Is seed-phrase installed with the -g flag?'); return false; }
    else if (phrase == 2) { return false; }
    else { return true; }
}

async function generateText(nSentences, language) {
    var text = "";
    var test = testGetPhrase();
    if (!test) { return null; };
    for (var i = 0; i < nSentences; i++) {
        var phrase = await getPhrase();
        text += beautifyPhrase(phrase);
    }
    return text.replace('undefined', '');
}

function getPhrase() {
    return new Promise((resolve, reject) => {
        exec("seed-phrase", (error, stdout, stderr) => {
            if (error) { console.error(`error: ${error.message}`); resolve(1); }
            if (stderr) { console.error(`stderr: ${stderr}`); resolve(2); }
            resolve(stdout);
        })
    })
}

function beautifyPhrase(phrase) {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1, -1) + '. ';
}