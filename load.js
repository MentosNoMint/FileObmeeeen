
document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];





    if (!file) {
        alert('Выберите файл.');
        return;
    }
    const formData = new FormData();
    formData.append('file', file);

    console.log(file)
    
    fetch('http://localhost:8000/upload', { method: 'POST', body: formData })
        .then(response => response.text())
        .then((result) => {
            alert(result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });



 
    let name = file.name
    let file_path = `uploads/${name}`
  



    
      

        
        await fetch('http://localhost:8000/loading/files', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name , file_path}),
        });
    
});