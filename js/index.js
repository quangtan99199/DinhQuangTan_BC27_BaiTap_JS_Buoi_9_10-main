var employees = [];
init();
document.getElementById('btnThem').addEventListener("click", resetForm)

function init() {
  employees = JSON.parse(localStorage.getItem("employee")) || []

  for (i = 0; i < employees.length; i++) {
    var employee = employees[i];
    employees[i] = new Employee(
      employee.taiKhoan,
      employee.name,
      employee.email,
      employee.password,
      employee.datepicker,
      employee.luongCB,
      employee.chucVu,
      employee.gioLam,
      employee.tongLuong,
      employee.loaiNV,
    )
  }

  display(employees)
}


function addEmployee() {
  var taiKhoan = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;



  var employee = new Employee(taiKhoan, name, email, password, datepicker, luongCB, chucVu, gioLam);
  validationAdd(employees)


  if ((validationAdd(employees) != false)) {
    employees.push(employee);


    localStorage.setItem('employee', JSON.stringify(employees));




    display(employees);
    resetForm()
    $("#myModal").modal("hide");
  }
}

document.getElementById("modal-footer").addEventListener("click", handleClick)

function handleClick(event) {
  var btnType = event.target.getAttribute("btn-type")
  switch (btnType) {
    case "add":
      addEmployee()
      break;
    case "update":
      updateEmployee()
  }
}

function display(employees) {
  var html = ""
  var tbodyEl = document.getElementById("tableDanhSach");
  for (i = 0; i < employees.length; i++) {
    var employee = employees[i];
    html += `
  <tr>
    <td>${employee.taiKhoan}</td>
    <td>${employee.name}</td>
    <td>${employee.email}</td>
    <td>${employee.datepicker}</td>
    <td>${employee.chucVu}</td>
    <td>${employee.tongLuong}</td>
    <td>${employee.loaiNV}</td>
    <td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type="update" id="update-btn" onclick="selectEmployee('${employee.tk}')">C???p nh???t</button>
    <button class="btn btn-danger" btn-type="delete" onclick="deleteEmployee('${employee.taiKhoan}')">Xo??</button></td>
  </tr>
  `
  }
  tbodyEl.innerHTML = html;
}


function findEmployee(tknv) {
  var index = -1;
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].taiKhoan === tknv) {
      index = i;
      break;
    }
  }

  return index;
}

function deleteEmployee(employeeId) {

  var index = findEmployee(employeeId)

  if (index !== -1) {
    employees.splice(index, 1);
  }
  localStorage.setItem("employee", JSON.stringify(employees))
  display(employees)
}

function selectEmployee(employeeId) {
  document.getElementById("btnCapNhat").disabled = false;
  

  var index = findEmployee(employeeId)

  var employee = employees[index];
  document.getElementById("tknv").value = employee.taiKhoan
  document.getElementById("name").value = employee.name
  document.getElementById("email").value = employee.email
  document.getElementById("password").value = employee.password
  document.getElementById("datepicker").value = employee.datepicker
  document.getElementById("luongCB").value = employee.luongCB
  document.getElementById("chucvu").value = employee.chucVu
  document.getElementById("gioLam").value = employee.gioLam
  document.getElementById("btnThemNV").disabled = true
  document.getElementById("tknv").disabled = true


}

function resetForm() {
  document.getElementById("tknv").value = ""
  document.getElementById("name").value = ""
  document.getElementById("email").value = ""
  document.getElementById("password").value = ""
  document.getElementById("datepicker").value = ""
  document.getElementById("luongCB").value = ""
  document.getElementById("chucvu").value = "Ch???n ch???c v???"
  document.getElementById("gioLam").value = ""
  document.getElementById("btnThemNV").disabled = false;
  document.getElementById("tknv").disabled = false;

}

