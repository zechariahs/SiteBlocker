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

var arrBlockedURLS;

var blockURLS = function(details)
{
	
	chrome.storage.sync.get(
	{
		blockedSites: 'facebook.com\nfacebook.net\nplus.google.com\ntwitter.com'
	}
	, function(items) 
	{
		arrBlockedURLS = items.blockedSites.split('\n');
	});
	
	var url = details.url.toUpperCase();
		
	for (var i in arrBlockedURLS)
	{
		if(url.indexOf(arrBlockedURLS[i].toUpperCase()) != -1)
		{
			console.log('Site Blocker blocked: ' + url + ' matched ' + arrBlockedURLS[i].toUpperCase());
			return {cancel: true};
		}
	}
	
	return {cancel: false};

}

chrome.webRequest.onBeforeRequest.addListener(
  blockURLS,
  // filters
  {
    urls: [
      "<all_urls>"
    ]
  },
  // extraInfoSpec
  ["blocking"]);