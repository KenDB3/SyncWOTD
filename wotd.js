/* KD3 Doors presents SyncWOTD a Word of the Day generator 
 * Thanks to Wordnik Online Dictionary - https://www.wordnik.com/
 * See this URL for how the API call works:
 * http://developer.wordnik.com/docs.html#!/words/getWordOfTheDay_get_1
 */

load("http.js"); //this loads the http libraries which you will need to make requests to the web server
load(js.exec_dir + "ctrl-a_colors.js"); //predefined a whole bunch of Ctrl-A (Sync) Color Codes
load(js.exec_dir + "dateFormat.js"); //help with date formatting
load("utf8_cp437.js"); //convert utf-8 characters to cp437 which is more BBS friendly

var opts=load({},"modopts.js","SyncWOTD"); 
var wordnikAPIkey = opts.wordnikAPIkey;  //Get an API Key: http://developer.wordnik.com/#!/faq and http://www.wordnik.com/signup and http://developer.wordnik.com/

console.clear();

var today = dateFormat("isoDate");

console.putmsg(green + "_______________________________________________________________________________");console.crlf();
console.putmsg(green + " _      _                              _                      _____            ");console.crlf();
console.putmsg(green + " |  |  /                   /         /  `        /            /    )           ");console.crlf();
console.putmsg(green + "-|-/|-/----__---)__----__-/----__--_/__---_/_---/__----__----/----/---__-------");console.crlf();
console.putmsg(green + " |/ |/   /   ) /   ) /   /   /   ) /      /    /   ) /___)  /    /  /   ) /   /");console.crlf();
console.putmsg(green + "_/__|___(___/_/_____(___/___(___/_/______(_ __/___/_(___ __/____/__(___(_(___/_");console.crlf();
console.putmsg(green + "                                                                            /  ");console.crlf();
console.putmsg(green + "                                                                        (_ /   ");console.crlf();
console.crlf();

var reqWOTD = new HTTPRequest();
var WOTD = reqWOTD.Get("http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=" + today + "&api_key=" + wordnikAPIkey);

// Make sure we actually got a response. If not, log an error and exit.
if (WOTD === undefined || reqWOTD === undefined) {
	log("ERROR in wotd.js: Request to api.wordnik.com returned 'undefined'");
	console.center("There was a problem getting data from Wordnik.com.");
	console.center("The sysop has been notified.");
	console.pause();
	exit();
}

// Parse the JSON responses.
var jsonWOTD = JSON.parse(WOTD);

var word = jsonWOTD.word;
var note = jsonWOTD.note;
var totalHeight = console.screen_rows;
var totalLength = console.screen_columns;
 
//main function
function WordOfTheDay() {
	console.center(darkblue + whitebackground + utf8_cp437(word.toUpperCase()) + gray);console.crlf();console.crlf();

	for (var i = 0; i < jsonWOTD.definitions.length; i++) {
		j=i+1
		console.putmsg(blue + j + ". " + gray + "(" + jsonWOTD.definitions[i].partOfSpeech + ") " + white + utf8_cp437(jsonWOTD.definitions[i].text));console.crlf();console.crlf();
	}
	
	console.putmsg(blue + "Origin/Notes: \r\n" + white + utf8_cp437(note));console.crlf();console.crlf();
	console.putmsg(darkgray + "--------------------------------------------------------------------------------");
	if (totalLength > 80) {
		console.crlf();
	}
	console.putmsg(gray + "                SyncWOTD written by " + blue + "KenDB3" + gray + " | " + gray + "Powered by " + white + "w" + darkyellow + "\003" + white + "rdnik");
	console.crlf();console.crlf();
}

WordOfTheDay();
console.pause();
console.clear();
console.aborted = false;
exit();
