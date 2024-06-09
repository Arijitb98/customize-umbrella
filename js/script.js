function changeColor(element, selectedColor, selectedColorHex) {
	// Storing reference to HTML elements
	const umbrellaImage = document.getElementById("umbrella-image");
	const loader = document.getElementById("loader");
	const spinner = document.getElementById("spinner");
	const uploadIcon = document.querySelector(".upload-icon");
	const uploadButton = document.getElementById("upload-button");
	const logoImage = document.getElementById("logo-image");
	const removeButton = document.querySelector(".remove-button");

	// Show loader and hide preview, upload icon, remove logo button and logo image
	loader.style.display = "block";
	spinner.style.display = "block";
	umbrellaImage.style.display = "none";
	logoImage.style.display = "none";
	uploadIcon.style.display = "none";
	removeButton.classList.add("hidden");

	// Simulate loading time
	setTimeout(() => {
		// Check for both .png and .jpg formats
		const pngImage = `assets/umbrellas/${selectedColor}.png`;
		const jpgImage = `assets/umbrellas/${selectedColor}.jpg`;

		checkImageExists(pngImage, (exists) => {
			if (exists) {
				umbrellaImage.src = pngImage;
			} else {
				umbrellaImage.src = jpgImage;
			}
			//Stop loader and show preview
			umbrellaImage.style.display = "block";
			loader.style.display = "none";
			spinner.style.display = "none";
			uploadIcon.style.display = "block";

			// Show logo image and remove logo button if logo is uploaded
			if (logoImage.src && logoImage.src !== window.location.href) {
				logoImage.style.display = "block";
				removeButton.classList.remove("hidden");
			}
		});

		// Update the selected switch
		const switches = document.querySelectorAll(".switch");
		switches.forEach((switchElement) => {
			switchElement.classList.remove("selected");
			switchElement.style.borderColor = ""; // Reset border color
		});
		element.classList.add("selected");

		// Setting the upload button color to the color being passed in selectedColorHex 
		uploadButton.style.backgroundColor = selectedColorHex;

		// Setting the background color based on selected color
		let bgColor;
		switch (selectedColor) {
			case 'blue':
				bgColor = '#e4f5fc';
				break;
			case 'yellow':
				bgColor = '#fffaec';
				break;
			case 'pink':
				bgColor = '#ffc0cb';
				break;
			default:
				bgColor = '#f0f0f0';
				break;
		}
		document.body.style.backgroundColor = bgColor;
	}, 700);
}

function checkImageExists(url, callback) {
	const img = new Image();
	img.onload = function () { callback(true); };
	img.onerror = function () { callback(false); };
	img.src = url;
}

function uploadLogo(event) { // Selecting a file
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB file size
    const logoImage = document.getElementById("logo-image");
    const loader = document.getElementById("loader");
	const spinner = document.getElementById("spinner");
    const umbrellaImage = document.getElementById("umbrella-image");
	const uploadIcon = document.querySelector(".upload-icon");


    if (file) {
        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a PNG or JPG image file.");
            return;
        }

        if (file.size > maxSize) {
            alert("File size exceeds the maximum limit of 5MB.");
            return;
        }

        // Show the loader, hide the logo and preview image
        loader.style.display = "block";
		spinner.style.display = "block";
		uploadIcon.style.display = "none";
        umbrellaImage.style.display = "none";
        logoImage.style.display = "none";

        const reader = new FileReader();
        reader.onload = function (e) {
            // Once image is loaded, make it visible
            logoImage.src = e.target.result;
            logoImage.classList.remove("hidden");

            // Show the remove button
            const removeButton = document.querySelector(".remove-button");
            removeButton.classList.remove("hidden");

            // Hide the loader, show the preview
            loader.style.display = "none";
			spinner.style.display = "none";
			uploadIcon.style.display = "block";
            umbrellaImage.style.display = "block";
            logoImage.style.display = "block";
        };

        // Reading the uploaded blob
        setTimeout(() => {
            reader.readAsDataURL(file);
        }, 700);

    } else if (!logoImage.src) {
        // If no image is selected and no image is currently displayed, hide logo, clear source
        logoImage.classList.add("hidden");
        logoImage.src = ""; 
        logoImage.style.display = "none";

        // Hide the remove image button
        const removeButton = document.querySelector(".remove-button");
        removeButton.classList.add("hidden");

        // Hide loader
        loader.style.display = "none";
		spinner.style.display = "none";
    }

    const fileInput = event.target;
    const fileNameContainer = document.getElementById("file-name");
    // If image is selected setting image name in button
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        fileNameContainer.textContent = fileName;
    } else if (!logoImage.src) {
        fileNameContainer.textContent = "Upload Logo";
    }
}

function removeLogo() { //When remove logo is clicked
    const logoImage = document.getElementById("logo-image");
    const fileNameContainer = document.getElementById("file-name");
    const loader = document.getElementById("loader");
    const umbrellaImage = document.getElementById("umbrella-image");
	const uploadIcon = document.querySelector(".upload-icon");
	const spinner = document.getElementById("spinner");

    // Hide the umbrella image, logo and show the loader
    umbrellaImage.style.display = "none";
	logoImage.style.display = "none";
	uploadIcon.style.display = "none";
    loader.style.display = "block";
	spinner.style.display = "block";

    setTimeout(() => {
        // Hiding the logo image and clearing data
        logoImage.classList.add("hidden");
        logoImage.src = ""; 

        // Removing the file name
        fileNameContainer.textContent = "Upload Logo";

        // Clearing the file input value
        const fileInput = document.getElementById("logo-upload");
        fileInput.value = "";

        // Hiding the remove button
        const removeButton = document.querySelector(".remove-button");
        removeButton.classList.add("hidden");

        // Hide the loader and show the umbrella image after the timeout
        loader.style.display = "none";
        umbrellaImage.style.display = "block";
		spinner.style.display = "none";
		uploadIcon.style.display = "block";
    }, 700);
}
