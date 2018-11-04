function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		//Offload handling to a function
		handleResponse(file,text);
	});
}

function handleResponse(filename, contents){
	//Store whichever contents comes back
	if(!(filename in responses)){
		responses[filename] = contents;
	}

	// print them in correct order if received 
	var filenames = ["file1", "file2", "file3"];

	for(i = 0; i < filenames.length ; i++){

		if(filenames[i] in responses){
			// check that its not a processed response by checking it is of string type
			if(typeof responses[filenames[i]] == "string"){
				output(responses[filenames[i]]);
				//Mark the response as processed by changing the value to false
				responses[filenames[i]] = false;
			}

		}
		else {
			//If some file key is missing in responses exit the function 
			//break doesn't help here because it still prints Complete
			return;
		}
	}

	output('Complete');
}

var responses = {};

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
//Duplicate calls to get files to test printing once.
getFile("file1");
getFile("file2");
getFile("file3");