//! HTML'den gelen elemanlar
const nameInput = document.getElementById("name-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.getElementById("list");
const statusCheckbox = document.getElementById("status-check");
const sumInfo = document.getElementById("sum-info");
const userInput = document.getElementById("user-input");
const select = document.querySelector("select");


//! Olay izleyicileri
addBtn.addEventListener("click", addExpense);
listArea.addEventListener("click", handleUpdate);
userInput.addEventListener("input", saveUser);
document.addEventListener("DOMContentLoaded", getUser);
select.addEventListener("change", handleFilter);

// toplam değerinin tutulması
let sum = 0;

//! Fonksiyonlar
function updatesSum(price) {
    //js'deki toplam değer güncellenir
    sum += Number(price);

    //HTML'deki toplam bilgi alanını güncelleme
    sumInfo.innerText = sum;
}

function addExpense(event) {
    //sayfa yenilemesini engeller
    event.preventDefault();
    //inputların boş olup/olmadığı sorgusu
    if (!nameInput.value || !priceInput.value) {
        alert("please fill out empty fields");
        return;
    }
    //inputlar doluysa html'e gönderilmek üzere oluşturulan kart
    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expense");
    //paid checkbox'a tıklanıldıysa paid class'ını ekleme
    if (statusCheckbox.checked === true) {
        expenseDiv.classList.add("paid");
    }

    expenseDiv.innerHTML = ` 
    <h2 class="name"> ${nameInput.value} </h2>
    <h2 class="price"> ${priceInput.value} </h2>
    <div class="btns">
        <img id="edit" src="images/pay-icon.png">
        <img id="delete" src="images/delete-icon.png">
    </div>`;

    listArea.appendChild(expenseDiv);

    //toplam alanını güncelleme
    updatesSum(priceInput.value);

    //formu temizleme
    nameInput.value = "";
    priceInput.value = "";
    statusCheckbox.checked = false;
}

//listedeki elemana tıklayınca çalışan fonksiyon
function handleUpdate(event) {
    //expense listesindeki delete butonu sayesinde elementin listeden silinmesi 
    const ele = event.target;
    const parent = ele.parentElement.parentElement;
    if (ele.id === "delete") {
        parent.remove();

        // total expense bilgisini güncelleme
        const price = parent.querySelector(".price").textContent;
        updatesSum(Number(price) * -1);
    }

    //tıklanılan elemanın id'si edit ise onun paid class'ı varsa çıkarma yoksa ekleme
    if (ele.id === "edit") {
        parent.classList.toggle("paid");
    }
}

//kulllanıcıyı local'e kaydetme
function saveUser(event) {
    localStorage.setItem("username", event.target.value);
}

//kullanıcı local'de var ise onu alma
function getUser() {
    const username = localStorage.getItem("username") || "";

    //kullanıcı isminin inputa aktarılması
    userInput.value = username;
}

//expense filtreleme kısmı
function handleFilter(event) {
    const selected = event.target.value;
    const items = list.childNodes;

    //bütün değerleri dönme
    items.forEach(item => {
        //selected alabileceği değeleri izleme
        switch (selected) {
            case "all":
                item.style.display = "flex";
                break;
            case "paid":
                if (item.classList.contains("paid")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
            case "unpaid":
                if (!item.classList.contains("paid")) {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
                break;
        }
    });
}