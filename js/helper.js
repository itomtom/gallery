

Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
};

var pageRange=3
var createPagination = function(page, totalPages){
	var pageArray = [];

	if(page < pageRange){
	   page = pageRange; 
	}
	else if(page > totalPages-2 && totalPages-2 > 1){
	   page = totalPages-2; 
	}

	for(var i=page-1;
	    i<=page+1 && i<totalPages;
	    i++){
	    pageArray.push(i); 
	}

	if(pageArray[0]!==2 && totalPages>0){
	    pageArray.unshift('\u2026');
	}

	if(pageArray[0]!==1){
	    pageArray.unshift(1);
	}

	if(pageArray[pageArray.length-1]!==totalPages-1 && totalPages>0){
	    pageArray.push('\u2026');
	}

	if(totalPages > 1){
	    pageArray.push(totalPages);
	}    
	return pageArray;
};