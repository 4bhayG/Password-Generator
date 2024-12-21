"use strict";

// Select elements
const show_generated = document.querySelector(".text-area");
const show_len = document.querySelector(".show-len");
const slider_val = document.querySelector(".slider-1");
const btn_generate = document.querySelector(".btn-gen");
const input_1 = document.getElementById("input-1"); 
const input_2 = document.getElementById("input-2"); 
const input_3 = document.getElementById("input-3"); 
const input_4 = document.getElementById("input-4"); // Special characters
const copy_image=document.querySelector(".copy-icon");

let password = "";
let pass_len = slider_val.value;

// Functions
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getLowercase() {
    return String.fromCharCode(getRndInteger(97, 122)); 
}

function getUppercase() {
    return String.fromCharCode(getRndInteger(65, 90)); 
}

function getNumber() {
    return String.fromCharCode(getRndInteger(48, 57)); 
}

function getSpecialChar() {
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    return specialChars[getRndInteger(0, specialChars.length - 1)];
}

function generate(len) {
    const availableFunctions = [];
    password = "";

    if (input_1.checked) availableFunctions.push(getUppercase);
    if (input_2.checked) availableFunctions.push(getLowercase);
    if (input_3.checked) availableFunctions.push(getNumber);
    if (input_4.checked) availableFunctions.push(getSpecialChar);

    if (availableFunctions.length === 0) return "Select Something";

    for (let i = 0; i < len; i++) {
        const randomFunc = availableFunctions[getRndInteger(0, availableFunctions.length - 1)];
        password += randomFunc();
    }

    return password;
}

async function copy_to_clip(){
    try{
        await navigator.clipboard.writeText(show_generated.innerHTML);
        alert("Password Copied");
    }
    catch(err){
        console.error('Failed to copy: ', err);
    }
}

// Event Listeners
slider_val.addEventListener("input", (event) => {
    show_len.innerHTML = "Password Length: " + slider_val.value;
});

btn_generate.addEventListener("mousedown", () => {
    btn_generate.classList.add("active-btn");
    show_generated.innerHTML = generate(slider_val.value);
});

btn_generate.addEventListener("mouseup", () => {
    btn_generate.classList.remove("active-btn");
});

copy_image.addEventListener("click" , copy_to_clip);
