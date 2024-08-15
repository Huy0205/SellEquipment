function format(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + currency;
}
function hienThiDanhSachSanPham(key) {
    let dssp = JSON.parse(localStorage.getItem(key))
    let ketQua = ""
    dssp.forEach(sp => {
        ketQua += chuyenSanPhamSangHTML(sp)
    })
    return ketQua
}

function chuyenSanPhamSangHTML(sp) {
    let html = "<div class='col-md-3 products'>"
        + "<figure class='pt-2'>"
        + "    <div class='product-img'>"
        + "        <a href='ChiTietSanPham.html' onclick='setMaSP(\"" + sp.ma + "\")' class='d-block'>"
        + "            <img src=" + sp.anh + " alt='img' class='img-thumbnail w-100'>"
        + "        </a>"
        + "        <a onclick='setMaSP(\"" + sp.ma + "\")' class='text-white text-center bg-info d-block p-2 text-decoration-none text-uppercase details' href='ChiTietSanPham.html'>Xem chi tiết</a>"
        + "    </div>"
        + "    <figcaption><h6>" + sp.ten + "</h6></figcaption>"
        + "    <h5 class='text-center text-danger font-weight-bold'>" + format(sp.gia,"đ") + "</h5>"
        + "</figure>"
        + "</div>"
    return html
}

function setMaSP(ma) {
    localStorage.setItem("maSP", ma)
}

function hienThiChiTietSanPham(ma) {
    let sp = timSanPhamTheoMa(ma)
    let ketQua = chuyenChiTietSanPhamSangHTML(sp)
    return ketQua
}

function timSanPhamTheoMa(ma) {
    let kiemTraMa1 = /^DC/
    let kiemTraMa2 = /^M/
    let kiemTraMa3 = /^T/
    let kiemTraMa4 = /^DO/
    let key = ""
    if (kiemTraMa1.test(ma))
        key = "dsBoDungCu"
    else
        if (kiemTraMa2.test(ma))
            key = "dsMay"
        else
            if (kiemTraMa3.test(ma))
                key = "dsThang"
            else
                if (kiemTraMa4.test(ma))
                    key = "dsDungCuDo"
    let dssp = JSON.parse(localStorage.getItem(key))
    let sp = dssp.find(sp => sp.ma == ma)
    return sp
}

function chuyenChiTietSanPhamSangHTML(sp) {
    let html = "<div class='row bg-light p-3'>"
        + "<div class='col-6 p-0'>"
        + "    <img src=" + sp.anh + " alt='img' class='w-100 img-thumbnail'>"
        + "</div>"
        + "<div class='col-6'>"
        + "    <h3 class='py-2'>Tên sản phẩm:</h3>"
        + "    <h4 class='py-2 font-italic'>" + sp.ten + "</h4>"
        + "    <h3 class='py-2'>Giá bán:</h3>"
        + "    <h3 class='py-2 font-italic text-danger'>" + format(sp.gia,"đ") + "</h3>"
        + "    <button type='button' class='btn btn-info my-2' onclick='duaVaoGioHang(\"" + sp.ma + "\")'><i class='fa-solid fa-cart-arrow-down'></i> Thêm vào giỏ hàng</button>"
        + "</div>"
        + "</div>"
        + "<div class='row mt-2 bg-light p-3'>"
        + "    <h3 class='w-100'>Mô tả</h3>"
        + "    <div class='text-justify'>" + sp.moTa + "</div>"
        + "</div>"
    return html
}

function timKiem(key, tuKhoa) {
    let dssp = JSON.parse(localStorage.getItem(key))
    let ketQua = ""
    dssp.forEach(sp => {
        if (sp.ten.toLowerCase().search(tuKhoa.toLowerCase()) != -1) {
            ketQua += chuyenSanPhamSangHTML(sp)
        }
    })
    return ketQua
}

function duaVaoGioHang(ma) {
    if (localStorage.getItem("TrangThai") == null) {
        alert("Bạn chưa đăng nhập")
    } else {
        let gioHang = JSON.parse(localStorage.getItem("gioHang"))
        if (gioHang == null) {
            gioHang = new Array()
        }
        if (!tangSoLuongSanPhamTrongGioHang(gioHang, ma)) {
            let sp = taoMotSanPhamTrongGioHang(ma)
            gioHang.push(sp)
        }
        localStorage.setItem("gioHang", JSON.stringify(gioHang))
        alert("Đã thêm sản phẩm vào giỏ hàng")
    }
}

function taoMotSanPhamTrongGioHang(ma) {
    let sanPham = new Object()
    sanPham.ma = ma
    sanPham.soLuong = 1
    return sanPham
}

function tangSoLuongSanPhamTrongGioHang(gioHang, ma) {
    let temp = false
    gioHang.forEach(sp => {
        if (sp.ma == ma) {
            sp.soLuong++
            temp = true
        }
    });
    return temp
}

function hienThiGioHang() {
    let gioHang = JSON.parse(localStorage.getItem("gioHang"))
    let ketQua = ""
    if (gioHang == null) {
        gioHang = new Array()
    }
    gioHang.forEach(sp => {
        let sanPhamTimDuoc = timSanPhamTheoMa(sp.ma)
        ketQua += chuyenSanPhamTrongGioHangSangHTML(sanPhamTimDuoc, sp.soLuong)
    });
    return ketQua
}

function chuyenSanPhamTrongGioHangSangHTML(sp, soLuong) {
    let html = "<tr>"
        + "<td class='col-4'>" + sp.ten + "</td>"
        + "<td class='text-center'><img src=" + sp.anh + " class='img-thumbnail'style='width: 100px;'></td>"
        + "<td class='text-center'>"+ soLuong + "</td>"
        + "<td class='text-center donGia'>" + sp.gia + "</td>"
        + "<td class='text-left thanhTien'>" + sp.gia * soLuong + "</td>"
        + "<td class='text-center'>"
        + "    <button onclick='xoaSanPhamKhoiGioHang(\"" + sp.ma + "\")' class='border-0 bg-light'>"
        + "        <i class='fa-solid fa-trash-can'></i>"
        + "    </button>"
        + "</td>"
        + "</tr>"
    return html
}

function xoaSanPhamKhoiGioHang(ma) {
    let gioHang = JSON.parse(localStorage.getItem("gioHang"))
    let gioHangSauKhiXoa = gioHang.filter(sp => sp.ma != ma)
    let ketQua = ""
    localStorage.setItem("gioHang", JSON.stringify(gioHangSauKhiXoa))
    ketQua = hienThiGioHang()
    $("tbody").html(ketQua)
    tinhTongTien()
    alert("Đã xóa sản phẩm khỏi giỏ hàng")
}

function tinhTongTien() {
    let tongTien = 0
    $(".thanhTien").each(function () {
        tongTien += parseFloat($(this).text())
    })
    $("#tongTien").html(format(tongTien, "đ"))
}