import React, {useState} from 'react';
import CodeMirror from '@uiw/react-codemirror/'
import {markdown, markdownLanguage} from "@codemirror/lang-markdown";
import {languages} from "@codemirror/language-data";
import {tokyoNight} from '@uiw/codemirror-theme-tokyo-night'
const NoteEditor = ({onSave} : {onSave: (note: {title: string, content: string}) => void;}) => {
    const [code,setCode] = useState<string>('')
    const [title,setTitle] = useState<string>('')

    return (
        <div className='card mt-5 border rounded-sm border-accent-focus bg-accent-content shadow-xl'>
            <div className='card-body'>
                <h2 className='cart-title'>
                    <input
                        type='text'
                        placeholder='Example title'
                        className='input input-ghost w-full input-xl rounded-sm'
                        value={title}
                        onChange={e=> setTitle(e.currentTarget.value)}
                    />
                </h2>
                <CodeMirror
                    value={code}
                    width='500px'
                    height='30vh'
                    theme={tokyoNight}
                    minWidth='100%'
                    minHeight='30vh'
                    extensions={[
                        markdown({base: markdownLanguage, codeLanguages: languages})
                    ]}
                    onChange={value=>setCode(value)}
                    className='border mt-3 border-accent-focus/50 bg-accent/10'
                />
                <button
                    onClick={() => {
                        onSave({
                            title,
                            content: code,
                        });
                        setCode("");
                        setTitle("");
                    }}
                    className="btn"
                    disabled={title.trim().length === 0 || code.trim().length === 0}
                >
                    Save
                </button>
            </div>
        </div>
    )
};

export default NoteEditor;