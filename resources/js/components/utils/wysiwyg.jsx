import React, { Component } from "react";
import tinymce from "tinymce";
import "tinymce/themes/silver";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/table";

class TinyMce extends Component {
    constructor() {
        super();
        this.state = { editor: null, content: '' };
    }

    componentDidMount() {
        this.setState({ content: this.props?.content }, () => {
            tinymce.init({
                selector: "#desc",
                skin_url: "http://localhost/laraveltest/public/tinymce/skins",
                plugins: "wordcount table",
                setup: editor => {
                    this.setState({ editor });
                    const content = editor.getContent();
                    this.setState({ content })
                    editor.on("keyup change", () => {
                        const content = editor.getContent();
                        this.setState({ content })
                        //this.props.onEditorChange(content);
                    });
                }
            });
        })


    }

    componentWillUnmount() {
        tinymce.remove(this.state.editor);
    }

    render() {
        return (
            <textarea
                name="description"
                ref={this.props?.reference}
                id="desc"
                value={this.state.content}
                rows="15"
                onChange={e => console.log(this.props)}
            />
        );
    }
}

export default TinyMce;
