$(document).ready(function () {
    $("#txtTenDangNhap").blur(kiemTraTenDangNhap)
    $("#txtMatKhauDN").blur(kiemTraMatKhauDangNhap)
    $("#txtTenDangKy").blur(kiemTraTenDangKy)
    $("#txtMatKhauDK").blur(kiemTraMatKhauDK)
    $("#txtNLMatKhau").blur(kiemTraMatKhauNL)
    $("#txtSDT").blur(kiemTraSDT)
    $("#txtEmail").blur(kiemTraEmail)
})

/* form Đăng nhập */
function kiemTraTenDangNhap() {
    let tenDangNhap = $("#txtTenDangNhap").val()
    let regexTenDangNhap = /^\w{5,32}$/
    if (tenDangNhap == "") {
        $("#errorTenDangNhap").html("Nhập tên đăng nhập!")
        return false
    }
    if (!regexTenDangNhap.test(tenDangNhap)) {
        $("#errorTenDangNhap").html("Tên đăng nhập bao gồm ký tự từ a-z, 0-9, dấu _ và phải từ 5-32 ký tự!")
        return false
    }
    $("#errorTenDangNhap").html("")
    return true
}

function kiemTraMatKhauDangNhap() {
    let matKhauDN = $("#txtMatKhauDN").val()
    let regexMatKhau = /^[a-zA-Z0-9]{8,}$/
    if (matKhauDN == "") {
        $("#errorMatKhauDN").html("Nhập mật khẩu!")
        return false
    }
    if (!regexMatKhau.test(matKhauDN)) {
        $("#errorMatKhauDN").html("Mật khẩu bao gồm chữ cái và chữ số, tối thiểu 8 ký tự!")
        return false
    }
    $("#errorMatKhauDN").html("")
    return true
}

/* form Đăng ký */
function kiemTraTenDangKy() {
    let dsTaiKhoan = JSON.parse(localStorage.getItem("dsTaiKhoan"))
    let tenDangKy = $("#txtTenDangKy").val()
    let regexTenDangKy = /^\w{5,32}$/
    if (tenDangKy == "") {
        $("#errorTenDangKy").html("Nhập tên đăng nhập!")
        return false
    }
    if (!regexTenDangKy.test(tenDangKy)) {
        $("#errorTenDangKy").html("Tên đăng nhập bao gồm ký tự từ a-z, 0-9, dấu _ và phải từ 5-32 ký tự!")
        return false
    }
    if (dsTaiKhoan !== null) {
        let kiemTra = dsTaiKhoan.find(tk => tk.tenDN == tenDangKy)
        if (kiemTra != undefined) {
            $("#errorTenDangKy").html("Tên đăng nhập đã tồn tại!")
            return false
        }
    }
    $("#errorTenDangKy").html("(*)")
    return true
}

function kiemTraMatKhauDK() {
    let matKhauDK = $("#txtMatKhauDK").val()
    let regexMatKhau = /^[a-zA-Z0-9]{8,}$/
    if (matKhauDK == "") {
        $("#errorMatKhauDK").html("Nhập mật khẩu!")
        return false
    }
    if (!regexMatKhau.test(matKhauDK)) {
        $("#errorMatKhauDK").html("Mật khẩu bao gồm chữ cái và chữ số, tối thiểu 8 ký tự!")
        return false
    }
    $("#errorMatKhauDK").html("(*)")
    return true
}

function kiemTraMatKhauNL() {
    let matKhau = $("#txtMatKhauDK").val()
    let matKhauNL = $("#txtNLMatKhau").val()
    if (matKhauNL == "") {
        $("#errorNLMatKhau").html("Nhập lại mật khẩu!")
        return false
    }
    if (matKhauNL != matKhau) {
        $("#errorNLMatKhau").html("Mật khẩu nhập lại phải khớp với mật khẩu ở trên!")
        return false
    }
    $("#errorNLMatKhau").html("(*)")
    return true
}

function kiemTraSDT() {
    let sdt = $("#txtSDT").val()
    let regexSDT = /^(03|05|07|08|09)\d{8}$/
    if (sdt != "" && !regexSDT.test(sdt)) {
        $("#errorSDT").html("Số điện thoại bắt đầu bằng 03, 05, 07, 08, 09 và bao gồm 10 số!")
        return false
    }
    $("#errorSDT").html("")
    return true
}

function kiemTraEmail() {
    let email = $("#txtEmail").val()
    let regexEmail = /^\w+\@[a-z]+\.com$/
    if (email != "" && !regexEmail.test(email)) {
        $("#errorEmail").html("Email không hợp lệ!")
        return false
    }
    $("#errorEmail").html("")
    return true
}