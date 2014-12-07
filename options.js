/*
The MIT License (MIT)

Copyright (c) 2014 Zechariah W. Schwenk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function save_options() 
{
	
	console.log("Saving...");
	
	var updatedBlockedSites = document.getElementById('blockedSites').value;
	
	chrome.storage.sync.set(
	{
		blockedSites: updatedBlockedSites
	}
	, function() 
	{
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() 
		{
			status.textContent = '';
		}, 
		750);
	});
}

function restore_options() 
{
	chrome.storage.sync.get(
	{
		blockedSites: 'facebook.com\nfacebook.net\nplus.google.com\ntwitter.com'
	}
	, function(items) 
	{
		document.getElementById('blockedSites').value = items.blockedSites;
	});
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);