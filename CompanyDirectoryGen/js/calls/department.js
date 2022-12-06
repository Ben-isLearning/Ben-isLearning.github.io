function getDepartment() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentGet.php",
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

function addDepartment(name, locationID) {
  console.log(name, locationID);
  let result;
  if (!name || !locationID) {
    console.log("bad Input");
    result = false;
  } else {
    $.ajax({
      dataType: "json",
      async: false,
      data: {
        name,
        locationID,
      },
      url: "php/departmentAdd.php",
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

function updateDepartment(name, locationID, id) {
  let result;
  if (!name || !locationID || !id) {
    result = false;
  }
  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
      name,
      locationID,
    },
    url: "php/departmentUpdate.php",
    success: function (data, status) {
      console.log(data, status);
      result = status;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
  });
  return result;
}

function deleteDepartment(id) {
  let result;
  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/departmentDelete.php",
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

function getDepartmentId(name) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      name,
    },
    url: "php/departmentGetID.php",
    success: function (data) {
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

function getDepartmentLocationId(name) {
  let result;
  $.ajax({
    dataType: "json",
    async: false,
    data: {
      name,
    },
    url: "php/departmentGetLocationID.php",
    success: function (data) {
      //console.log(data.data[0].locationID);
      result = data.data[0].locationID;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getDepartmentName(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/departmentGetName.php",
    success: function (data) {
      try {
        //console.log(data.data[0].name);
        result = data.data[0].name;
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

function getDepartmentPersonnelCount() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentPersonnelCount.php",
    success: function (data) {
      data.data.forEach((element) => {
        if (element.Name == null) {
          element.Name = "None";
        }
      });
      console.log(data.data);
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getDepartmentPretty() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentGetPretty.php",
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

function getDepartmentForm() {
  let result;
  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentGetForm.php",
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

function getDepartmentById(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/departmentGetByID.php",
    success: function (data) {
      try {
        //console.log(data.data[0]);
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

function getDepartmentPersonnelById(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/DepartmentPersonnelCountByID.php",
    success: function (data) {
      try {
        //console.log(data.data[0].name);
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

function getDepartmentNameAZ() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentGet_NameASC.php",
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

function getDepartmentNameZA() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentGet_NameDESC.php",
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

function getDepartmentLocationAZ() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentGet_LocationASC.php",
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

function getDepartmentLocationZA() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentGet_LocationDESC.php",
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

function getDepartmentIdList() {
  let result;
  $.ajax({
    dataType: "json",
    async: false,
    url: "php/departmentGetIDList.php",
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
export {
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentLocationId,
  getDepartmentId,
  getDepartmentName,
  getDepartmentPersonnelCount,
  getDepartmentPretty,
  getDepartmentForm,
  getDepartmentById,
  getDepartmentPersonnelById,
  getDepartmentNameAZ,
  getDepartmentNameZA,
  getDepartmentLocationAZ,
  getDepartmentLocationZA,
  getDepartmentIdList,
};
