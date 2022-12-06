//Imports
import {
  getLocationPretty,
  getLocationAZ,
  getLocationZA,
} from "./calls/location.js";

import {
  getPersonnelPretty,
  getPersonnelNameAZ,
  getPersonnelNameZA,
  getPersonnelSurnameAZ,
  getPersonnelSurnameZA,
} from "./calls/personnel.js";

import {
  getDepartmentPretty,
  getDepartmentNameAZ,
  getDepartmentNameZA,
  getDepartmentLocationAZ,
  getDepartmentLocationZA,
} from "./calls/department.js";

import {
  generateTable,
  generateLocationAccordion,
  applyDepartmentUpdateModal,
  applyDepartmentDeleteModal,
  applyLocationUpdateModal,
  applyLocationDeleteModal,
  applyPersonnelUpdateModal,
  applyPersonnelDeleteModal,
  applyPersonnelAddModal,
  applyDepartmentAddModal,
  applyLocationAddModal,
  generateDepartmentAccordion,
  generatePersonnelAccordion,
  generateFilterByDepartmentAccordion,
  generateFilterByDepartmentListeners,
  generateFilterByLocationAccordion,
  generateFilterByLocationListeners,
  generateDropdownOptions,
  generateSearchResults,
} from "./helpers/generate.js";

import {
  addClass,
  removeClass,
  checkForClass,
} from "./helpers/manipulation.js";

$(document).ready(function () {
  $("#personnelButton").click();
});

//Personnel
$("#personnelButton").on("click", function () {
  generateTable(getPersonnelPretty());

  if (checkForClass("addButton", "Department")) {
    removeClass("addButton", "Department");
    removeClass("deleteButton", "Department");
    removeClass("updateButton", "Department");
  }

  if (checkForClass("addButton", "Location")) {
    removeClass("addButton", "Location");
    removeClass("deleteButton", "Location");
    removeClass("updateButton", "Location");
  }

  if (!checkForClass("addButton", "Personnel")) {
    addClass("addButton", "Personnel");
    addClass("deleteButton", "Personnel");
    addClass("updateButton", "Personnel");
  }

  //Interactive Dropdown
  if (checkForClass("addButton", "Personnel")) {
    //console.log("Department Dropdown Rendered");
    document.getElementById("accordionTwo").removeAttribute("hidden");
    document.getElementById("accordionThree").removeAttribute("hidden");
    $("#accordionButtonLabel").html("Personnel Options");
    $("#accordionBody").html("");
    $("#accordionBody").html(generatePersonnelAccordion("accordionBody"));
    $("#personnelByIdButton").on("click", function () {
      generateTable(getPersonnelPretty());
      applyPersonnelUpdateModal();
      applyPersonnelDeleteModal();
    });
    $("#personnelNameAZButton").on("click", function () {
      generateTable(getPersonnelNameAZ());
      applyPersonnelUpdateModal();
      applyPersonnelDeleteModal();
    });
    $("#personnelNameZAButton").on("click", function () {
      generateTable(getPersonnelNameZA());
      applyPersonnelUpdateModal();
      applyPersonnelDeleteModal();
    });
    $("#personnelSurnameAZButton").on("click", function () {
      generateTable(getPersonnelSurnameAZ());
      applyPersonnelUpdateModal();
      applyPersonnelDeleteModal();
    });
    $("#personnelSurnameZAButton").on("click", function () {
      generateTable(getPersonnelSurnameZA());
      applyPersonnelUpdateModal();
      applyPersonnelDeleteModal();
    });

    if (document.getElementById("filterByDepartment").children.length == 0) {
      $("#filterByDepartment").html(
        generateFilterByDepartmentAccordion("filterByDepartment")
      );
      generateFilterByDepartmentListeners();
    }

    if (document.getElementById("filterByLocation").children.length == 0) {
      $("#filterByLocation").html(
        generateFilterByLocationAccordion("filterByLocation")
      );
      generateFilterByLocationListeners();
    }
  }
  //Update + Delete Modals for Personnel
  if (checkForClass("addButton", "Personnel")) {
    //console.log("Personnel Refreshed");
    applyPersonnelUpdateModal();
    applyPersonnelDeleteModal();
  }
});

//Location
$("#locationButton").on("click", function () {
  generateTable(getLocationPretty());

  if (checkForClass("addButton", "Personnel")) {
    removeClass("addButton", "Personnel");
    removeClass("deleteButton", "Personnel");
    removeClass("updateButton", "Personnel");
  }

  if (checkForClass("addButton", "Department")) {
    removeClass("addButton", "Department");
    removeClass("deleteButton", "Department");
    removeClass("updateButton", "Department");
  }

  //If it doesn't have the class, add. - Prevents many class additions.
  if (!checkForClass("addButton", "Location")) {
    addClass("addButton", "Location");
    addClass("deleteButton", "Location");
    addClass("updateButton", "Location");
  }

  //Interactive Dropdown
  if (checkForClass("addButton", "Location")) {
    //console.log("Location Dropdown Rendered");
    document.getElementById("accordionTwo").setAttribute("hidden", "true");
    document.getElementById("accordionThree").setAttribute("hidden", "true");
    $("#accordionButtonLabel").html("Location Options");
    $("#accordionBody").html("");
    $("#accordionBody").html(generateLocationAccordion("accordionBody"));
    $("#locationByIdButton").on("click", function () {
      generateTable(getLocationPretty());
      applyLocationUpdateModal();
      applyLocationDeleteModal();
    });
    $("#locationAZButton").on("click", function () {
      generateTable(getLocationAZ());
      applyLocationUpdateModal();
      applyLocationDeleteModal();
    });
    $("#locationZAButton").on("click", function () {
      generateTable(getLocationZA());
      applyLocationUpdateModal();
      applyLocationDeleteModal();
    });
  }
  //Update + Delete Modal for Location
  if (checkForClass("addButton", "Location")) {
    //console.log("Location Refreshed");
    applyLocationUpdateModal();
    applyLocationDeleteModal();
  }
});

