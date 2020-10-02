import React, { Component } from "react";
import tinymce from "tinymce";
import "tinymce/themes/silver";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/table";

class TinyMce extends Component {
    constructor() {
        super();
        this.state = { editor: null, desc: '' };
    }

    componentDidMount() {
        tinymce.init({
            selector: "#desc",
            skin_url: "tinymce/skins",
            plugins: "wordcount table",
            setup: editor => {
                this.setState({ editor });
                editor.on("keyup change", () => {
                    const desc = editor.getContent();
                    this.setState({ desc })
                });
            }
        });
    }

    componentWillUnmount() {
        tinymce.remove(this.state.editor);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.description !== this.props.description)
            if (this.props.description != null) {
                this.setState({ desc: this.props.description })
                this.state.editor.setContent(this.props.description)
            }
    }
    render() {
        return (
            <textarea
                name="description"
                ref={this.props.reference}
                id="desc"
                value={this.state.desc}
                rows="15"
                required
                onChange={e => console.log(this.props)}
            />
        );
    }
}

export default TinyMce;
