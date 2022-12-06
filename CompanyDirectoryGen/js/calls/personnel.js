function getPersonnel() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGet.php",
    success: function (data) {
      data.data.forEach((element) => {
        if (element.department == null) {
          element.department = "Undecided";
        }
        if (element.location == null) {
          element.location = "Undecided";
        }
      });
      //console.log(data.data);
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function addPersonnel(firstName, lastName, jobTitle, email, departmentID) {
  console.log(firstName, lastName, jobTitle, email, departmentID);
  if (!firstName || !lastName || !jobTitle || !email || !departmentID) {
    console.log("bad Input");
    result = false;
  } else {
    let result;
    $.ajax({
      dataType: "json",
      async: false,
      data: {
        firstName,
        lastName,
        jobTitle,
        email,
        departmentID,
      },
      url: "php/personnelAdd.php",
      success: function (data, status) {
        //console.log(status);
        result = status;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
    return result;
  }
}

function updatePersonnel(
  firstName,
  lastName,
  jobTitle,
  email,
  departmentID,
  id
) {
  let result;
  if (!id || !firstName || !lastName || !jobTitle || !email || !departmentID) {
    result = false;
  }
  $.ajax({
    dataType: "json",
    async: false,
    data: {
      firstName,
      lastName,
      jobTitle,
      email,
      departmentID,
      id,
    },
    url: "php/personnelUpdate.php",
    success: function (data, status) {
      //console.log(status);
      result = status;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
  return result;
}

function deletePersonnel(id) {
  let result;
  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/personnelDelete.php",
    success: function (data, status) {
      //console.log(status);
      result = status;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
  return result;
}

function getPersonnelId(firstName, lastName) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      firstName,
      lastName,
    },
    url: "php/personnelGetID.php",
    success: function (data) {
      //console.log(data.data[0].id);
      try {
        result = data.data[0].id;
      } catch (e) {
        result = false;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelIdByEmail(email) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      email,
    },
    url: "php/personnelGetIDbyEmail.php",
    success: function (data) {
      //console.log(data.data[0].id);
      try {
        result = data.data[0].id;
      } catch (e) {
        result = false;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelData(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/personnelGetByID.php",
    success: function (data) {
      //console.log(data.data[0]);
      result = data.data[0];
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelById(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/personnelGetByID.php",
    success: function (data) {
      //console.log(data.data[0]);
      result = data.data[0];
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelAll() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGetAll.php",
    success: function (data) {
      //console.log(data.data);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
        if (!element.Title) {
          element.Title = "Please Update";
        }
      });
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelAllSmall() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGetAllSmall.php",
    success: function (data) {
      //console.log(data.data);
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelForm() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGetForm.php",
    success: function (data) {
      //console.log(data.data);
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelPretty() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGetPretty.php",
    success: function (data) {
      //console.log(data.data);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
      });
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelByEmail(email) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      email,
    },
    url: "php/personnelGetByEmail.php",
    success: function (data) {
      //console.log(data.data[0].id);
      console.log(data.data);
      try {
        result = data.data[0];
      } catch (e) {
        result = false;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelFullNameById(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/personnelGetFullNameByID.php",
    success: function (data) {
      //console.log(data.data[0].id);
      console.log(data.data);
      try {
        result = `${data.data[0].firstName} ${data.data[0].lastName}`;
      } catch (e) {
        result = false;
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelNameAZ() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGetPretty_NameASC.php",
    success: function (data) {
      //console.log(data.data);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
      });
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelNameZA() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGetPretty_NameDESC.php",
    success: function (data) {
      //console.log(data.data);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
      });
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelSurnameAZ() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGetPretty_SurnameASC.php",
    success: function (data) {
      //console.log(data.data);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
      });
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelSurnameZA() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/personnelGetPretty_SurnameDESC.php",
    success: function (data) {
      //console.log(data.data);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
      });
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelPrettyByDepartmentId(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/personnelGetPretty_ByDepartment.php",
    success: function (data) {
      //console.log(data.data[0]);
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelPrettyByLocationId(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/personnelGetPretty_ByLocation.php",
    success: function (data) {
      //console.log(data.data[0]);
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelPrettyById(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/personnelGetPretty_ByID.php",
    success: function (data) {
      //console.log(data.data[0]);
      result = data.data[0];
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelPrettyByName(name) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      name,
    },
    url: "php/personnelGetPretty_ByName.php",
    success: function (data) {
      //console.log(data.data[0]);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
      });

      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelPrettyBySurname(name) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      name,
    },
    url: "php/personnelGetPretty_BySurname.php",
    success: function (data) {
      //console.log(data.data[0]);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
      });

      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getPersonnelPrettyByEmail(email) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      email,
    },
    url: "php/personnelGetPretty_ByEmail.php",
    success: function (data) {
      //console.log(data.data[0]);
      data.data.forEach((element) => {
        if (element.Department == null) {
          element.Department = "Undecided";
        }
        if (element.Location == null) {
          element.Location = "Undecided";
        }
      });

      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

export {
  getPersonnel,
  addPersonnel,
  updatePersonnel,
  deletePersonnel,
  getPersonnelId,
  getPersonnelData,
  getPersonnelById,
  getPersonnelAll,
  getPersonnelAllSmall,
  getPersonnelForm,
  getPersonnelIdByEmail,
  getPersonnelPretty,
  getPersonnelByEmail,
  getPersonnelFullNameById,
  getPersonnelNameAZ,
  getPersonnelNameZA,
  getPersonnelSurnameAZ,
  getPersonnelSurnameZA,
  getPersonnelPrettyByDepartmentId,
  getPersonnelPrettyByLocationId,
  getPersonnelPrettyById,
  getPersonnelPrettyByName,
  getPersonnelPrettyBySurname,
  getPersonnelPrettyByEmail,
};
