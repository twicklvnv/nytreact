import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/api";


class Main extends Component {
    state = {
        topic: "",
        startYear: "",
        endYear: "",
        articles: [],
        saved: []
    };
    //Whem component mounts, retrieve any saved articles from db
    componentDidMount() {
        this.getSavedArticles()
    }

    //function to retrieve articles from db
    getSavedArticles = () => {
        API.getArticle()
        .then((res) => {
            this.setState({ saved: res.data });
        });
    }

    //method to render one result div per article
    renderArticles = () => {
        return this.state.articles.map(article => (
            <Results
            _id = {article._id}
            key = {article._id}
            title = {article.headline.main}
            date = {article.pub_date}
            url = {article.web_url}
            handleSaveButton = {this.handleSaveButton}
            getSavedArticles = {this.getSavedArticles}
            />
        ));
    }

    //method to render one result div per saved article
    renderSaved = () => {
        return this.state.saved.map(save => (
            <Saved
            _id = {save._id}
            key = {save._id}
            title = {save.title}
            date = {save.date}
            url = {save.url}
            handleDeleteButton = {this.handleDeleteButton}
            getSavedArticles = {this.getSavedArticles}
            />
        ));
    }

    //what user types into topic input field
    handleTopicChange = (event) => {
        this.setState({ topic: event.target.value });
    }
    //what user types into start year input field
    handleStartYearChange = (event) => {
        this.setState({ startYear: event.target.value });
    }

    //what user types into end year input field
    handleEndYearChange = (event) => {
        this.setState({ endYear: event.target.value });
    }

    //submit search form and perform api call with the user input
    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("getting articles");
        console.log("this.state.topic: ", this.state.topic);
        API.searchArticle(this.state.topic, this.state.startYear, this.state.endYear)
        .then((res) => {
            this.setState({ articles: res.data.response.docs });
        });
    }

    //save article to db when save button clicked
    handleSaveButton = (id) => {
        const findArticleById = this.state.articles.find((el) => el._id === id);
        console.log("findArticleById: ", findArticleById);
        const newSave = {title: findArticleById.headline.main, date: findArticleById.pub_date, url: findArticleById.web_url};
        console.log("newSave :", newSave);
        API.saveArticle(newSave)
        .then(res => this.getSavedArticles())
        .catch(err => console.log(err));
    }

    //delete article from db when delete button clicked
    handleDeleteButton = (id) => {
        API.deleteArticle(id)
        .then(this.getSavedArticles());
    }

    render() {
        return(
            <div className = "main-container">
                <div className = "container">
                    <div className = "jumbotron">
                        <h1 className = "text-center"><strong>New York Times Article Search</strong></h1>
                        <h2 className = "text-center">Search for and save articles of interest</h2>
                    </div>
                    {/* search form section */}
                    <Search
                        handleTopicChange = {this.handleTopicChange}
                        handleStartYearChange = {this.handleStartYearChange}
                        handleEndYearChange = {this.handleEndYearChange}
                        handleFormSubmit = {this.handleFormSubmit}
                        renderArticles = {this.renderArticles}
                    />
                    {/* saved articles section */}
                    <div className = "container">
                        <div className = "row">
                            <div className = "col-md-12">
                                <div className = "panel panel-primary">
                                    <div className = "panel-heading">
                                        <h3 className = "panel-title">
                                            <strong>
                                                <i className = "saved-articles" aria-hidden= "true"></i>Saved Articles
                                            </strong>
                                        </h3>
                                    </div>
                                    <div className = "panel-body">
                                        <ul className = "list-group">
                                            {this.renderSaved()}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Main;