# SyncWOTD
A Word of the Day external program (door) written in javascript for Synchronet BBS and data provided by Wordnik Online Dictionary - [Wordnik.com](https://www.wordnik.com/).

## Synopsis
SyncWOTD is an External Program (Door) written in JavaScript for Synchronet BBS that will grab the Word of the Day from Wordnik Online Dictionary through their [API](http://developer.wordnik.com/). The call to the API requires an API Key, which can be obtained for free, just follow the steps in the [FAQ](http://developer.wordnik.com/#!/faq). Help with getting the date into the yyyy-mm-dd format without being able to use functions like Date.getFullYear was provided by Date Format 1.2.3, found [here](http://blog.stevenlevithan.com/archives/date-time-format).

## Screenshots 
![Regular Terminal Size 80x24](http://kendibattista.net/photos/bbs/SyncWOTD-Example.png)

## Code Example

Request the Data:

		var reqWOTD = new HTTPRequest();
		var WOTD = reqWOTD.Get("http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=" + today + "&api_key=" + wordnikAPIkey);

Parse the JSON response:

		var jsonWOTD = JSON.parse(WOTD);

Looping through the definitions:

		for (var i = 0; i < jsonWOTD.definitions.length; i++) {
			j=i+1
			console.putmsg(blue + j + ". " + gray + "(" + jsonWOTD.definitions[i].partOfSpeech + ") " + white + jsonWOTD.definitions[i].text);console.crlf();console.crlf();
		}

## Installation

Check out [sysop.txt](https://github.com/KenDB3/SyncWOTD/blob/master/sysop.txt) for full installation instructions.

## Credits

![Powered by Wordnik](http://www.wordnik.com/img/wordnik_badge_a1.png)