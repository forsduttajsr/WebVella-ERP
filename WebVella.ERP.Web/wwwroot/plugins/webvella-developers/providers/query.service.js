﻿/* area.service.js */

/**
* @desc all actions with site area
*/

(function () {
    'use strict';

    angular
        .module('webvellaDevelopers')
        .service('webvellaDevelopersQueryService', service);

    service.$inject = ['$log','$http', 'wvAppConstants'];

    /* @ngInject */
    function service($log, $http, wvAppConstants) {
        var serviceInstance = this;

        serviceInstance.executeSampleQuery = executeSampleQuery;
        serviceInstance.createSampleQueryDataStructure = createSampleQueryDataStructure;
        
        /////////////////////////
        function executeSampleQuery(postObject,successCallback, errorCallback) {
            $log.debug('webvellaDevelopers>providers>query.service>execute sample query> function called');
            var postData = {};
            $http({ method: 'POST', url: wvAppConstants.apiBaseUrl + 'meta/developers/query/execute-sample-query', data: postData }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

    	/////////////////////////
        function createSampleQueryDataStructure(postObject, successCallback, errorCallback) {
        	$log.debug('webvellaDevelopers>providers>query.service>execute sample query> function called');
        	var postData = {};
        	$http({ method: 'POST', url: wvAppConstants.apiBaseUrl + 'meta/developers/query/create-sample-query-data-structure', data: postData }).success(function (data, status, headers, config) { handleSuccessResult(data, status, successCallback, errorCallback); }).error(function (data, status, headers, config) { handleErrorResult(data, status, errorCallback); });
        }

        //// Aux methods //////////////////////////////////////////////////////

    	// Global functions for result handling for all methods of this service
        function handleErrorResult(data, status, errorCallback) {
        	switch (status) {
        		case 400:
        			if (errorCallback === undefined || typeof (errorCallback) != "function") {
        				$log.debug('webvellaDevelopers>providers>query.service> result failure: errorCallback not a function or missing ');
        				alert("The errorCallback argument is not a function or missing");
        				return;
        			}
        			data.success = false;
        			errorCallback(data);
        			break;
        		default:
        			$log.debug('webvellaDevelopers>providers>query.service> result failure: API call finished with error: ' + status);
        			alert("An API call finished with error: " + status);
        			break;
        	}
        }

        function handleSuccessResult(data, status, successCallback, errorCallback) {
        	if (successCallback === undefined || typeof (successCallback) != "function") {
        		$log.debug('webvellaDevelopers>providers>query.service> result failure: successCallback not a function or missing ');
        		alert("The successCallback argument is not a function or missing");
        		return;
        	}

        	if (!data.success) {
        		//when the validation errors occurred
        		if (errorCallback === undefined || typeof (errorCallback) != "function") {
        			$log.debug('webvellaDevelopers>providers>query.service> result failure: errorCallback not a function or missing ');
        			alert("The errorCallback argument in handleSuccessResult is not a function or missing");
        			return;
        		}
        		errorCallback(data);
        	}
        	else {
        		$log.debug('webvellaDevelopers>providers>query.service> result success: get object ');
        		successCallback(data);
        	}
        }
    }
})();