#! /usr/bin/env node

var gh = require('github-url-to-object');
var got = require('got');
var chalk = require('chalk');
var elegantSpinner = require('elegant-spinner');
var logUpdate = require('log-update');
var frame = elegantSpinner();
 
setInterval(function () {
    logUpdate(frame());
}, 100);
var param = process.argv.slice(2);
var userDetails = gh(param[0]);
var url = 'https://api.github.com/repos/';
url = url + userDetails.user + '/' + userDetails.repo;
got(url, function (err, data, res) {
	var jsonData = JSON.parse(data);
	var displayMessage = chalk.cyan('\n Stars    : ') + chalk.yellow(jsonData.stargazers_count)
						+ chalk.cyan('\n Forks    : ') + chalk.yellow(jsonData.forks_count)
						+ chalk.cyan('\n Watchers : ') + chalk.yellow(jsonData.watchers);
	console.log(displayMessage);
	process.exit();
});