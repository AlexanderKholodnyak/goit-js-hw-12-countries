import { error } from '@pnotify/core';

function errorTooMany() {
  error({
    title: 'Oh No!',
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 2000,
  });
}

function errorNotFound() {
  error({
    title: 'Oops!',
    text: 'No such country. Please enter another query!',
    delay: 2000,
  });
}

export default { errorTooMany, errorNotFound };