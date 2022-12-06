import {
  getDepartment,
  getDepartmentName,
  getDepartmentId,
  getDepartmentById,
  getDepartmentForm,
  getDepartmentPersonnelCount,
  getDepartmentPersonnelById,
  updateDepartment,
  deleteDepartment,
  addDepartment,
  getDepartmentIdList,
} from "../calls/department.js";
import {
  getLocation,
  getLocationId,
  getLocationName,
  getLocationById,
  getLocationForm,
  getLocationPersonnelCount,
  getLocationPersonnelById,
  getLocationIdList,
  updateLocation,
  deleteLocation,
  addLocation,
} from "../calls/location.js";
import {
  getPersonnelId,
  getPersonnelIdByEmail,
  getPersonnelByEmail,
  getPersonnelById,
  getPersonnelForm,
  getPersonnelFullNameById,
  updatePersonnel,
  deletePersonnel,
  addPersonnel,
  getPersonnelPretty,
  getPersonnelPrettyByDepartmentId,
  getPersonnelPrettyByLocationId,
  getPersonnelPrettyById,
  getPersonnelPrettyByName,
  getPersonnelPrettyBySurname,
  getPersonnelPrettyByEmail,
} from "../calls/personnel.js";
import {
  checkForClass,
  validateEmail,
  validateInput,
  returnCapitilzed,
  removeClass,
  addClass,
} from "./manipulation.js";

export function generateTable(data) {
  if (data.length == 0) {
    alert(
      `You are attempting to view empty data.
This department or location has no employees. `
    );
    return;
  }

  let headerArray = Object.keys(data[0]);
  let headerLength = Object.keys(data[0]).length;

  let newTable = document.createElement("table");
  newTable.classList.add("w-100");
  let newHeading = document.createElement("tr");
  newHeading.classList.add("bg-light");
  newTable.appendChild(newHeading);

  for (let i = 0; i < headerLength; i++) {
    let newHeader = document.createElement("th");
    newHeading.appendChild(newHeader);
    newHeader.innerHTML = headerArray[i];
    newHeader.setAttribute("id", `table${headerArray[i]}`);
    if (headerArray[0] == "Id" && i == 0) {
      newHeader.classList.add("col-1");
    }
    if (i == headerLength - 1) {
      newHeader.classList.add("col-3");
      newHeader.classList.add("minWidth120");
    }
  }

  let userId;

  data.forEach((element) => {
    let newRow = document.createElement("tr");
    newTable.appendChild(newRow);
    newRow.classList.add("border");
    let dataArray = Object.values(element);
    for (let i = 0; i < headerLength; i++) {
      //console.log(typeof dataArray[i]);
      if (dataArray[i] != null && headerArray[0] == "Id") {
        userId = dataArray[0];
        let newData = document.createElement("td");
        newRow.appendChild(newData);
        newData.innerHTML = dataArray[i];
        newData.classList.add("py-2");
      } else {
        if (dataArray[i] == null) {
          let newData = document.createElement("td");
          newData.classList.add("justify-self-center");
          newRow.appendChild(newData);
          let updateBtn = generateUpdateButton(userId);
          newData.appendChild(updateBtn);

          let deleteBtn = generateDeleteButton(userId);
          newData.appendChild(deleteBtn);
          newData.classList.add("mt-1");
        } else {
          let newData = document.createElement("td");
          newRow.appendChild(newData);
          newData.innerHTML = dataArray[i];
          newData.classList.add("py-2");
        }
      }
    }
  });

  $("#mainContent").html(newTable);
  //console.log(newTable);
}

