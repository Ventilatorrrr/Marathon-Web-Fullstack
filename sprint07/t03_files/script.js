document.addEventListener('DOMContentLoaded', function () {
    loadFileList();

    document.getElementById('createForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        fetch('/create', {
            method: 'POST',
            body: new URLSearchParams(formData)
        }).then(() => {
            loadFileList();
            this.reset();
        });
    });
});

function loadFileList()
{
    fetch('/file-list')
            .then(res => res.json())
            .then(files => {
                const fileList = document.getElementById('createdFiles');
                fileList.innerHTML = '';

                files.forEach(file => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = '#';
                    a.textContent = file;
                    a.addEventListener('click', function () {
                        loadSelectedFile(file);
                    });
                    li.appendChild(a);
                    fileList.appendChild(li);
                });
            });
}

function loadSelectedFile(filename)
{
    fetch('/select-file?file=' + encodeURIComponent(filename))
            .then(res => res.json())
            .then(data => {
                const selected = document.getElementById('selectedFile');
                selected.innerHTML = `
                <h2>Selected file</h2>
                <h2>${data.filename}</h2>
                <p>Content:</p>
                <p>${data.content}</p>
                <form id="deleteForm">
                    <input type="hidden" name="filename" value="${data.filename}">
                    <button type="submit">Delete file</button>
                </form>
            `;
                selected.style.display = 'block';

                document.getElementById('deleteForm').addEventListener('submit', function (e) {
                    e.preventDefault();
                    fetch('/delete-file', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `filename=${encodeURIComponent(data.filename)}`
                    }).then(() => {
                        selected.style.display = 'none';
                        loadFileList();
                    });
                });
            });
}
