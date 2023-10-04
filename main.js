let datas = [];
const url = "https://northwind.vercel.app/api/products";

// axios ile verileri çekme işlemini async/await ile yapma
async function fetchData() {
  try {
    const response = await axios.get(url);
    datas = response.data;
    fillTable();
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Sayfa yüklendiğinde verileri çekme işlemini başlatma
fetchData();

// Tabloyu dolduran fonksiyon
function fillTable() {
  const tabloBody = document.getElementById("table-body");

  datas.forEach(function (item) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.unitPrice}</td>
        <td>${item.unitsInStock}</td>
        <td><button data-id="${item.id}" class="delete">Delete</button></td>
      `;
    tabloBody.appendChild(row);
  });

  // Delete Button 
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id"); 
      getDelete(id); 
    });
  });
}

// Silme işlemini async/await ile gerçekleştirme
async function getDelete(id) {
  try {
    const response = await axios.delete(`${url}/${id}`);
    console.log("Ürün başarıyla silindi.");
    datas = datas.filter((item) => item.id !== id);
    fillTable();
  } catch (error) {
    console.error("Ürün silinirken bir hata oluştu:", error);
  }
}