function updateEmployee() {

  var taiKhoan = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  var employee = new Employee(taiKhoan, name, email, password, datepicker, luongCB, chucVu, gioLam);
  if ((validationUpdate(employees) != false)) {
    var index = findEmployee(employee.taiKhoan)
    employees[index] = employee;
    localStorage.setItem("employee", JSON.stringify(employees));
    display(employees)
    resetForm()
    $("#myModal").modal("hide");

  }
}
function disableUpdate() {
  document.getElementById("btnCapNhat").disabled = true;
}
function validationUpdate() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  var isValid = true;

  var namePattern = new RegExp("^[a-z0-9A-Z_??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ]+$")
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById('tbTen').innerHTML = "T??n nh??n vi??n kh??ng ???????c ????? tr???ng";
    document.getElementById('tbTen').style = "display:block";
  }
  else if (!namePattern.test(name)) {
    isValid = false;
    document.getElementById('tbTen').innerHTML = "T??n nh??n vi??n ch???a k?? t??? kh??ng h???p l???";
    document.getElementById('tbTen').style = "display:block";
  }
  else {
    document.getElementById('tbTen').innerHTML = "";
    document.getElementById('tbTen').style = "display:none";

  }
  //Ki???m tra email c?? h???p l??? kh??ng 
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML =
      "Email kh??ng ???????c ????? tr???ng";
    document.getElementById('tbEmail').style = "display:block";

  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML =
      "Email kh??ng ????ng ?????nh d???ng";
    document.getElementById('tbEmail').style = "display:block";

  }
  else {
    document.getElementById('tbEmail').innerHTML = "";
    document.getElementById('tbEmail').style = "display:none";

  }

  //Ki???m tra password c?? h???p l??? kh??ng 
  var pswPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Password kh??ng ???????c ????? tr???ng";
    document.getElementById('tbMatKhau').style = "display:block";

  }
  else if (!minLength(password, 6)) {
    isValid = false;
    document.getElementById('tbMatKhau').innerHTML = "Password ph???i c?? ??t nh???t 6 k?? t???";
    document.getElementById('tbMatKhau').style = "display:block";
  }
  else if (!maxLength(password, 10)) {
    isValid = false;
    document.getElementById('tbMatKhau').innerHTML = "Password c?? t???i ??a 10 k?? t???";
    document.getElementById('tbMatKhau').style = "display:block";
  }
  else if (!pswPattern.test(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Password ph???i ch???a ??t nh???t 1 s???, 1 k?? t??? in hoa, 1 k?? t??? ?????c bi???t";
    document.getElementById('tbMatKhau').style = "display:block";
  }
  else {
    document.getElementById('tbMatKhau').innerHTML = "";
    document.getElementById('tbMatKhau').style = "display:none";

  }

  //Ki???m tra ng??y l??m c?? h???p l??? kh??ng 

  if (!isRequired(datepicker)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML =
      "Ng??y l??m kh??ng ???????c ????? tr???ng";
    document.getElementById('tbNgay').style = "display:block";

  } else {
    document.getElementById('tbNgay').innerHTML = "";
    document.getElementById('tbNgay').style = "display:none";

  }

  //Ki???m tra l????ng c?? b???n c?? h???p l??? kh??ng 

  if (!isRequired(`'${luongCB}'`)) {
    console.log(typeof luongCB)
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "Ti???n l????ng kh??ng ???????c ????? tr???ng";
    document.getElementById('tbLuongCB').style = "display:block";

  } else if (luongCB < 1e+6 || luongCB > 20e+6) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "Ti???n l????ng ph???i t??? 1 000 000 - 20 000 000 ";
    document.getElementById('tbLuongCB').style = "display:block";

  }

  else {
    document.getElementById('tbLuongCB').innerHTML = "";
    document.getElementById('tbLuongCB').style = "display:none";

  }
  //Ki???m tra ch???c v??? c?? h???p l??? kh??ng 
  if (chucVu === "Ch???n ch???c v???") {
    isValid = false;
    document.getElementById('tbChucVu').innerHTML = "Ch???n ch???c v??? h???p l??? (S???p, Tr?????ng ph??ng, Nh??n vi??n";
    document.getElementById('tbChucVu').style = "display:block";
  }
  else {
    document.getElementById('tbChucVu').innerHTML = "";
    document.getElementById('tbChucVu').style = "display:none";

  }
  //Ki???m tra s??? gi??? l??m c?? h???p l??? kh??ng 
  if (!isRequired(gioLam)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "S??? gi??? l??m kh??ng ???????c ????? tr???ng";
    document.getElementById('tbGiolam').style = "display:block";

  } else if (gioLam < 80 || gioLam > 200) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "S??? gi??? l??m trong th??ng ph???i t??? 80 - 200 gi???";
    document.getElementById('tbGiolam').style = "display:block";

  }
  else {
    document.getElementById('tbGiolam').innerHTML = "";
    document.getElementById('tbGiolam').style = "display:none";

  }

  return isValid;

}
function validationAdd() {
  var taiKhoan = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;

  var isValid = true;

  //Ki???m tra t??i kho???n nh???p v??o c?? h???p l??? hay kh??ng
  var idPattern = new RegExp("^[1-9]+$");
  if (!isRequired(taiKhoan)) {
    isValid = false;
    document.getElementById('tbTKNV').innerHTML = "T??i kho???n kh??ng ???????c ????? tr???ng";
    document.getElementById('tbTKNV').style = "display:block";
  }
  else if (!minLength(taiKhoan, 4)) {
    isValid = false;
    document.getElementById('tbTKNV').innerHTML = "T??i kho???n ph???i c?? ??t nh???t 4 k?? s???";
    document.getElementById('tbTKNV').style = "display:block";
  }
  else if (!maxLength(taiKhoan, 6)) {
    isValid = false;
    document.getElementById('tbTKNV').innerHTML = "T??i kho???n c?? t???i ??a 6 k?? s???";
    document.getElementById('tbTKNV').style = "display:block";
  }
  else if (!idPattern.test(taiKhoan)) {
    isValid = false;
    document.getElementById('tbTKNV').innerHTML = "T??i kho???n ch??? bao g???m s???";
    document.getElementById('tbTKNV').style = "display:block";
  }
  else if (!duplicateTest(taiKhoan)) {
    isValid = false;
    document.getElementById('tbTKNV').innerHTML = "T??i kho???n ???? t???n t???i";
    document.getElementById('tbTKNV').style = "display:block";
  }
  else {
    document.getElementById('tbTKNV').innerHTML = "";
    document.getElementById('tbTKNV').style = "display:none";

  }


  //Ki???m tra t??n nh??n vi??n nh???p v??o c?? h???p l??? hay kh??ng 
  var namePattern = new RegExp("^[a-z0-9A-Z_??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ]+$")
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById('tbTen').innerHTML = "T??n nh??n vi??n kh??ng ???????c ????? tr???ng";
    document.getElementById('tbTen').style = "display:block";
  }
  else if (!namePattern.test(name)) {
    isValid = false;
    document.getElementById('tbTen').innerHTML = "T??n nh??n vi??n ch???a k?? t??? kh??ng h???p l???";
    document.getElementById('tbTen').style = "display:block";
  }
  else {
    document.getElementById('tbTen').innerHTML = "";
    document.getElementById('tbTen').style = "display:none";

  }

  //Ki???m tra email c?? h???p l??? kh??ng 
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML =
      "Email kh??ng ???????c ????? tr???ng";
    document.getElementById('tbEmail').style = "display:block";

  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML =
      "Email kh??ng ????ng ?????nh d???ng";
    document.getElementById('tbEmail').style = "display:block";

  }
  else {
    document.getElementById('tbEmail').innerHTML = "";
    document.getElementById('tbEmail').style = "display:none";

  }
  //Ki???m tra password c?? h???p l??? kh??ng 
  var pswPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Password kh??ng ???????c ????? tr???ng";
    document.getElementById('tbMatKhau').style = "display:block";

  }
  else if (!minLength(password, 6)) {
    isValid = false;
    document.getElementById('tbMatKhau').innerHTML = "Password ph???i c?? ??t nh???t 6 k?? t???";
    document.getElementById('tbMatKhau').style = "display:block";
  }
  else if (!maxLength(password, 10)) {
    isValid = false;
    document.getElementById('tbMatKhau').innerHTML = "Password c?? t???i ??a 10 k?? t???";
    document.getElementById('tbMatKhau').style = "display:block";
  }
  else if (!pswPattern.test(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Password ph???i ch???a ??t nh???t 1 s???, 1 k?? t??? in hoa, 1 k?? t??? ?????c bi???t";
    document.getElementById('tbMatKhau').style = "display:block";
  }
  else {
    document.getElementById('tbMatKhau').innerHTML = "";
    document.getElementById('tbMatKhau').style = "display:none";

  }

  //Ki???m tra ng??y l??m c?? h???p l??? kh??ng 

  if (!isRequired(datepicker)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML =
      "Ng??y l??m kh??ng ???????c ????? tr???ng";
    document.getElementById('tbNgay').style = "display:block";

  } else {
    document.getElementById('tbNgay').innerHTML = "";
    document.getElementById('tbNgay').style = "display:none";

  }

  //Ki???m tra l????ng c?? b???n c?? h???p l??? kh??ng 

  if (!isRequired(luongCB)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "Ti???n l????ng kh??ng ???????c ????? tr???ng";
    document.getElementById('tbLuongCB').style = "display:block";

  } else if (luongCB < 1e+6 || luongCB > 20e+6) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "Ti???n l????ng ph???i t??? 1 000 000 - 20 000 000 ";
    document.getElementById('tbLuongCB').style = "display:block";

  }
  else {
    document.getElementById('tbLuongCB').innerHTML = "";
    document.getElementById('tbLuongCB').style = "display:none";

  }
  //Ki???m tra ch???c v??? c?? h???p l??? kh??ng 
  if (chucVu === "Ch???n ch???c v???") {
    isValid = false;
    document.getElementById('tbChucVu').innerHTML = "Ch???n ch???c v??? h???p l??? (S???p, Tr?????ng ph??ng, Nh??n vi??n";
    document.getElementById('tbChucVu').style = "display:block";
  }
  else {
    document.getElementById('tbChucVu').innerHTML = "";
    document.getElementById('tbChucVu').style = "display:none";

  }
  //Ki???m tra s??? gi??? l??m c?? h???p l??? kh??ng 
  if (!isRequired(gioLam)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "S??? gi??? l??m kh??ng ???????c ????? tr???ng";
    document.getElementById('tbGiolam').style = "display:block";

  } else if (gioLam < 80 || gioLam > 200) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "S??? gi??? l??m trong th??ng ph???i t??? 80 - 200 gi???";
    document.getElementById('tbGiolam').style = "display:block";

  }
  else {
    document.getElementById('tbGiolam').innerHTML = "";
    document.getElementById('tbGiolam').style = "display:none";

  }




  return isValid;


}
document.getElementById('searchName').addEventListener('keypress', searchEmployee)

