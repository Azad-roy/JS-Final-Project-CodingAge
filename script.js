        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('feedbackForm');
            const fileInput = document.getElementById('fileInput');
            const fileUploadLabel = document.querySelector('.file-upload-label');
            const fileNameDisplay = document.querySelector('.file-name');
            const successMessage = document.getElementById('successMessage');

            fileInput.addEventListener('change', function () {
                if (this.files.length > 0) {
                    const file = this.files[0];
                    if (file.size > 5 * 1024 * 1024) {
                        alert('File size exceeds 5MB limit. Please choose a smaller file.');
                        this.value = '';
                        fileNameDisplay.textContent = 'Max file size: 5MB';
                    } else {
                        fileNameDisplay.textContent = `Selected: ${file.name}`;
                    }
                } else {
                    fileNameDisplay.textContent = 'Max file size: 5MB';
                }
            });

            fileUploadLabel.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUploadLabel.style.borderColor = 'var(--primary)';
                fileUploadLabel.style.backgroundColor = 'rgba(110, 142, 251, 0.1)';
            });

            fileUploadLabel.addEventListener('dragleave', () => {
                fileUploadLabel.style.borderColor = '#e2e8f0';
                fileUploadLabel.style.backgroundColor = 'transparent';
            });

            fileUploadLabel.addEventListener('drop', (e) => {
                e.preventDefault();

                if (e.dataTransfer.files.length) {
                    fileInput.files = e.dataTransfer.files;
                    const event = new Event('change');
                    fileInput.dispatchEvent(event);
                }
            });

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const formData = {
                    name: document.getElementById('feedbackName').value,
                    email: document.getElementById('feedbackEmail').value,
                    type: document.getElementById('feedbackType').value,
                    category: document.querySelector('input[name="category"]:checked')?.value || '',
                    message: document.getElementById('feedbackMessage').value,
                    file: fileInput.files[0]?.name || 'None'
                };

                console.log('Form submitted:', formData);

                form.style.display = 'none';
                successMessage.style.display = 'block';

                setTimeout(() => {
                    form.reset();
                    fileNameDisplay.textContent = 'Max file size: 5MB';
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                }, 5000);
            });
        });