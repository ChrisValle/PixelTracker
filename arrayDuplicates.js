function getDuplicates(array) {
 
	var duplicates = [];

	var copy = array.slice(0);

	for (var i = 0; i < array.length; i++) {
		var arrayCount = 0;	
		for (var w = 0; w < copy.length; w++) {
			if (array[i] == copy[w]) {
				arrayCount++;
				delete copy[w];
			}
		}
 
		if (arrayCount > 0) {
			var a = new Object();
			a.value = array[i];
			a.count = arrayCount;
			duplicates.push(a);
		}
	}
 
	return duplicates;
}

module.exports = {
  getDuplicates
}