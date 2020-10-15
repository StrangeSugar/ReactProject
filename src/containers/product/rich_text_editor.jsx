import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './css/rich_text_editor.less'
export default class RichTextEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),//构建以恶搞初始化状态的编辑器+内容
    };
    //6.1.保存数据
    onEditorStateChange = editorState => {
        this.setState({
            editorState,
        });
    };
    getValue = ()=>{
        const { editorState } = this.state
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
         
    }



    render() {
        const { editorState } = this.state
        return (
            <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
            />
            {/* <textarea
                className="textarea"
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            >

            </textarea> */}
            </div>
        )
    }
}

