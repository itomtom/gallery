app.factory("FlickrService", ["$http", "$q", function($http, $q) {
	var baseUrl = "https://api.flickr.com/services/rest/";
	var key = "&api_key=aee0b48359d528b7f55b8ec9a691b451";
	var format = "&format=json&nojsoncallback=1";
	var templateUrl = _.template(baseUrl + "?method=flickr.photos.<%= method %><%= extra %>" + key + "&per_page=15&page=<%= page %>" + format);
	var templateFarmUrl = _.template("https://farm<%= farm  %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %><%= size%>.jpg");

	return {
	    getImages: function(page, searchText) {
	    	var deferred = $q.defer();
	    	var method = "getRecent";
	    	var extra = "";
	    	if(searchText !== "") {
	    		method = "search";
	    		extra = "&text="+searchText;
	    	}; 

	        $http.get(templateUrl({method: method, page: page, extra: extra}))
	        .success(function(data){
	        	var sources = [];
	        	if(data.photos.photo !== undefined){
		        	data.photos.photo.forEach(function(image){
						sources.push({
							'thumbSrc': templateFarmUrl({
								farm: image.farm,
								server: image.server,
								id: image.id,
								secret: image.secret,
								size: '_q'
							}),
							'src': templateFarmUrl({
								farm: image.farm,
								server: image.server,
								id: image.id,
								secret: image.secret,
								size: '_n'
							})
						});
					});
	        	}
	       		deferred.resolve({
	       			sources : sources,
	       			currentPage : data.photos.page,
	       			totalPages : data.photos.pages
	       		});
	        }).error(function(msg){
	        	deferred.reject(msg);
	        });
	        return deferred.promise;
	    }
	};
}]);

app.factory("Preloader", [function() {  
    return {
        request: function(config) {
            $("#loader").openModal();
            return config;
        },
        response: function(response) {
            $("#loader").closeModal();
            return response;
        }
    };
}]);
app.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('Preloader');
}]);