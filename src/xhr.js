/**
 * Uses XML to download a file.
 * @param {*} callbackRef The function to call when the file is parsed.
 */
export const loadImages = (callbackRef, url) => {
	const xhr = new XMLHttpRequest();
	// 1. set `onerror` handler
	xhr.onerror = (e) => console.log("error");
	
	// 2. set `onload` handler
	xhr.onload = (e) => {
		const jsonString = e.target.responseText;
		//console.log(`jsonString = ${jsonString}`);
		callbackRef(jsonString);
	}; // end xhr.onload
	
	// 3. open the connection using the HTTP GET method
	xhr.open("GET",url);
	
	// 4. we could send request headers here if we wanted to
	// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
	
	// 5. finally, send the request
	xhr.send();
};