//Forms
export function generateForm(data, jqueryTarget) {
  //console.log(data[0]);
  let formLabelsObject = Object.keys(data[0]);
  //console.log(formLabelsObject);

  let newForm = document.createElement("form");

  for (let i = 0; i < formLabelsObject.length; i++) {
    if (formLabelsObject[i] == "id" || formLabelsObject[i] == "Id") {
      continue;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("d-flex");
    newDiv.classList.add("row-flex");
    newDiv.classList.add("m-3");
    newForm.appendChild(newDiv);

    let newLabel = document.createElement("label");
    newLabel.classList.add("form-label");
    newLabel.classList.add("col-4");
    //newLabel.setAttribute("for", "YYY");
    newLabel.innerHTML = formLabelsObject[i];
    newDiv.appendChild(newLabel);

    if (formLabelsObject[i] == "Department") {
      let newInput = generateDropdown(getDepartment(), "Department");
      newInput.setAttribute("id", `userInput${formLabelsObject[i]}`);
      newDiv.appendChild(newInput);
    } else if (formLabelsObject[i] == "Location") {
      let newInput = generateDropdown(getLocation(), "Location");
      newInput.setAttribute("id", `userInput${formLabelsObject[i]}`);
      newDiv.appendChild(newInput);
    } else {
      let newInput = document.createElement("input");
      newInput.setAttribute("id", `userInput${formLabelsObject[i]}`);
      newDiv.appendChild(newInput);
      newInput.classList.add("form-control");

      //newInput.setAttribute("id", "YYY");
    }
  }
  //document.getElementById(target).appendChild(newForm);
  //console.log(newForm);
  $(jqueryTarget).html(newForm);
  return newForm;
}

export function generateUpdateForm(data, user, jqueryTarget) {
  let dataName = Object.keys(data[0]);
  let dataValue = Object.values(user);
  let newForm = document.createElement("form");
  //console.log(data);
  //console.log(user);
  //console.log(dataName);
  //console.log(dataValue);

  for (let i = 0; i < Object.keys(data[0]).length; i++) {
    if (dataName[i] == "id") {
      continue;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("d-flex");
    newDiv.classList.add("row-flex");
    newDiv.classList.add("m-3");

    newForm.appendChild(newDiv);

    let newLabel = document.createElement("label");
    newLabel.classList.add("form-label");
    newLabel.classList.add("col-4");
    //newLabel.setAttribute("for", "YYY");
    newLabel.innerHTML = dataName[i];
    newDiv.appendChild(newLabel);

    if (dataName[i] == "Department") {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.classList.add("mx-2");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("id", `existing${dataName[i]}`);
      newInput.setAttribute("value", getDepartmentName(dataValue[i]));
      newDiv.appendChild(newInput);
      let updateInput = generateDropdown(getDepartment(), "Department");
      updateInput.classList.add("form-control");
      updateInput.setAttribute("id", `userInput${dataName[i]}`);
      newDiv.appendChild(updateInput);
    } else if (dataName[i] == "Location") {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.classList.add("mx-2");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("id", `existing${dataName[i]}`);
      newInput.setAttribute("value", getLocationName(dataValue[i]));
      newDiv.appendChild(newInput);
      let updateInput = generateDropdown(getLocation(), "Location");
      updateInput.setAttribute("placeholder", dataValue[i]);
      updateInput.setAttribute("id", `userInput${dataName[i]}`);
      updateInput.classList.add("form-control");
      newDiv.appendChild(updateInput);
    } else {
      //console.log(dataValue[0]);
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.classList.add("mx-2");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("value", `${dataValue[i]}`);
      newInput.setAttribute("id", `existing${dataName[i]}`);
      newDiv.appendChild(newInput);
      let updateInput = document.createElement("input");
      updateInput.setAttribute("placeholder", dataValue[i]);
      updateInput.setAttribute("id", `userInput${dataName[i]}`);
      updateInput.classList.add("form-control");
      newDiv.appendChild(updateInput);
      //console.log(dataName[i]);
      //console.log(dataValue[i]);
    }
  }
  //console.log(newForm);
  $(jqueryTarget).html(newForm);
  return newForm;
}

export function generateAddForm(data, jqueryTarget) {
  //console.log(data[0]);
  let formLabelsObject = Object.keys(data[0]);
  //console.log(formLabelsObject);

  let newForm = document.createElement("form");

  for (let i = 0; i < formLabelsObject.length; i++) {
    if (formLabelsObject[i] == "id" || formLabelsObject[i] == "Id") {
      continue;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("d-flex");
    newDiv.classList.add("row-flex");
    newDiv.classList.add("m-3");
    newForm.appendChild(newDiv);

    let newLabel = document.createElement("label");
    newLabel.classList.add("form-label");
    newLabel.classList.add("col-4");
    //newLabel.setAttribute("for", "YYY");
    newLabel.innerHTML = formLabelsObject[i];
    newDiv.appendChild(newLabel);

    if (formLabelsObject[i] == "Department") {
      let newInput = generateDropdown(getDepartment(), "Department");
      newInput.setAttribute("id", `userAdd${formLabelsObject[i]}`);
      newDiv.appendChild(newInput);
    } else if (formLabelsObject[i] == "Location") {
      let newInput = generateDropdown(getLocation(), "Location");
      newInput.setAttribute("id", `userAdd${formLabelsObject[i]}`);
      newDiv.appendChild(newInput);
    } else {
      let newInput = document.createElement("input");
      newInput.setAttribute("id", `userAdd${formLabelsObject[i]}`);
      newDiv.appendChild(newInput);
      newInput.classList.add("form-control");

      //newInput.setAttribute("id", "YYY");
    }
  }
  //document.getElementById(target).appendChild(newForm);
  //console.log(newForm);
  $(jqueryTarget).html(newForm);
  return newForm;
}

export function generateDeleteConfirmationForm(data, user, jqueryTarget) {
  let dataName = Object.keys(data[0]);
  let dataValue = Object.values(user[0]);
  let newForm = document.createElement("form");
  //console.log(data);
  //console.log(user);
  //console.log(dataName);
  //console.log(dataValue);

  for (let i = 0; i < Object.keys(data[0]).length + 1; i++) {
    if (
      dataName[i] == "Location" ||
      dataName[i] == "Department" ||
      dataName[i] == "Surname" ||
      dataName[i] == "Title" ||
      dataName[i] == "Email"
    ) {
      continue;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("d-flex");
    newDiv.classList.add("row-flex");
    newDiv.classList.add("m-3");

    newForm.appendChild(newDiv);
    //console.log(dataName[i]);
    //console.log(dataValue[i]);

    let newLabel = document.createElement("label");
    newLabel.classList.add("form-label");
    newLabel.classList.add("col-4");
    //newLabel.setAttribute("for", "YYY");
    if (!dataName[i]) {
      newLabel.innerHTML = "Retype Name:";
      newDiv.appendChild(newLabel);
    } else {
      newLabel.innerHTML = dataName[i];
      newDiv.appendChild(newLabel);
    }

    if (!dataName[i]) {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("id", "deleteConfirmationInput");
      newDiv.appendChild(newInput);
    } else if (dataName[i] == "Personnel") {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("id", "personnelValue");
      newInput.setAttribute("value", dataValue[i]);
      newDiv.appendChild(newInput);
    } else {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("value", `${dataValue[i]}`);
      newDiv.appendChild(newInput);
      //console.log(dataName[i]);
      //console.log(dataValue[i]);
    }
  }

  //console.log(newForm);
  $(jqueryTarget).html(newForm);
  return newForm;
}

export function generateDeleteInspectionForm(data, user, jqueryTarget) {
  let dataName = Object.keys(data[0]);
  let dataValue = Object.values(user);
  let newForm = document.createElement("form");
  //console.log(data);
  //console.log(user);
  //console.log(dataName);
  //console.log(dataValue);

  for (let i = 0; i < Object.keys(data[0]).length; i++) {
    if (dataName[i] == "Location") {
      continue;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("d-flex");
    newDiv.classList.add("row-flex");
    newDiv.classList.add("m-3");

    newForm.appendChild(newDiv);

    let newLabel = document.createElement("label");
    newLabel.classList.add("form-label");
    newLabel.classList.add("col-4");
    //newLabel.setAttribute("for", "YYY");
    newLabel.innerHTML = dataName[i];
    newDiv.appendChild(newLabel);

    if (dataName[i] == "Department") {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("value", getDepartmentName(dataValue[i]));
      newDiv.appendChild(newInput);
    } else if (dataName[i] == "Location") {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("value", getLocationName(dataValue[i]));
      newDiv.appendChild(newInput);
      //console.log(dataName[i]);
      //console.log(dataValue[i]);
    } else {
      //console.log(dataValue[0]);
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("value", `${dataValue[i]}`);
      newDiv.appendChild(newInput);
      //console.log(dataName[i]);
      //console.log(dataValue[i]);
    }
  }
  //console.log(newForm);
  $(jqueryTarget).html(newForm);
  return newForm;
}

export function generateConfirmationForm(data, user, jqueryTarget) {
  let dataName = Object.keys(data[0]);
  let dataValue = Object.values(user);
  let newForm = document.createElement("form");
  //console.log(data[0]);
  //console.log(user);
  //console.log(dataName);
  //console.log(dataValue);

  for (let i = 0; i < Object.keys(data[0]).length; i++) {
    if (dataName[i] == "id") {
      continue;
    }
    let newDiv = document.createElement("div");
    newDiv.classList.add("d-flex");
    newDiv.classList.add("row-flex");
    newDiv.classList.add("m-3");

    newForm.appendChild(newDiv);

    let newLabel = document.createElement("label");
    newLabel.classList.add("form-label");
    newLabel.classList.add("col-4");
    //newLabel.setAttribute("for", "YYY");
    newLabel.innerHTML = dataName[i];
    newDiv.appendChild(newLabel);

    if (dataName[i] == "Department") {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("value", getDepartmentName(dataValue[i]));
      newDiv.appendChild(newInput);
    } else if (dataName[i] == "Location") {
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("disabled", "disabled");
      newInput.setAttribute("value", getLocationName(dataValue[i]));
      newDiv.appendChild(newInput);
      //console.log(dataName[i]);
      //console.log(dataValue[i]);
    } else {
      //console.log(dataValue[0]);
      let newInput = document.createElement("input");
      newInput.classList.add("form-control");
      newInput.setAttribute("disabled", "disabled");
      if (dataValue[i]) {
        newInput.setAttribute("value", `${dataValue[i]}`);
      } else {
        newInput.setAttribute("value", "None");
      }
      newDiv.appendChild(newInput);
      //console.log(dataName[i]);
      //console.log(dataValue[i]);
    }
  }
  //console.log(newForm);
  $(jqueryTarget).html(newForm);
  return newForm;
}

export function generateDropdown(data, jqueryTarget) {
  let newDropdown = document.createElement("select");
  newDropdown.classList.add("form-select");
  let defaultOption = document.createElement("option");
  defaultOption.innerHTML = "Choose...";
  defaultOption.value = null;
  defaultOption.setAttribute("disabled", "");
  defaultOption.setAttribute("selected", "");
  newDropdown.appendChild(defaultOption);

  data.forEach((element) => {
    //let x;
    let value = element.Id;
    let text = element.Name;
    newDropdown.appendChild(new Option(text, value));
  });

  //console.log(newDropdown);
  $(jqueryTarget).html(newDropdown);
  return newDropdown;
}

//Accordians
export function generateLocationAccordion(appendTarget) {
  let container = document.getElementById(appendTarget);
  let buttonOne = document.createElement("button");
  let buttonTwo = document.createElement("button");
  let buttonThree = document.createElement("button");

  buttonOne.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonOne.innerHTML = "Sort By Id";
  buttonOne.setAttribute("id", "locationByIdButton");
  container.appendChild(buttonOne);

  buttonTwo.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonTwo.innerHTML = "A-Z";
  buttonTwo.setAttribute("id", "locationAZButton");
  container.appendChild(buttonTwo);

  buttonThree.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonThree.innerHTML = "Z-A";
  buttonThree.setAttribute("id", "locationZAButton");
  container.appendChild(buttonThree);
}

export function generateDepartmentAccordion(appendTarget) {
  let container = document.getElementById(appendTarget);
  let buttonOne = document.createElement("button");
  let buttonTwo = document.createElement("button");
  let buttonThree = document.createElement("button");
  let buttonFour = document.createElement("button");
  let buttonFive = document.createElement("button");

  buttonOne.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonOne.innerHTML = "Sort By Id";
  buttonOne.setAttribute("id", "departmentByIdButton");
  container.appendChild(buttonOne);

  buttonTwo.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonTwo.innerHTML = "Name A-Z";
  buttonTwo.setAttribute("id", "departmentNameAZButton");
  container.appendChild(buttonTwo);

  buttonThree.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonThree.innerHTML = "Name Z-A";
  buttonThree.setAttribute("id", "departmentNameZAButton");
  container.appendChild(buttonThree);

  buttonFour.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonFour.innerHTML = "Location A-Z";
  buttonFour.setAttribute("id", "departmentLocationAZButton");
  container.appendChild(buttonFour);

  buttonFive.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonFive.innerHTML = "Location Z-A";
  buttonFive.setAttribute("id", "departmentLocationZAButton");
  container.appendChild(buttonFive);
}

export function generatePersonnelAccordion(appendTarget) {
  let container = document.getElementById(appendTarget);
  let buttonOne = document.createElement("button");
  let buttonTwo = document.createElement("button");
  let buttonThree = document.createElement("button");
  let buttonFour = document.createElement("button");
  let buttonFive = document.createElement("button");

  buttonOne.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonOne.innerHTML = "Sort By Id";
  buttonOne.setAttribute("id", "personnelByIdButton");
  container.appendChild(buttonOne);

  buttonTwo.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonTwo.innerHTML = "Name A-Z";
  buttonTwo.setAttribute("id", "personnelNameAZButton");
  container.appendChild(buttonTwo);

  buttonThree.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonThree.innerHTML = "Name Z-A";
  buttonThree.setAttribute("id", "personnelNameZAButton");
  container.appendChild(buttonThree);

  buttonFour.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonFour.innerHTML = "Surname A-Z";
  buttonFour.setAttribute("id", "personnelSurnameAZButton");
  container.appendChild(buttonFour);

  buttonFive.classList.add("my-1", "btn", "btn-secondary", "w-100");
  buttonFive.innerHTML = "Surname Z-A";
  buttonFive.setAttribute("id", "personnelSurnameZAButton");
  container.appendChild(buttonFive);
}

//Warnings
export function generateDeleteWarning(
  event,
  checkValue,
  targetValue,
  buttonID,
  inputID
) {
  if (checkValue == 0) {
    if (event.target.value === targetValue) {
      //console.log("it matches!");
      deleteCountWarning(checkValue, "#deleteFinalWarning");
      removeClass(inputID, "is-invalid");
      addClass(inputID, "is-valid");
      removeClass(buttonID, "disabled");
    } else {
      addClass(inputID, "is-invalid");
    }
  } else {
    deleteCountWarning(checkValue, "#deleteFinalWarning");
    addClass(inputID, "is-invalid");
  }
}

export function deleteCountWarning(checkValue, jqueryTarget) {
  if (checkValue > 0) {
    $(jqueryTarget).html("Unable to delete <br/> People still work here!");
  } else {
    $(jqueryTarget).html("");
  }
}

export function generateUpdateLocationNameWarning(name, jqueryTarget) {
  if (getLocationId(name)) {
    $(jqueryTarget).html(
      `${name} already exists. <br/>  Unable to create Duplicates. `
    );
  } else {
    $(jqueryTarget).html("");
  }
}

export function generateUpdateDepartmentNameWarning(name, bool, jqueryTarget) {
  if (bool) {
    $(jqueryTarget).html(
      `${name} already exists. <br/>  Unable to create Duplicates. `
    );
  } else {
    $(jqueryTarget).html("");
  }
}

export function generateNumbersWarning(input, jqueryTarget) {
  if (validateInput(input)) {
    //console.log("This is valid 1");
    $(jqueryTarget).html("");
  } else {
    //console.log("this is invalid 1");
    $(jqueryTarget).html(`Error ~ No Numbers Allowed.`);
  }
}

export function generateDuplicateDepartmentNameWarning(input, jqueryTarget) {
  if (!getDepartmentId(input)) {
    //console.log("This is valid 1");
    $(jqueryTarget).html("");
  } else {
    //console.log("this is invalid 1");
    $(jqueryTarget).html(`Error ~ This input already exists.`);
  }
}

export function generateDuplicateLocationNameWarning(input, jqueryTarget) {
  if (!getLocationId(input)) {
    //console.log("This is valid 1");
    $(jqueryTarget).html("");
  } else {
    //console.log("this is invalid 1");
    $(jqueryTarget).html(`Error ~ This input already exists.`);
  }
}

export function generatePersonnelNameWarning(name, surname, jqueryTarget) {
  if (getPersonnelId(name, surname)) {
    $(jqueryTarget).html(`Error <br/> ${name} ${surname} already exists.`);
  } else {
    $(jqueryTarget).html("");
  }
}

export function generatePersonnelEmailTakenWarning(email, jqueryTarget) {
  //console.log(getPersonnelIdByEmail(user.email));
  $(jqueryTarget).html(`Error ~ <br/> ${email} is taken.`);
}

export function generatePersonnelEmailFormatWarning(email, jqueryTarget) {
  if (validateEmail(email)) {
    $(jqueryTarget).html("");
  } else {
    $(jqueryTarget).html(
      `Error ~ <br/> ${email} is invalid. <br/> Must contain both @ and .  `
    );
  }
}

export function generateEmailWarning(user, jqueryTarget) {
  if (validateEmail(user)) {
    $(jqueryTarget).html(
      `Error ~ ${user.email} is taken. <br/> If you wish to keep this email address,  leave the field blank. `
    );
  } else {
    $(jqueryTarget).html("");
  }
}

export function generateDepartmentNameWarning(department, jqueryTarget) {
  //console.log(getDepartmentId(department.name));
  if (getDepartmentId(department.name)) {
    $(jqueryTarget).html(`Error ~ ${department.name} already exists.`);
  } else {
    $(jqueryTarget).html("");
  }
}

export function generateLocationNameWarning(location, jqueryTarget) {
  if (getLocationId(location.name)) {
    $(jqueryTarget).html(`Error ~ ${location.name} already exists.`);
  } else {
    $(jqueryTarget).html("");
  }
}

//Dynamic Department filter accordian with Listeners
export function generateFilterByDepartmentAccordion(appendTarget) {
  let container = document.getElementById(appendTarget);

  let idArray = getDepartmentIdList();
  for (let i = 0; i < idArray.length; i++) {
    //console.log(idArray[i].Id);
    let button = document.createElement("button");
    button.setAttribute("name", idArray[i].Id);
    button.classList.add("my-1", "btn", "btn-secondary", "w-100");
    button.innerHTML = getDepartmentById(idArray[i].Id).name;
    button.setAttribute("id", `button${i}`);
    container.appendChild(button);
  }
}
export function generateFilterByDepartmentListeners() {
  let idArray = getDepartmentIdList();
  for (let i = 0; i < idArray.length; i++) {
    $(`#button${i}`).on("click", function () {
      generateTable(
        getPersonnelPrettyByDepartmentId(
          document.getElementById(`button${i}`).name
        )
      );
      applyPersonnelUpdateModal();
      applyPersonnelDeleteModal();
    });
  }
}

//Dynamic Location filter accordian with Listeners
export function generateFilterByLocationAccordion(appendTarget) {
  let container = document.getElementById(appendTarget);
  let idArray = getLocationIdList();
  //console.log(idArray);
  for (let i = 0; i < idArray.length; i++) {
    //console.log(idArray[i]);
    let button = document.createElement("button");
    button.setAttribute("name", idArray[i].Id);
    button.classList.add("my-1", "btn", "btn-secondary", "w-100");
    button.innerHTML = getLocationById(idArray[i].Id);
    button.setAttribute("id", `buttonLocation${i}`);
    container.appendChild(button);
  }
}
export function generateFilterByLocationListeners() {
  let idArray = getLocationIdList();
  for (let i = 0; i < idArray.length; i++) {
    $(`#buttonLocation${i}`).on("click", function () {
      generateTable(
        getPersonnelPrettyByLocationId(
          document.getElementById(`buttonLocation${i}`).name
        )
      );
      applyPersonnelUpdateModal();
      applyPersonnelDeleteModal();
    });
  }
}

//Search Bar
export function generateDropdownOptions(data) {
  let existingDropdown = document.getElementById("searchDropdown");
  let headerArray = Object.keys(data[0]);
  let headerLength = Object.keys(data[0]).length;

  for (let i = 0; i < headerLength - 3; i++) {
    let value = headerArray[i];
    let text = headerArray[i];
    existingDropdown.appendChild(new Option(text, value));
  }
}

export function generateSearchResults() {
  let searchCategory = document.getElementById("searchDropdown").value;
  let searchValue = document.getElementById("searchTerm").value;

  if (!searchCategory) {
    document.getElementById("searchDropdown").style.boxShadow =
      "0px 0px 10px red";
    throw "You need to select a category!";
  } else {
    document.getElementById("searchDropdown").style.boxShadow = "0px 0px 0px";

    switch (searchCategory) {
      case "Id":
        generateTable([getPersonnelPrettyById(searchValue)]);
        applyPersonnelUpdateModal();
        applyPersonnelDeleteModal();
        break;
      case "Name":
        generateTable(getPersonnelPrettyByName(searchValue));
        applyPersonnelUpdateModal();
        applyPersonnelDeleteModal();
        break;
      case "Surname":
        generateTable(getPersonnelPrettyBySurname(searchValue));
        applyPersonnelUpdateModal();
        applyPersonnelDeleteModal();
        break;
      case "Email":
        generateTable(getPersonnelPrettyByEmail(searchValue));
        applyPersonnelUpdateModal();
        applyPersonnelDeleteModal();
        break;
    }
  }
}

//Buttons
export function generateUpdateButton(idData) {
  let button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn-outline-secondary");
  button.classList.add("col-4");
  button.classList.add("mx-2");
  button.classList.add("my-1");
  button.classList.add("justify-content-center");
  button.classList.add("updateButton");
  button.setAttribute("id", "updateButton");
  button.setAttribute("name", idData);
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#updateModal");

  let icon = generateIconSearch();
  button.appendChild(icon);

  //console.log(button);
  return button;
}

export function generateDeleteButton(idData) {
  let button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn-outline-danger");
  button.classList.add("col-4");
  button.classList.add("mx-2");
  button.classList.add("my-1");
  button.classList.add("justify-content-center");
  button.classList.add("deleteButton");
  button.setAttribute("id", "deleteButton");
  button.setAttribute("name", idData);
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#deleteModal");

  let icon = generateIconDelete();
  button.appendChild(icon);

  //console.log(getPersonnelIdByEmail(email));

  //console.log(button);
  return button;
}

//Icons
export function generateIconSearch() {
  let icon = document.createElement("i");
  icon.setAttribute("style", "pointer-events:none");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-arrow-rotate-right");
  return icon;
}

export function generateIconDelete() {
  let icon = document.createElement("i");
  icon.setAttribute("style", "pointer-events:none");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-xmark");
  return icon;
}

export function generateIconAdd() {
  let icon = document.createElement("i");
  icon.setAttribute("style", "pointer-events:none");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-plus");
  return icon;
}

//Validation
export function validatePersonnelInput(
  event,
  inputToValidate,
  classToManipulate
) {
  if (validateInput(event.target.value) && event.target.value) {
    //console.log(returnCapitilzed(event.target.value));
    inputToValidate = returnCapitilzed(event.target.value);
    //console.log("Format OK!");
    removeClass(classToManipulate, "is-invalid");
    addClass(classToManipulate, "is-valid");
    return 1;
  } else {
    //console.log("Format Bad!");
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    } else {
      return 0;
    }
  }
}

export function validateLocationInput(
  event,
  inputToValidate,
  classToManipulate
) {
  if (validateInput(event.target.value) && event.target.value) {
    //console.log(returnCapitilzed(event.target.value));
    inputToValidate = returnCapitilzed(event.target.value);
    //console.log("Format OK!");
    if (getLocationId(inputToValidate)) {
      //console.log("But Taken!");
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return -1;
    } else {
      //console.log("And is Free!");
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
      return 1;
    }
  } else {
    //console.log("Format Bad!");
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    } else {
      return 0;
    }
  }
}

export function validateDepartmentInput(
  event,
  inputToValidate,
  classToManipulate
) {
  if (validateInput(event.target.value) && event.target.value) {
    //console.log(returnCapitilzed(event.target.value));
    inputToValidate = returnCapitilzed(event.target.value);
    //console.log("Format OK!");
    if (getDepartmentId(inputToValidate)) {
      //console.log("But Taken!");
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return -1;
    } else {
      //console.log("And is Free!");
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
      return 1;
    }
  } else {
    //console.log("Format Bad!");
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    } else {
      return 0;
    }
  }
}

export function validateSelectInput(event, inputToValidate, classToManipulate) {
  if (event.target.value) {
    //console.log(event.target.value);
    inputToValidate = event.target.value;
    //console.log(newDepartment.location);
    if (!checkForClass(classToManipulate, "is-valid")) {
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
    }
  } else {
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    }
  }
}

export function validateEmailInput(event, inputToValidate, classToManipulate) {
  if (validateEmail(event.target.value) && event.target.value) {
    inputToValidate = event.target.value.toLowerCase();
    if (getPersonnelByEmail(event.target.value)) {
      //console.log("But Taken!");
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return -1;
    } else {
      //console.log("But Free!");
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
      return 1;
    }
  } else {
    if (!event.target.value) {
      //Empty!
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
      return -2;
    } else {
      //console.log("Format Bad!");
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    }
  }
}

export function validateDepartmentAddition(
  nameInputToCheck,
  locationInputToCheck,
  classToManipulate
) {
  if (
    checkForClass(nameInputToCheck, "is-valid") &&
    checkForClass(locationInputToCheck, "is-valid") &&
    !getDepartmentId(nameInputToCheck)
  ) {
    if (checkForClass(classToManipulate, "disabled")) {
      removeClass(classToManipulate, "disabled");
    }
  } else {
    if (!checkForClass(classToManipulate, "disabled")) {
      addClass(classToManipulate, "disabled");
    }
  }
}

export function validateFullName(
  firstName,
  lastName,
  firstNameClass,
  lastNameClass
) {
  if (getPersonnelId(firstName, lastName)) {
    //Its Taken!
    removeClass(firstNameClass, "is-valid");
    removeClass(lastNameClass, "is-valid");
    addClass(firstNameClass, "is-invalid");
    addClass(lastNameClass, "is-invalid");
    return -1;
  } else {
    //Its Free!
    removeClass(firstNameClass, "is-invalid");
    removeClass(lastNameClass, "is-invalid");
    addClass(firstNameClass, "is-valid");
    addClass(lastNameClass, "is-valid");
    return 1;
  }
}

export function validatePersonnelAddition(
  inputNameClassToCheck,
  inputSurnameClassToCheck,
  inputTitleClassToCheck,
  inputEmailClassToCheck,
  inputDepartmentClassToCheck,
  classToManipulate
) {
  if (
    checkForClass(inputNameClassToCheck, "is-valid") &&
    checkForClass(inputSurnameClassToCheck, "is-valid") &&
    checkForClass(inputTitleClassToCheck, "is-valid") &&
    checkForClass(inputEmailClassToCheck, "is-valid") &&
    checkForClass(inputDepartmentClassToCheck, "is-valid")
  ) {
    //console.log("all good - Personnel!");
    if (checkForClass(classToManipulate, "disabled")) {
      removeClass(classToManipulate, "disabled");
    }
  } else {
    //console.log("Missing One or more!");
    if (!checkForClass(classToManipulate, "disabled")) {
      addClass(classToManipulate, "disabled");
    }
  }
}

export function validateUpdateSelectInput(
  event,
  inputToValidate,
  classToManipulate
) {
  //console.log(event.target.value);
  if (event.target.value) {
    inputToValidate = event.target.value;
    //console.log(event.target.value);
    //console.log(newDepartment.location);
    if (!checkForClass(classToManipulate, "is-valid")) {
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
      return 1;
    }
  } else {
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    }
  }
}

