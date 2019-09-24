//5. Get information for individual link
const rp = require('request-promise');
const $ = require('cheerio');

const offerParse = function(offerUrl, settings){
	return rp(offerUrl)
	  .then(function(html) {
		console.log($(settings.offerDOMSelectors.jobTitleSelector , html).text())
		return {
			jobTitle: $(settings.offerDOMSelectors.jobTitleSelector , html).text(),
			datePosted: $(settings.offerDOMSelectors.datePostedSelector, html).text(),
			jobUrl: offerUrl,
			employer: $(settings.offerDOMSelectors.employerSelector, html).text(),
			address: $(settings.offerDOMSelectors.addressSelector, html).text(),
			//Need to figure out how to pass the comments and rating to this object
			employer_opinion: 'test'		
		}
	  })
	  .catch(function(err) {
		console.log(`Error in offerPare occured ${err}`)
	  });
	  
}

module.exports = offerParse;