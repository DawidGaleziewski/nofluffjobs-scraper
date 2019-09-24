const url = `https://nofluffjobs.com/jobs/${this.location}/frontend?criteria=city%3D${this.location}%20category%3Dfrontend%20seniority%3Djunior%20developer`

const scrapeSite = require('./scrapers/scraper_function/index');


const settings =  {
	siteUrl: 'https://nofluffjobs.com',
	keywords: null,
	location: 'warszawa',
	jobListingContainersSelector: '.posting-list-item',

	//Site selectors, used to get information from dom individual ofer
	offerDOMSelectors: {
		jobTitleSelector: '.posting-details-description h1',
		datePostedSelector: 'span[itemprop="datePosted"]',
		employerSelector: '#offerEmployer',
		addressSelector: 'span[itemprop="addressRegion"]',
	},

	searchUrl: function() {
		//Uses previously supplied data to create a search link
		return `https://nofluffjobs.com/jobs/${this.location}/frontend?criteria=city%3D${this.location}%20category%3Dfrontend%20seniority%3Djunior%20developer`
	} 
}

scrapeSite(settings, (data)=> {
	console.log(data)
})