export function validateUpdateTextInput(
  event,
  inputToValidate,
  classToManipulate
) {
  if (validateInput(event.target.value)) {
    //console.log(returnCapitilzed(event.target.value));
    inputToValidate = returnCapitilzed(event.target.value);
    //console.log("Format OK!");
    if (!event.target.value) {
      addClass(classToManipulate, "is-valid");
      //console.log("is empty!");
      return -2;
    } else {
      //console.log("And is Free!");
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
      return 1;
    }
  } else {
    //console.log("Format Bad!");
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    } else {
      return 0;
    }
  }
}

export function validateUpdateLocationNameInput(
  event,
  inputToValidate,
  classToManipulate
) {
  if (!event.target.value) {
    removeClass(classToManipulate, "is-invalid");
    addClass(classToManipulate, "is-valid");
    //console.log("is empty!");
    return -2;
  }

  if (validateInput(event.target.value)) {
    //console.log(returnCapitilzed(event.target.value));
    inputToValidate = returnCapitilzed(event.target.value);
    //console.log("Format OK!");

    if (getLocationId(inputToValidate)) {
      //console.log("But Taken!");
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return -1;
    } else {
      //console.log("And is Free!");
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
      return 1;
    }
  } else {
    //console.log("Format Bad!");
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    } else {
      return 0;
    }
  }
}