//Department
$("#departmentButton").on("click", function () {
  generateTable(getDepartmentPretty());

  if (checkForClass("addButton", "Personnel")) {
    removeClass("addButton", "Personnel");
    removeClass("deleteButton", "Personnel");
    removeClass("updateButton", "Personnel");
  }

  if (checkForClass("addButton", "Location")) {
    removeClass("addButton", "Location");
    removeClass("deleteButton", "Location");
    removeClass("updateButton", "Location");
  }

  //If it doesn't have the class, add. - Prevents many class additions.
  if (!checkForClass("addButton", "Department")) {
    addClass("addButton", "Department");
    addClass("deleteButton", "Department");
    addClass("updateButton", "Department");
  }

  //Update + Delete Modals for Department
  if (checkForClass("addButton", "Department")) {
    //console.log("Department Update Refreshed");
    applyDepartmentUpdateModal();
    applyDepartmentDeleteModal();
  }

  //Interactive Dropdown
  if (checkForClass("addButton", "Department")) {
    //console.log("Department Dropdown Rendered");
    document.getElementById("accordionTwo").setAttribute("hidden", "true");
    document.getElementById("accordionThree").setAttribute("hidden", "true");
    $("#accordionButtonLabel").html("Department Options");
    $("#accordionBody").html("");
    $("#accordionBody").html(generateDepartmentAccordion("accordionBody"));
    $("#departmentByIdButton").on("click", function () {
      generateTable(getDepartmentPretty());
      applyDepartmentUpdateModal();
      applyDepartmentDeleteModal();
    });
    $("#departmentNameAZButton").on("click", function () {
      generateTable(getDepartmentNameAZ());
      applyDepartmentUpdateModal();
      applyDepartmentDeleteModal();
    });
    $("#departmentNameZAButton").on("click", function () {
      generateTable(getDepartmentNameZA());
      applyDepartmentUpdateModal();
      applyDepartmentDeleteModal();
    });

    $("#departmentLocationAZButton").on("click", function () {
      generateTable(getDepartmentLocationAZ());
      applyDepartmentUpdateModal();
      applyDepartmentDeleteModal();
    });
    $("#departmentLocationZAButton").on("click", function () {
      generateTable(getDepartmentLocationZA());
      applyDepartmentUpdateModal();
      applyDepartmentDeleteModal();
    });
  }
});

//Add Modals for Personnel, Department and Location.
$("#addButton").on("click", function () {
  //If it doesnt have disabled- add it!
  if (!checkForClass("proposeAdd", "disabled")) {
    addClass("proposeAdd", "disabled");
    addClass("confirmAdd", "Personnel");
  }

  //Add Personnel
  if (checkForClass("addButton", "Personnel")) {
    applyPersonnelAddModal();
  }

  //Add Department
  if (checkForClass("addButton", "Department")) {
    applyDepartmentAddModal();
  }

  //Add Location
  if (checkForClass("addButton", "Location")) {
    applyLocationAddModal();
  }
});

//Seach Bar
$("#searchDropdown").html(generateDropdownOptions(getPersonnelPretty()));
$("#searchButton").on("click", function () {
  generateSearchResults();
});

$("#searchTerm").on("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    $("#searchButton").click();
  }
});

function screenAdapt() {
  if (screen.matches) {
    removeClass("mainContentBody", "col-10");
    removeClass("mainContentBody", "mx-0");
    removeClass("mainContentBody", "px-0");
    addClass("mainContentBody", "col-12");
    addClass("mainContentBody", "mx-2");
    addClass("mainContentBody", "px-2");

    removeClass("mainButtons", "m-2");
    addClass("mainButtons", "my-2");

    removeClass("searchForm", "col-10");
    removeClass("searchForm", "ps-1");
    removeClass("searchForm", "justify-content-evenly");
    addClass("searchForm", "col-12");
    addClass("searchForm", "justify-content-start");

    removeClass("addButton", "mx-4");
    addClass("addButton", "ms-1");
    addClass("addButton", "fs-4");

    $("#addButton").html("+");
  } else {
    removeClass("mainContentBody", "col-12");
    removeClass("mainContentBody", "mx-2");
    removeClass("mainContentBody", "px-2");
    addClass("mainContentBody", "col-10");
    addClass("mainContentBody", "mx-0");
    addClass("mainContentBody", "px-0");

    removeClass("mainButtons", "my-2");
    addClass("mainButtons", "m-2");

    removeClass("searchForm", "col-12");
    removeClass("searchForm", "justify-content-start");
    addClass("searchForm", "col-10");
    addClass("searchForm", "justify-content-evenly");
    addClass("searchForm", "ps-1");

    removeClass("addButton", "ms-1");
    removeClass("addButton", "fs-4");
    addClass("addButton", "ms-3");

    $("#addButton").html("Add");
  }
}

let screen = window.matchMedia("(max-width:420px)");
screenAdapt(screen);
screen.addListener(screenAdapt);
