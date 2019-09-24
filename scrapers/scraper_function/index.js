
const requestPromise = require('request-promise');
const $ = require('cheerio');
const offerParse = require('./offerParse');


//########Settings object example#######
// const settings =  {
// 	siteUrl: 'https://www.pracuj.pl',
// 	keywords: ['junior', 'front', 'end'],
// 	location: 'warszawa',
// 	jobListingContainersSelector: '.results__list-container-item .offer-details__title-link',

// 	//Site selectors, used to get information from dom individual ofer
// 	offerDOMSelectors: {
// 		jobTitleSelector: '#offerTitle',
// 		datePostedSelector: 'span[itemprop="datePosted"]',
// 		employerSelector: '#offerEmployer',
// 		addressSelector: 'span[itemprop="addressRegion"]',
// 	},

// 	searchUrl: function() {
// 		//need to understand more on why this is undefined
// 		return `https://www.pracuj.pl/praca/${this.keywords.join("%20")};kw/${this.location};wp`
// 	} 
// }

const scrapeSite = (settings, callback) => {
	requestPromise(settings.searchUrl())
		.then(function(html){
			const offerUrls = [];
			const offersNumber =$(settings.jobListingContainersSelector, html).length
			for (let i = 0; i < offersNumber; i++){
				offerUrls.push($(settings.jobListingContainersSelector, html)[i].attribs.href);
			}

			return Promise.all(
				offerUrls.map(function(offerUrl){
					//console.log(siteUrl + offerUrl)
					const offerFullUrl = settings.siteUrl + offerUrl
					console.log(offerFullUrl)
					//Individual offers getting parsed
					return offerParse(offerFullUrl, settings)
				})
			)
		})
		
		//Data returned in callback
		.then(function(jobOffers){
			callback(jobOffers)
		})
			
		
		.catch(function(err){
			//handle error
			console.log(err);
		});
}


module.exports = scrapeSite;