export function validateUpdateDepartmentNameInput(
  event,
  inputToValidate,
  classToManipulate
) {
  if (!event.target.value) {
    removeClass(classToManipulate, "is-invalid");
    addClass(classToManipulate, "is-valid");
    //console.log("is empty!");
    return -2;
  }

  if (validateInput(event.target.value)) {
    //console.log(returnCapitilzed(event.target.value));
    inputToValidate = returnCapitilzed(event.target.value);
    //console.log("Format OK!");

    if (getDepartmentId(inputToValidate)) {
      //console.log("But Taken!");
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return -1;
    } else {
      //console.log("And is Free!");
      removeClass(classToManipulate, "is-invalid");
      addClass(classToManipulate, "is-valid");
      return 1;
    }
  } else {
    //console.log("Format Bad!");
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    } else {
      return 0;
    }
  }
}

export function validateUpdateLocationNameSetter(
  result,
  event,
  locationToUpdate,
  locationDefault
) {
  switch (result) {
    case 1:
      locationToUpdate = event.target.value;
      removeClass("proposeUpdate", "disabled");
      break;
    case 0:
      generateNumbersWarning(event.target.value, "#updateWarning");
      addClass("proposeUpdate", "disabled");
      break;
    case -1:
      locationToUpdate = locationDefault;
      addClass("proposeUpdate", "disabled");
      generateUpdateLocationNameWarning(event.target.value, "#updateWarning");
      break;
    case -2:
      locationToUpdate = locationDefault;
      generateNumbersWarning(event.target.value, "#updateWarning");
      removeClass("proposeUpdate", "disabled");
      break;
  }
}

