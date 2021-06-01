import React, {Component, createContext} from "react";

export const PostContext = createContext();

class PostContextProvider extends Component
{
    state = {
        posts: []
    };

    initComplaints = (complaints) =>
    {
        this.setState(
            {
                posts: complaints 
            }
        );
    }

    addNewComplaint = (newComplaint) =>
    {
        var temp = [newComplaint, ...posts];
        this.setState(
            {
                posts: temp
            }
        );
    }

    render()
    {
        return(
            <PostContext.Provider value = {{...this.state, addNewComplaint: this.addNewComplaint, initComplaints: this.initComplaints}}>
                {this.props.children}
            </PostContext.Provider>
        );
    }
}

export default PostContextProvider;