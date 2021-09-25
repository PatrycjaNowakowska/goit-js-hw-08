import _throttle from '../../node_modules/lodash.throttle';

const form = document.querySelector(".feedback-form");
const formEmail = document.querySelector('[name="email"]')
const formMessage = document.querySelector('[name="message"]');

const LOCALSTORAGE_KEY = "feedback-form-state";

const saveData = () => {
    let data = {
        email: `${formEmail.value}`,
        message: `${formMessage.value}`,
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};

const updateInput = () => {
    try {
        formEmail.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email;
        formMessage.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message;
    } catch {
        console.log("There is no data. Please enter data!");
    }
};

const submit = e => {
    e.preventDefault();
    const {
        elements: { email, message },
    } = e.currentTarget;
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
    form.reset();
    e.currentTarget.reset();
    localStorage.clear();
};

updateInput();
form.addEventListener('input', throttle(saveData, 500));
form.addEventListener('submit', submit);