export function validateUpdateEmail(event, inputToValidate, classToManipulate) {
  if (!event.target.value) {
    removeClass(classToManipulate, "is-invalid");
    addClass(classToManipulate, "is-valid");
    //console.log("is empty!");
    return -2;
  }

  if (validateEmail(event.target.value)) {
    //console.log(returnCapitilzed(event.target.value));
    inputToValidate = event.target.value.toLowerCase();
    //console.log(inputToValidate);
    //console.log("Format OK!");
    if (getPersonnelByEmail(inputToValidate)) {
      //But is Taken!
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return -1;
    }
    //console.log("And is Free!");
    removeClass(classToManipulate, "is-invalid");
    addClass(classToManipulate, "is-valid");
    return 1;
  } else {
    //console.log("Format Bad!");
    if (!checkForClass(classToManipulate, "is-invalid")) {
      removeClass(classToManipulate, "is-valid");
      addClass(classToManipulate, "is-invalid");
      return 0;
    } else {
      return 0;
    }
  }
}

// AddModals
export function applyLocationAddModal() {
  //console.log("L");
  let newLocation = [];
  //console.log(newLocation);
  //Add Modal
  $("#addModalLabel").html("Add Location");
  //GenerateModalContent
  $("#addModalBody").html(generateAddForm(getLocation()));

  $("#userAddName").on("change", function (event) {
    let validator = validateLocationInput(event, newLocation[0], "userAddName");
    if (validator == 0) {
      generateNumbersWarning(event.target.value, "#addWarning");
      addClass("proposeAdd", "disabled");
    } else if (validator == -1) {
      generateDuplicateLocationNameWarning(event.target.value, "#addWarning");
      addClass("proposeAdd", "disabled");
    } else {
      generateNumbersWarning(event.target.value, "#addWarning");
      removeClass("proposeAdd", "disabled");
      newLocation[0] = returnCapitilzed(event.target.value);
    }
  });

  //Populate Confirm Modal
  $("#proposeAdd")
    //.unbind("click")
    .on("click", function () {
      //console.log(newLocation);
      $("#confirmAddModalLabel").html("Review Location Addition");
      $("#confirmAddModalBody").html(
        generateConfirmationForm(getLocationForm(), newLocation)
      );
    });

  $("#abortAdd").on("click", function (event) {
    newLocation = [];
    generateNumbersWarning(event.target.value, "#addWarning");
  });

  $("#confirmAdd")
    //.unbind("click")
    .on("click", function () {
      if (newLocation[0]) {
        addLocation(newLocation[0]);
        newLocation = [];
        $("#filterByLocation").html("");
        setTimeout(() => {
          //Forces Re-render of buttons as well as table.
          $("#locationButton").click();
        }, 300);
      }
    });
}

