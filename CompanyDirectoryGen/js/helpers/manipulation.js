//addClass("addButton", "disabled")
function addClass(targetId, className) {
  document.getElementById(targetId).classList.add(className);
}

//removeClass("addButton", "disabled")
function removeClass(targetId, className) {
  document.getElementById(targetId).classList.remove(className);
}

//checkForClass("addButton", "Location")
function checkForClass(targetId, className) {
  let result;
  try {
    let check = Object.values(document.getElementById(targetId).classList);
    check.forEach((element) => {
      if (element == className) {
        result = true;
      } else {
        result = false;
      }
    });
  } catch (e) {
    result = false;
  }
  return result;
}

//input "hello" - output "Hello";
function returnCapitilzed(input) {
  let output = `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
  return output;
}

//False if no nums - True if Nums.
function containsNumbers(string) {
  try {
    return Boolean(string.match(/\d/));
  } catch (e) {
    console.log(e);
  }
}

//False if no operators - True if operators.
function containsOperators(string) {
  try {
    return Boolean(string.match(/[+,-,*,=,!,||]/));
  } catch (e) {
    console.log(e);
  }
}

//False if invalid - True if valid.
function validateInput(input) {
  let userInput = returnCapitilzed(input);
  if (containsNumbers(userInput) || containsOperators(userInput)) {
    return false;
  } else {
    return true;
  }
}

//False if invalid - True if valid email format.
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export {
  addClass,
  removeClass,
  checkForClass,
  returnCapitilzed,
  containsNumbers,
  containsOperators,
  validateInput,
  validateEmail,
};
