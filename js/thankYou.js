async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) {
    return;
  }

  const formDataObj = JSON.parse(formDataRaw);

  const formData = new FormData();
  formData.append("sheetName", "Lead");
  formData.append("Ism", formDataObj.Ism);
  formData.append("Telefon raqam", formDataObj.TelefonRaqam);
  formData.append("Royhatdan o'tgan vaqti", formDataObj.SanaSoat);

  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzJ1ChTY_nCYMI3klY-yOKPc9i64havvZ5ADyyBk17-P9Oeg0Dz1Xe8WFtn0vXNCcA/exec',
      {
        method: 'POST',
        body: formData,
      },
    );
    
    if (response.ok) {
      localStorage.removeItem("formData");
    } else {
      throw new Error("API response was not ok");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    if (document.getElementById("errorMessage")) {
      document.getElementById("errorMessage").style.display = "block";
    }
  }
}

window.onload = sendFormData;