export function applyDepartmentAddModal() {
  // newDepartment will eventually match the SQL input of  ["name", "locationID"]
  let newDepartment = [];

  //Add Modal
  $("#addModalLabel").html("Add Department");
  //GenerateModalContent
  $("#addModalBody").html(generateAddForm(getDepartmentForm()));
  //

  //Event Listeners
  $("#userAddName").on("change", function (event) {
    let validator = validateDepartmentInput(
      event,
      newDepartment[0],
      "userAddName"
    );
    if (validator == 0) {
      generateNumbersWarning(event.target.value, "#addWarning");
    } else if (validator == -1) {
      generateDuplicateDepartmentNameWarning(event.target.value, "#addWarning");
    } else {
      generateNumbersWarning(event.target.value, "#addWarning");
      newDepartment[0] = returnCapitilzed(event.target.value);
    }
  });

  $("#userAddLocation").on("change", function (event) {
    newDepartment[1] = event.target.value;
  });

  //Aggregate Checks - Input and Selection
  $("#addModal").on("change", function () {
    if (newDepartment[0] && newDepartment[1]) {
      removeClass("proposeAdd", "disabled");
    } else {
      addClass("proposeAdd", "disabled");
    }
  });

  //Populate Confirm Modal
  $("#proposeAdd")
    .unbind("click")
    .on("click", function () {
      //console.log(newDepartment);
      $("#confirmAddModalLabel").html("Review Department Addition");
      //console.log(newDepartment);
      $("#confirmAddModalBody").html(
        generateConfirmationForm(getDepartmentForm(), newDepartment)
      );
    });

  $("#abortAdd").on("click", function (event) {
    newDepartment = [];
    generateNumbersWarning(event.target.value, "#addWarning");
  });

  $("#confirmAdd")
    .unbind("click")
    .on("click", function () {
      if (newDepartment[0] && newDepartment[1]) {
        addDepartment(newDepartment[0], newDepartment[1]);
        newDepartment = [];
        $("#filterByDepartment").html("");
        setTimeout(() => {
          //Forces Re-render of buttons as well as table.
          $("#departmentButton").click();
        }, 300);
      }
    });
}

export function applyPersonnelAddModal() {
  // newPersonnel will eventually match SQL input of
  // ["firstName", "lastName", "jobTitle", "email", "departmentID"]
  let newPersonnel = [];
  //Add Modal
  $("#addModalLabel").html("Add Personnel");
  $("#addModalBody").html(generateAddForm(getPersonnelForm()));

  $("#userAddName").on("change", function (event) {
    let validator = validatePersonnelInput(
      event,
      newPersonnel[0],
      "userAddName"
    );
    if (validator == 0) {
      generateNumbersWarning(event.target.value, "#addWarning");
    } else {
      generateNumbersWarning(event.target.value, "#addWarning");
      newPersonnel[0] = event.target.value;
    }
  });

  $("#userAddSurname").on("change", function (event) {
    let validator = validatePersonnelInput(
      event,
      newPersonnel[0],
      "userAddSurname"
    );
    if (validator == 0) {
      generateNumbersWarning(event.target.value, "#addWarning");
    } else {
      generateNumbersWarning(event.target.value, "#addWarning");
      newPersonnel[1] = event.target.value;
    }
  });

  $("#userAddTitle").on("change", function (event) {
    let validator = validatePersonnelInput(
      event,
      newPersonnel[0],
      "userAddTitle"
    );
    if (validator == 0) {
      generateNumbersWarning(event.target.value, "#addWarning");
    } else {
      generateNumbersWarning(event.target.value, "#addWarning");
      newPersonnel[2] = event.target.value;
    }
  });

  $("#userAddEmail").on("change", function (event) {
    let validator = validateEmailInput(event, newPersonnel[3], "userAddEmail");
    console.log(validator);

    if (validator == 0) {
      generatePersonnelEmailFormatWarning(event.target.value, "#addWarning");
    } else if (validator == -1) {
      generatePersonnelEmailTakenWarning(event.target.value, "#addWarning");
    } else {
      generatePersonnelEmailFormatWarning(event.target.value, "#addWarning");
      newPersonnel[3] = event.target.value.toLowerCase();
    }
  });

  $("#userAddDepartment").on("change", function (event) {
    if (validateSelectInput(event, newPersonnel[4], "userAddDepartment")) {
      //Do nothing
    } else {
      newPersonnel[4] = event.target.value;
    }
  });

  //Aggregate Check
  $("#addModal").on("change", function () {
    validatePersonnelAddition(
      "userAddName",
      "userAddSurname",
      "userAddTitle",
      "userAddEmail",
      "userAddDepartment",
      "proposeAdd"
    );
  });

  //Populate Confirm Modal
  $("#proposeAdd").on("click", function () {
    $("#confirmAddModalLabel").html("Review Personnel Addition");
    $("#confirmAddModalBody").html(
      generateConfirmationForm(getPersonnelForm(), newPersonnel)
    );
  });

  $("#abortAdd").on("click", function () {
    newPersonnel = [];
  });

  $("#confirmAdd")
    .unbind("click")
    .on("click", function () {
      if (
        (newPersonnel[0],
        newPersonnel[1],
        newPersonnel[2],
        newPersonnel[3],
        newPersonnel[4])
      ) {
        addPersonnel(
          newPersonnel[0],
          newPersonnel[1],
          newPersonnel[2],
          newPersonnel[3],
          newPersonnel[4]
        );

        newPersonnel = [];

        setTimeout(() => {
          //Forces Re-render of buttons as well as table.
          $("#personnelButton").click();
        }, 300);
      }
    });
}

