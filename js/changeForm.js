function xemMatKhau(eyeID, inputID) {
    $(eyeID).toggleClass("show")
    $(eyeID).children("i").toggleClass("fa-eye-slash fa-eye")
    if ($(eyeID).hasClass("show")) {
        $(inputID).attr('type', 'text')
    } else {
        $(inputID).attr('type', 'password')
    }
}

function taoTaiKhoan(tenDN, matKhau, sdt, email) {
    let taiKhoan = new Object()
    taiKhoan.tenDN = tenDN;
    taiKhoan.matKhau = matKhau;
    taiKhoan.sdt = sdt;
    taiKhoan.email = email;
    return taiKhoan
}

$(document).ready(function () {
    $("#eye").click(function () {
        xemMatKhau("#eye", "#txtMatKhauDN")
    })
    $("#eye1").click(function () {
        xemMatKhau("#eye1", "#txtMatKhauDK")
    })
    $("#eye2").click(function () {
        xemMatKhau("#eye2", "#txtNLMatKhau")
    })
    let dsTaiKhoan = JSON.parse(localStorage.getItem("dsTaiKhoan"))
    if (dsTaiKhoan === null)
        dsTaiKhoan = new Array()
    let show = localStorage.getItem("TrangThai")
    let ten = localStorage.getItem("tenDN")
    if (show === null) {
        $("#formDangKy").toggleClass("d-flex d-none")
        $("#formDangNhap").show()
        $("#thongTinTaiKhoan").hide()
        $("#btnDangNhap").click(function () {
            if (!kiemTraTenDangNhap() || !kiemTraMatKhauDangNhap()) {
                return false
            }
            let tenDN = $("#txtTenDangNhap").val()
            let matKhauDN = $("#txtMatKhauDN").val()
            let kiemTra = false
            dsTaiKhoan.forEach(tk => {
                if (tk.tenDN == tenDN && tk.matKhau == matKhauDN) {
                    localStorage.setItem("TrangThai", "XemThongTin")
                    localStorage.setItem("tenDN", tk.tenDN)
                    kiemTra = true
                    alert("Đăng nhập thành công")
                }
            });
            if(kiemTra == false){
                alert("Sai tài khoản hoặc mật khẩu")
            }
        })
        $("#btnChuyenTrangDangKy").click(function () {
            $("#formDangKy").toggleClass("d-none d-flex")
            $("#formDangNhap").toggleClass("d-flex d-none")
            $("#btnDangKy").click(function () {
                if (!kiemTraTenDangKy() || !kiemTraMatKhauDK() || !kiemTraMatKhauNL() || !kiemTraSDT() || !kiemTraEmail()) {
                    return false
                }
                let tenDN = $("#txtTenDangKy").val()
                let matKhau = $("#txtMatKhauDK").val()
                let sdt = $("#txtSDT").val()
                let email = $("#txtEmail").val()
                let taiKhoan = taoTaiKhoan(tenDN, matKhau, sdt, email)
                dsTaiKhoan.push(taiKhoan)
                localStorage.setItem("dsTaiKhoan", JSON.stringify(dsTaiKhoan))
                localStorage.setItem("TrangThai", "XemThongTin")
                localStorage.setItem("tenDN", tenDN)
                alert("Đăng ký thành công")
            })
        })
    } else {
        $("#formDangNhap").toggleClass("d-flex d-none")
        $("#formDangKy").toggleClass("d-flex d-none")
        let taiKhoan = dsTaiKhoan.find(taiKhoan => taiKhoan.tenDN == ten)
        $("#TTTenDN").html(taiKhoan.tenDN)
        $("#TTSDT").html(taiKhoan.sdt)
        $("#TTEmail").html(taiKhoan.email)
        $("#thongTinTaiKhoan").show()
        $("#btnDangXuat").click(function () {
            localStorage.removeItem("TrangThai")
        })
    }
})