document.getElementById('btnTimNV').addEventListener("click", searchEmployee)

function subSearchEmployee() {
  var employeeSearch = document.getElementById("searchName").value;
  employeeSearch = employeeSearch.toLowerCase();

  var newEmployees = [];
  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i];
    employeeRank = employee.loaiNV.toLowerCase()
    if (employeeRank.indexOf(employeeSearch) !== -1) {
      newEmployees.push(employee)
    }
  }
  display(newEmployees);
}
function searchEmployee(event) {

  if (event.type === "keypress") {
    if (event.key !== "Enter") {
      return;
    }
    else {
      subSearchEmployee()
    }
  }
  else if (event.type === "click") {
    subSearchEmployee()
  }


}
document.getElementById('searchName').addEventListener('keyup', resetSearchEmployee)

function resetSearchEmployee() {
  var employeeSearch = document.getElementById("searchName").value;
  employeeSearch = employeeSearch.toLowerCase();
  if (employeeSearch === "") {
    display(employees);
  }

}


function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}

function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }

  return true;
}

function maxLength(value, limit) {
  if (value.length > limit) {
    return false;
  }

  return true;
}

function duplicateTest(value) {
  for (i = 0; i < employees.length; i++) {
    if (value === employees[i].taiKhoan) {
      return false;
    }
  }

  return true;
}