//Delete Modals
export function applyLocationDeleteModal() {
  let target;
  $(".deleteButton").on("click", function (event) {
    //console.log("Hi! I'm a LOCATION DELETE button!");
    target = getLocationById(event.target.name);
    addClass("confirmDelete", "disabled");
    deleteCountWarning(0, "#deleteFinalWarning");
    //console.log(target);
    $("#deleteModalLabel").html("Delete Location");
    $("#deleteModalBody").html(
      generateConfirmationForm(getLocationForm(), [target])
    );

    $("#confirmDeleteModalLabel").html("Beware, All Deletion is final.");
    $("#confirmDeleteModalBody").html(
      generateDeleteConfirmationForm(getLocationPersonnelCount(), [
        getLocationPersonnelById(event.target.name),
      ])
    );

    $("#deleteConfirmationInput").on("keyup", function (event) {
      generateDeleteWarning(
        event,
        $("#personnelValue").val(),
        target,
        "confirmDelete",
        "deleteConfirmationInput"
      );
    });

    $("#confirmDelete")
      .unbind("click")
      .on("click", function () {
        deleteLocation(event.target.name);
        $("#filterByLocation").html("");
        setTimeout(() => {
          $("#locationButton").click();
        }, 300);
      });
  });
}

export function applyDepartmentDeleteModal() {
  let target;
  $(".deleteButton").on("click", function (event) {
    target = getDepartmentById(event.target.name);
    addClass("confirmDelete", "disabled");
    deleteCountWarning(0, "#deleteFinalWarning");
    //console.log(target.name);
    $("#deleteModalLabel").html("Delete Department");
    $("#deleteModalBody").html(
      generateDeleteInspectionForm(getDepartmentForm(), [target.name])
    );

    $("#confirmDeleteModalLabel").html("Beware, All Deletion is final.");
    $("#confirmDeleteModalBody").html(
      generateDeleteConfirmationForm(getDepartmentPersonnelCount(), [
        getDepartmentPersonnelById(event.target.name),
      ])
    );

    $("#deleteConfirmationInput").on("keyup", function (event) {
      generateDeleteWarning(
        event,
        $("#personnelValue").val(),
        target.name,
        "confirmDelete",
        "deleteConfirmationInput"
      );
    });

    $("#confirmDelete")
      .unbind("click")
      .on("click", function () {
        deleteDepartment(event.target.name);
        $("#filterByDepartment").html("");
        setTimeout(() => {
          $("#departmentButton").click();
        }, 300);
      });
  });
}

export function applyPersonnelDeleteModal() {
  let target;
  $(".deleteButton").on("click", function (event) {
    target = event.target.name;
    addClass("confirmDelete", "disabled");
    deleteCountWarning(0, "#deleteFinalWarning");
    let inputTarget = getPersonnelFullNameById(target);

    //console.log(target);
    $("#deleteModalLabel").html("Delete Personnel");
    $("#deleteModalBody").html(
      generateConfirmationForm(getPersonnelForm(), getPersonnelById(target))
    );

    $("#confirmDeleteModalLabel").html("Beware, All Deletion is final.");
    $("#confirmDeleteModalBody").html(
      generateDeleteConfirmationForm(getPersonnelForm(), [[inputTarget]])
    );
    //console.log(getLocationPersonnelCount());

    $("#deleteConfirmationInput").on("keyup", function (event) {
      generateDeleteWarning(
        event,
        0,
        inputTarget,
        "confirmDelete",
        "deleteConfirmationInput"
      );
    });

    $("#confirmDelete")
      .unbind("click")
      .on("click", function () {
        deletePersonnel(target);
        setTimeout(() => {
          $("#personnelButton").click();
        }, 300);
      });
  });
}

//Update Modals
export function applyLocationUpdateModal() {
  // updatedLocation will eventually match SQL input of
  // ["name", "id"];
  let existingLocation;
  let updatedLocation = [];
  let target;
  $(".updateButton").on("click", function (event) {
    //console.log("Hi! I'm a LOCATION UPDATE button!");
    target = getLocationById(event.target.name);
    existingLocation = [target, event.target.name];
    updatedLocation[1] = existingLocation[1];
    //console.log(existingLocation);
    addClass("proposeUpdate", "disabled");

    $("#updateModalLabel").html("Update Location");
    $("#updateModalBody").html(generateUpdateForm(getLocationForm(), [target]));

    $("#userInputName").on("change", function (event) {
      generateNumbersWarning(event.target.value, "#updateWarning");
      let x = validateUpdateLocationNameInput(
        event,
        updatedLocation[0],
        "userInputName"
      );

      validateUpdateLocationNameSetter();
      switch (x) {
        case 1:
          updatedLocation[0] = event.target.value;
          removeClass("proposeUpdate", "disabled");
          break;
        case 0:
          generateNumbersWarning(event.target.value, "#updateWarning");
          addClass("proposeUpdate", "disabled");
          break;
        case -1:
          updatedLocation[0] = existingLocation[0];
          addClass("proposeUpdate", "disabled");
          generateUpdateLocationNameWarning(
            event.target.value,
            "#updateWarning"
          );
          break;
        case -2:
          updatedLocation[0] = existingLocation[0];
          generateNumbersWarning(event.target.value, "#updateWarning");
          removeClass("proposeUpdate", "disabled");
          break;
      }
    });

    $("#proposeUpdate").on("click", function () {
      $("#confirmUpdateModalLabel").html("Confirm Location Update");
      $("#confirmUpdateModalBody").html(
        generateConfirmationForm(getLocationForm(), updatedLocation)
      );
    });

    $("#abortUpdate").on("click", function () {
      //console.log("Activated!");
      updatedLocation = [];
      existingLocation = [];
      generateUpdateLocationNameWarning(
        event.target.value,
        "#updateWarning",
        "Location"
      );
    });

    $("#confirmUpdate")
      .unbind("click")
      .on("click", function () {
        if (updatedLocation[0] && updatedLocation[1]) {
          updateLocation(updatedLocation[0], updatedLocation[1]);
          $("#filterByLocation").html("");
          setTimeout(() => {
            $("#locationButton").click();
          }, 400);
        }
      });
    //end of Update
  });
}

