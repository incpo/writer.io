import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "~/utils/api";
import Header from "~/components/Header";
import React, { useState } from "react";
import NoteEditor from "~/components/NoteEditor";
import NoteCard from "~/components/NoteCard";
import MainContainer from "~/containers/Main";


type Topic = RouterOutputs['topic']['getAll'][0];

const Home: NextPage = () => {
    const {data: sessionData} = useSession()
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
    const {data: topics, refetch: refetchTopics} = api.topic.getAll.useQuery(
        undefined, //no input
        {
            enabled: sessionData?.user !== undefined,
            onSuccess: (data) => {
                setSelectedTopic(selectedTopic ?? data[0] ?? null)
            }
        }
    );
    const createTopic = api.topic.create.useMutation({
        onSuccess: () => {
            void refetchTopics()
        }
    });
    const deleteTopic = api.topic.delete.useMutation({
        onSuccess: () => {
            void refetchTopics()
        }
    });


    const {data: notes, refetch: refetchNotes} = api.note.getAll.useQuery(
        {
            topicId: selectedTopic?.id ?? ''
        },
        {
            enabled: sessionData?.user !== undefined && selectedTopic !== null
        }
    )

    const createNote = api.note.create.useMutation({
        onSuccess: () => {
            void refetchNotes();
        }
    })

    const deleteNote = api.note.delete.useMutation({
        onSuccess: () => {
            void refetchNotes();
        }
    })

  return (
    <MainContainer>
        <div className='mx-5 mt-5 grid grid-cols-4 gap-2'>
            <div className='px-2'>
                <input
                    type='text'
                    placeholder='New Code Title'
                    className='input input-ghost w-full max-w-xs input-sm'
                    onKeyDown={(e)=> {
                        if(e.key === 'Enter') {
                            createTopic.mutate({
                                title: e.currentTarget.value
                            });
                            e.currentTarget.value = '';
                        }
                    }}
                />
                <div className='divider'></div>
                <ul className='menu rounded-box w-56 bg-base-100 p-2'>
                    {topics?.map(topic=>
                        <li key={topic.id} className='my-1 relative indicator'><a
                            href='#'
                            onClick={e=>{
                                e.preventDefault();
                                setSelectedTopic(topic);
                            }}
                        >{topic.title}</a>
                            {selectedTopic === topic && <span className="indicator-item badge hover:badge-info badge-ghost" onClick={()=> void deleteTopic.mutate({id:selectedTopic.id})}>x</span>}
                        </li>
                    )}
                </ul>

            </div>
            <div className='col-span-3'>
                <div>
                    {notes?.map(note =>
                        <div key={note.id} className='mt-5'>
                            <NoteCard note={note} onDelete={()=> void deleteNote.mutate({id: note.id})}/>
                        </div>
                    )}
                </div>
                <NoteEditor
                    onSave={({title,content}) => {
                        void createNote.mutate({
                            title,
                            content,
                            topicId: selectedTopic?.id ?? ''
                        })
                    }}
                />
            </div>
        </div>
    </MainContainer>
  );
};

export default Home;


