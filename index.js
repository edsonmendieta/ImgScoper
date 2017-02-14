window.onload = function() {


	var welcomeScreen = document.getElementById('welcome');
	var firstImgScreen = document.getElementById('firstImg');

	window.setTimeout(invisibleWelcome, 4000);
	window.setTimeout(hideWelcome, 5000);

	function invisibleWelcome() {
		welcomeScreen.style.opacity = "0";
	}

	function hideWelcome() {
		welcomeScreen.className = "welcome fade hidden";
		firstImgScreen.className = "firstImg";
	}

// Start Upload Screen ------------------------------------------
	var targetPad = document.getElementById('uploadBox');
	var uploadBoxStuff = document.getElementById('uploadBoxContent');
	var browseButton = document.getElementById('inputButton');
	var dragDropTip = document.getElementById('uploadDragTip');
	var cloudIcon = document.getElementById('uploadIcon');
	var fileSelect = document.getElementById('inputButton');
	var triggerBox = document.getElementById('browseTriggerBox');
	var browseButton = document.getElementById('browseTrigger');
	var progressBox = document.getElementById('progressBox');
	var progress = document.getElementById('progressBar');
	var percentage = document.getElementById('percentage');
	var userPage = document.getElementById('userPage');

	var acceptedTypes = {
		'image/png': true,
		'image/jpeg': true,
		'image/gif': true
	}

	// Start: Drag & Drop ------------------------------------

	targetPad.ondragover = function(event) {
		event.preventDefault();
		this.style.border = "solid #2A93D5 5px";
		dragDropTip.style.color = "#2A93D5";
		cloudIcon.setAttribute('src', 'blueCloud100.png');
	} 

	targetPad.ondragenter = function(event) {
		this.style.border = "solid #2A93D5 5px";
		dragDropTip.style.color = "#2A93D5";
		cloudIcon.setAttribute('src', 'blueCloud100.png');
	}

	targetPad.ondragleave = function (event) {
		console.log(iiState);
		if (iiState == "opened") {
			targetPad.style.border = "1px solid transparent";
		}
		else {
			targetPad.style.border = "dashed #AED9DA 5px";
		}
		dragDropTip.style.color = "#AED9DA";
		cloudIcon.setAttribute('src', 'uploadBlueGray100.png');
	}

	// Cached File Value --------------------------------------
		var fileOld;
	// --------------------------------------------------------

	// Drag N' Drop upload ----------------------------
	targetPad.ondrop = function (event) {
		event.preventDefault();
		// File(s) & FormData-------------------
		var files = event.dataTransfer.files;
		var file = files[0];
		var formData = new FormData();
		var image = "no";

		if (file.type.match('image.*')) {
			formData.append('photo[]', file, file.name);
			image = "yes";

			iiState = "closed";

			userPage.className = "fade hidden";
			userPage.style.opacity = "0";
			targetPad.className = "fade hidden";
			targetPad.style.opacity = "0";
			progressBox.className = "fade";
			progressBox.style.opacity = "1";

			fileOld = file;
		}
		else {
			if (iiState == "open") {
				targetPad.style.border = "";
			}
			else {
				targetPad.style.border = "dashed #AED9DA 5px";
			}
			dragDropTip.style.color = "#AED9DA";
			cloudIcon.setAttribute('src', 'uploadBlueGray100.png');
			alert("Not an image!");
		}

		targetPad.style.border = "";
		dragDropTip.style.color = "#AED9DA";
		cloudIcon.setAttribute('src', 'uploadBlueGray100.png');
		// End: File(s) & FormData--------------
		// Start XHR Request--------------------
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://httpbin.org/post', true);
		xhr.onprogress = function (event) {
				if (event.lengthComputable) {
					var complete = (event.loaded/event.total * 100 | 0);
					progress.value = progress.innerHTML = complete;
					percentage.innerHTML = complete + "%";
				}
			};
		xhr.onload = function() {
			if (xhr.status === 200) {
				// alert("Complete!");
				window.setTimeout(fadeProgress, 1000);
				window.setTimeout(hideProgress, 2000);
				window.setTimeout(showUserPage, 2500);
				function fadeProgress() {
					progressBox.style.opacity = "0";
				}
				function hideProgress() {
					progressBox.className = "hidden";
					userPage.className = "fade";
				}
				function showUserPage() {
					userPage.style.opacity = "1";
				}
			}
			else {
				alert("An error occurred!");
			}
		};
		if (image == "yes") {
			xhr.send(formData);
		}
		// End: XHR Request---------------------

	} //End: Drag N' Drop upload-----------------------

	// End: Drag & Drop---------------------------------------

	// Start: Browse Button Upload ---------------------------
	browseButton.onclick = function() {
		fileSelect.click();
		console.log("browse clicked!");
		fileSelect.onchange = function() {

			console.log("changed!");
			// Files/FormData-----------------
			var files = fileSelect.files;
			var file = files[0];
			var formData = new FormData();
			var image = "no";

			if (file.type.match('image.*')) {
				formData.append('photo[]', file, file.name);
				image = "yes";

				iiState = "closed";

				userPage.className = "fade hidden";
				userPage.style.opacity = "0";
				targetPad.className = "fade hidden";
				targetPad.style.opacity = "0";
				progressBox.className = "fade";
				progressBox.style.opacity = "1";

				fileOld = file;

				console.log(file);

			}
			else {

				if (iiState == "open") {
					targetPad.style.border = "";
				}
				else {
					targetPad.style.border = "dashed #AED9DA 5px";
				}
				dragDropTip.style.color = "#AED9DA";
				cloudIcon.setAttribute('src', 'uploadBlueGray100.png');
				alert("Not an image!");
			}
			//--------------------------------

			// XHR Request--------------------
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://httpbin.org/post', true);
			xhr.onprogress = function (event) {
				if (event.lengthComputable) {
					var complete = (event.loaded/event.total * 100 | 0);
					progress.value = progress.innerHTML = complete;
					percentage.innerHTML = complete + "%";
				}
			};
			xhr.onload = function() {
				if(xhr.status === 200) {
					// alert('Complete!');
					window.setTimeout(fadeProgress, 1000);
					window.setTimeout(hideProgress, 2000);
					window.setTimeout(showUserPage, 2500);
					function fadeProgress() {
						progressBox.style.opacity = "0";
					}
					function hideProgress() {
						progressBox.className = "hidden";
						userPage.className = "fade";
					}
					function showUserPage() {
						userPage.style.opacity = "1";
					}
				}
				else {
					alert('An error occurred!');
				}
			}
			if (image == "yes") {
				xhr.send(formData);
			}
			//--------------------------------

		}// End: fileSelect Upload
	}// End: Browse Button Upload -------------------------


	// Clipboard ICON -----------------------------
	var clipIcon = document.getElementById('clipPic');

	var clipStatus = "closed";

	var scanDisplay = document.getElementById('scanDisplay');
	var diagnosisBox = document.getElementById('diagnosis');

	clipIcon.onclick = function() {
		if (clipStatus == "closed") {

			if (iiState == "opened") {
				targetPad.style.opacity = "0";
				targetPad.style.zIndex = "-1";

				iiState = "closed";

			}

			scanDisplay.style.left = "31%";
			diagnosisBox.style.left ="6%";

			clipIcon.setAttribute('src', 'close50.png');

			clipStatus = "open";
		}
		else {
			scanDisplay.style.left = "6%";
			diagnosisBox.style.left ="18%";

			clipIcon.setAttribute('src', 'clipboard50.png');

			clipStatus = "closed";
		}
	}
	// --------------------------------------------


	// Repeat ICON --------------------------------
	var repeatIcon = document.getElementById('repeatIcon');

	repeatIcon.onclick = function() {

		var formData = new FormData();
		formData.append('photo[]', fileOld, fileOld.name);


		userPage.className = "fade hidden";
		userPage.style.opacity = "0";
		progressBox.className = "fade";
		progressBox.style.opacity = "1";

		// XHR Request--------------------
			var xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://httpbin.org/post', true);
			xhr.onprogress = function (event) {
				if (event.lengthComputable) {
					var complete = (event.loaded/event.total * 100 | 0);
					progress.value = progress.innerHTML = complete;
					percentage.innerHTML = complete + "%";
				}
			};
			xhr.onload = function() {
				if(xhr.status === 200) {
					// alert('Complete!');
					window.setTimeout(fadeProgress, 1000);
					window.setTimeout(hideProgress, 2000);
					window.setTimeout(showUserPage, 2500);
					function fadeProgress() {
						progressBox.style.opacity = "0";
					}
					function hideProgress() {
						progressBox.className = "hidden";
						userPage.className = "fade";
					}
					function showUserPage() {
						userPage.style.opacity = "1";
					}
				}
				else {
					alert('An error occurred!');
				}
			}
			xhr.send(formData);
			//--------------------------------
	}
	// --------------------------------------------


	// Image ICON ---------------------------------
	var imageIcon = document.getElementById('imageIcon');

	var iiState = "closed";

	imageIcon.onclick = function() {

		if (iiState == "closed") {
			targetPad.className = "fastFade";

			if (clipStatus == "open") {
				scanDisplay.style.left = "6%";
				diagnosisBox.style.left ="18%";

				clipIcon.setAttribute('src', 'clipboard50.png');

				clipStatus = "closed";
			}

			targetPad.style.position = "fixed";
			targetPad.style.left = "6%";
			targetPad.style.bottom = "0";
			targetPad.style.zIndex = "3";
			targetPad.style.backgroundColor = "white";
			targetPad.style.border = "solid 1px transparent";
			targetPad.style.borderRadius = "0";
			
			window.setTimeout(uploadBoxVisible, 100);

			function uploadBoxVisible() {
				targetPad.style.opacity = "1";
			}

			iiState = "opened";
		}

		else {
			targetPad.style.opacity = "0";
			window.setTimeout(uploadBoxInvisible, 250);

			function uploadBoxInvisible() {
				targetPad.style.zIndex = "-1";
			}

			iiState = "closed";
		}
	}
	// -------------------------------------------



	// TOOOOOOOOOOOOOOOOOOOOO00OOLS!!!!!!!!!!

	// TOOOOOOOOOOOOOOOOOOOOOOOOOLS!!!!!!



} // END: ALL