export function applyDepartmentUpdateModal() {
  //updatedDepartment will eventually match the SQL input of
  // ["name", "departmentID", "id"]
  let existingDepartment;
  let updatedDepartment = [];
  let target;
  $(".updateButton").on("click", function (event) {
    //console.log("Hi! I'm a DEPARTMENT UPDATE button!");
    target = getDepartmentById(event.target.name);
    existingDepartment = [target.name, target.locationID, target.id];
    updatedDepartment[2] = existingDepartment[2];
    //console.log(existingDepartment);
    addClass("proposeUpdate", "disabled");

    $("#updateModalLabel").html("Update Department");
    $("#updateModalBody").html(
      generateUpdateForm(getDepartmentForm(), existingDepartment)
    );

    $("#userInputName").on("change", function (event) {
      let x = validateUpdateDepartmentNameInput(
        event,
        updatedDepartment[0],
        "userInputName"
      );
      generateNumbersWarning(event.target.value, "#updateWarning");
      //console.log(x);
      switch (x) {
        case 1:
          updatedDepartment[0] = event.target.value;

          break;
        case 0:
          generateNumbersWarning(event.target.value, "#updateWarning");
          addClass("proposeUpdate", "disabled");
          break;
        case -1:
          updatedDepartment[0] = existingDepartment[0];
          addClass("proposeUpdate", "disabled");
          generateUpdateDepartmentNameWarning(
            event.target.value,
            true,
            "#updateWarning"
          );
          break;
        case -2:
          updatedDepartment[0] = existingDepartment[0];
          break;
      }
    });

    $("#userInputLocation").on("change", function (event) {
      validateUpdateSelectInput(
        event,
        updatedDepartment[1],
        "userInputLocation"
      );
      if (!event.target.value) {
        updatedDepartment[1] = existingDepartment[1];
      } else {
        updatedDepartment[1] = event.target.value;
      }
    });

    //Aggregate Checks
    $("#updateModalBody").on("change", function () {
      if (!updatedDepartment[0] && updatedDepartment[1]) {
        updatedDepartment[0] = existingDepartment[0];
        addClass("userInputName", "is-valid");
      }
      if (!updatedDepartment[1] && updatedDepartment[0]) {
        updatedDepartment[1] = existingDepartment[1];
        addClass("userInputLocation", "is-valid");
      }
      if (
        checkForClass("userInputName", "is-valid") &&
        checkForClass("userInputLocation", "is-valid") &&
        updatedDepartment[2]
      ) {
        removeClass("proposeUpdate", "disabled");
      }
    });

    //Populate Confirm Modal
    $("#proposeUpdate").on("click", function () {
      $("#confirmUpdateModalLabel").html("Confirm Department Update");
      $("#confirmUpdateModalBody").html(
        generateConfirmationForm(getDepartmentForm(), updatedDepartment)
      );
    });

    $("#abortUpdate").on("click", function () {
      updatedDepartment = [];
      existingDepartment = [];
      generateUpdateDepartmentNameWarning(event.target.value, "#updateWarning");
    });

    $("#confirmUpdate")
      .unbind("click")
      .on("click", function () {
        if (
          updatedDepartment[0] &&
          updatedDepartment[1] &&
          updatedDepartment[2]
        ) {
          updateDepartment(
            updatedDepartment[0],
            updatedDepartment[1],
            updatedDepartment[2]
          );
          $("#filterByDepartment").html("");
          updatedDepartment = [];
          setTimeout(() => {
            //Forces Re-render of buttons as well as table.
            $("#departmentButton").click();
          });
        }
      });
  });
}

export function applyPersonnelUpdateModal() {
  //updatedPersonnel will eventually match the SQL input of
  // ["firstName", "lastName", "jobTitle", "email", "departmentID", "id"]
  let existingPersonnel;
  let updatedPersonnel = [];
  let target;
  $(".updateButton").on("click", function (event) {
    target = getPersonnelById(event.target.name);
    existingPersonnel = [
      target.Name,
      target.Surname,
      target.Title,
      target.Email,
      target.Department,
      event.target.name,
    ];
    updatedPersonnel[5] = existingPersonnel[5];
    addClass("proposeUpdate", "disabled");

    $("#updateModalLabel").html("Update Personnel");
    $("#updateModalBody").html(
      generateUpdateForm(getPersonnelForm(), existingPersonnel)
    );

    $("#userInputName").on("keyup", function (event) {
      generateNumbersWarning(event.target.value, "#updateWarning");

      let x = validateUpdateTextInput(
        event,
        updatedPersonnel[0],
        "userInputName"
      );
      switch (x) {
        case 1:
          updatedPersonnel[0] = returnCapitilzed(event.target.value);
          break;
        case -2:
          updatedPersonnel[0] = existingPersonnel[0];
          break;
      }
    });

    $("#userInputSurname").on("keyup", function (event) {
      generateNumbersWarning(event.target.value, "#updateWarning");

      let x = validateUpdateTextInput(
        event,
        updatedPersonnel[1],
        "userInputSurname"
      );
      switch (x) {
        case 1:
          updatedPersonnel[1] = returnCapitilzed(event.target.value);
          break;
        case -2:
          updatedPersonnel[1] = existingPersonnel[1];
          break;
      }
    });

    $("#userInputTitle").on("keyup", function (event) {
      generateNumbersWarning(event.target.value, "#updateWarning");

      let x = validateUpdateTextInput(
        event,
        updatedPersonnel[2],
        "userInputTitle"
      );
      switch (x) {
        case 1:
          updatedPersonnel[2] = returnCapitilzed(event.target.value);
          break;
        case -2:
          updatedPersonnel[2] = existingPersonnel[2];
          break;
      }
    });

    $("#userInputEmail").on("change", function (event) {
      let x = validateEmailInput(event, updatedPersonnel[3], "userInputEmail");
      switch (x) {
        case 1:
          updatedPersonnel[3] = event.target.value.toLowerCase();
          break;
        case 0:
          updatedPersonnel[3] = existingPersonnel[3];
          generatePersonnelEmailFormatWarning(
            event.target.value,
            "#updateWarning"
          );
          break;
        case -1:
          updatedPersonnel[3] = existingPersonnel[3];
          generatePersonnelEmailTakenWarning(
            event.target.value,
            "#updateWarning"
          );
          break;
        case -2:
          updatedPersonnel[3] = existingPersonnel[3];
          generatePersonnelNameWarning("111", "111", "#updateWarning");
          break;
      }
    });

    $("#userInputDepartment").on("change", function (event) {
      validateSelectInput(event, updatedPersonnel[4], "userInputDepartment");
      if (!event.target.value) {
        updatedPersonnel[4] = existingPersonnel[4];
      } else {
        updatedPersonnel[4] = event.target.value;
      }
    });

    $("#abortUpdate").on("click", function () {
      updatedPersonnel = [];
      existingPersonnel = [];
      generatePersonnelNameWarning("111", "111", "#updateWarning");
    });

    //Aggregate Checks
    $("#updateModalBody").on("change", function () {
      //console.log(updatedPersonnel);
      if (!updatedPersonnel[0]) {
        updatedPersonnel[0] = existingPersonnel[0];
      }
      if (!updatedPersonnel[1]) {
        updatedPersonnel[1] = existingPersonnel[1];
      }
      if (!updatedPersonnel[2]) {
        updatedPersonnel[2] = existingPersonnel[2];
      }
      if (!updatedPersonnel[3]) {
        updatedPersonnel[3] = existingPersonnel[3];
        addClass("userInputEmail", "is-valid");
      }
      if (!updatedPersonnel[4]) {
        updatedPersonnel[4] = existingPersonnel[4];
      }
      //console.log(updatedPersonnel);
      if (
        checkForClass("userInputName", "is-valid") &&
        checkForClass("userInputSurname", "is-valid") &&
        updatedPersonnel[3] &&
        checkForClass("userInputDepartment", "is-valid") &&
        updatedPersonnel[5]
      ) {
        removeClass("proposeUpdate", "disabled");
      }
    });

    $("#proposeUpdate").on("click", function () {
      $("#confimUpdateModalLabel").html("Confirm Personnel Update");
      $("#confirmUpdateModalBody").html(
        generateConfirmationForm(getPersonnelForm(), updatedPersonnel)
      );
    });

    $("#confirmUpdate").on("click", function () {
      if (
        updatedPersonnel[0] &&
        updatedPersonnel[1] &&
        //updatedPersonnel[2] &&
        updatedPersonnel[3] &&
        updatedPersonnel[4] &&
        updatedPersonnel[5]
      ) {
        updatePersonnel(
          updatedPersonnel[0],
          updatedPersonnel[1],
          updatedPersonnel[2],
          updatedPersonnel[3],
          updatedPersonnel[4],
          updatedPersonnel[5]
        );
        updatedPersonnel = [];
        setTimeout(() => {
          $("#personnelButton").click();
        });
      }
    });
  });
}
