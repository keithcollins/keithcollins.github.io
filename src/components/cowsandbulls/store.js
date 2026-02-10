import { writable } from 'svelte/store';
import dictionary from './wordsSelect.json';

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const maxGuesses = 12;
const startDate  = '2022-04-27';
const diffInMs   = new Date() - new Date(startDate)
const dayIndex = Math.round(diffInMs / (1000 * 60 * 60 * 24));
const magicWord = dictionary && dictionary.length > 0 ? dictionary[dayIndex % dictionary.length] : 'test';

const newObj = {
	dayIndex,
	currentInput:'',
	currentBulls: 0,
	currentCows: 0,
	ruledOut:'',
	maxGuesses,
	magicWord,
	guesses: [],
	message: '',
	messageClass: '',
	won: false,
	lost: false,
	animateScore: false
};

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';
const storedGameObj = isBrowser ? localStorage.getItem('gameObj') : null;

let writeObj = newObj;
if (storedGameObj) {
	try {
		const parsed = JSON.parse(storedGameObj);
		if (parsed.dayIndex === dayIndex) {
			writeObj = parsed;
		}
	} catch (e) {
		// Invalid stored data, use new object
	}
}

export const gameObj = writable(writeObj);

gameObj.subscribe(go => {
	if (isBrowser) {
		localStorage.setItem('gameObj', JSON.stringify(go));
	}
});