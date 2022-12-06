function getLocation() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/locationGet.php",
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

function addLocation(name) {
  console.log(name);
  let result;
  if (!name) {
    console.log("bad Input");
    result = false;
  } else {
    $.ajax({
      dataType: "json",
      async: false,
      data: {
        name,
      },
      url: "php/locationAdd.php",
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

function updateLocation(name, id) {
  let result;
  $.ajax({
    dataType: "json",
    async: false,
    data: {
      name,
      id,
    },
    url: "php/locationUpdate.php",
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

function deleteLocation(id) {
  let result;
  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/locationDelete.php",
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

function getLocationId(name) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      name,
    },
    url: "php/locationGetID.php",
    success: function (data) {
      try {
        ////console.log(data.data[0].id);
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

function getLocationName(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/locationGetName.php",
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

function getLocationPersonnelCount() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/locationPersonnelCount.php",
    success: function (data) {
      ////console.log(data.data);
      result = data.data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getLocationPretty() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/locationGetPretty.php",
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

function getLocationForm() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/locationGetForm.php",
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

function getLocationById(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/locationGetByID.php",
    success: function (data) {
      //console.log(data.data);
      result = data.data[0].name;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getLocationPersonnelById(id) {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    data: {
      id,
    },
    url: "php/locationPersonnelCountByID.php",
    success: function (data) {
      //console.log(data.data);
      result = data.data[0];
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
    },
  });
  return result;
}

function getLocationAZ() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/locationGet_NameASC.php",
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

function getLocationZA() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/locationGet_NameDESC.php",
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

function getLocationIdList() {
  let result;

  $.ajax({
    dataType: "json",
    async: false,
    url: "php/locationGetIDList.php",
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
  getLocationById,
  getLocation,
  addLocation,
  updateLocation,
  deleteLocation,
  getLocationId,
  getLocationName,
  getLocationPersonnelCount,
  getLocationPretty,
  getLocationForm,
  getLocationPersonnelById,
  getLocationAZ,
  getLocationZA,
  getLocationIdList,
};
