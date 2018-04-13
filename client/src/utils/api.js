import axios from "axios";


    const api = {
        searchArticle: function(topic, startYear, endYear) {
            const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
            const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
            authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
            return axios.get(queryURL);
        },
    
    //gets all articles saved in db
    getArticle: function() {
        return axios.get("/api/saved");
    },
    //deletes article with specific id from db
    deleteArticle: function(id) {
        return axios.delete(`/api/saved/${id}`);
    },
    //saves an article to db
    saveArticle: function(articleData) {
        return axios.post("/api/saved", articleData);
    }
};

export default api;