
function Employee(taiKhoan, name, email, password, datepicker, luongCB, chucVu, gioLam) {
    this.taiKhoan = taiKhoan;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = (this.calcSalary(this.chucvu)).toLocaleString("vi-VN", {style:"currency", currency:"VND"});
    this.loaiNV = this.ranking(this.gioLam)
}

Employee.prototype.calcSalary = function () {
    this.tongLuong = 0;
    if (this.chucVu === "Sếp") {
        this.tongLuong += this.luongCB * 3
    }
    if (this.chucVu === "Trưởng phòng") {
        this.tongLuong += this.luongCB * 2
    }
    if (this.chucVu === "Nhân viên") {
        this.tongLuong += this.luongCB * 1
    }

    return this.tongLuong;
}
Employee.prototype.ranking = function () {
    this.loaiNV = "";
    if (this.gioLam >= 192) {
        this.loaiNV = "Nhân viên xuất sắc";

    }
    else if (this.gioLam >= 176) {
        this.loaiNV = "Nhân viên giỏi";

    }
    else if (this.gioLam >= 160) {
        this.loaiNV = "Nhân viên khá";

    }
    else {
        this.loaiNV = "Nhân viên trung bình";

    }


    return this.loaiNV;
}