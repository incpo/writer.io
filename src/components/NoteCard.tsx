import React, {useState} from 'react';
import ReactMarkdown from "react-markdown";
import {type RouterOutputs} from "~/utils/api";

type Note = RouterOutputs['note']['getAll'][0]

const NoteCard = ({note, onDelete} : {note: Note; onDelete: () => void}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true)
    return (
        <div className='card mt-5 border rounded-sm border-accent-focus bg-accent-content shadow-xl'>
            <div className='card-body m-0 p-3'>
                <div className={`collapse-arrow ${
                    isExpanded ? 'collapse-open' : ''
                } collapse`}
                >
                    <div className='collapse-title text-xl font-bold' onClick={()=>setIsExpanded(!isExpanded)}>{note.title}</div>
                    <div className='collapse-content'>
                        <article className='prose lg:prose-xl'>
                            <ReactMarkdown className='border-gray-200'>{note.content}</ReactMarkdown>
                        </article>
                    </div>
                    <div className='card-actions mx-2 flex justify-end'>
                        <button className='btn-warning btn-xs btn px-5' onClick={onDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;