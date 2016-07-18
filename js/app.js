var app = angular.module("MyFlickrApp", []); 

app.controller("ImageController",["$scope","FlickrService",function($scope,FlickrService) {
	var ctrl=this;
	ctrl.currentPage=1;
	ctrl.searchText = "";
	ctrl.index=0;

	ctrl.submitSearch = function(){
		ctrl.index=0;
		ctrl.currentPage=1;
		ctrl.getImages();
	};

	ctrl.clearSearch = function(){
		ctrl.searchText = "";
		ctrl.submitSearch();
	};

	ctrl.getImages = (function getImages(){
		FlickrService.getImages(ctrl.currentPage, ctrl.searchText).then(
			function(response){
				ctrl.photos = response.sources;
				ctrl.pages = createPagination(response.currentPage,response.totalPages);
				ctrl.currentPage = response.currentPage;
			},function(message){
				console.log("Failed to fetch recent images : " + message);
		});
		return getImages;
	})();

	ctrl.changeImage = function(newIndex){
		if(newIndex >= ctrl.photos.length){
			ctrl.currentPage+=1;
			ctrl.getImages();
		}
		else if(newIndex < 0){
			ctrl.currentPage-=1;
			ctrl.getImages();
		}
		ctrl.index = newIndex.mod(ctrl.photos.length);
	};
}]);