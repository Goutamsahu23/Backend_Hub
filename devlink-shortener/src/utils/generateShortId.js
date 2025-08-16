import {v4 as uuidv4} from 'uuid';

export default function generateShortId() {
    return uuidv4().slice(0,6); // Generate a short ID of 6 characters
}